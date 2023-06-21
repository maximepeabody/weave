import copy

import pytest
import wandb

import weave
from weave.ecosystem.wandb.panel_time_series import TimeSeries
from .. import graph
from weave.panels.panel_plot import Plot, Series, PlotConstants
from .test_run_segment import create_experiment
from .. import storage

from contextlib import contextmanager


@contextmanager
def const_nodes_equal():
    graph.ConstNode.__eq__ = (
        lambda self, other: isinstance(other, graph.ConstNode)
        and self.val == other.val
        and self.type == other.type
    )
    yield
    del graph.ConstNode.__eq__


def test_run_segment_plot_config():
    last_segment = create_experiment(1000, 3, 0.8)
    weave.save(last_segment)
    config = Plot(last_segment.experiment()).config
    assert len(config.series) == 1
    assert all(
        isinstance(v, (graph.VoidNode, graph.ConstNode))
        for v in config.series[0].table.columnSelectFunctions.values()
    )


def test_multi_series_plot_config_with_grouping():
    last_segment = create_experiment(1000, 3, 0.8)
    weave.save(last_segment)
    plot = Plot(last_segment.experiment())
    plot.set_x(
        lambda row: weave.ops.number_bin(
            row["step"], weave.ops.numbers_bins_equal([1, 2000], 2)
        )
    )
    plot.set_y(lambda row: weave.ops.numbers_avg(row["metric0"]))

    plot.groupby_x()
    plot.set_mark_constant("line")

    series2 = plot.config.series[0].clone()
    plot.add_series(series2)

    series2.set_y(lambda row: weave.ops.numbers_min(row["metric0"]))
    series2.set_y2(lambda row: weave.ops.numbers_max(row["metric0"]))
    series2.set_mark_constant("area")

    plot.groupby_x()

    assert len(plot.config.series) == 2
    assert all(
        isinstance(v, (graph.VoidNode, graph.ConstNode, graph.OutputNode))
        for v in list(plot.config.series[0].table.columnSelectFunctions.values())
        + list(plot.config.series[1].table.columnSelectFunctions.values())
    )


def test_multi_series_grouping():
    last_segment = create_experiment(1000, 3, 0.8)
    weave.save(last_segment)
    plot = Plot(last_segment.experiment())
    plot.set_x(
        lambda row: weave.ops.number_bin(
            row["step"], weave.ops.numbers_bins_equal([1, 2000], 2)
        )
    )
    plot.groupby_x()

    plot.set_y(lambda row: weave.ops.numbers_avg(row["metric0"]))
    plot.set_mark_constant("line")

    series2 = plot.config.series[0].clone()
    plot.add_series(series2)

    series2.set_y(lambda row: weave.ops.numbers_min(row["metric0"]))
    series2.set_y2(lambda row: weave.ops.numbers_max(row["metric0"]))
    series2.set_mark_constant("area")

    plot2 = copy.deepcopy(plot)

    # compare plot-level grouping to series by series grouping
    for series in plot2.config.series:
        series.groupby_x()

    with const_nodes_equal():
        assert plot.config == plot2.config


def test_overspecification_of_plot_config_raises_exception():
    last_segment = create_experiment(1000, 3, 0.8)
    weave.save(last_segment)
    ok_plot = Plot(last_segment.experiment())
    series = ok_plot.config.series[0]

    # cant specify both
    with pytest.raises(ValueError):
        Plot(last_segment.experiment(), series=series)

    # need at least 1
    with pytest.raises(ValueError):
        Plot()


def test_multi_series_setting():
    last_segment = create_experiment(1000, 3, 0.8)
    weave.save(last_segment)
    plot = Plot(last_segment.experiment())
    plot.set_x(
        lambda row: weave.ops.number_bin(
            row["step"], weave.ops.numbers_bins_equal([1, 2000], 2)
        )
    )

    plot.set_y(lambda row: row["metric0"])
    plot.set_mark_constant("line")

    series2 = plot.config.series[0].clone()
    plot.add_series(series2)

    series2.set_y(lambda row: row["metric0"])
    series2.set_y2(lambda row: row["metric0"])
    series2.set_mark_constant("area")

    plot2 = copy.deepcopy(plot)

    # compare plot-level setting to series by series setting
    plot.set_x(lambda row: row["step"])
    for series in plot2.config.series:
        series.set_x(lambda row: row["step"])

    with const_nodes_equal():
        assert plot.config == plot2.config


def test_constructor():
    last_segment = create_experiment(1000, 3, 0.8)
    weave.save(last_segment)
    series = Series(
        input_node=last_segment.experiment(),
        select_functions={
            "x": lambda row: row["step"],
            "y": lambda row: row["metric0"],
        },
    )
    plot = Plot(series=series)
    plot2 = Plot(series=[series])

    with const_nodes_equal():
        assert plot.config == plot2.config
    assert series.constants == PlotConstants(
        label="series",
        pointShape="circle",
        lineStyle="solid",
    )


