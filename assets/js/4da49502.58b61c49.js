(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{127:function(e,r,n){"use strict";n.r(r),n.d(r,"frontMatter",(function(){return x})),n.d(r,"metadata",(function(){return f})),n.d(r,"toc",(function(){return P})),n.d(r,"default",(function(){return j}));var o=n(3),s=n(7),l=n(0),i=n.n(l),t=n(164),c=n(162);function a(){return i.a.createElement(c.Progress,{value:20})}const u={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/progress.stories.tsx",loc:{start:{line:6,column:7},end:{line:8,column:1}},name:"Basic",value:a,source:"function Basic() {\n  return <Progress value={20} />;\n}",deps:()=>[],provides:{Progress:c.Progress}};function d(){return i.a.createElement(c.Progress,{value:20,renderLabel:({value:e})=>e+"/100 \u4eba\u5df2\u63d0\u4ea4"})}a.__doc_info=u,a.__inner_source="function Basic() {\n  return <Progress value={20} />;\n}";const p={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/progress.stories.tsx",loc:{start:{line:10,column:7},end:{line:12,column:1}},name:"RenderLabel",value:d,source:"function RenderLabel() {\n  return <Progress value={20} renderLabel={({ value }) => `${value}/100 \u4eba\u5df2\u63d0\u4ea4`} />;\n}",deps:()=>[],provides:{Progress:c.Progress}};function m(){return i.a.createElement(c.DemoGroup,null,i.a.createElement(c.CircleProgress,{value:50}),i.a.createElement(c.CircleProgress,{value:50,color:"error.normal"}),i.a.createElement(c.CircleProgress,{value:50,color:"success.normal"}))}d.__doc_info=p,d.__inner_source="function RenderLabel() {\n  return <Progress value={20} renderLabel={({ value }) => `${value}/100 \u4eba\u5df2\u63d0\u4ea4`} />;\n}";const g={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/progress.stories.tsx",loc:{start:{line:14,column:7},end:{line:22,column:1}},name:"Circle",value:m,source:'function Circle() {\n  return (\n    <DemoGroup>\n      <CircleProgress value={50} />\n      <CircleProgress value={50} color="error.normal" />\n      <CircleProgress value={50} color="success.normal" />\n    </DemoGroup>\n  );\n}',deps:()=>[],provides:{DemoGroup:c.DemoGroup,CircleProgress:c.CircleProgress}};function b(){return i.a.createElement(c.DemoGroup,null,i.a.createElement(c.CircleProgress,{value:50,diameter:"50px",renderLabel:()=>null}),i.a.createElement(c.CircleProgress,{value:50,diameter:"100px",renderLabel:({value:e})=>i.a.createElement(c.Text,{fontSize:"24px"},e,"%")}),i.a.createElement(c.CircleProgress,{value:50,diameter:"200px",renderLabel:({value:e})=>i.a.createElement(c.Text,{fontSize:"48px"},e,"%")}))}m.__doc_info=g,m.__inner_source='function Circle() {\n  return (\n    <DemoGroup>\n      <CircleProgress value={50} />\n      <CircleProgress value={50} color="error.normal" />\n      <CircleProgress value={50} color="success.normal" />\n    </DemoGroup>\n  );\n}';const v={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/progress.stories.tsx",loc:{start:{line:24,column:7},end:{line:32,column:1}},name:"CircleSize",value:b,source:'function CircleSize() {\n  return (\n    <DemoGroup>\n      <CircleProgress value={50} diameter="50px" renderLabel={() => null} />\n      <CircleProgress value={50} diameter="100px" renderLabel={({ value }) => <Text fontSize="24px">{value}%</Text>} />\n      <CircleProgress value={50} diameter="200px" renderLabel={({ value }) => <Text fontSize="48px">{value}%</Text>} />\n    </DemoGroup>\n  );\n}',deps:()=>[],provides:{DemoGroup:c.DemoGroup,CircleProgress:c.CircleProgress,Text:c.Text}};b.__inner_source='function CircleSize() {\n  return (\n    <DemoGroup>\n      <CircleProgress value={50} diameter="50px" renderLabel={() => null} />\n      <CircleProgress value={50} diameter="100px" renderLabel={({ value }) => <Text fontSize="24px">{value}%</Text>} />\n      <CircleProgress value={50} diameter="200px" renderLabel={({ value }) => <Text fontSize="48px">{value}%</Text>} />\n    </DemoGroup>\n  );\n}',b.__doc_info=v;var x={id:"progress",title:"Progress \u8fdb\u5ea6\u6761"},f={unversionedId:"progress",id:"progress",isDocsHomePage:!1,title:"Progress \u8fdb\u5ea6\u6761",description:"\u4f7f\u7528\u573a\u666f",source:"@site/docs/progress.mdx",sourceDirName:".",slug:"/progress",permalink:"/rex-design/docs/progress",editUrl:"https://github.com/alibaba/rex-design/edit/main/packages/doc/docs/progress.mdx",version:"current",frontMatter:{id:"progress",title:"Progress \u8fdb\u5ea6\u6761"},sidebar:"docs",previous:{title:"Image \u56fe\u7247",permalink:"/rex-design/docs/image"},next:{title:"Notice \u63d0\u793a\u6846",permalink:"/rex-design/docs/notice"}},P=[{value:"\u4f7f\u7528\u573a\u666f",id:"\u4f7f\u7528\u573a\u666f",children:[]},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",children:[{value:"\u57fa\u672c\u793a\u4f8b",id:"\u57fa\u672c\u793a\u4f8b",children:[]},{value:"\u81ea\u5b9a\u4e49\u6807\u7b7e",id:"\u81ea\u5b9a\u4e49\u6807\u7b7e",children:[]},{value:"\u5706\u5f62\u8fdb\u5ea6\u6761",id:"\u5706\u5f62\u8fdb\u5ea6\u6761",children:[]},{value:"\u81ea\u5b9a\u4e49\u5706\u73af\u5927\u5c0f",id:"\u81ea\u5b9a\u4e49\u5706\u73af\u5927\u5c0f",children:[]}]},{value:"API",id:"api",children:[{value:"Progress",id:"progress",children:[]},{value:"CircleProgress",id:"circleprogress",children:[]}]}],C=function(e){return function(r){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(t.b)("div",r)}},h=C("Story"),_=C("PropsTable"),T={toc:P};function j(e){var r=e.components,n=Object(s.a)(e,["components"]);return Object(t.b)("wrapper",Object(o.a)({},T,n,{components:r,mdxType:"MDXLayout"}),Object(t.b)("h2",{id:"\u4f7f\u7528\u573a\u666f"},"\u4f7f\u7528\u573a\u666f"),Object(t.b)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),Object(t.b)("h3",{id:"\u57fa\u672c\u793a\u4f8b"},"\u57fa\u672c\u793a\u4f8b"),Object(t.b)(h,{fn:a,mdxType:"Story"}),Object(t.b)("h3",{id:"\u81ea\u5b9a\u4e49\u6807\u7b7e"},"\u81ea\u5b9a\u4e49\u6807\u7b7e"),Object(t.b)(h,{fn:d,mdxType:"Story"}),Object(t.b)("h3",{id:"\u5706\u5f62\u8fdb\u5ea6\u6761"},"\u5706\u5f62\u8fdb\u5ea6\u6761"),Object(t.b)(h,{fn:m,mdxType:"Story"}),Object(t.b)("h3",{id:"\u81ea\u5b9a\u4e49\u5706\u73af\u5927\u5c0f"},"\u81ea\u5b9a\u4e49\u5706\u73af\u5927\u5c0f"),Object(t.b)(h,{fn:b,mdxType:"Story"}),Object(t.b)("h2",{id:"api"},"API"),Object(t.b)("h3",{id:"progress"},"Progress"),Object(t.b)(_,{component:c.Progress,mdxType:"PropsTable"}),Object(t.b)("h3",{id:"circleprogress"},"CircleProgress"),Object(t.b)(_,{component:c.CircleProgress,mdxType:"PropsTable"}))}j.isMDXComponent=!0}}]);