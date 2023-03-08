# Functions for optimizing table access sub-DAGs.

import typing

from . import errors
from . import stitch_v2 as stitch


KeyTree = typing.Dict[str, "KeyTree"]  # type:ignore


# Tree merges b into a IN PLACE
def tree_merge(a: KeyTree, b: KeyTree) -> None:
    for k, v in b.items():
        a_val = a.setdefault(k, {})
        if isinstance(v, dict):
            tree_merge(a_val, v)
        else:
            a_val[k] = v


def get_projection(obj: stitch.ObjectRecorder) -> KeyTree:
    """Given an object returned by stitch, return a tree of all accessed columns."""
    cols: KeyTree = {}
    all_keys = False
    for call in obj.calls:
        if call.node.from_op.name.endswith("pick") or call.node.from_op.name.endswith(
            "__getattr__"
        ):
            key = call.inputs[1].val
            if key is None:
                raise errors.WeaveInternalError("non-const not yet supported")
            tree_merge(cols.setdefault(key, {}), get_projection(call.output))
        elif call.node.from_op.name.endswith("keytypes"):
            all_keys = True
        else:
            tree_merge(cols, get_projection(call.output))
    if all_keys:
        cols = {}
    return cols
