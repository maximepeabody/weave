CREATE TABLE llm_token_prices (
    /*
    `pricing_level`: The level at which the token pricing applies. It can be 'default' for global pricing,
    'project' for project-specific pricing, or 'org' for organization-specific pricing.
    */
    pricing_level String,

    /*
    `pricing_level_id`: The pricing level identifier for the token pricing. It can be 'default' or any other string(e.g. org id or project id). This allow with type to uniquely identify where the pricing applies.
    */
    pricing_level_id String,

    /*
    `provider`: The initial provider of the LLM, some LLMs are provided other than the default provider.
    */
    provider_id String,

    /*
    `llm_id`: The identifier for the language model. This links the pricing to a specific LLM.
    */
    llm_id String,

    /*
    `effective_date`: The date when the token pricing becomes effective.
    */
    effective_date DateTime64(3) DEFAULT now64(3),

    /*
    `input_token_cost`: The cost of an input token in the specified LLM.
    */
    input_token_cost Float,

    /*
    `output_token_cost`: The cost of an output token in the specified LLM.
    */
    output_token_cost Float

) ENGINE = ReplacingMergeTree()
ORDER BY (pricing_level, pricing_level_id, provider_id, llm_id, effective_date);
