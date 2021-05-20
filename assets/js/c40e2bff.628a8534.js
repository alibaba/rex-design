(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{145:function(e,n,i){"use strict";i.r(n),i.d(n,"frontMatter",(function(){return g})),i.d(n,"metadata",(function(){return h})),i.d(n,"toc",(function(){return T})),i.d(n,"default",(function(){return _}));var o=i(3),t=i(7),r=i(0),c=i.n(r),m=i(161),a=i(159),l=function(){return c.a.createElement(a.DemoGroup,null,c.a.createElement(a.TimePicker,{onChange:console.log}),c.a.createElement(a.TimePicker,{defaultValue:"12:30:00",onChange:console.log}))},s={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/time-picker.stories.tsx",loc:{start:{line:6,column:7},end:{line:11,column:2}},name:"Basic",value:l,source:'const Basic = () => (\n  <DemoGroup>\n    <TimePicker onChange={console.log} />\n    <TimePicker defaultValue="12:30:00" onChange={console.log} />\n  </DemoGroup>\n);',deps:function(){return[]},provides:{DemoGroup:a.DemoGroup,TimePicker:a.TimePicker}};l.__doc_info=s,l.__inner_source='() => (\n  <DemoGroup>\n    <TimePicker onChange={console.log} />\n    <TimePicker defaultValue="12:30:00" onChange={console.log} />\n  </DemoGroup>\n)';var u=function(){return c.a.createElement(a.DemoGroup,null,c.a.createElement(a.TimePicker,{mode:"simple",onChange:console.log}))},p={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/time-picker.stories.tsx",loc:{start:{line:13,column:7},end:{line:17,column:2}},name:"Simple",value:u,source:'const Simple = () => (\n  <DemoGroup>\n    <TimePicker mode="simple" onChange={console.log} />\n  </DemoGroup>\n);',deps:function(){return[]},provides:{DemoGroup:a.DemoGroup,TimePicker:a.TimePicker}};u.__doc_info=p,u.__inner_source='() => (\n  <DemoGroup>\n    <TimePicker mode="simple" onChange={console.log} />\n  </DemoGroup>\n)';var d=function(){for(var e=[],n=9;n<22;){var i=n<10?"0"+n:n;e.push({label:i+":00",value:i+":00"}),n++}return c.a.createElement(a.DemoGroup,null,c.a.createElement(a.TimePicker,{getHourItems:function(){return[8,9,10,11,12].map((function(e){return{label:e,value:e}}))},getMinuteItems:function(){return[0,15,30,45].map((function(e){return{label:e,value:e}}))},getSecondItems:function(){return[0,59].map((function(e){return{label:e,value:e}}))}}),c.a.createElement(a.TimePicker,{mode:"simple",getQuickItems:function(){return e}}))},b={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/time-picker.stories.tsx",loc:{start:{line:19,column:7},end:{line:39,column:2}},name:"CustomTimeItems",value:d,source:'const CustomTimeItems = () => {\n  const items = [];\n\n  let i = 9;\n  while (i < 22) {\n    const key = i < 10 ? `0${i}` : i;\n    items.push({ label: `${key}:00`, value: `${key}:00` });\n    i++;\n  }\n\n  return (\n    <DemoGroup>\n      <TimePicker\n        getHourItems={() => [8, 9, 10, 11, 12].map((item) => ({ label: item, value: item }))}\n        getMinuteItems={() => [0, 15, 30, 45].map((item) => ({ label: item, value: item }))}\n        getSecondItems={() => [0, 59].map((item) => ({ label: item, value: item }))}\n      />\n      <TimePicker mode="simple" getQuickItems={() => items} />\n    </DemoGroup>\n  );\n};',deps:function(){return[]},provides:{DemoGroup:a.DemoGroup,TimePicker:a.TimePicker}};d.__doc_info=b,d.__inner_source='() => {\n  const items = [];\n\n  let i = 9;\n  while (i < 22) {\n    const key = i < 10 ? `0${i}` : i;\n    items.push({ label: `${key}:00`, value: `${key}:00` });\n    i++;\n  }\n\n  return (\n    <DemoGroup>\n      <TimePicker\n        getHourItems={() => [8, 9, 10, 11, 12].map((item) => ({ label: item, value: item }))}\n        getMinuteItems={() => [0, 15, 30, 45].map((item) => ({ label: item, value: item }))}\n        getSecondItems={() => [0, 59].map((item) => ({ label: item, value: item }))}\n      />\n      <TimePicker mode="simple" getQuickItems={() => items} />\n    </DemoGroup>\n  );\n}';var k=function(){return c.a.createElement(a.DemoGroup,null,c.a.createElement(a.TimePicker,{hasSeconds:!1,format:"HH:mm"}))},f={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/time-picker.stories.tsx",loc:{start:{line:41,column:7},end:{line:45,column:2}},name:"CustomTimePanels",value:k,source:'const CustomTimePanels = () => (\n  <DemoGroup>\n    <TimePicker hasSeconds={false} format="HH:mm" />\n  </DemoGroup>\n);',deps:function(){return[]},provides:{DemoGroup:a.DemoGroup,TimePicker:a.TimePicker}};k.__inner_source='() => (\n  <DemoGroup>\n    <TimePicker hasSeconds={false} format="HH:mm" />\n  </DemoGroup>\n)',k.__doc_info=f;var g={id:"time-picker",title:"TimePicker \u65f6\u95f4\u9009\u62e9"},h={unversionedId:"time-picker",id:"time-picker",isDocsHomePage:!1,title:"TimePicker \u65f6\u95f4\u9009\u62e9",description:"\u4f7f\u7528\u573a\u666f",source:"@site/docs/time-picker.mdx",sourceDirName:".",slug:"/time-picker",permalink:"/rex-design/docs/time-picker",editUrl:"https://github.com/alibaba/rex-design/edit/main/packages/doc/docs/time-picker.mdx",version:"current",frontMatter:{id:"time-picker",title:"TimePicker \u65f6\u95f4\u9009\u62e9"},sidebar:"docs",previous:{title:"DatePicker \u65e5\u671f\u9009\u62e9",permalink:"/rex-design/docs/date-picker"},next:{title:"FilePicker \u6587\u4ef6\u9009\u62e9\u5668",permalink:"/rex-design/docs/file-picker"}},T=[{value:"\u4f7f\u7528\u573a\u666f",id:"\u4f7f\u7528\u573a\u666f",children:[]},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",children:[{value:"\u57fa\u672c\u793a\u4f8b",id:"\u57fa\u672c\u793a\u4f8b",children:[]},{value:"\u5feb\u6377\u9009\u62e9",id:"\u5feb\u6377\u9009\u62e9",children:[]},{value:"\u81ea\u5b9a\u4e49\u65f6\u95f4\u5217\u8868",id:"\u81ea\u5b9a\u4e49\u65f6\u95f4\u5217\u8868",children:[]},{value:"\u81ea\u5b9a\u4e49\u65f6\u95f4\u9762\u677f",id:"\u81ea\u5b9a\u4e49\u65f6\u95f4\u9762\u677f",children:[]}]},{value:"API",id:"api",children:[]}],v=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(m.b)("div",n)}},P=v("Story"),D=v("PropsTable"),G={toc:T};function _(e){var n=e.components,i=Object(t.a)(e,["components"]);return Object(m.b)("wrapper",Object(o.a)({},G,i,{components:n,mdxType:"MDXLayout"}),Object(m.b)("h2",{id:"\u4f7f\u7528\u573a\u666f"},"\u4f7f\u7528\u573a\u666f"),Object(m.b)("p",null,"\u5f53\u7528\u6237\u9700\u8981\u8f93\u5165\u4e00\u4e2a\u65f6\u95f4\uff0c\u53ef\u4ee5\u70b9\u51fb\u6807\u51c6\u8f93\u5165\u6846\u3002"),Object(m.b)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),Object(m.b)("h3",{id:"\u57fa\u672c\u793a\u4f8b"},"\u57fa\u672c\u793a\u4f8b"),Object(m.b)(P,{fn:l,mdxType:"Story"}),Object(m.b)("h3",{id:"\u5feb\u6377\u9009\u62e9"},"\u5feb\u6377\u9009\u62e9"),Object(m.b)("p",null,"\u5feb\u6377\u9009\u62e9\u5141\u8bb8\u7528\u6237\u63d0\u4f9b\u4e00\u7ec4\u9884\u7f6e\u7684\u65f6\u95f4\u9009\u9879\uff0c\u4f9b\u7528\u6237\u8fdb\u884c\u5feb\u6377\u9009\u62e9\u3002"),Object(m.b)(P,{fn:u,mdxType:"Story"}),Object(m.b)("h3",{id:"\u81ea\u5b9a\u4e49\u65f6\u95f4\u5217\u8868"},"\u81ea\u5b9a\u4e49\u65f6\u95f4\u5217\u8868"),Object(m.b)(P,{fn:d,mdxType:"Story"}),Object(m.b)("h3",{id:"\u81ea\u5b9a\u4e49\u65f6\u95f4\u9762\u677f"},"\u81ea\u5b9a\u4e49\u65f6\u95f4\u9762\u677f"),Object(m.b)(P,{fn:k,mdxType:"Story"}),Object(m.b)("h2",{id:"api"},"API"),Object(m.b)(D,{component:a.TimePicker,mdxType:"PropsTable"}))}_.isMDXComponent=!0}}]);