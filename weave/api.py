import typing
import re
from . import graph as _graph
from . import graph_mapper as _graph_mapper
from . import storage as _storage
from . import ref_base as _ref_base
from . import artifact_wandb as _artifact_wandb
from . import trace as _trace
from . import weave_internal as _weave_internal
from . import errors as _errors
from . import ops as _ops
from . import context as _context
from weave import monitoring as _monitoring

# exposed as part of api
from . import weave_types as types
from . import types_numpy as _types_numpy
from . import errors
from .decorators import weave_class, op, mutation, type
from .op_args import OpVarArgs
from .op_def import OpDef
from . import usage_analytics
from .context import (
    use_fixed_server_port,
    use_frontend_devmode,
    # eager_execution,
    # lazy_execution,
)
from .server import capture_weave_server_logs
from .val_const import const
from .file_base import File, Dir
from .dispatch import RuntimeConstNode

from .weave_internal import define_fn

Node = _graph.Node


def save(node_or_obj, name=None):
    if isinstance(node_or_obj, _graph.Node):
        return _ops.save(node_or_obj, name=name)
    else:
        # If the user does not provide a branch, then we explicitly set it to
        # the default branch, "latest".
        branch = None
        name_contains_branch = name is not None and ":" in name
        if not name_contains_branch:
            branch = "latest"
        ref = _storage.save(node_or_obj, name=name, branch=branch)
        if name is None:
            # if the user didn't provide a name, the returned reference
            # will be to the specific version
            uri = ref.uri
        else:
            # otherwise the reference will be to whatever branch was provided
            # or the "latest" branch if only a name was provided.
            uri = ref.branch_uri
        return _ops.get(str(uri))


def get(ref_str):
    obj = _storage.get(ref_str)
    ref = _storage._get_ref(obj)
    return _weave_internal.make_const_node(ref.type, obj)


def use(nodes, client=None):
    usage_analytics.use_called()
    if client is None:
        client = _context.get_client()
    return _weave_internal.use(nodes, client)


def _get_ref(obj):
    if isinstance(obj, _storage.Ref):
        return obj
    ref = _storage.get_ref(obj)
    if ref is None:
        raise _errors.WeaveApiError("obj is not a weave object: %s" % obj)
    return ref


def versions(obj):
    if isinstance(obj, _graph.ConstNode):
        obj = obj.val
    elif isinstance(obj, _graph.OutputNode):
        obj = use(obj)
    ref = _get_ref(obj)
    return ref.versions()


def expr(obj):
    ref = _get_ref(obj)
    return _trace.get_obj_expr(ref)


def type_of(obj: typing.Any) -> types.Type:
    return types.TypeRegistry.type_of(obj)


def weave(obj: typing.Any) -> RuntimeConstNode:
    return _weave_internal.make_const_node(type_of(obj), obj)  # type: ignore


def from_pandas(df):
    return _ops.pandas_to_awl(df)


#### Newer API below


def init(project_name: str) -> None:
    entity_name, project_name = project_name.split("/", 1)
    _monitoring.init_monitor(f"{entity_name}/{project_name}/stream")
    print(f"View project at http://localhost:3000/browse2/{entity_name}/{project_name}")


def publish(obj: typing.Any, name: str) -> _artifact_wandb.WandbArtifactRef:
    if "/" not in name:
        mon = _monitoring.default_monitor()
        if not mon._streamtable:
            raise ValueError(
                "Call weave.init() first, or pass <project>/<name> for name"
            )
        project_name = mon._streamtable._project_name
        name = f"{project_name}/{name}"

    ref = _storage.publish(obj, name)  # type: ignore
    print(f"Published {ref.type.root_type_class().name} to {ref.ui_url}")

    # Have to manually put the ref on the obj, this is supposed to happen at
    # a lower level, but we use a mapper in _direct_publish that I think changes
    # the object identity
    _ref_base._put_ref(obj, ref)
    return ref


def ref(uri: str) -> _artifact_wandb.WandbArtifactRef:
    ref = _ref_base.Ref.from_str(uri)
    if not isinstance(ref, _artifact_wandb.WandbArtifactRef):
        raise ValueError(f"Expected a wandb artifact ref, got {ref}")
    ref.type
    return ref
