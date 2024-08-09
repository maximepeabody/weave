"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3761],{56160:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>r,contentTitle:()=>l,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>d});var c=s(85893),t=s(11151);const i={sidebar_label:"weave"},l="weave",a={id:"reference/python-sdk/weave/index",title:"weave",description:"The top-level functions and classes for working with Weave.",source:"@site/docs/reference/python-sdk/weave/index.md",sourceDirName:"reference/python-sdk/weave",slug:"/reference/python-sdk/weave/",permalink:"/weave/reference/python-sdk/weave/",draft:!1,unlisted:!1,editUrl:"https://github.com/wandb/weave/blob/master/docs/docs/reference/python-sdk/weave/index.md",tags:[],version:"current",frontMatter:{sidebar_label:"weave"},sidebar:"pythonSdkSidebar",next:{title:"util",permalink:"/weave/reference/python-sdk/weave/trace/weave.trace.util"}},r={},d=[{value:"Classes",id:"classes",level:2},{value:"Functions",id:"functions",level:2},{value:"<kbd>function</kbd> <code>init</code>",id:"function-init",level:3},{value:"<kbd>function</kbd> <code>publish</code>",id:"function-publish",level:3},{value:"<kbd>function</kbd> <code>ref</code>",id:"function-ref",level:3},{value:"<kbd>function</kbd> <code>get_current_call</code>",id:"function-get_current_call",level:3},{value:"<kbd>function</kbd> <code>finish</code>",id:"function-finish",level:3},{value:"<kbd>function</kbd> <code>op</code>",id:"function-op",level:3},{value:"<kbd>class</kbd> <code>Object</code>",id:"class-object",level:2},{value:"<kbd>classmethod</kbd> <code>handle_relocatable_object</code>",id:"classmethod-handle_relocatable_object",level:3},{value:"<kbd>method</kbd> <code>model_post_init</code>",id:"method-model_post_init",level:3},{value:"<kbd>class</kbd> <code>Dataset</code>",id:"class-dataset",level:2},{value:"<kbd>classmethod</kbd> <code>convert_to_table</code>",id:"classmethod-convert_to_table",level:3},{value:"<kbd>class</kbd> <code>Model</code>",id:"class-model",level:2},{value:"<kbd>method</kbd> <code>get_infer_method</code>",id:"method-get_infer_method",level:3},{value:"<kbd>class</kbd> <code>Evaluation</code>",id:"class-evaluation",level:2},{value:"<kbd>method</kbd> <code>evaluate</code>",id:"method-evaluate",level:3},{value:"<kbd>method</kbd> <code>model_post_init</code>",id:"method-model_post_init-1",level:3},{value:"<kbd>method</kbd> <code>predict_and_score</code>",id:"method-predict_and_score",level:3},{value:"<kbd>method</kbd> <code>summarize</code>",id:"method-summarize",level:3},{value:"<kbd>class</kbd> <code>Scorer</code>",id:"class-scorer",level:2},{value:"<kbd>method</kbd> <code>score</code>",id:"method-score",level:3},{value:"<kbd>method</kbd> <code>summarize</code>",id:"method-summarize-1",level:3}];function o(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.h1,{id:"weave",children:"weave"}),"\n",(0,c.jsx)(n.p,{children:"The top-level functions and classes for working with Weave."}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)(n.h1,{id:"api-overview",children:"API Overview"}),"\n",(0,c.jsx)(n.h2,{id:"classes",children:"Classes"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"#class-object",children:(0,c.jsx)(n.code,{children:"obj.Object"})})}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"#class-dataset",children:(0,c.jsx)(n.code,{children:"dataset.Dataset"})}),": Dataset object with easy saving and automatic versioning"]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"#class-model",children:(0,c.jsx)(n.code,{children:"model.Model"})}),": Intended to capture a combination of code and data the operates on an input."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"#class-evaluation",children:(0,c.jsx)(n.code,{children:"eval.Evaluation"})}),": Sets up an evaluation which includes a set of scorers and a dataset."]}),"\n",(0,c.jsx)(n.li,{children:(0,c.jsx)(n.a,{href:"#class-scorer",children:(0,c.jsx)(n.code,{children:"scorer.Scorer"})})}),"\n"]}),"\n",(0,c.jsx)(n.h2,{id:"functions",children:"Functions"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"#function-init",children:(0,c.jsx)(n.code,{children:"trace_api.init"})}),": Initialize weave tracking, logging to a wandb project."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"#function-publish",children:(0,c.jsx)(n.code,{children:"trace_api.publish"})}),": Save and version a python object."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"#function-ref",children:(0,c.jsx)(n.code,{children:"trace_api.ref"})}),": Construct a Ref to a Weave object."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"#function-get_current_call",children:(0,c.jsx)(n.code,{children:"call_context.get_current_call"})}),": Get the Call object for the currently executing Op, within that Op."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"#function-finish",children:(0,c.jsx)(n.code,{children:"trace_api.finish"})}),": Stops logging to weave."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.a,{href:"#function-op",children:(0,c.jsx)(n.code,{children:"op.op"})}),": A decorator to weave op-ify a function or method.  Works for both sync and async."]}),"\n"]}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace_api.py#L21",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"function-init",children:[(0,c.jsx)("kbd",{children:"function"})," ",(0,c.jsx)(n.code,{children:"init"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"init(\n    project_name: str,\n    settings: Optional[UserSettings, dict[str, Any]] = None\n) \u2192 WeaveClient\n"})}),"\n",(0,c.jsx)(n.p,{children:"Initialize weave tracking, logging to a wandb project."}),"\n",(0,c.jsx)(n.p,{children:"Logging is initialized globally, so you do not need to keep a reference to the return value of init."}),"\n",(0,c.jsx)(n.p,{children:"Following init, calls of weave.op() decorated functions will be logged to the specified project."}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Args:"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(n.code,{children:"project_name"})}),":  The name of the Weights & Biases project to log to."]}),"\n"]}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:"Returns:"}),"\nA Weave client."]}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace_api.py#L89",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"function-publish",children:[(0,c.jsx)("kbd",{children:"function"})," ",(0,c.jsx)(n.code,{children:"publish"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"publish(obj: Any, name: Optional[str] = None) \u2192 ObjectRef\n"})}),"\n",(0,c.jsx)(n.p,{children:"Save and version a python object."}),"\n",(0,c.jsx)(n.p,{children:"If an object with name already exists, and the content hash of obj does not match the latest version of that object, a new version will be created."}),"\n",(0,c.jsx)(n.p,{children:"TODO: Need to document how name works with this change."}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Args:"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(n.code,{children:"obj"})}),":  The object to save and version."]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(n.code,{children:"name"})}),":  The name to save the object under."]}),"\n"]}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:"Returns:"}),"\nA weave Ref to the saved object."]}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace_api.py#L137",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"function-ref",children:[(0,c.jsx)("kbd",{children:"function"})," ",(0,c.jsx)(n.code,{children:"ref"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"ref(location: str) \u2192 ObjectRef\n"})}),"\n",(0,c.jsx)(n.p,{children:"Construct a Ref to a Weave object."}),"\n",(0,c.jsx)(n.p,{children:"TODO: what happens if obj does not exist"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Args:"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)("b",{children:(0,c.jsx)(n.code,{children:"location"})}),':  A fully-qualified weave ref URI, or if weave.init() has been called, "name',":version",'" or just "name" ("latest" will be used for version in this case).']}),"\n"]}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:"Returns:"}),"\nA weave Ref to the object."]}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/call_context.py#L71",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"function-get_current_call",children:[(0,c.jsx)("kbd",{children:"function"})," ",(0,c.jsx)(n.code,{children:"get_current_call"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"get_current_call() \u2192 Optional[ForwardRef('Call')]\n"})}),"\n",(0,c.jsx)(n.p,{children:"Get the Call object for the currently executing Op, within that Op."}),"\n",(0,c.jsx)(n.p,{children:"This allows you to access attributes of the Call such as its id or feedback while it is running."}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:'@weave.op\ndef hello(name: str) -> None:\n     print(f"Hello {name}!")\n     current_call = weave.get_current_call()\n     print(current_call.id)\n'})}),"\n",(0,c.jsx)(n.p,{children:"It is also possible to access a Call after the Op has returned."}),"\n",(0,c.jsxs)(n.p,{children:["If you have the Call's id, perhaps from the UI, you can use the ",(0,c.jsx)(n.code,{children:"call"})," method on the ",(0,c.jsx)(n.code,{children:"WeaveClient"})," returned from ",(0,c.jsx)(n.code,{children:"weave.init"})," to retrieve the Call object."]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:'client = weave.init("<project>")\nmycall = client.call("<call_id>")\n'})}),"\n",(0,c.jsxs)(n.p,{children:["Alternately, after defining your Op you can use its ",(0,c.jsx)(n.code,{children:"call"})," method. For example:"]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:'@weave.op\ndef hello(name: str) -> None:\n     print(f"Hello {name}!")\n\nmycall = hello.call("world")\nprint(mycall.id)\n'})}),"\n",(0,c.jsxs)(n.p,{children:[(0,c.jsx)(n.strong,{children:"Returns:"}),"\nThe Call object for the currently executing Op, or  None if tracking has not been initialized or this method is  invoked outside an Op."]}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace_api.py#L242",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"function-finish",children:[(0,c.jsx)("kbd",{children:"function"})," ",(0,c.jsx)(n.code,{children:"finish"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"finish() \u2192 None\n"})}),"\n",(0,c.jsx)(n.p,{children:"Stops logging to weave."}),"\n",(0,c.jsx)(n.p,{children:"Following finish, calls of weave.op() decorated functions will no longer be logged. You will need to run weave.init() again to resume logging."}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/op.py#L283",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"function-op",children:[(0,c.jsx)("kbd",{children:"function"})," ",(0,c.jsx)(n.code,{children:"op"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"op(*args: Any, **kwargs: Any) \u2192 Union[Callable[[Any], Op], Op]\n"})}),"\n",(0,c.jsx)(n.p,{children:"A decorator to weave op-ify a function or method.  Works for both sync and async."}),"\n",(0,c.jsx)(n.p,{children:"Decorated functions and methods can be called as normal, but will also automatically track calls in the Weave UI."}),"\n",(0,c.jsxs)(n.p,{children:["If you don't call ",(0,c.jsx)(n.code,{children:"weave.init"})," then the function will behave as if it were not decorated."]}),"\n",(0,c.jsx)(n.p,{children:"Example usage:"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:'import weave\nweave.init("my-project")\n\n@weave.op\nasync def extract():\n     return await client.chat.completions.create(\n         model="gpt-4-turbo",\n         messages=[\n             {"role": "user", "content": "Create a user as JSON"},\n         ],\n     )\n\nawait extract()  # calls the function and tracks the call in the Weave UI\n'})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/flow/obj.py#L17",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h2,{id:"class-object",children:[(0,c.jsx)("kbd",{children:"class"})," ",(0,c.jsx)(n.code,{children:"Object"})]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Pydantic Fields:"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"name"}),": ",(0,c.jsx)(n.code,{children:"typing.Optional[str]"})]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"description"}),": ",(0,c.jsx)(n.code,{children:"typing.Optional[str]"})]}),"\n"]}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/flow/obj.py#L33",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"classmethod-handle_relocatable_object",children:[(0,c.jsx)("kbd",{children:"classmethod"})," ",(0,c.jsx)(n.code,{children:"handle_relocatable_object"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"handle_relocatable_object(\n    v: Any,\n    handler: ValidatorFunctionWrapHandler,\n    info: ValidationInfo\n) \u2192 Any\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/flow/obj.py#L74",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"method-model_post_init",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(n.code,{children:"model_post_init"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"model_post_init(_Object__context: Any) \u2192 None\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/flow/dataset.py#L17",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h2,{id:"class-dataset",children:[(0,c.jsx)("kbd",{children:"class"})," ",(0,c.jsx)(n.code,{children:"Dataset"})]}),"\n",(0,c.jsx)(n.p,{children:"Dataset object with easy saving and automatic versioning"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Examples:"})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"# Create a dataset\ndataset = Dataset(name='grammar', rows=[\n     {'id': '0', 'sentence': \"He no likes ice cream.\", 'correction': \"He doesn't like ice cream.\"},\n     {'id': '1', 'sentence': \"She goed to the store.\", 'correction': \"She went to the store.\"},\n     {'id': '2', 'sentence': \"They plays video games all day.\", 'correction': \"They play video games all day.\"}\n])\n\n# Publish the dataset\nweave.publish(dataset)\n\n# Retrieve the dataset\ndataset_ref = weave.ref('grammar').get()\n\n# Access a specific example\nexample_label = dataset_ref.rows[2]['sentence']\n"})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Pydantic Fields:"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"name"}),": ",(0,c.jsx)(n.code,{children:"typing.Optional[str]"})]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"description"}),": ",(0,c.jsx)(n.code,{children:"typing.Optional[str]"})]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"rows"}),": ",(0,c.jsx)(n.code,{children:"<class 'table.Table'>"})]}),"\n"]}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/flow/dataset.py#L44",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"classmethod-convert_to_table",children:[(0,c.jsx)("kbd",{children:"classmethod"})," ",(0,c.jsx)(n.code,{children:"convert_to_table"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"convert_to_table(rows: Any) \u2192 Table\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/flow/model.py#L6",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h2,{id:"class-model",children:[(0,c.jsx)("kbd",{children:"class"})," ",(0,c.jsx)(n.code,{children:"Model"})]}),"\n",(0,c.jsx)(n.p,{children:"Intended to capture a combination of code and data the operates on an input. For example it might call an LLM with a prompt to make a prediction or generate text."}),"\n",(0,c.jsx)(n.p,{children:"When you change the attributes or the code that defines your model, these changes will be logged and the version will be updated. This ensures that you can compare the predictions across different versions of your model. Use this to iterate on prompts or to try the latest LLM and compare predictions across different settings"}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Examples:"})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"class YourModel(Model):\n     attribute1: str\n     attribute2: int\n\n     @weave.op()\n     def predict(self, input_data: str) -> dict:\n         # Model logic goes here\n         prediction = self.attribute1 + ' ' + input_data\n         return {'pred': prediction}\n"})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Pydantic Fields:"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"name"}),": ",(0,c.jsx)(n.code,{children:"typing.Optional[str]"})]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"description"}),": ",(0,c.jsx)(n.code,{children:"typing.Optional[str]"})]}),"\n"]}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/flow/model.py#L34",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"method-get_infer_method",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(n.code,{children:"get_infer_method"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"get_infer_method() \u2192 Callable\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/flow/eval.py#L55",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h2,{id:"class-evaluation",children:[(0,c.jsx)("kbd",{children:"class"})," ",(0,c.jsx)(n.code,{children:"Evaluation"})]}),"\n",(0,c.jsx)(n.p,{children:"Sets up an evaluation which includes a set of scorers and a dataset."}),"\n",(0,c.jsx)(n.p,{children:"Calling evaluation.evaluate(model) will pass in rows from a dataset into a model matching  the names of the columns of the dataset to the argument names in model.predict."}),"\n",(0,c.jsx)(n.p,{children:"Then it will call all of the scorers and save the results in weave."}),"\n",(0,c.jsx)(n.p,{children:"If you want to preprocess the rows from the dataset you can pass in a function to preprocess_model_input."}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Examples:"})}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:'# Collect your examples\nexamples = [\n     {"question": "What is the capital of France?", "expected": "Paris"},\n     {"question": "Who wrote \'To Kill a Mockingbird\'?", "expected": "Harper Lee"},\n     {"question": "What is the square root of 64?", "expected": "8"},\n]\n\n# Define any custom scoring function\n@weave.op()\ndef match_score1(expected: str, model_output: dict) -> dict:\n     # Here is where you\'d define the logic to score the model output\n     return {\'match\': expected == model_output[\'generated_text\']}\n\n@weave.op()\ndef function_to_evaluate(question: str):\n     # here\'s where you would add your LLM call and return the output\n     return  {\'generated_text\': \'Paris\'}\n\n# Score your examples using scoring functions\nevaluation = Evaluation(\n     dataset=examples, scorers=[match_score1]\n)\n\n# Start tracking the evaluation\nweave.init(\'intro-example\')\n# Run the evaluation\nasyncio.run(evaluation.evaluate(function_to_evaluate))\n'})}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Pydantic Fields:"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"name"}),": ",(0,c.jsx)(n.code,{children:"typing.Optional[str]"})]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"description"}),": ",(0,c.jsx)(n.code,{children:"typing.Optional[str]"})]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"dataset"}),": ",(0,c.jsx)(n.code,{children:"typing.Union[flow.dataset.Dataset, list]"})]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"scorers"}),": ",(0,c.jsx)(n.code,{children:"typing.Optional[list[typing.Union[typing.Callable, trace.op.Op, flow.scorer.Scorer]]]"})]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"preprocess_model_input"}),": ",(0,c.jsx)(n.code,{children:"typing.Optional[typing.Callable]"})]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"trials"}),": ",(0,c.jsx)(n.code,{children:"<class 'int'>"})]}),"\n"]}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/op.py#L277",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"method-evaluate",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(n.code,{children:"evaluate"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"evaluate(model: Union[Callable, Model]) \u2192 dict\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/flow/eval.py#L105",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"method-model_post_init-1",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(n.code,{children:"model_post_init"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"model_post_init(_Evaluation__context: Any) \u2192 None\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/op.py#L129",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"method-predict_and_score",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(n.code,{children:"predict_and_score"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"predict_and_score(model: Union[Callable, Model], example: dict) \u2192 dict\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/op.py#L255",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"method-summarize",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(n.code,{children:"summarize"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"summarize(eval_table: EvaluationResults) \u2192 dict\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/flow/scorer.py#L14",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h2,{id:"class-scorer",children:[(0,c.jsx)("kbd",{children:"class"})," ",(0,c.jsx)(n.code,{children:"Scorer"})]}),"\n",(0,c.jsx)(n.p,{children:(0,c.jsx)(n.strong,{children:"Pydantic Fields:"})}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"name"}),": ",(0,c.jsx)(n.code,{children:"typing.Optional[str]"})]}),"\n",(0,c.jsxs)(n.li,{children:[(0,c.jsx)(n.code,{children:"description"}),": ",(0,c.jsx)(n.code,{children:"typing.Optional[str]"})]}),"\n"]}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/flow/scorer.py#L15",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"method-score",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(n.code,{children:"score"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"score(target: Any, model_output: Any) \u2192 Any\n"})}),"\n",(0,c.jsx)(n.hr,{}),"\n",(0,c.jsx)("a",{href:"https://github.com/wandb/weave/blob/master/weave/trace/op.py#L18",children:(0,c.jsx)("img",{align:"right",src:"https://img.shields.io/badge/-source-cccccc?style=flat-square"})}),"\n",(0,c.jsxs)(n.h3,{id:"method-summarize-1",children:[(0,c.jsx)("kbd",{children:"method"})," ",(0,c.jsx)(n.code,{children:"summarize"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-python",children:"summarize(score_rows: list) \u2192 Optional[dict]\n"})})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(o,{...e})}):o(e)}},11151:(e,n,s)=>{s.d(n,{Z:()=>a,a:()=>l});var c=s(67294);const t={},i=c.createContext(t);function l(e){const n=c.useContext(i);return c.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),c.createElement(i.Provider,{value:n},e.children)}}}]);