(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{128:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return N})),t.d(n,"metadata",(function(){return v})),t.d(n,"toc",(function(){return C})),t.d(n,"default",(function(){return O}));var o=t(3),u=t(8),r=t(0),a=t.n(r),l=t(173),c=t(170);c.NumberInput;function i(){return a.a.createElement(c.Group,null,a.a.createElement("h3",null,"\u666e\u901a"),a.a.createElement(c.NumberInput,{defaultValue:1688,onChange:console.log}),a.a.createElement("h3",null,"\u8f93\u5165\u6846\u53ea\u8bfb"),a.a.createElement(c.NumberInput,{defaultValue:1688,onChange:console.log,readOnly:!0}),a.a.createElement("h3",null,"\u7981\u7528"),a.a.createElement(c.NumberInput,{defaultValue:1688,onChange:console.log,disabled:!0}))}var s={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/number-input.stories.tsx",loc:{start:{line:6,column:7},end:{line:17,column:1}},name:"Basic",value:i,source:"function Basic() {\n  return (\n    <Group>\n      <h3>\u666e\u901a</h3>\n      <NumberInput defaultValue={1688} onChange={console.log} />\n      <h3>\u8f93\u5165\u6846\u53ea\u8bfb</h3>\n      <NumberInput defaultValue={1688} onChange={console.log} readOnly />\n      <h3>\u7981\u7528</h3>\n      <NumberInput defaultValue={1688} onChange={console.log} disabled />\n    </Group>\n  );\n}",deps:function(){return[]},provides:{Group:c.Group,NumberInput:c.NumberInput}};function p(){return a.a.createElement(c.NumberInput,{defaultValue:20,min:10,max:30,step:5,onChange:console.log})}i.__doc_info=s,i.__inner_source="function Basic() {\n  return (\n    <Group>\n      <h3>\u666e\u901a</h3>\n      <NumberInput defaultValue={1688} onChange={console.log} />\n      <h3>\u8f93\u5165\u6846\u53ea\u8bfb</h3>\n      <NumberInput defaultValue={1688} onChange={console.log} readOnly />\n      <h3>\u7981\u7528</h3>\n      <NumberInput defaultValue={1688} onChange={console.log} disabled />\n    </Group>\n  );\n}";var d={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/number-input.stories.tsx",loc:{start:{line:19,column:7},end:{line:21,column:1}},name:"MinMaxStep",value:p,source:"function MinMaxStep() {\n  return <NumberInput defaultValue={20} min={10} max={30} step={5} onChange={console.log} />;\n}",deps:function(){return[]},provides:{NumberInput:c.NumberInput}};function m(){return a.a.createElement(c.NumberInput,{defaultValue:11.11,precision:2,step:.01,onChange:console.log})}p.__doc_info=d,p.__inner_source="function MinMaxStep() {\n  return <NumberInput defaultValue={20} min={10} max={30} step={5} onChange={console.log} />;\n}";var b={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/number-input.stories.tsx",loc:{start:{line:23,column:7},end:{line:25,column:1}},name:"Precision",value:m,source:"function Precision() {\n  return <NumberInput defaultValue={11.11} precision={2} step={0.01} onChange={console.log} />;\n}",deps:function(){return[]},provides:{NumberInput:c.NumberInput}};function f(){return a.a.createElement(c.Group,null,a.a.createElement(c.NumberInput,{defaultValue:999999,onChange:console.log}),a.a.createElement(c.NumberInput,{defaultValue:.05,step:.01,onChange:console.log,formatOptions:{style:"percent"}}))}m.__doc_info=b,m.__inner_source="function Precision() {\n  return <NumberInput defaultValue={11.11} precision={2} step={0.01} onChange={console.log} />;\n}";var g={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/number-input.stories.tsx",loc:{start:{line:27,column:7},end:{line:34,column:1}},name:"Format",value:f,source:"function Format() {\n  return (\n    <Group>\n      <NumberInput defaultValue={999999} onChange={console.log} />\n      <NumberInput defaultValue={0.05} step={0.01} onChange={console.log} formatOptions={{ style: 'percent' }} />\n    </Group>\n  );\n}",deps:function(){return[]},provides:{Group:c.Group,NumberInput:c.NumberInput}};function h(){var e=Object(r.useState)(20),n=e[0],t=e[1];return a.a.createElement(c.Group,null,a.a.createElement(c.Button,{onClick:function(){return t(Math.floor(100*Math.random()))}},"\u8bbe\u7f6e\u968f\u673a\u503c"),a.a.createElement(c.NumberInput,{value:n,onChange:console.log}))}f.__doc_info=g,f.__inner_source="function Format() {\n  return (\n    <Group>\n      <NumberInput defaultValue={999999} onChange={console.log} />\n      <NumberInput defaultValue={0.05} step={0.01} onChange={console.log} formatOptions={{ style: 'percent' }} />\n    </Group>\n  );\n}";var I={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/number-input.stories.tsx",loc:{start:{line:36,column:7},end:{line:49,column:1}},name:"Controlled",value:h,source:"function Controlled() {\n  const [value, setValue] = useState(20);\n\n  const random = () => {\n    return Math.floor(Math.random() * 100);\n  };\n\n  return (\n    <Group>\n      <Button onClick={() => setValue(random())}>\u8bbe\u7f6e\u968f\u673a\u503c</Button>\n      <NumberInput value={value} onChange={console.log} />\n    </Group>\n  );\n}",deps:function(){return[]},provides:{useState:r.useState,Group:c.Group,Button:c.Button,NumberInput:c.NumberInput}};h.__inner_source="function Controlled() {\n  const [value, setValue] = useState(20);\n\n  const random = () => {\n    return Math.floor(Math.random() * 100);\n  };\n\n  return (\n    <Group>\n      <Button onClick={() => setValue(random())}>\u8bbe\u7f6e\u968f\u673a\u503c</Button>\n      <NumberInput value={value} onChange={console.log} />\n    </Group>\n  );\n}",h.__doc_info=I;var N={id:"number-input",title:"NumberInput \u6570\u5b57\u8f93\u5165"},v={unversionedId:"number-input",id:"number-input",isDocsHomePage:!1,title:"NumberInput \u6570\u5b57\u8f93\u5165",description:"\u4f7f\u7528\u573a\u666f",source:"@site/docs/number-input.mdx",sourceDirName:".",slug:"/number-input",permalink:"/rex-design/docs/number-input",editUrl:"https://github.com/alibaba/rex-design/edit/main/packages/doc/docs/number-input.mdx",version:"current",frontMatter:{id:"number-input",title:"NumberInput \u6570\u5b57\u8f93\u5165"},sidebar:"docs",previous:{title:"Input \u8f93\u5165\u6846",permalink:"/rex-design/docs/input"},next:{title:"Radio \u5355\u9009\u6309\u94ae",permalink:"/rex-design/docs/radio"}},C=[{value:"\u4f7f\u7528\u573a\u666f",id:"\u4f7f\u7528\u573a\u666f",children:[]},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",children:[{value:"\u57fa\u672c\u793a\u4f8b",id:"\u57fa\u672c\u793a\u4f8b",children:[]},{value:"\u6700\u5927/\u6700\u5c0f/\u6b65\u957f",id:"\u6700\u5927\u6700\u5c0f\u6b65\u957f",children:[]},{value:"\u7cbe\u5ea6\u63a7\u5236",id:"\u7cbe\u5ea6\u63a7\u5236",children:[]}]},{value:"API",id:"api",children:[]}],_=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(l.b)("div",n)}},x=_("Story"),V=_("PropsTable"),y={toc:C};function O(e){var n=e.components,t=Object(u.a)(e,["components"]);return Object(l.b)("wrapper",Object(o.a)({},y,t,{components:n,mdxType:"MDXLayout"}),Object(l.b)("h2",{id:"\u4f7f\u7528\u573a\u666f"},"\u4f7f\u7528\u573a\u666f"),Object(l.b)("p",null,"\u9650\u5236\u7528\u6237\u53ea\u80fd\u8f93\u5165\u6570\u5b57\u7684\u8f93\u5165\u6846\u3002"),Object(l.b)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),Object(l.b)("h3",{id:"\u57fa\u672c\u793a\u4f8b"},"\u57fa\u672c\u793a\u4f8b"),Object(l.b)(x,{fn:i,mdxType:"Story"}),Object(l.b)("h3",{id:"\u6700\u5927\u6700\u5c0f\u6b65\u957f"},"\u6700\u5927/\u6700\u5c0f/\u6b65\u957f"),Object(l.b)(x,{fn:p,mdxType:"Story"}),Object(l.b)("h3",{id:"\u7cbe\u5ea6\u63a7\u5236"},"\u7cbe\u5ea6\u63a7\u5236"),Object(l.b)(x,{fn:m,mdxType:"Story"}),Object(l.b)("h2",{id:"api"},"API"),Object(l.b)(V,{component:c.NumberInput,mdxType:"PropsTable"}))}O.isMDXComponent=!0}}]);