@pytest.mark.skip(
    "I have to constantly update these random values and it doesn't always agree with CI"
)
def test_actual_config_value(fixed_random_seed):
    last_segment = create_experiment(1000, 3, 0.8)
    weave.save(last_segment)
    plot = Plot(last_segment.experiment())
    plot.set_x(
        lambda row: weave.ops.number_bin(
            row["step"], weave.ops.numbers_bins_equal([1, 2000], 2)
        )
    )
    plot.set_y(lambda row: weave.ops.numbers_avg(row["metric0"]))
    plot.set_mark_constant("line")

    series2 = plot.config.series[0].clone()
    plot.add_series(series2)

    series2.set_y(lambda row: weave.ops.numbers_min(row["metric0"]))
    series2.set_y2(lambda row: weave.ops.numbers_max(row["metric0"]))
    series2.set_mark_constant("area")
    assert storage.to_python(plot.config) == {
        "_type": {
            "type": "PlotConfig",
            "_is_object": True,
            "series": {
                "type": "list",
                "objectType": {
                    "type": "Series",
                    "_is_object": True,
                    "table": {
                        "type": "TableState",
                        "_is_object": True,
                        "columns": {
                            "type": "typedDict",
                            "propertyTypes": {
                                "BPZ7OF3CU3BTPJ": {
                                    "type": "PanelDef",
                                    "_is_object": True,
                                    "panelConfig": "none",
                                    "panelId": "string",
                                },
                                "3TAMZ9RE8CSQNQ": {
                                    "type": "PanelDef",
                                    "_is_object": True,
                                    "panelConfig": "none",
                                    "panelId": "string",
                                },
                                "V4ZUZP68VEFUE4": {
                                    "type": "PanelDef",
                                    "_is_object": True,
                                    "panelConfig": "none",
                                    "panelId": "string",
                                },
                                "DX2S5BL68G31XO": {
                                    "type": "PanelDef",
                                    "_is_object": True,
                                    "panelConfig": "none",
                                    "panelId": "string",
                                },
                                "6YQY0NYGB338WC": {
                                    "type": "PanelDef",
                                    "_is_object": True,
                                    "panelConfig": "none",
                                    "panelId": "string",
                                },
                                "FSW0FWMRIMFYK6": {
                                    "type": "PanelDef",
                                    "_is_object": True,
                                    "panelConfig": "none",
                                    "panelId": "string",
                                },
                                "UYPJ7CMYZWWCGF": {
                                    "type": "PanelDef",
                                    "_is_object": True,
                                    "panelConfig": "none",
                                    "panelId": "string",
                                },
                                "L3IBEEOE6UHRRS": {
                                    "type": "PanelDef",
                                    "_is_object": True,
                                    "panelConfig": "none",
                                    "panelId": "string",
                                },
                            },
                        },
                        "input_node": {
                            "type": "function",
                            "inputTypes": {},
                            "outputType": "unknown",
                        },
                        "autoColumns": "boolean",
                        "preFilterFunction": {
                            "type": "function",
                            "inputTypes": {},
                            "outputType": "unknown",
                        },
                        "columnNames": {
                            "type": "dict",
                            "key_type": "string",
                            "objectType": "string",
                        },
                        "columnSelectFunctions": {
                            "type": "dict",
                            "key_type": "string",
                            "objectType": {
                                "type": "function",
                                "inputTypes": {},
                                "outputType": "unknown",
                            },
                        },
                        "order": {"type": "list", "objectType": "string"},
                        "groupBy": {"type": "list", "objectType": "string"},
                        "sort": {"type": "list", "objectType": "string"},
                        "pageSize": "int",
                        "page": "int",
                    },
                    "constants": {
                        "type": "PlotConstants",
                        "_is_object": True,
                        "mark": "string",
                        "pointShape": "none",
                        "lineStyle": "none",
                        "label": {
                            "type": "const",
                            "valType": "string",
                            "val": "series",
                        },
                    },
                    "uiState": {
                        "type": "PlotUIState",
                        "_is_object": True,
                        "pointShape": "string",
                        "label": "string",
                    },
                    "dims": {
                        "type": "DimConfig",
                        "_is_object": True,
                        "x": "string",
                        "y": "string",
                        "color": "string",
                        "label": "string",
                        "tooltip": "string",
                        "pointSize": "string",
                        "pointShape": "string",
                        "y2": "string",
                    },
                },
            },
            "axisSettings": {
                "type": "AxisSettings",
                "_is_object": True,
                "color": {
                    "type": "AxisSetting",
                    "_is_object": True,
                    "noLabels": "boolean",
                    "noTitle": "boolean",
                    "noTicks": "boolean",
                },
                "x": {
                    "type": "AxisSetting",
                    "_is_object": True,
                    "noLabels": "boolean",
                    "noTitle": "boolean",
                    "noTicks": "boolean",
                },
                "y": {
                    "type": "AxisSetting",
                    "_is_object": True,
                    "noLabels": "boolean",
                    "noTitle": "boolean",
                    "noTicks": "boolean",
                },
            },
            "legendSettings": {
                "type": "LegendSettings",
                "_is_object": True,
                "x": {
                    "type": "LegendSetting",
                    "_is_object": True,
                    "noLegend": "boolean",
                },
                "y": {
                    "type": "LegendSetting",
                    "_is_object": True,
                    "noLegend": "boolean",
                },
                "color": {
                    "type": "LegendSetting",
                    "_is_object": True,
                    "noLegend": "boolean",
                },
            },
            "configOptionsExpanded": {
                "type": "ConfigOptionsExpanded",
                "_is_object": True,
                "x": "boolean",
                "y": "boolean",
                "label": "boolean",
                "tooltip": "boolean",
                "mark": "boolean",
            },
            "configVersion": "int",
        },
        "_val": {
            "series": [
                {
                    "table": {
                        "columns": {
                            "BPZ7OF3CU3BTPJ": {"panelConfig": None, "panelId": ""},
                            "3TAMZ9RE8CSQNQ": {"panelConfig": None, "panelId": ""},
                            "V4ZUZP68VEFUE4": {"panelConfig": None, "panelId": ""},
                            "DX2S5BL68G31XO": {"panelConfig": None, "panelId": ""},
                            "6YQY0NYGB338WC": {"panelConfig": None, "panelId": ""},
                            "FSW0FWMRIMFYK6": {"panelConfig": None, "panelId": ""},
                            "UYPJ7CMYZWWCGF": {"panelConfig": None, "panelId": ""},
                            "L3IBEEOE6UHRRS": {"panelConfig": None, "panelId": ""},
                        },
                        "input_node": {
                            "nodeType": "output",
                            "type": {
                                "type": "ArrowWeaveList",
                                "objectType": {
                                    "type": "typedDict",
                                    "propertyTypes": {
                                        "step": "int",
                                        "string_col": "string",
                                        "metric0": "float",
                                        "metric1": "float",
                                        "metric2": "float",
                                        "metric3": "float",
                                        "metric4": "float",
                                        "metric5": "float",
                                        "metric6": "float",
                                        "metric7": "float",
                                        "metric8": "float",
                                        "metric9": "float",
                                        "metric10": "float",
                                        "metric11": "float",
                                        "metric12": "float",
                                        "metric13": "float",
                                        "metric14": "float",
                                        "metric15": "float",
                                        "metric16": "float",
                                        "metric17": "float",
                                        "metric18": "float",
                                        "metric19": "float",
                                        "metric20": "float",
                                        "metric21": "float",
                                        "metric22": "float",
                                        "metric23": "float",
                                        "metric24": "float",
                                        "metric25": "float",
                                        "metric26": "float",
                                        "metric27": "float",
                                        "metric28": "float",
                                        "metric29": "float",
                                        "metric30": "float",
                                        "metric31": "float",
                                        "metric32": "float",
                                        "metric33": "float",
                                        "metric34": "float",
                                        "metric35": "float",
                                        "metric36": "float",
                                        "metric37": "float",
                                        "metric38": "float",
                                        "metric39": "float",
                                        "metric40": "float",
                                        "metric41": "float",
                                        "metric42": "float",
                                        "metric43": "float",
                                        "metric44": "float",
                                        "metric45": "float",
                                        "metric46": "float",
                                        "metric47": "float",
                                        "metric48": "float",
                                        "metric49": "float",
                                        "metric50": "float",
                                        "metric51": "float",
                                        "metric52": "float",
                                        "metric53": "float",
                                        "metric54": "float",
                                        "metric55": "float",
                                        "metric56": "float",
                                        "metric57": "float",
                                        "metric58": "float",
                                        "metric59": "float",
                                        "metric60": "float",
                                        "metric61": "float",
                                        "metric62": "float",
                                        "metric63": "float",
                                        "metric64": "float",
                                        "metric65": "float",
                                        "metric66": "float",
                                        "metric67": "float",
                                        "metric68": "float",
                                        "metric69": "float",
                                        "metric70": "float",
                                        "metric71": "float",
                                        "metric72": "float",
                                        "metric73": "float",
                                        "metric74": "float",
                                        "metric75": "float",
                                        "metric76": "float",
                                        "metric77": "float",
                                        "metric78": "float",
                                        "metric79": "float",
                                        "metric80": "float",
                                        "metric81": "float",
                                        "metric82": "float",
                                        "metric83": "float",
                                        "metric84": "float",
                                        "metric85": "float",
                                        "metric86": "float",
                                        "metric87": "float",
                                        "metric88": "float",
                                        "metric89": "float",
                                        "metric90": "float",
                                        "metric91": "float",
                                        "metric92": "float",
                                        "metric93": "float",
                                        "metric94": "float",
                                        "metric95": "float",
                                        "metric96": "float",
                                        "metric97": "float",
                                        "metric98": "float",
                                        "run_name": "string",
                                    },
                                },
                            },
                            "fromOp": {
                                "name": "RunSegment-experiment",
                                "inputs": {
                                    "self": {
                                        "nodeType": "output",
                                        "type": {
                                            "type": "RunSegment",
                                            "_is_object": True,
                                            "prior_run_ref": "string",
                                            "prior_run_branch_index": "int",
                                            "metrics": {
                                                "type": "ArrowWeaveList",
                                                "objectType": {
                                                    "type": "typedDict",
                                                    "propertyTypes": {
                                                        "step": "int",
                                                        "string_col": "string",
                                                        "metric0": "float",
                                                        "metric1": "float",
                                                        "metric2": "float",
                                                        "metric3": "float",
                                                        "metric4": "float",
                                                        "metric5": "float",
                                                        "metric6": "float",
                                                        "metric7": "float",
                                                        "metric8": "float",
                                                        "metric9": "float",
                                                        "metric10": "float",
                                                        "metric11": "float",
                                                        "metric12": "float",
                                                        "metric13": "float",
                                                        "metric14": "float",
                                                        "metric15": "float",
                                                        "metric16": "float",
                                                        "metric17": "float",
                                                        "metric18": "float",
                                                        "metric19": "float",
                                                        "metric20": "float",
                                                        "metric21": "float",
                                                        "metric22": "float",
                                                        "metric23": "float",
                                                        "metric24": "float",
                                                        "metric25": "float",
                                                        "metric26": "float",
                                                        "metric27": "float",
                                                        "metric28": "float",
                                                        "metric29": "float",
                                                        "metric30": "float",
                                                        "metric31": "float",
                                                        "metric32": "float",
                                                        "metric33": "float",
                                                        "metric34": "float",
                                                        "metric35": "float",
                                                        "metric36": "float",
                                                        "metric37": "float",
                                                        "metric38": "float",
                                                        "metric39": "float",
                                                        "metric40": "float",
                                                        "metric41": "float",
                                                        "metric42": "float",
                                                        "metric43": "float",
                                                        "metric44": "float",
                                                        "metric45": "float",
                                                        "metric46": "float",
                                                        "metric47": "float",
                                                        "metric48": "float",
                                                        "metric49": "float",
                                                        "metric50": "float",
                                                        "metric51": "float",
                                                        "metric52": "float",
                                                        "metric53": "float",
                                                        "metric54": "float",
                                                        "metric55": "float",
                                                        "metric56": "float",
                                                        "metric57": "float",
                                                        "metric58": "float",
                                                        "metric59": "float",
                                                        "metric60": "float",
                                                        "metric61": "float",
                                                        "metric62": "float",
                                                        "metric63": "float",
                                                        "metric64": "float",
                                                        "metric65": "float",
                                                        "metric66": "float",
                                                        "metric67": "float",
                                                        "metric68": "float",
                                                        "metric69": "float",
                                                        "metric70": "float",
                                                        "metric71": "float",
                                                        "metric72": "float",
                                                        "metric73": "float",
                                                        "metric74": "float",
                                                        "metric75": "float",
                                                        "metric76": "float",
                                                        "metric77": "float",
                                                        "metric78": "float",
                                                        "metric79": "float",
                                                        "metric80": "float",
                                                        "metric81": "float",
                                                        "metric82": "float",
                                                        "metric83": "float",
                                                        "metric84": "float",
                                                        "metric85": "float",
                                                        "metric86": "float",
                                                        "metric87": "float",
                                                        "metric88": "float",
                                                        "metric89": "float",
                                                        "metric90": "float",
                                                        "metric91": "float",
                                                        "metric92": "float",
                                                        "metric93": "float",
                                                        "metric94": "float",
                                                        "metric95": "float",
                                                        "metric96": "float",
                                                        "metric97": "float",
                                                        "metric98": "float",
                                                    },
                                                },
                                            },
                                            "run_name": "string",
                                        },
                                        "fromOp": {
                                            "name": "get",
                                            "inputs": {
                                                "uri": {
                                                    "nodeType": "const",
                                                    "type": "string",
                                                    "val": "local-artifact:///tmp/weave/pytest/weave/tests/test_plot.py::test_actual_config_value (setup)/RunSegment/164b91e6b2832f79254c6da17e094563",
                                                }
                                            },
                                        },
                                    }
                                },
                            },
                        },
                        "autoColumns": False,
                        "preFilterFunction": {"nodeType": "void", "type": "invalid"},
                        "columnNames": {
                            "BPZ7OF3CU3BTPJ": "",
                            "3TAMZ9RE8CSQNQ": "",
                            "V4ZUZP68VEFUE4": "",
                            "DX2S5BL68G31XO": "",
                            "6YQY0NYGB338WC": "",
                            "FSW0FWMRIMFYK6": "",
                            "UYPJ7CMYZWWCGF": "",
                            "L3IBEEOE6UHRRS": "",
                        },
                        "columnSelectFunctions": {
                            "BPZ7OF3CU3BTPJ": {
                                "nodeType": "output",
                                "type": {
                                    "type": "typedDict",
                                    "propertyTypes": {
                                        "start": "float",
                                        "stop": "float",
                                    },
                                },
                                "fromOp": {
                                    "name": "number-bin",
                                    "inputs": {
                                        "in_": {
                                            "nodeType": "output",
                                            "type": "int",
                                            "fromOp": {
                                                "name": "typedDict-pick",
                                                "inputs": {
                                                    "self": {
                                                        "nodeType": "var",
                                                        "type": {
                                                            "type": "typedDict",
                                                            "propertyTypes": {
                                                                "step": "int",
                                                                "string_col": "string",
                                                                "metric0": "float",
                                                                "metric1": "float",
                                                                "metric2": "float",
                                                                "metric3": "float",
                                                                "metric4": "float",
                                                                "metric5": "float",
                                                                "metric6": "float",
                                                                "metric7": "float",
                                                                "metric8": "float",
                                                                "metric9": "float",
                                                                "metric10": "float",
                                                                "metric11": "float",
                                                                "metric12": "float",
                                                                "metric13": "float",
                                                                "metric14": "float",
                                                                "metric15": "float",
                                                                "metric16": "float",
                                                                "metric17": "float",
                                                                "metric18": "float",
                                                                "metric19": "float",
                                                                "metric20": "float",
                                                                "metric21": "float",
                                                                "metric22": "float",
                                                                "metric23": "float",
                                                                "metric24": "float",
                                                                "metric25": "float",
                                                                "metric26": "float",
                                                                "metric27": "float",
                                                                "metric28": "float",
                                                                "metric29": "float",
                                                                "metric30": "float",
                                                                "metric31": "float",
                                                                "metric32": "float",
                                                                "metric33": "float",
                                                                "metric34": "float",
                                                                "metric35": "float",
                                                                "metric36": "float",
                                                                "metric37": "float",
                                                                "metric38": "float",
                                                                "metric39": "float",
                                                                "metric40": "float",
                                                                "metric41": "float",
                                                                "metric42": "float",
                                                                "metric43": "float",
                                                                "metric44": "float",
                                                                "metric45": "float",
                                                                "metric46": "float",
                                                                "metric47": "float",
                                                                "metric48": "float",
                                                                "metric49": "float",
                                                                "metric50": "float",
                                                                "metric51": "float",
                                                                "metric52": "float",
                                                                "metric53": "float",
                                                                "metric54": "float",
                                                                "metric55": "float",
                                                                "metric56": "float",
                                                                "metric57": "float",
                                                                "metric58": "float",
                                                                "metric59": "float",
                                                                "metric60": "float",
                                                                "metric61": "float",
                                                                "metric62": "float",
                                                                "metric63": "float",
                                                                "metric64": "float",
                                                                "metric65": "float",
                                                                "metric66": "float",
                                                                "metric67": "float",
                                                                "metric68": "float",
                                                                "metric69": "float",
                                                                "metric70": "float",
                                                                "metric71": "float",
                                                                "metric72": "float",
                                                                "metric73": "float",
                                                                "metric74": "float",
                                                                "metric75": "float",
                                                                "metric76": "float",
                                                                "metric77": "float",
                                                                "metric78": "float",
                                                                "metric79": "float",
                                                                "metric80": "float",
                                                                "metric81": "float",
                                                                "metric82": "float",
                                                                "metric83": "float",
                                                                "metric84": "float",
                                                                "metric85": "float",
                                                                "metric86": "float",
                                                                "metric87": "float",
                                                                "metric88": "float",
                                                                "metric89": "float",
                                                                "metric90": "float",
                                                                "metric91": "float",
                                                                "metric92": "float",
                                                                "metric93": "float",
                                                                "metric94": "float",
                                                                "metric95": "float",
                                                                "metric96": "float",
                                                                "metric97": "float",
                                                                "metric98": "float",
                                                                "run_name": "string",
                                                            },
                                                        },
                                                        "varName": "row",
                                                    },
                                                    "key": {
                                                        "nodeType": "const",
                                                        "type": "string",
                                                        "val": "step",
                                                    },
                                                },
                                            },
                                        },
                                        "bin_fn": {
                                            "nodeType": "output",
                                            "type": {
                                                "type": "function",
                                                "inputTypes": {"row": "number"},
                                                "outputType": {
                                                    "type": "typedDict",
                                                    "propertyTypes": {
                                                        "start": "float",
                                                        "stop": "float",
                                                    },
                                                },
                                            },
                                            "fromOp": {
                                                "name": "numbers-binsequal",
                                                "inputs": {
                                                    "arr": {
                                                        "nodeType": "output",
                                                        "type": {
                                                            "type": "list",
                                                            "objectType": "int",
                                                        },
                                                        "fromOp": {
                                                            "name": "get",
                                                            "inputs": {
                                                                "uri": {
                                                                    "nodeType": "const",
                                                                    "type": "string",
                                                                    "val": "local-artifact:///tmp/weave/pytest/weave/tests/test_plot.py::test_actual_config_value (setup)/list/dc9ffba8da33b6d87d72d4525afcd383",
                                                                }
                                                            },
                                                        },
                                                    },
                                                    "bins": {
                                                        "nodeType": "const",
                                                        "type": "int",
                                                        "val": 2,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                            "3TAMZ9RE8CSQNQ": {
                                "nodeType": "output",
                                "type": "number",
                                "fromOp": {
                                    "name": "numbers-avg",
                                    "inputs": {
                                        "numbers": {
                                            "nodeType": "output",
                                            "type": "float",
                                            "fromOp": {
                                                "name": "typedDict-pick",
                                                "inputs": {
                                                    "self": {
                                                        "nodeType": "var",
                                                        "type": {
                                                            "type": "typedDict",
                                                            "propertyTypes": {
                                                                "step": "int",
                                                                "string_col": "string",
                                                                "metric0": "float",
                                                                "metric1": "float",
                                                                "metric2": "float",
                                                                "metric3": "float",
                                                                "metric4": "float",
                                                                "metric5": "float",
                                                                "metric6": "float",
                                                                "metric7": "float",
                                                                "metric8": "float",
                                                                "metric9": "float",
                                                                "metric10": "float",
                                                                "metric11": "float",
                                                                "metric12": "float",
                                                                "metric13": "float",
                                                                "metric14": "float",
                                                                "metric15": "float",
                                                                "metric16": "float",
                                                                "metric17": "float",
                                                                "metric18": "float",
                                                                "metric19": "float",
                                                                "metric20": "float",
                                                                "metric21": "float",
                                                                "metric22": "float",
                                                                "metric23": "float",
                                                                "metric24": "float",
                                                                "metric25": "float",
                                                                "metric26": "float",
                                                                "metric27": "float",
                                                                "metric28": "float",
                                                                "metric29": "float",
                                                                "metric30": "float",
                                                                "metric31": "float",
                                                                "metric32": "float",
                                                                "metric33": "float",
                                                                "metric34": "float",
                                                                "metric35": "float",
                                                                "metric36": "float",
                                                                "metric37": "float",
                                                                "metric38": "float",
                                                                "metric39": "float",
                                                                "metric40": "float",
                                                                "metric41": "float",
                                                                "metric42": "float",
                                                                "metric43": "float",
                                                                "metric44": "float",
                                                                "metric45": "float",
                                                                "metric46": "float",
                                                                "metric47": "float",
                                                                "metric48": "float",
                                                                "metric49": "float",
                                                                "metric50": "float",
                                                                "metric51": "float",
                                                                "metric52": "float",
                                                                "metric53": "float",
                                                                "metric54": "float",
                                                                "metric55": "float",
                                                                "metric56": "float",
                                                                "metric57": "float",
                                                                "metric58": "float",
                                                                "metric59": "float",
                                                                "metric60": "float",
                                                                "metric61": "float",
                                                                "metric62": "float",
                                                                "metric63": "float",
                                                                "metric64": "float",
                                                                "metric65": "float",
                                                                "metric66": "float",
                                                                "metric67": "float",
                                                                "metric68": "float",
                                                                "metric69": "float",
                                                                "metric70": "float",
                                                                "metric71": "float",
                                                                "metric72": "float",
                                                                "metric73": "float",
                                                                "metric74": "float",
                                                                "metric75": "float",
                                                                "metric76": "float",
                                                                "metric77": "float",
                                                                "metric78": "float",
                                                                "metric79": "float",
                                                                "metric80": "float",
                                                                "metric81": "float",
                                                                "metric82": "float",
                                                                "metric83": "float",
                                                                "metric84": "float",
                                                                "metric85": "float",
                                                                "metric86": "float",
                                                                "metric87": "float",
                                                                "metric88": "float",
                                                                "metric89": "float",
                                                                "metric90": "float",
                                                                "metric91": "float",
                                                                "metric92": "float",
                                                                "metric93": "float",
                                                                "metric94": "float",
                                                                "metric95": "float",
                                                                "metric96": "float",
                                                                "metric97": "float",
                                                                "metric98": "float",
                                                                "run_name": "string",
                                                            },
                                                        },
                                                        "varName": "row",
                                                    },
                                                    "key": {
                                                        "nodeType": "const",
                                                        "type": "string",
                                                        "val": "metric0",
                                                    },
                                                },
                                            },
                                        }
                                    },
                                },
                            },
                            "V4ZUZP68VEFUE4": {"nodeType": "void", "type": "invalid"},
                            "DX2S5BL68G31XO": {"nodeType": "void", "type": "invalid"},
                            "6YQY0NYGB338WC": {"nodeType": "void", "type": "invalid"},
                            "FSW0FWMRIMFYK6": {"nodeType": "void", "type": "invalid"},
                            "UYPJ7CMYZWWCGF": {"nodeType": "void", "type": "invalid"},
                            "L3IBEEOE6UHRRS": {"nodeType": "void", "type": "invalid"},
                        },
                        "order": [
                            "BPZ7OF3CU3BTPJ",
                            "3TAMZ9RE8CSQNQ",
                            "V4ZUZP68VEFUE4",
                            "DX2S5BL68G31XO",
                            "6YQY0NYGB338WC",
                            "FSW0FWMRIMFYK6",
                            "UYPJ7CMYZWWCGF",
                            "L3IBEEOE6UHRRS",
                        ],
                        "groupBy": [],
                        "sort": [],
                        "pageSize": 10,
                        "page": 0,
                    },
                    "constants": {
                        "mark": "line",
                        "pointShape": None,
                        "lineStyle": None,
                        "label": None,
                    },
                    "uiState": {"pointShape": "expression", "label": "expression"},
                    "dims": {
                        "x": "BPZ7OF3CU3BTPJ",
                        "y": "3TAMZ9RE8CSQNQ",
                        "color": "V4ZUZP68VEFUE4",
                        "label": "DX2S5BL68G31XO",
                        "tooltip": "6YQY0NYGB338WC",
                        "pointSize": "FSW0FWMRIMFYK6",
                        "pointShape": "UYPJ7CMYZWWCGF",
                        "y2": "L3IBEEOE6UHRRS",
                    },
                },
                {
                    "table": {
                        "columns": {
                            "BPZ7OF3CU3BTPJ": {"panelConfig": None, "panelId": ""},
                            "3TAMZ9RE8CSQNQ": {"panelConfig": None, "panelId": ""},
                            "V4ZUZP68VEFUE4": {"panelConfig": None, "panelId": ""},
                            "DX2S5BL68G31XO": {"panelConfig": None, "panelId": ""},
                            "6YQY0NYGB338WC": {"panelConfig": None, "panelId": ""},
                            "FSW0FWMRIMFYK6": {"panelConfig": None, "panelId": ""},
                            "UYPJ7CMYZWWCGF": {"panelConfig": None, "panelId": ""},
                            "L3IBEEOE6UHRRS": {"panelConfig": None, "panelId": ""},
                        },
                        "input_node": {
                            "nodeType": "output",
                            "type": {
                                "type": "ArrowWeaveList",
                                "objectType": {
                                    "type": "typedDict",
                                    "propertyTypes": {
                                        "step": "int",
                                        "string_col": "string",
                                        "metric0": "float",
                                        "metric1": "float",
                                        "metric2": "float",
                                        "metric3": "float",
                                        "metric4": "float",
                                        "metric5": "float",
                                        "metric6": "float",
                                        "metric7": "float",
                                        "metric8": "float",
                                        "metric9": "float",
                                        "metric10": "float",
                                        "metric11": "float",
                                        "metric12": "float",
                                        "metric13": "float",
                                        "metric14": "float",
                                        "metric15": "float",
                                        "metric16": "float",
                                        "metric17": "float",
                                        "metric18": "float",
                                        "metric19": "float",
                                        "metric20": "float",
                                        "metric21": "float",
                                        "metric22": "float",
                                        "metric23": "float",
                                        "metric24": "float",
                                        "metric25": "float",
                                        "metric26": "float",
                                        "metric27": "float",
                                        "metric28": "float",
                                        "metric29": "float",
                                        "metric30": "float",
                                        "metric31": "float",
                                        "metric32": "float",
                                        "metric33": "float",
                                        "metric34": "float",
                                        "metric35": "float",
                                        "metric36": "float",
                                        "metric37": "float",
                                        "metric38": "float",
                                        "metric39": "float",
                                        "metric40": "float",
                                        "metric41": "float",
                                        "metric42": "float",
                                        "metric43": "float",
                                        "metric44": "float",
                                        "metric45": "float",
                                        "metric46": "float",
                                        "metric47": "float",
                                        "metric48": "float",
                                        "metric49": "float",
                                        "metric50": "float",
                                        "metric51": "float",
                                        "metric52": "float",
                                        "metric53": "float",
                                        "metric54": "float",
                                        "metric55": "float",
                                        "metric56": "float",
                                        "metric57": "float",
                                        "metric58": "float",
                                        "metric59": "float",
                                        "metric60": "float",
                                        "metric61": "float",
                                        "metric62": "float",
                                        "metric63": "float",
                                        "metric64": "float",
                                        "metric65": "float",
                                        "metric66": "float",
                                        "metric67": "float",
                                        "metric68": "float",
                                        "metric69": "float",
                                        "metric70": "float",
                                        "metric71": "float",
                                        "metric72": "float",
                                        "metric73": "float",
                                        "metric74": "float",
                                        "metric75": "float",
                                        "metric76": "float",
                                        "metric77": "float",
                                        "metric78": "float",
                                        "metric79": "float",
                                        "metric80": "float",
                                        "metric81": "float",
                                        "metric82": "float",
                                        "metric83": "float",
                                        "metric84": "float",
                                        "metric85": "float",
                                        "metric86": "float",
                                        "metric87": "float",
                                        "metric88": "float",
                                        "metric89": "float",
                                        "metric90": "float",
                                        "metric91": "float",
                                        "metric92": "float",
                                        "metric93": "float",
                                        "metric94": "float",
                                        "metric95": "float",
                                        "metric96": "float",
                                        "metric97": "float",
                                        "metric98": "float",
                                        "run_name": "string",
                                    },
                                },
                            },
                            "fromOp": {
                                "name": "RunSegment-experiment",
                                "inputs": {
                                    "self": {
                                        "nodeType": "output",
                                        "type": {
                                            "type": "RunSegment",
                                            "_is_object": True,
                                            "prior_run_ref": "string",
                                            "prior_run_branch_index": "int",
                                            "metrics": {
                                                "type": "ArrowWeaveList",
                                                "objectType": {
                                                    "type": "typedDict",
                                                    "propertyTypes": {
                                                        "step": "int",
                                                        "string_col": "string",
                                                        "metric0": "float",
                                                        "metric1": "float",
                                                        "metric2": "float",
                                                        "metric3": "float",
                                                        "metric4": "float",
                                                        "metric5": "float",
                                                        "metric6": "float",
                                                        "metric7": "float",
                                                        "metric8": "float",
                                                        "metric9": "float",
                                                        "metric10": "float",
                                                        "metric11": "float",
                                                        "metric12": "float",
                                                        "metric13": "float",
                                                        "metric14": "float",
                                                        "metric15": "float",
                                                        "metric16": "float",
                                                        "metric17": "float",
                                                        "metric18": "float",
                                                        "metric19": "float",
                                                        "metric20": "float",
                                                        "metric21": "float",
                                                        "metric22": "float",
                                                        "metric23": "float",
                                                        "metric24": "float",
                                                        "metric25": "float",
                                                        "metric26": "float",
                                                        "metric27": "float",
                                                        "metric28": "float",
                                                        "metric29": "float",
                                                        "metric30": "float",
                                                        "metric31": "float",
                                                        "metric32": "float",
                                                        "metric33": "float",
                                                        "metric34": "float",
                                                        "metric35": "float",
                                                        "metric36": "float",
                                                        "metric37": "float",
                                                        "metric38": "float",
                                                        "metric39": "float",
                                                        "metric40": "float",
                                                        "metric41": "float",
                                                        "metric42": "float",
                                                        "metric43": "float",
                                                        "metric44": "float",
                                                        "metric45": "float",
                                                        "metric46": "float",
                                                        "metric47": "float",
                                                        "metric48": "float",
                                                        "metric49": "float",
                                                        "metric50": "float",
                                                        "metric51": "float",
                                                        "metric52": "float",
                                                        "metric53": "float",
                                                        "metric54": "float",
                                                        "metric55": "float",
                                                        "metric56": "float",
                                                        "metric57": "float",
                                                        "metric58": "float",
                                                        "metric59": "float",
                                                        "metric60": "float",
                                                        "metric61": "float",
                                                        "metric62": "float",
                                                        "metric63": "float",
                                                        "metric64": "float",
                                                        "metric65": "float",
                                                        "metric66": "float",
                                                        "metric67": "float",
                                                        "metric68": "float",
                                                        "metric69": "float",
                                                        "metric70": "float",
                                                        "metric71": "float",
                                                        "metric72": "float",
                                                        "metric73": "float",
                                                        "metric74": "float",
                                                        "metric75": "float",
                                                        "metric76": "float",
                                                        "metric77": "float",
                                                        "metric78": "float",
                                                        "metric79": "float",
                                                        "metric80": "float",
                                                        "metric81": "float",
                                                        "metric82": "float",
                                                        "metric83": "float",
                                                        "metric84": "float",
                                                        "metric85": "float",
                                                        "metric86": "float",
                                                        "metric87": "float",
                                                        "metric88": "float",
                                                        "metric89": "float",
                                                        "metric90": "float",
                                                        "metric91": "float",
                                                        "metric92": "float",
                                                        "metric93": "float",
                                                        "metric94": "float",
                                                        "metric95": "float",
                                                        "metric96": "float",
                                                        "metric97": "float",
                                                        "metric98": "float",
                                                    },
                                                },
                                            },
                                            "run_name": "string",
                                        },
                                        "fromOp": {
                                            "name": "get",
                                            "inputs": {
                                                "uri": {
                                                    "nodeType": "const",
                                                    "type": "string",
                                                    "val": "local-artifact:///tmp/weave/pytest/weave/tests/test_plot.py::test_actual_config_value (setup)/RunSegment/164b91e6b2832f79254c6da17e094563",
                                                }
                                            },
                                        },
                                    }
                                },
                            },
                        },
                        "autoColumns": False,
                        "preFilterFunction": {"nodeType": "void", "type": "invalid"},
                        "columnNames": {
                            "BPZ7OF3CU3BTPJ": "",
                            "3TAMZ9RE8CSQNQ": "",
                            "V4ZUZP68VEFUE4": "",
                            "DX2S5BL68G31XO": "",
                            "6YQY0NYGB338WC": "",
                            "FSW0FWMRIMFYK6": "",
                            "UYPJ7CMYZWWCGF": "",
                            "L3IBEEOE6UHRRS": "",
                        },
                        "columnSelectFunctions": {
                            "BPZ7OF3CU3BTPJ": {
                                "nodeType": "output",
                                "type": {
                                    "type": "typedDict",
                                    "propertyTypes": {
                                        "start": "float",
                                        "stop": "float",
                                    },
                                },
                                "fromOp": {
                                    "name": "number-bin",
                                    "inputs": {
                                        "in_": {
                                            "nodeType": "output",
                                            "type": "int",
                                            "fromOp": {
                                                "name": "typedDict-pick",
                                                "inputs": {
                                                    "self": {
                                                        "nodeType": "var",
                                                        "type": {
                                                            "type": "typedDict",
                                                            "propertyTypes": {
                                                                "step": "int",
                                                                "string_col": "string",
                                                                "metric0": "float",
                                                                "metric1": "float",
                                                                "metric2": "float",
                                                                "metric3": "float",
                                                                "metric4": "float",
                                                                "metric5": "float",
                                                                "metric6": "float",
                                                                "metric7": "float",
                                                                "metric8": "float",
                                                                "metric9": "float",
                                                                "metric10": "float",
                                                                "metric11": "float",
                                                                "metric12": "float",
                                                                "metric13": "float",
                                                                "metric14": "float",
                                                                "metric15": "float",
                                                                "metric16": "float",
                                                                "metric17": "float",
                                                                "metric18": "float",
                                                                "metric19": "float",
                                                                "metric20": "float",
                                                                "metric21": "float",
                                                                "metric22": "float",
                                                                "metric23": "float",
                                                                "metric24": "float",
                                                                "metric25": "float",
                                                                "metric26": "float",
                                                                "metric27": "float",
                                                                "metric28": "float",
                                                                "metric29": "float",
                                                                "metric30": "float",
                                                                "metric31": "float",
                                                                "metric32": "float",
                                                                "metric33": "float",
                                                                "metric34": "float",
                                                                "metric35": "float",
                                                                "metric36": "float",
                                                                "metric37": "float",
                                                                "metric38": "float",
                                                                "metric39": "float",
                                                                "metric40": "float",
                                                                "metric41": "float",
                                                                "metric42": "float",
                                                                "metric43": "float",
                                                                "metric44": "float",
                                                                "metric45": "float",
                                                                "metric46": "float",
                                                                "metric47": "float",
                                                                "metric48": "float",
                                                                "metric49": "float",
                                                                "metric50": "float",
                                                                "metric51": "float",
                                                                "metric52": "float",
                                                                "metric53": "float",
                                                                "metric54": "float",
                                                                "metric55": "float",
                                                                "metric56": "float",
                                                                "metric57": "float",
                                                                "metric58": "float",
                                                                "metric59": "float",
                                                                "metric60": "float",
                                                                "metric61": "float",
                                                                "metric62": "float",
                                                                "metric63": "float",
                                                                "metric64": "float",
                                                                "metric65": "float",
                                                                "metric66": "float",
                                                                "metric67": "float",
                                                                "metric68": "float",
                                                                "metric69": "float",
                                                                "metric70": "float",
                                                                "metric71": "float",
                                                                "metric72": "float",
                                                                "metric73": "float",
                                                                "metric74": "float",
                                                                "metric75": "float",
                                                                "metric76": "float",
                                                                "metric77": "float",
                                                                "metric78": "float",
                                                                "metric79": "float",
                                                                "metric80": "float",
                                                                "metric81": "float",
                                                                "metric82": "float",
                                                                "metric83": "float",
                                                                "metric84": "float",
                                                                "metric85": "float",
                                                                "metric86": "float",
                                                                "metric87": "float",
                                                                "metric88": "float",
                                                                "metric89": "float",
                                                                "metric90": "float",
                                                                "metric91": "float",
                                                                "metric92": "float",
                                                                "metric93": "float",
                                                                "metric94": "float",
                                                                "metric95": "float",
                                                                "metric96": "float",
                                                                "metric97": "float",
                                                                "metric98": "float",
                                                                "run_name": "string",
                                                            },
                                                        },
                                                        "varName": "row",
                                                    },
                                                    "key": {
                                                        "nodeType": "const",
                                                        "type": "string",
                                                        "val": "step",
                                                    },
                                                },
                                            },
                                        },
                                        "bin_fn": {
                                            "nodeType": "output",
                                            "type": {
                                                "type": "function",
                                                "inputTypes": {"row": "number"},
                                                "outputType": {
                                                    "type": "typedDict",
                                                    "propertyTypes": {
                                                        "start": "float",
                                                        "stop": "float",
                                                    },
                                                },
                                            },
                                            "fromOp": {
                                                "name": "numbers-binsequal",
                                                "inputs": {
                                                    "arr": {
                                                        "nodeType": "output",
                                                        "type": {
                                                            "type": "list",
                                                            "objectType": "int",
                                                        },
                                                        "fromOp": {
                                                            "name": "get",
                                                            "inputs": {
                                                                "uri": {
                                                                    "nodeType": "const",
                                                                    "type": "string",
                                                                    "val": "local-artifact:///tmp/weave/pytest/weave/tests/test_plot.py::test_actual_config_value (setup)/list/dc9ffba8da33b6d87d72d4525afcd383",
                                                                }
                                                            },
                                                        },
                                                    },
                                                    "bins": {
                                                        "nodeType": "const",
                                                        "type": "int",
                                                        "val": 2,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                            "3TAMZ9RE8CSQNQ": {
                                "nodeType": "output",
                                "type": "number",
                                "fromOp": {
                                    "name": "numbers-min",
                                    "inputs": {
                                        "numbers": {
                                            "nodeType": "output",
                                            "type": "float",
                                            "fromOp": {
                                                "name": "typedDict-pick",
                                                "inputs": {
                                                    "self": {
                                                        "nodeType": "var",
                                                        "type": {
                                                            "type": "typedDict",
                                                            "propertyTypes": {
                                                                "step": "int",
                                                                "string_col": "string",
                                                                "metric0": "float",
                                                                "metric1": "float",
                                                                "metric2": "float",
                                                                "metric3": "float",
                                                                "metric4": "float",
                                                                "metric5": "float",
                                                                "metric6": "float",
                                                                "metric7": "float",
                                                                "metric8": "float",
                                                                "metric9": "float",
                                                                "metric10": "float",
                                                                "metric11": "float",
                                                                "metric12": "float",
                                                                "metric13": "float",
                                                                "metric14": "float",
                                                                "metric15": "float",
                                                                "metric16": "float",
                                                                "metric17": "float",
                                                                "metric18": "float",
                                                                "metric19": "float",
                                                                "metric20": "float",
                                                                "metric21": "float",
                                                                "metric22": "float",
                                                                "metric23": "float",
                                                                "metric24": "float",
                                                                "metric25": "float",
                                                                "metric26": "float",
                                                                "metric27": "float",
                                                                "metric28": "float",
                                                                "metric29": "float",
                                                                "metric30": "float",
                                                                "metric31": "float",
                                                                "metric32": "float",
                                                                "metric33": "float",
                                                                "metric34": "float",
                                                                "metric35": "float",
                                                                "metric36": "float",
                                                                "metric37": "float",
                                                                "metric38": "float",
                                                                "metric39": "float",
                                                                "metric40": "float",
                                                                "metric41": "float",
                                                                "metric42": "float",
                                                                "metric43": "float",
                                                                "metric44": "float",
                                                                "metric45": "float",
                                                                "metric46": "float",
                                                                "metric47": "float",
                                                                "metric48": "float",
                                                                "metric49": "float",
                                                                "metric50": "float",
                                                                "metric51": "float",
                                                                "metric52": "float",
                                                                "metric53": "float",
                                                                "metric54": "float",
                                                                "metric55": "float",
                                                                "metric56": "float",
                                                                "metric57": "float",
                                                                "metric58": "float",
                                                                "metric59": "float",
                                                                "metric60": "float",
                                                                "metric61": "float",
                                                                "metric62": "float",
                                                                "metric63": "float",
                                                                "metric64": "float",
                                                                "metric65": "float",
                                                                "metric66": "float",
                                                                "metric67": "float",
                                                                "metric68": "float",
                                                                "metric69": "float",
                                                                "metric70": "float",
                                                                "metric71": "float",
                                                                "metric72": "float",
                                                                "metric73": "float",
                                                                "metric74": "float",
                                                                "metric75": "float",
                                                                "metric76": "float",
                                                                "metric77": "float",
                                                                "metric78": "float",
                                                                "metric79": "float",
                                                                "metric80": "float",
                                                                "metric81": "float",
                                                                "metric82": "float",
                                                                "metric83": "float",
                                                                "metric84": "float",
                                                                "metric85": "float",
                                                                "metric86": "float",
                                                                "metric87": "float",
                                                                "metric88": "float",
                                                                "metric89": "float",
                                                                "metric90": "float",
                                                                "metric91": "float",
                                                                "metric92": "float",
                                                                "metric93": "float",
                                                                "metric94": "float",
                                                                "metric95": "float",
                                                                "metric96": "float",
                                                                "metric97": "float",
                                                                "metric98": "float",
                                                                "run_name": "string",
                                                            },
                                                        },
                                                        "varName": "row",
                                                    },
                                                    "key": {
                                                        "nodeType": "const",
                                                        "type": "string",
                                                        "val": "metric0",
                                                    },
                                                },
                                            },
                                        }
                                    },
                                },
                            },
                            "V4ZUZP68VEFUE4": {"nodeType": "void", "type": "invalid"},
                            "DX2S5BL68G31XO": {"nodeType": "void", "type": "invalid"},
                            "6YQY0NYGB338WC": {"nodeType": "void", "type": "invalid"},
                            "FSW0FWMRIMFYK6": {"nodeType": "void", "type": "invalid"},
                            "UYPJ7CMYZWWCGF": {"nodeType": "void", "type": "invalid"},
                            "L3IBEEOE6UHRRS": {
                                "nodeType": "output",
                                "type": "number",
                                "fromOp": {
                                    "name": "numbers-max",
                                    "inputs": {
                                        "numbers": {
                                            "nodeType": "output",
                                            "type": "float",
                                            "fromOp": {
                                                "name": "typedDict-pick",
                                                "inputs": {
                                                    "self": {
                                                        "nodeType": "var",
                                                        "type": {
                                                            "type": "typedDict",
                                                            "propertyTypes": {
                                                                "step": "int",
                                                                "string_col": "string",
                                                                "metric0": "float",
                                                                "metric1": "float",
                                                                "metric2": "float",
                                                                "metric3": "float",
                                                                "metric4": "float",
                                                                "metric5": "float",
                                                                "metric6": "float",
                                                                "metric7": "float",
                                                                "metric8": "float",
                                                                "metric9": "float",
                                                                "metric10": "float",
                                                                "metric11": "float",
                                                                "metric12": "float",
                                                                "metric13": "float",
                                                                "metric14": "float",
                                                                "metric15": "float",
                                                                "metric16": "float",
                                                                "metric17": "float",
                                                                "metric18": "float",
                                                                "metric19": "float",
                                                                "metric20": "float",
                                                                "metric21": "float",
                                                                "metric22": "float",
                                                                "metric23": "float",
                                                                "metric24": "float",
                                                                "metric25": "float",
                                                                "metric26": "float",
                                                                "metric27": "float",
                                                                "metric28": "float",
                                                                "metric29": "float",
                                                                "metric30": "float",
                                                                "metric31": "float",
                                                                "metric32": "float",
                                                                "metric33": "float",
                                                                "metric34": "float",
                                                                "metric35": "float",
                                                                "metric36": "float",
                                                                "metric37": "float",
                                                                "metric38": "float",
                                                                "metric39": "float",
                                                                "metric40": "float",
                                                                "metric41": "float",
                                                                "metric42": "float",
                                                                "metric43": "float",
                                                                "metric44": "float",
                                                                "metric45": "float",
                                                                "metric46": "float",
                                                                "metric47": "float",
                                                                "metric48": "float",
                                                                "metric49": "float",
                                                                "metric50": "float",
                                                                "metric51": "float",
                                                                "metric52": "float",
                                                                "metric53": "float",
                                                                "metric54": "float",
                                                                "metric55": "float",
                                                                "metric56": "float",
                                                                "metric57": "float",
                                                                "metric58": "float",
                                                                "metric59": "float",
                                                                "metric60": "float",
                                                                "metric61": "float",
                                                                "metric62": "float",
                                                                "metric63": "float",
                                                                "metric64": "float",
                                                                "metric65": "float",
                                                                "metric66": "float",
                                                                "metric67": "float",
                                                                "metric68": "float",
                                                                "metric69": "float",
                                                                "metric70": "float",
                                                                "metric71": "float",
                                                                "metric72": "float",
                                                                "metric73": "float",
                                                                "metric74": "float",
                                                                "metric75": "float",
                                                                "metric76": "float",
                                                                "metric77": "float",
                                                                "metric78": "float",
                                                                "metric79": "float",
                                                                "metric80": "float",
                                                                "metric81": "float",
                                                                "metric82": "float",
                                                                "metric83": "float",
                                                                "metric84": "float",
                                                                "metric85": "float",
                                                                "metric86": "float",
                                                                "metric87": "float",
                                                                "metric88": "float",
                                                                "metric89": "float",
                                                                "metric90": "float",
                                                                "metric91": "float",
                                                                "metric92": "float",
                                                                "metric93": "float",
                                                                "metric94": "float",
                                                                "metric95": "float",
                                                                "metric96": "float",
                                                                "metric97": "float",
                                                                "metric98": "float",
                                                                "run_name": "string",
                                                            },
                                                        },
                                                        "varName": "row",
                                                    },
                                                    "key": {
                                                        "nodeType": "const",
                                                        "type": "string",
                                                        "val": "metric0",
                                                    },
                                                },
                                            },
                                        }
                                    },
                                },
                            },
                        },
                        "order": [
                            "BPZ7OF3CU3BTPJ",
                            "3TAMZ9RE8CSQNQ",
                            "V4ZUZP68VEFUE4",
                            "DX2S5BL68G31XO",
                            "6YQY0NYGB338WC",
                            "FSW0FWMRIMFYK6",
                            "UYPJ7CMYZWWCGF",
                            "L3IBEEOE6UHRRS",
                        ],
                        "groupBy": [],
                        "sort": [],
                        "pageSize": 10,
                        "page": 0,
                    },
                    "constants": {
                        "mark": "area",
                        "pointShape": None,
                        "lineStyle": None,
                        "label": None,
                    },
                    "uiState": {"pointShape": "expression", "label": "expression"},
                    "dims": {
                        "x": "BPZ7OF3CU3BTPJ",
                        "y": "3TAMZ9RE8CSQNQ",
                        "color": "V4ZUZP68VEFUE4",
                        "label": "DX2S5BL68G31XO",
                        "tooltip": "6YQY0NYGB338WC",
                        "pointSize": "FSW0FWMRIMFYK6",
                        "pointShape": "UYPJ7CMYZWWCGF",
                        "y2": "L3IBEEOE6UHRRS",
                    },
                },
            ],
            "axisSettings": {
                "color": {"noLabels": False, "noTitle": False, "noTicks": False},
                "x": {"noLabels": False, "noTitle": False, "noTicks": False},
                "y": {"noLabels": False, "noTitle": False, "noTicks": False},
            },
            "legendSettings": {
                "x": {"noLegend": False},
                "y": {"noLegend": False},
                "color": {"noLegend": False},
            },
            "configOptionsExpanded": {
                "x": False,
                "y": False,
                "label": False,
                "tooltip": False,
                "mark": False,
            },
            "configVersion": 7,
        },
    }


def test_plotting_wandb_data(user_by_api_key_in_env):
    run = wandb.init()
    n_rows = 15
    local_history = []
    for i in range(n_rows):
        row = {"user_id": str(i // 3)}
        run.log(row)
        local_history.append(
            {
                "_step": i,
                #   **row # This does not work correctly with the current implementation of history - we only fetch keys when we know what to fetch
            }
        )
    run.finish()
    history_node = weave.ops.project(run.entity, run.project).run(run.id).history()
    assert weave.use(history_node) == local_history

    ts_plot = TimeSeries(input_node=history_node)
    ts_plot.config = weave.use(ts_plot.initialize())

    rendered = ts_plot.render()

    rendered_results = weave.use(rendered)

    assert rendered_results == "tim"
