import typing

from . import graph


class ForwardNode(object):
    node: typing.Union[graph.OutputNode, graph.ConstNode]
    input_to: typing.Set["ForwardNode"]
    result: typing.Any
    has_result: bool

    def __init__(self, node):
        self.node = node
        self.input_to = set()
        self.result = None
        self.cache_id = None
        self.has_result = False

    def __str__(self):
        return "<ForwardNode(%s): %s input_to %s>" % (
            id(self),
            self.node.from_op.name
            if isinstance(self.node, graph.OutputNode)
            else self.node.val,
            " ".join([str(id(fn)) for fn in self.input_to]),
        )

    def set_result(self, result):
        self.has_result = True
        self.result = result


class ForwardGraph(object):
    _node_to_forward_node: typing.Dict[graph.Node, ForwardNode]

    def __init__(self, nodes):
        self.roots = set()
        self._node_to_forward_node = {}

        for node in nodes:
            self.add_node(node)

    def add_node(self, node):
        if node in self._node_to_forward_node:
            return
        forward_node = ForwardNode(node)
        self._node_to_forward_node[node] = forward_node
        if isinstance(node, graph.OutputNode):
            if not node.from_op.inputs:
                self.roots.add(forward_node)
            else:
                for param_node in node.from_op.inputs.values():
                    self.add_node(param_node)
                    self._node_to_forward_node[param_node].input_to.add(forward_node)
        else:
            self.roots.add(forward_node)

    def get_forward_node(self, node: graph.OutputNode):
        return self._node_to_forward_node[node]

    def get_result(self, node: graph.Node):
        return self._node_to_forward_node[node].result

    def __str__(self):
        lines = []
        to_print = self.roots
        printed = set()
        while len(to_print):
            printing_now = to_print.copy()
            to_print = set()
            for forward_node in printing_now:
                lines.append(str(forward_node))
                for downstream_forward_node in forward_node.input_to:
                    if downstream_forward_node not in printed:
                        to_print.add(downstream_forward_node)
                    printed.add(downstream_forward_node)
        return "\n".join(lines)
