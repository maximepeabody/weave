import importlib

import weave
from weave.trace.patcher import SymbolPatcher, MultiPatcher


def dspy_get_patched_lm_functions(
    base_symbol: str, lm_class_name: str
) -> list[SymbolPatcher]:
    patchable_functional_attributes = [
        "basic_request",
        "request",
        "__call__",
    ]
    return [
        SymbolPatcher(
            get_base_symbol=lambda: importlib.import_module(base_symbol),
            attribute_name=f"{lm_class_name}.{functional_attribute}",
            make_new_value=weave.op(),
        )
        for functional_attribute in patchable_functional_attributes
    ]


patched_functions = [
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy"),
        attribute_name="Predict.__call__",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy"),
        attribute_name="Predict.forward",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy"),
        attribute_name="TypedPredictor.__call__",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy"),
        attribute_name="TypedPredictor.forward",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy"),
        attribute_name="Module.__call__",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy"),
        attribute_name="TypedChainOfThought.__call__",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy"),
        attribute_name="Retrieve.__call__",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy"),
        attribute_name="Retrieve.forward",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy.evaluate.evaluate"),
        attribute_name="Evaluate.__call__",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy.teleprompt"),
        attribute_name="BootstrapFewShot.compile",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy.teleprompt"),
        attribute_name="COPRO.compile",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy.teleprompt"),
        attribute_name="Ensemble.compile",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy.teleprompt"),
        attribute_name="BootstrapFinetune.compile",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy.teleprompt"),
        attribute_name="KNNFewShot.compile",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy.teleprompt"),
        attribute_name="MIPRO.compile",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy.teleprompt"),
        attribute_name="BootstrapFewShotWithRandomSearch.compile",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy.teleprompt"),
        attribute_name="SignatureOptimizer.compile",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy.teleprompt"),
        attribute_name="BayesianSignatureOptimizer.compile",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module(
            "dspy.teleprompt.signature_opt_typed"
        ),
        attribute_name="optimize_signature",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy.teleprompt"),
        attribute_name="BootstrapFewShotWithOptuna.compile",
        make_new_value=weave.op(),
    ),
    SymbolPatcher(
        get_base_symbol=lambda: importlib.import_module("dspy.teleprompt"),
        attribute_name="LabeledFewShot.compile",
        make_new_value=weave.op(),
    ),
]

# Patch LM classes
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="AzureOpenAI"
)
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="OpenAI"
)
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="Databricks"
)
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="Cohere"
)
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="ColBERTv2"
)
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="Pyserini"
)
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="Clarifai"
)
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="Google"
)
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="HFClientTGI"
)
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="HFClientVLLM"
)
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="Anyscale"
)
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="Together"
)
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="OllamaLocal"
)
patched_functions += dspy_get_patched_lm_functions(
    base_symbol="dspy", lm_class_name="Bedrock"
)

dspy_patcher = MultiPatcher(patched_functions)
