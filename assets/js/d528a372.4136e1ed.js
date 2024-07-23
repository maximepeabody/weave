"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[61],{2084:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>s,contentTitle:()=>r,default:()=>h,frontMatter:()=>l,metadata:()=>o,toc:()=>d});var t=a(5893),i=a(1151);const l={sidebar_position:0,hide_table_of_contents:!0},r="LlamaIndex",o={id:"guides/integrations/llamaindex",title:"LlamaIndex",description:"Weave is designed to simplify the tracking and logging of all calls made through the LlamaIndex Python library.",source:"@site/docs/guides/integrations/llamaindex.md",sourceDirName:"guides/integrations",slug:"/guides/integrations/llamaindex",permalink:"/weave/guides/integrations/llamaindex",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/guides/integrations/llamaindex.md",tags:[],version:"current",sidebarPosition:0,frontMatter:{sidebar_position:0,hide_table_of_contents:!0},sidebar:"documentationSidebar",previous:{title:"LangChain",permalink:"/weave/guides/integrations/langchain"},next:{title:"DSPy",permalink:"/weave/guides/integrations/dspy"}},s={},d=[{value:"Getting Started",id:"getting-started",level:2},{value:"Tracing",id:"tracing",level:2},{value:"One-click observability \ud83d\udd2d",id:"one-click-observability-",level:2},{value:"Create a <code>Model</code> for easier experimentation",id:"create-a-model-for-easier-experimentation",level:2},{value:"Doing Evaluation with <code>weave.Evaluation</code>",id:"doing-evaluation-with-weaveevaluation",level:2}];function c(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"llamaindex",children:"LlamaIndex"}),"\n",(0,t.jsxs)(n.p,{children:["Weave is designed to simplify the tracking and logging of all calls made through the ",(0,t.jsx)(n.a,{href:"https://github.com/run-llama/llama_index",children:"LlamaIndex Python library"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["When working with LLMs, debugging is inevitable. Whether a model call fails, an output is misformatted, or nested model calls create confusion, pinpointing issues can be challenging. ",(0,t.jsx)(n.a,{href:"https://docs.llamaindex.ai/en/stable/",children:"LlamaIndex"})," applications often consist of multiple steps and LLM call invocations, making it crucial to understand the inner workings of your chains and agents."]}),"\n",(0,t.jsx)(n.p,{children:"Weave simplifies this process by automatically capturing traces for your LlamaIndex applications. This enables you to monitor and analyze your application's performance, making it easier to debug and optimize your LLM workflows. Weave also helps with your evaluation workflows."}),"\n",(0,t.jsx)(n.h2,{id:"getting-started",children:"Getting Started"}),"\n",(0,t.jsxs)(n.p,{children:["To get started, simply call ",(0,t.jsx)(n.code,{children:"weave.init()"})," at the beginning of your script. The argument in ",(0,t.jsx)(n.code,{children:"weave.init()"})," is a project name that will help you organize your traces."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:'import weave\nfrom llama_index.core.chat_engine import SimpleChatEngine\n\n# Initialize Weave with your project name\n# highlight-next-line\nweave.init("llamaindex_demo")\n\nchat_engine = SimpleChatEngine.from_defaults()\nresponse = chat_engine.chat(\n    "Say something profound and romantic about fourth of July"\n)\nprint(response)\n'})}),"\n",(0,t.jsx)(n.p,{children:"In the example above, we are creating a simple LlamaIndex chat engine which under the hood is making an OpenAI call. Check out the trace below:"}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://wandb.ai/wandbot/test-llamaindex-weave/weave/calls/b6b5d898-2df8-4e14-b553-66ce84661e74",children:(0,t.jsx)(n.img,{alt:"simple_llamaindex.png",src:a(4737).Z+"",width:"3456",height:"1982"})})}),"\n",(0,t.jsx)(n.h2,{id:"tracing",children:"Tracing"}),"\n",(0,t.jsx)(n.p,{children:"LlamaIndex is known for it's ease of connecting data with LLM. A simple RAG application requires an embedding step, retrieval step and a response synthesis step. With the increasing complexity, it becomes important to store traces of individual steps in a central database during both development and production."}),"\n",(0,t.jsx)(n.p,{children:"These traces are essential for debugging and improving your application. Weave automatically tracks all calls made through the LlamaIndex library, including prompt templates, LLM calls, tools, and agent steps. You can view the traces in the Weave web interface."}),"\n",(0,t.jsxs)(n.p,{children:["Below is an example of a simple RAG pipeline from LlamaIndex's ",(0,t.jsx)(n.a,{href:"https://docs.llamaindex.ai/en/stable/getting_started/starter_example/",children:"Starter Tutorial (OpenAI)"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:'import weave\nfrom llama_index.core import VectorStoreIndex, SimpleDirectoryReader\n\n# Initialize Weave with your project name\n# highlight-next-line\nweave.init("llamaindex_demo")\n\n# Assuming you have a `.txt` file in the `data` directory\ndocuments = SimpleDirectoryReader("data").load_data()\nindex = VectorStoreIndex.from_documents(documents)\n\nquery_engine = index.as_query_engine()\nresponse = query_engine.query("What did the author do growing up?")\nprint(response)\n'})}),"\n",(0,t.jsx)(n.p,{children:'The trace timeline not only captures the "events" but it also capture the execution time, cost and token counts where applicable. Drill down the trace to see the inputs and outputs of each step.'}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://wandb.ai/wandbot/test-llamaindex-weave/weave/calls?filter=%7B%22traceRootsOnly%22%3Atrue%7D&peekPath=%2Fwandbot%2Ftest-llamaindex-weave%2Fcalls%2F6ac53407-1bb7-4c38-b5a3-c302bd877a11%3Ftracetree%3D1",children:(0,t.jsx)(n.img,{alt:"llamaindex_rag.png",src:a(9930).Z+"",width:"3456",height:"1982"})})}),"\n",(0,t.jsx)(n.h2,{id:"one-click-observability-",children:"One-click observability \ud83d\udd2d"}),"\n",(0,t.jsxs)(n.p,{children:["LlamaIndex provides ",(0,t.jsx)(n.a,{href:"https://docs.llamaindex.ai/en/stable/module_guides/observability/",children:"one-click observability \ud83d\udd2d"})," to allow you to build principled LLM applications in a production setting."]}),"\n",(0,t.jsxs)(n.p,{children:["Our integration leverages this capability of LlamaIndex and automatically sets ",(0,t.jsx)(n.a,{href:"https://github.com/wandb/weave/blob/master/weave/integrations/llamaindex/llamaindex.py",children:(0,t.jsx)(n.code,{children:"WeaveCallbackHandler()"})})," to ",(0,t.jsx)(n.code,{children:"llama_index.core.global_handler"}),". Thus as a user of LlamaIndex and Weave all you need to do is initialize a Weave run - ",(0,t.jsx)(n.code,{children:"weave.init(<name-of-project>)"})]}),"\n",(0,t.jsxs)(n.h2,{id:"create-a-model-for-easier-experimentation",children:["Create a ",(0,t.jsx)(n.code,{children:"Model"})," for easier experimentation"]}),"\n",(0,t.jsxs)(n.p,{children:["Organizing and evaluating LLMs in applications for various use cases is challenging with multiple components, such as prompts, model configurations, and inference parameters. Using the ",(0,t.jsx)(n.a,{href:"/guides/core-types/models",children:(0,t.jsx)(n.code,{children:"weave.Model"})}),", you can capture and organize experimental details like system prompts or the models you use, making it easier to compare different iterations."]}),"\n",(0,t.jsxs)(n.p,{children:["The following example demonstrates building a LlamaIndex query engine in a ",(0,t.jsx)(n.code,{children:"WeaveModel"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:'import weave\n\nfrom llama_index.core import VectorStoreIndex, SimpleDirectoryReader\nfrom llama_index.core.node_parser import SentenceSplitter\nfrom llama_index.llms.openai import OpenAI\nfrom llama_index.core import PromptTemplate\n\n\nPROMPT_TEMPLATE = """\nYou are given with relevant information about Paul Graham. Answer the user query only based on the information provided. Don\'t make up stuff.\n\nUser Query: {query_str}\nContext: {context_str}\nAnswer: \n"""\n\n# highlight-next-line\nclass SimpleRAGPipeline(weave.Model):\n    chat_llm: str = "gpt-4"\n    temperature: float = 0.1\n    similarity_top_k: int = 2\n    chunk_size: int = 256\n    chunk_overlap: int = 20\n    prompt_template: str = PROMPT_TEMPLATE\n\n    def get_llm(self):\n        return OpenAI(temperature=self.temperature, model=self.chat_llm)\n\n    def get_template(self):\n        return PromptTemplate(self.prompt_template)\n\n    def load_documents_and_chunk(self, data):\n        documents = SimpleDirectoryReader(data).load_data()\n        splitter = SentenceSplitter(\n            chunk_size=self.chunk_size,\n            chunk_overlap=self.chunk_overlap,\n        )\n        nodes = splitter.get_nodes_from_documents(documents)\n        return nodes\n\n    def get_query_engine(self, data):\n        nodes = self.load_documents_and_chunk(data)\n        index = VectorStoreIndex(nodes)\n\n        llm = self.get_llm()\n        prompt_template = self.get_template()\n\n        return index.as_query_engine(\n            similarity_top_k=self.similarity_top_k,\n            llm=llm,\n            text_qa_template=prompt_template,\n        )\n# highlight-next-line\n    @weave.op()\n    def predict(self, query: str):\n        llm = self.get_llm()\n        query_engine = self.get_query_engine(\n            "data/paul_graham",\n        )\n        response = query_engine.query(query)\n        return {"response": response.response}\n\n# highlight-next-line\nweave.init("test-llamaindex-weave")\n\nrag_pipeline = SimpleRAGPipeline()\nresponse = rag_pipeline.predict("What did the author do growing up?")\nprint(response)\n'})}),"\n",(0,t.jsxs)(n.p,{children:["This ",(0,t.jsx)(n.code,{children:"SimpleRAGPipeline"})," class subclassed from ",(0,t.jsx)(n.code,{children:"weave.Model"})," organizes the important parameters for this RAG pipeline. Decorating the ",(0,t.jsx)(n.code,{children:"query"})," method with ",(0,t.jsx)(n.code,{children:"weave.op()"})," allows for tracing."]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://wandb.ai/wandbot/test-llamaindex-weave/weave/calls?filter=%7B%22traceRootsOnly%22%3Atrue%7D&peekPath=%2Fwandbot%2Ftest-llamaindex-weave%2Fcalls%2Fa82afbf4-29a5-43cd-8c51-603350abeafd%3Ftracetree%3D1",children:(0,t.jsx)(n.img,{alt:"llamaindex_model.png",src:a(889).Z+"",width:"3456",height:"1982"})})}),"\n",(0,t.jsxs)(n.h2,{id:"doing-evaluation-with-weaveevaluation",children:["Doing Evaluation with ",(0,t.jsx)(n.code,{children:"weave.Evaluation"})]}),"\n",(0,t.jsxs)(n.p,{children:["Evaluations help you measure the performance of your applications. By using the ",(0,t.jsx)(n.a,{href:"/guides/core-types/evaluations",children:(0,t.jsx)(n.code,{children:"weave.Evaluation"})})," class, you can capture how well your model performs on specific tasks or datasets, making it easier to compare different models and iterations of your application. The following example demonstrates how to evaluate the model we created:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:'import asyncio\nfrom llama_index.core.evaluation import CorrectnessEvaluator\n\neval_examples = [\n    {\n        "id": "0",\n        "query": "What programming language did Paul Graham learn to teach himself AI when he was in college?",\n        "ground_truth": "Paul Graham learned Lisp to teach himself AI when he was in college.",\n    },\n    {\n        "id": "1",\n        "query": "What was the name of the startup Paul Graham co-founded that was eventually acquired by Yahoo?",\n        "ground_truth": "The startup Paul Graham co-founded that was eventually acquired by Yahoo was called Viaweb.",\n    },\n    {\n        "id": "2",\n        "query": "What is the capital city of France?",\n        "ground_truth": "I cannot answer this question because no information was provided in the text.",\n    },\n]\n\nllm_judge = OpenAI(model="gpt-4", temperature=0.0)\nevaluator = CorrectnessEvaluator(llm=llm_judge)\n\n# highlight-next-line\n@weave.op()\ndef correctness_evaluator(query: str, ground_truth: str, model_output: dict):\n    result = evaluator.evaluate(\n        query=query, reference=ground_truth, response=model_output["response"]\n    )\n    return {"correctness": float(result.score)}\n\n# highlight-next-line\nevaluation = weave.Evaluation(dataset=eval_examples, scorers=[correctness_evaluator])\n\nrag_pipeline = SimpleRAGPipeline()\n\n# highlight-next-line\nasyncio.run(evaluation.evaluate(rag_pipeline))\n'})}),"\n",(0,t.jsxs)(n.p,{children:["This evaluation builds on the example in the earlier section. Evaluating using ",(0,t.jsx)(n.code,{children:"weave.Evaluation"})," requires an evaluation dataset, a scorer function and a ",(0,t.jsx)(n.code,{children:"weave.Model"}),". Here are a few nuances about the three key components:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Make sure that the keys of the evaluation sample dicts matches the arguments of the scorer function and of the ",(0,t.jsx)(n.code,{children:"weave.Model"}),"'s ",(0,t.jsx)(n.code,{children:"predict"})," method."]}),"\n",(0,t.jsxs)(n.li,{children:["The ",(0,t.jsx)(n.code,{children:"weave.Model"})," should have a method with the name ",(0,t.jsx)(n.code,{children:"predict"})," or ",(0,t.jsx)(n.code,{children:"infer"})," or ",(0,t.jsx)(n.code,{children:"forward"}),". Decorate this method with ",(0,t.jsx)(n.code,{children:"weave.op()"})," for tracing."]}),"\n",(0,t.jsxs)(n.li,{children:["The scorer function should be decorated with ",(0,t.jsx)(n.code,{children:"weave.op()"})," and should have ",(0,t.jsx)(n.code,{children:"model_output"})," as named argument."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:(0,t.jsx)(n.a,{href:"https://wandb.ai/wandbot/llamaindex-weave/weave/calls?filter=%7B%22opVersionRefs%22%3A%5B%22weave%3A%2F%2F%2Fwandbot%2Fllamaindex-weave%2Fop%2FEvaluation.predict_and_score%3ANmwfShfFmgAhDGLXrF6Xn02T9MIAsCXBUcifCjyKpOM%22%5D%2C%22parentId%22%3A%2233491e66-b580-47fa-9d43-0cd6f1dc572a%22%7D&peekPath=%2Fwandbot%2Fllamaindex-weave%2Fcalls%2F33491e66-b580-47fa-9d43-0cd6f1dc572a%3Ftracetree%3D1",children:(0,t.jsx)(n.img,{alt:"llamaindex_evaluation.png",src:a(4988).Z+"",width:"3456",height:"1984"})})}),"\n",(0,t.jsx)(n.p,{children:"By integrating Weave with LlamaIndex, you can ensure comprehensive logging and monitoring of your LLM applications, facilitating easier debugging and performance optimization using evaluation."})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},4988:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/llamaindex_evaluation-3bcf176d3eeb580b82f8ddf11610a9cf.png"},889:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/llamaindex_model-9da443cfc0c9d8c7402e3bbed371c4ae.png"},9930:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/llamaindex_rag-c10bf7102d9876130f29147e83c8fce2.png"},4737:(e,n,a)=>{a.d(n,{Z:()=>t});const t=a.p+"assets/images/simple_llamaindex-140f0d31ca5e6debb757d7bae938fd04.png"},1151:(e,n,a)=>{a.d(n,{Z:()=>o,a:()=>r});var t=a(7294);const i={},l=t.createContext(i);function r(e){const n=t.useContext(l);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),t.createElement(l.Provider,{value:n},e.children)}}}]);