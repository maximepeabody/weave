import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  documentationSidebar: [
    // {
    //   type: "category",
    //   label: "Getting Started",
    //   items: [{ type: "autogenerated", dirName: "get-started" }],
    // },
    {
      type: "category",
      label: "Getting Started",
      items: ["introduction", "tutorial-tracing_1", "tutorial-tracing_2", "tutorial-eval", "tutorial-rag"],
    },
    {
      type: "category",
      label: "Using Weave",
      items: [
        {
          type: "category",
          label: "Core Types",
          link: { type: "doc", id: "guides/core-types/index" },
          items: [
            "guides/core-types/models",
            "guides/core-types/datasets",
            "guides/core-types/evaluations",
          ],
        },
        {
          type: "category",
          label: "Tracking",
          link: { type: "doc", id: "guides/tracking/index" },
          items: [
            "guides/tracking/objects",
            "guides/tracking/ops",
            "guides/tracking/tracing",
            "guides/tracking/feedback",
          ],
        },
        {
          type: "category",
          label: "Integrations",
          link: { type: "doc", id: "guides/integrations/" },
          items: [
            "guides/integrations/openai",
            "guides/integrations/anthropic",
            "guides/integrations/cohere",
            "guides/integrations/mistral",
            "guides/integrations/langchain",
            "guides/integrations/llamaindex",
            "guides/integrations/dspy",
            "guides/integrations/google-gemini",
            "guides/integrations/together_ai",
            "guides/integrations/groq",
            "guides/integrations/openrouter",
            "guides/integrations/local_models",
            "guides/integrations/litellm",
          ],
        },
        {
          type: "category",
          label: "Tools",
          link: { type: "doc", id: "guides/tools/index" },
          items: ["guides/tools/serve", "guides/tools/deploy"],
        },
        {
          type: "doc",
          id: "guides/platform/index",
        },
      ],
    },
    {
      type: "link",
      label: "API Reference",
      href: "/api-reference/python/weave",
    },
  ],
  // { type: "autogenerated", dirName: "get-started" }],
  apiReferenceSidebar: [{ type: "autogenerated", dirName: "api-reference" }],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
