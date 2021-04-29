(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{87:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return r})),t.d(n,"metadata",(function(){return o})),t.d(n,"toc",(function(){return m})),t.d(n,"default",(function(){return i}));var l=t(3),a=t(7),b=(t(0),t(166)),r={id:"core",title:"xform core"},o={unversionedId:"xform/core",id:"xform/core",isDocsHomePage:!1,title:"xform core",description:"xform \u8868\u5355\u65b9\u6848\u6838\u5fc3\u90e8\u5206\u3002",source:"@site/docs/xform/core.mdx",sourceDirName:"xform",slug:"/xform/core",permalink:"/rex-design/docs/xform/core",editUrl:"https://github.com/alibaba/rex-design/edit/main/packages/doc/docs/xform/core.mdx",version:"current",frontMatter:{id:"core",title:"xform core"},sidebar:"docs",previous:{title:"xform \u4e1a\u52a1\u793a\u4f8b",permalink:"/rex-design/docs/xform/biz"},next:{title:"API",permalink:"/rex-design/docs/xform/api"}},m=[{value:"\u52a8\u673a",id:"\u52a8\u673a",children:[]},{value:"\u7f16\u7a0b\u6a21\u578b",id:"\u7f16\u7a0b\u6a21\u578b",children:[{value:"\u53cc\u5411\u7ed1\u5b9a",id:"\u53cc\u5411\u7ed1\u5b9a",children:[]},{value:"\u4e3b\u52a8\u66f4\u65b0\u6a21\u578b",id:"\u4e3b\u52a8\u66f4\u65b0\u6a21\u578b",children:[]},{value:"\u76d1\u542c\u53d8\u5316",id:"\u76d1\u542c\u53d8\u5316",children:[]},{value:"\u5b57\u6bb5\u6a21\u578b",id:"\u5b57\u6bb5\u6a21\u578b",children:[]}]},{value:"\u5206\u5f62",id:"\u5206\u5f62",children:[{value:"\u89c6\u56fe\u5206\u5f62",id:"\u89c6\u56fe\u5206\u5f62",children:[]},{value:"\u6a21\u578b\u5206\u5f62",id:"\u6a21\u578b\u5206\u5f62",children:[]}]}],c={toc:m};function i(e){var n=e.components,t=Object(a.a)(e,["components"]);return Object(b.b)("wrapper",Object(l.a)({},c,t,{components:n,mdxType:"MDXLayout"}),Object(b.b)("p",null,"xform \u8868\u5355\u65b9\u6848\u6838\u5fc3\u90e8\u5206\u3002"),Object(b.b)("h2",{id:"\u52a8\u673a"},"\u52a8\u673a"),Object(b.b)("p",null,"mobx \u662f\u4e00\u4e2a\u975e\u5e38\u4f18\u79c0\u7684\u72b6\u6001\u7ba1\u7406\u5de5\u5177\u3002\u4e00\u662f\u5b83\u91c7\u7528\u4e86 Proxy \u9b54\u6cd5\u52ab\u6301\u4e86\u6240\u6709\u7684\u72b6\u6001\u8bfb\u53d6\u548c\u66f4\u65b0\uff0c\u5141\u8bb8\u6211\u4eec\u7528\u719f\u6089\u7684 plain Object/Array \u65b9\u5f0f\u4f7f\u7528\u548c\u66f4\u65b0\u72b6\u6001\uff1b\u4e8c\u662f mobx \u57fa\u4e8e\u4f9d\u8d56\u6536\u96c6\u5b9e\u73b0\u4e86\u7ec4\u4ef6\u7684\u7cbe\u786e\u66f4\u65b0\uff0c\u5927\u90e8\u5206\u60c5\u51b5\u4e0b\uff0c\u5373\u4fbf\u4e0d\u8fdb\u884c\u6027\u80fd\u4f18\u5316\uff0c\u6211\u4eec\u4e5f\u80fd\u5199\u51fa\u9ad8\u6027\u80fd\u7684 React \u5e94\u7528\uff0c\u975e\u5e38\u9002\u5408\u4e2d\u540e\u53f0\u5927\u8868\u5355\u573a\u666f \u2014\u2014 \u6e32\u67d3\u7ec4\u4ef6\u6570\u91cf\u5927\uff0c\u4f46\u7528\u6237\u4e00\u6b21\u5f80\u5f80\u53ea\u66f4\u65b0\u4e00\u5c0f\u90e8\u5206\u7684\u8868\u5355\u3002"),Object(b.b)("p",null,Object(b.b)("strong",{parentName:"p"},"\u76d2\u9a6c\u5fae\u5e94\u7528\u91c7\u7528\u4e86 mobx \u4f5c\u4e3a\u5e94\u7528\u5c42\u7684\u72b6\u6001\u7ba1\u7406\u65b9\u6848\uff0c\u63d0\u4f9b\u4e00\u4e2a\u80fd\u591f\u65e0\u7f1d\u5bf9\u63a5 mobx \u6a21\u578b\u7684\u8868\u5355\u65b9\u6848\uff0c\u80fd\u591f\u663e\u8457\u63d0\u5347\u5fae\u5e94\u7528\u7684\u7814\u53d1\u6548\u7387\u3002")),Object(b.b)("p",null,"\u53e6\u4e00\u65b9\u9762\uff0c\u5927\u800c\u5168\u7684\u8868\u5355\u65b9\u6848\uff0c\u5176\u5f00\u53d1\u6210\u672c\u3001\u7ef4\u62a4\u6210\u672c\u3001\u7b54\u7591\u6210\u672c\u975e\u5e38\u9ad8\uff0crex design \u4f5c\u4e3a\u4ee5\u7ec4\u4ef6\u5e93\u4e3a\u4e3b\u7684\u6280\u672f\u4ea7\u54c1\uff0c\u4e0d\u5e94\u8be5\u3001\u4e5f\u4e0d\u9700\u8981\u63d0\u4f9b\u8fc7\u4e8e\u590d\u6742\u7684\u8868\u5355\u65b9\u6848\u3002\u6211\u4eec\u9700\u8981\u4e00\u4e2a\u62e5\u62b1 mobx \u7684\u3001\u9ad8\u6027\u80fd\u7684\u3001\u8f83\u4e3a\u7cbe\u7b80\u7684\u8868\u5355\u65b9\u6848\u3002"),Object(b.b)("p",null,"\u6240\u4ee5\uff0cxform \u4f5c\u4e3a rex design \u4e2d\u5168\u65b0\u7684\u8868\u5355\u65b9\u54e6\uff0c\u5176\u6838\u5fc3\u90e8\u5206\u7684\u8bbe\u8ba1\u601d\u8def\u5982\u4e0b\uff1a"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"\u62e5\u62b1 mobx",Object(b.b)("ul",{parentName:"li"},Object(b.b)("li",{parentName:"ul"},"\u8868\u5355\u5185\u6838\u91c7\u7528 mobx \u63d0\u4f9b\u7684\u6570\u636e\u7ed3\u6784\uff0c\u65e0\u7f1d\u5bf9\u63a5 mobx \u751f\u6001\uff08\u4f8b\u5982 mobx-utils\uff09"),Object(b.b)("li",{parentName:"ul"},"\u7cbe\u786e\u6e32\u67d3\uff08\u53ea\u6e32\u67d3\u90a3\u4e9b\u5fc5\u987b\u8981\u6e32\u67d3\u7684\u7ec4\u4ef6\uff09\uff0c\u80fd\u591f\u627f\u8f7d\u5927\u8868\u5355\u573a\u666f"))),Object(b.b)("li",{parentName:"ul"},"\u4e0a\u624b\u6210\u672c\u8981\u4f4e\u4e00\u4e9b",Object(b.b)("ul",{parentName:"li"},Object(b.b)("li",{parentName:"ul"},"\u907f\u514d\u90a3\u4e9b\u89e3\u91ca\u8d77\u6765\u8d39\u52b2\u7684\u6982\u5ff5\u6216\u7528\u6cd5"),Object(b.b)("li",{parentName:"ul"},"\u5373\u4f7f\u5f00\u53d1\u8005\u4e0d\u719f\u6089 mobx\uff0c\u4e5f\u80fd\u4f7f\u7528\u8be5\u8868\u5355\u65b9\u6848\u7684\u5927\u90e8\u5206\u529f\u80fd"),Object(b.b)("li",{parentName:"ul"},"\u8868\u5355\u4ee3\u7801\uff08JSX\uff09\u3001\u8868\u5355\u89c6\u56fe\u3001\u8868\u5355\u6570\u636e \u4e09\u8005\u7ed3\u6784\u76f8\u540c/\u76f8\u4f3c\uff0c\u7f29\u5c0f\u300c\u6240\u89c1\u300d\u4e0e\u300c\u6240\u5f97\u300d\u7684\u5dee\u5f02"))),Object(b.b)("li",{parentName:"ul"},"\u5206\u5f62",Object(b.b)("ul",{parentName:"li"},Object(b.b)("li",{parentName:"ul"},"\u63d0\u5347\u8868\u5355\u4ee3\u7801\u7684\u53ef\u590d\u7528\u6027"),Object(b.b)("li",{parentName:"ul"},Object(b.b)("del",{parentName:"li"},"\u6709\u8c01\u4e0d\u559c\u6b22\u8868\u5355\u5957\u5a03\u5462\uff1f")))),Object(b.b)("li",{parentName:"ul"},"\u65e0\u5934 (headless) \u5185\u6838",Object(b.b)("ul",{parentName:"li"},Object(b.b)("li",{parentName:"ul"},"\u5185\u6838\u4e0d\u6e32\u67d3\u989d\u5916\u7684 UI \u5143\u7d20\uff0c\u7531\u4e0a\u5c42\u63a7\u5236\u5e03\u5c40")))),Object(b.b)("h2",{id:"\u7f16\u7a0b\u6a21\u578b"},"\u7f16\u7a0b\u6a21\u578b"),Object(b.b)("h3",{id:"\u53cc\u5411\u7ed1\u5b9a"},"\u53cc\u5411\u7ed1\u5b9a"),Object(b.b)("p",null,"\u901a\u8fc7 ",Object(b.b)("inlineCode",{parentName:"p"},"new RootModel(values)")," \u521b\u5efa model\uff0c\u5e76\u5c06 model \u4f20\u9012\u7ed9\u89c6\u56fe\u540e\uff0c\u300c\u6a21\u578b\u4e0e\u89c6\u56fe\u300d\u5c31\u4f1a\u8fdb\u884c\u53cc\u5411\u7ed1\u5b9a\uff1a"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"\u89c6\u56fe\u603b\u662f\u53cd\u6620\u6a21\u578b\u4e2d\u7684\u6700\u65b0\u503c"),Object(b.b)("li",{parentName:"ul"},"\u89c6\u56fe\u4e0a\u7684\u64cd\u4f5c\u4f1a\u5b9e\u65f6\u66f4\u65b0\u6a21\u578b")),Object(b.b)("p",null,"\u7528\u6237\u5728\u8868\u5355\u4e0a\u7684\u4ea4\u4e92\u53ef\u4ee5\u770b\u505a\u662f\u5bf9 model.values \u7684\u4fee\u6539\uff1a"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-jsx"},"const model = new RootModel(values);\n\n// \u7528\u6237\u5728 <input name=\"foo\" /> \u4e2d\u8f93\u5165\u4e86 'abc'\nmodel.values.foo = 'abc';\n\n// \u7528\u6237\u5728\u8d2d\u7269\u8f66(cart) \u4e2d\u6dfb\u52a0\u4e86 2\u74f6\u5feb\u4e50\u6c34\nmodel.values.cart.items = [];\nmodel.values.cart.items.push({ sku: '\u5feb\u4e50\u6c34', count: 2 });\n")),Object(b.b)("p",null,"\u56e0\u4e3a\u7a7a\u503c\u7684\u5b58\u5728\uff0c",Object(b.b)("inlineCode",{parentName:"p"},".cart.items")," \u8fd9\u6837\u7684\u7528\u6cd5\u5f88\u5bb9\u6613\u62a5\u9519\uff0c\u6240\u4ee5 model \u63d0\u4f9b\u4e86 getValue \u548c setValue \u7684\u65b9\u6cd5\uff1a"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"model.getValue('foo.bar')")," \u7b49\u4ef7\u4e8e ",Object(b.b)("inlineCode",{parentName:"li"},"model.values.foo.bar"),"\uff0c\u4f46\u4f1a\u5904\u7406\u7a7a\u503c\u60c5\u51b5"),Object(b.b)("li",{parentName:"ul"},Object(b.b)("inlineCode",{parentName:"li"},"model.setValue('foo.bar', buzz)")," \u7b49\u4ef7\u4e8e ",Object(b.b)("inlineCode",{parentName:"li"},"model.values.foo.bar = buzz"),"\uff0c\u4f46\u4f1a\u5904\u7406\u7a7a\u503c\u60c5\u51b5")),Object(b.b)("h3",{id:"\u4e3b\u52a8\u66f4\u65b0\u6a21\u578b"},"\u4e3b\u52a8\u66f4\u65b0\u6a21\u578b"),Object(b.b)("p",null,"\u6211\u4eec\u53ef\u4ee5\u4e3b\u52a8\u5bf9 model.values \u8fdb\u884c\u66f4\u65b0\uff0cvalues \u53d8\u5316\u540e\u89c6\u56fe\u4f1a\u81ea\u52a8\u66f4\u65b0\u3002"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-jsx"},"// \u66f4\u65b0\u6240\u6709\u72b6\u6001\nmodel.values = {\n  foo: { bar: 'abc' },\n  buzz: [{ foo: 123 }],\n};\n\n// \u66f4\u597d\u7684\u65b9\u5f0f\u662f\u8c03\u7528 model.setValue \u6765\u8fdb\u884c\u66f4\u65b0\nmodel.setValue('foo.bar', buzz);\n")),Object(b.b)("p",null,"\u91c7\u7528\u8fd9\u79cd\u66f4\u65b0\u65b9\u5f0f\uff0c\u6211\u4eec\u53ef\u4ee5\u5f88\u65b9\u4fbf\u7684\u5b9e\u73b0\u4e00\u4e2a\u300c\u91cd\u7f6e\u8868\u5355\u300d\u7684\u6309\u94ae\uff1a"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-jsx"},"import { action } from 'mobx';\n\n<Button\n  // \u5bf9\u6a21\u578b\u7684\u66f4\u65b0\uff0c\u6216\u8005\u8bf4\u5bf9 mobx observable \u6570\u636e\u7684\u4fee\u6539\uff0c\u9700\u8981\u653e\u5728 mobx action \u5185\n  onClick={action(() => {\n    model.values = {};\n  })}\n>\n  \u91cd\u7f6e\u8868\u5355\n</Button>;\n")),Object(b.b)("h3",{id:"\u76d1\u542c\u53d8\u5316"},"\u76d1\u542c\u53d8\u5316"),Object(b.b)("p",null,"\u76d1\u542c\u53d8\u5316\u7684\u80fd\u529b\u4e3b\u8981\u7531 ",Object(b.b)("a",{parentName:"p",href:"https://mobx.js.org/reactions.html"},"mobx reactions")," \u63d0\u4f9b\u3002\u56e0\u4e3a ",Object(b.b)("inlineCode",{parentName:"p"},"model.values")," \u91c7\u7528\u4e86 mobx observable \u6570\u636e\u7ed3\u6784\uff0c\u6240\u4ee5\u4f60\u53ef\u4ee5\u76d1\u542c\u4efb\u610f\u7c92\u5ea6\u6570\u636e\u7684\u53d8\u5316\u3002"),Object(b.b)("p",null,"xform \u63d0\u4f9b\u4e86\u4e00\u4e2a\u9002\u7528\u4e8e\u7b80\u5355\u8054\u52a8\u573a\u666f\u7684\u7ec4\u4ef6\uff1a",Object(b.b)("inlineCode",{parentName:"p"},"<Form.Effect watch={watch} effect={effect} />"),"\u3002"),Object(b.b)("p",null,"\u6e32\u67d3\u8be5\u7ec4\u4ef6\u540e\uff0c\u5f53 watch \u5bf9\u5e94\u7684\u5b57\u6bb5\u503c\u53d1\u751f\u53d8\u5316\u65f6\uff0ceffect \u4f1a\u88ab\u8c03\u7528\u4e00\u6b21\u3002"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-jsx"},'<Form>\n  <Form.Effect\n    watch="subsidiary"\n    effect={(value, { model }) => {\n      model.setValue(\'shops\', []);\n    }}\n  />\n  <FormItem name="subsidiary" />\n  <FormItem name="shops" />\n</Form>\n')),Object(b.b)("h3",{id:"\u5b57\u6bb5\u6a21\u578b"},"\u5b57\u6bb5\u6a21\u578b"),Object(b.b)("p",null,"model.values \u53ea\u8bb0\u5f55\u4e86\u8868\u5355\u5185\u5404\u4e2a\u5b57\u6bb5\u7684\u503c\uff0c\u4f46\u5728\u5b9e\u9645\u4f7f\u7528\u8fc7\u7a0b\u4e2d\uff0c\u6bcf\u4e2a\u5b57\u6bb5\u8fd8\u5305\u542b\u8bb8\u591a\u72b6\u6001\uff1a"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"error \u5b57\u6bb5\u4e0a\u7684\u9519\u8bef\u4fe1\u606f"),Object(b.b)("li",{parentName:"ul"},"disabled \u5b57\u6bb5\u662f\u5426\u88ab\u7981\u7528"),Object(b.b)("li",{parentName:"ul"},"visible \u5b57\u6bb5\u662f\u5426\u53ef\u89c1"),Object(b.b)("li",{parentName:"ul"},"dataSource \u5b57\u6bb5\u7684\u6570\u636e\u6e90",Object(b.b)("ul",{parentName:"li"},Object(b.b)("li",{parentName:"ul"},"\u4f8b\u5982\u4f7f\u7528\u4e0b\u62c9\u9009\u62e9\u5668\u4f5c\u4e3a\u4e00\u4e2a\u5b57\u6bb5\u7684\u63a7\u4ef6\u65f6\uff0c\u5b57\u6bb5\u4e2d\u5f80\u5f80\u9700\u8981\u7ef4\u62a4\u4e00\u4efd\u6570\u636e\u6e90\u5217\u8868"))),Object(b.b)("li",{parentName:"ul"},"...")),Object(b.b)("p",null,"\u4e0d\u540c\u7684 UI \u63a7\u4ef6\u4f1a\u5e26\u6765\u4e0d\u540c\u7684\u72b6\u6001\uff0c\u6211\u4eec\u5f88\u96be\u5728\u5185\u6838\u4e2d\u679a\u4e3e\u51fa\u6240\u6709\u53ef\u80fd\u7684\u72b6\u6001\u3002\u5176\u4ed6\u7684\u8868\u5355\u65b9\u6848\u5f80\u5f80\u4f1a\u7ed9\u51fa\u4e00\u5957\u9884\u5148\u5b9a\u4e49\u597d\u7684\u72b6\u6001\uff08\u4f8b\u5982 ",Object(b.b)("a",{parentName:"p",href:"https://github.com/alibaba/formily/blob/d772523574bda50a9ecf42e92ca6f17a0f4a6422/packages/core/src/models/Field.ts#L121-L146"},"formily"),"\uff09\uff0c\u6765\u6ee1\u8db3 95.2871% \u7684\u60c5\u51b5\u3002"),Object(b.b)("p",null,"\u800c xform core \u91c7\u7528\u4e86\u53e6\u4e00\u79cd\u65b9\u5f0f\uff1a",Object(b.b)("strong",{parentName:"p"},"xform core \u4e0d\u5b9a\u4e49\u9884\u8bbe\u7684\u72b6\u6001\uff0c\u800c\u662f\u53ea\u63d0\u4f9b\u72b6\u6001\u7684\u5bb9\u5668"),"\uff0c\u5bb9\u5668\u5185\u5177\u4f53\u653e\u4ec0\u4e48\u72b6\u6001\u7531\u4e0a\u5c42\u51b3\u5b9a\uff08\u4e00\u822c\u662f\u5728\u7ec4\u4ef6\u5e93\u5bf9\u63a5 xform core \u7684\u65f6\u5019\u8fdb\u884c\u51b3\u5b9a\uff09\u3002 \u6240\u4ee5 xform core \u7684\u5b57\u6bb5\u6a21\u578b\u5bf9\u8c61\u4ec5\u5305\u542b\u4e00\u4e9b\u9488\u5bf9\u5b57\u6bb5\u672c\u8eab\u7684\u63cf\u8ff0\u548c\u65b9\u6cd5\uff0c\u6574\u4e2a\u6a21\u578b\u975e\u5e38\u8f7b\u91cf\uff0c\u5b66\u4e60\u6210\u672c\u5f88\u4f4e \ud83e\udd13\u3002"),Object(b.b)("h2",{id:"\u5206\u5f62"},"\u5206\u5f62"),Object(b.b)("p",null,Object(b.b)("del",{parentName:"p"},"\u4f18\u96c5\u7684\u8868\u5355\u5957\u5a03\u3002")),Object(b.b)("p",null,"\u4e00\u4e9b\u8868\u5355\u573a\u666f\u4e2d\u5f80\u5f80\u4f1a\u51fa\u73b0\u8fd9\u6837\u7684\u9700\u6c42\uff1a\u5c06\u4e00\u4e2a\u5c0f\u7684\u8868\u5355\u5d4c\u5165\u5230\u4e00\u4e2a\u5927\u8868\u5355\u4e2d\uff0c\u518d\u5c06\u5927\u8868\u5355\u5d4c\u5165\u5230\u66f4\u5927\u7684\u8868\u5355\u4e2d\uff1b\u6216\u662f\u5bf9\u5b57\u6bb5\u8fdb\u884c\u5206\u7ec4\uff0c\u7136\u540e\u518d\u5bf9\u4e0d\u540c\u5206\u7ec4\u8fdb\u884c\u7f16\u6392\u3002"),Object(b.b)("p",null,"\u5728\u8fd9\u6837\u7684\u573a\u666f\u4e0b\uff0c\u4e00\u4e2a\u300c\u5206\u5f62\u300d\u7684\u8868\u5355\u7cfb\u7edf\u53ef\u4ee5\u6781\u5927\u63d0\u5347\u4ee3\u7801\u7684\u53ef\u590d\u7528\u6027\u3002\u300c\u5206\u5f62\u300d\u5305\u62ec\u300c\u89c6\u56fe\u5206\u5f62\u300d\u548c\u300c\u6a21\u578b\u5206\u5f62\u300d\u4e24\u90e8\u5206\u3002"),Object(b.b)("h3",{id:"\u89c6\u56fe\u5206\u5f62"},"\u89c6\u56fe\u5206\u5f62"),Object(b.b)("p",null,"\u300c\u89c6\u56fe\u5206\u5f62\u300d\u4e3b\u8981\u6307\u89c6\u56fe\u4ee3\u7801\u4e2d\uff0c\u6bcf\u4e2a FormItem \u4e2d name \u5c5e\u6027\u63cf\u8ff0\u7684\u662f\u300c\u76f8\u5bf9\u4e8e\u4e0a\u5c42 model \u7684\u6570\u636e\u7d22\u5f15\u300d\uff0c\u591a\u4e2a FormItem \u80fd\u88ab Form.Object \u6216 Form.Array \u4f7f\u7528\uff0c\u7ec4\u5408\u5f62\u6210\u4e00\u4e2a\u72ec\u7acb\u7684\u5b50\u8868\u5355\uff0c\u5e76\u80fd\u88ab\u66f4\u4e0a\u5c42\u7684 Form.Object \u6216 Form.Array \u6240\u4f7f\u7528\u3002"),Object(b.b)("p",null,"\u4f8b\u5982\u4e0b\u9762\u7684 ",Object(b.b)("inlineCode",{parentName:"p"},"PersonForm")," \u63cf\u8ff0\u4e86\u4e00\u4e2a\u7b80\u6613\u7684\u7528\u6237\u4fe1\u606f\u8868\u5355\uff1a"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-jsx"},'function PersonForm() {\n  return (\n    <>\n      <FormItem name="name" />\n      <FormItem name="age" />\n      <FormItem name="gender" />\n      <FormItem name="contact" />\n      <FormItem name="address.city" />\n      <FormItem name="address.detail" />\n    </>\n  );\n}\n\n// PersonForm \u4ea7\u51fa\u7684\u6570\u636e\uff1a\nmodel.values = {\n  name: \'\u5c0f\u6cb3\u9a6c\',\n  age: 5,\n  gender: null,\n  address: { city: \'\u4e0a\u6d77\', detail: \'\u957f\u5b81King88\' },\n};\n')),Object(b.b)("p",null,"\u56e0\u4e3a\u6bcf\u4e2a FormItem \u63cf\u8ff0\u7684\u90fd\u662f\u76f8\u5bf9\u6570\u636e\u7d22\u5f15\uff0c\u6240\u4ee5\u6211\u4eec\u53ef\u4ee5\u5f88\u5bb9\u6613\u5730\u4f7f\u7528 PersonForm \u7ec4\u5408\u51fa\u4e00\u4e2a FamilyForm\uff1a"),Object(b.b)("pre",null,Object(b.b)("code",{parentName:"pre",className:"language-jsx"},'// prettier-ignore\nfunction FamilyForm() {\n  return (\n    <>\n      <Form.Object name="me"> <PersonForm /> </Form.Object>\n      <Form.Object name="parent"> <PersonForm /> </Form.Object>\n      <Form.Array name="siblings"> <PersonForm /> </Form.Array>\n      <Form.Array name="children"> <PersonForm /> </Form.Array>\n    </>\n  );\n}\n\n// FamilyForm \u4ea7\u51fa\u7684\u6570\u636e\uff1a\nmodel.values = {\n  me: { name: \'\u5c0f\u6cb3\u9a6c\', age: 5, ...more },\n  father: { name: \'\u963f\u91cc\u5df4\u5df4\', ...more },\n  siblings: [...more],\n  children: [...more],\n};\n')),Object(b.b)("h3",{id:"\u6a21\u578b\u5206\u5f62"},"\u6a21\u578b\u5206\u5f62"),Object(b.b)("p",null,"\u300c\u6a21\u578b\u5206\u5f62\u300d\u6307\u6a21\u578b\u7684\u6570\u636e\u7ed3\u6784\u548c API \u662f\u5206\u5f62\u7684\u3002"),Object(b.b)("p",null,"\u5728 API \u5c42\u9762\uff0c\u76ee\u524d\u6211\u4eec\u63d0\u4f9b\u4e86 ",Object(b.b)("inlineCode",{parentName:"p"},"model.getSubModel(name)")," \u7684\u65b9\u6cd5\uff0c\u8be5\u65b9\u6cd5\u4f1a\u8fd4\u56de\u4e00\u4e2a\u5b50\u6a21\u578b\u3002 ",Object(b.b)("strong",{parentName:"p"},"\u5b50\u6a21\u578b\u4e0e\u7236\u6a21\u578b\u5177\u6709\u76f8\u540c\u7684 API"),"\u3002\u8fd9\u610f\u5473\u7740\u2026\u2026"),Object(b.b)("ul",null,Object(b.b)("li",{parentName:"ul"},"\u5bf9 model \u7684\u64cd\u4f5c\u4e0d\u9700\u8981\u5173\u5fc3 model \u6240\u5904\u7684\u5c42\u7ea7",Object(b.b)("ul",{parentName:"li"},Object(b.b)("li",{parentName:"ul"},Object(b.b)("a",{parentName:"li",href:"biz#%E6%95%B0%E7%BB%84%E5%85%83%E7%B4%A0%E5%86%85%E9%83%A8%E8%81%94%E5%8A%A8"},"\u5373\u4f7f\u5b50\u8868\u5355\u5b58\u5728\u8054\u52a8\u6216\u6821\u9a8c\uff0c\u4e5f\u53ef\u4ee5\u76f4\u63a5\u5d4c\u5165\u5230\u5927\u8868\u5355")))),Object(b.b)("li",{parentName:"ul"},"\u590d\u6742\u8868\u5355\u7684\u62c6\u5206\u4e0e\u5408\u5e76\u53d8\u5f97\u66f4\u4e3a\u5bb9\u6613"),Object(b.b)("li",{parentName:"ul"},"\u50cf ",Object(b.b)("inlineCode",{parentName:"li"},"model.getSubModel().getSubModel()...")," \u8fd9\u6837\u7684\u8c03\u7528\uff0c\u53ef\u4ee5\u4e0d\u65ad\u5730\u5ef6\u957f",Object(b.b)("ul",{parentName:"li"},Object(b.b)("li",{parentName:"ul"},"\u901a\u8fc7\u5185\u90e8\u6570\u636e\u7ed3\u6784\u7684\u4f18\u5316\uff0c",Object(b.b)("inlineCode",{parentName:"li"},"model.getSubModel(name)")," \u603b\u662f\u53ef\u4ee5\u8fd4\u56de\u4e00\u4e2a\u6709\u6548\u7684 model \u5bf9\u8c61\uff0c\u65b9\u4fbf\u4ee3\u7801\u4e66\u5199")))),Object(b.b)("p",null,"\uff08\u672a\u5b8c\u5f85\u7eed\uff09"))}i.isMDXComponent=!0}}]);