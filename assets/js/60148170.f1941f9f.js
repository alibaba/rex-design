(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{134:function(e,n,l){"use strict";l.r(n),l.d(n,"frontMatter",(function(){return M})),l.d(n,"metadata",(function(){return v})),l.d(n,"toc",(function(){return O})),l.d(n,"default",(function(){return C}));var t=l(3),o=l(7),c=l(0),a=l.n(c),r=l(166),i=l(163);function u(){return a.a.createElement(i.Menu,{style:{width:200},dataSource:[{key:"1",label:"\u9009\u9879 1"},{key:"2",label:"\u9009\u9879 2",disabled:!0},{key:"3",label:"Option 2"}],onItemClick:function(e,n){console.log("YOUR click",e,n)}})}var s={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/menu.stories.tsx",loc:{start:{line:6,column:7},end:{line:20,column:1}},name:"Basic",value:u,source:"function Basic() {\n  return (\n    <Menu\n      style={{ width: 200 }}\n      dataSource={[\n        { key: '1', label: '\u9009\u9879 1' },\n        { key: '2', label: '\u9009\u9879 2', disabled: true },\n        { key: '3', label: 'Option 2' },\n      ]}\n      onItemClick={(key, detail) => {\n        console.log('YOUR click', key, detail);\n      }}\n    />\n  );\n}",deps:function(){return[]},provides:{Menu:i.Menu}};u.__doc_info=s,u.__inner_source="function Basic() {\n  return (\n    <Menu\n      style={{ width: 200 }}\n      dataSource={[\n        { key: '1', label: '\u9009\u9879 1' },\n        { key: '2', label: '\u9009\u9879 2', disabled: true },\n        { key: '3', label: 'Option 2' },\n      ]}\n      onItemClick={(key, detail) => {\n        console.log('YOUR click', key, detail);\n      }}\n    />\n  );\n}";var d=[{key:"1",label:"\u9009\u9879 1",selected:!0,helper:"Ctrl+P"},{key:"2",label:"Option 2",disabled:!0},{key:"3",type:"divider"},{key:"4",label:"\u52a8\u7269\u56ed"},{key:"zoo",type:"submenu",label:"\u963f\u91cc\u52a8\u7269\u56ed",children:[{key:"\u76d2\u9a6c",label:"\u76d2\u9a6c"},{key:"\u6dd8\u5b9d",label:"\u6dd8\u5b9d",selected:!0},{key:"\u5929\u732b",label:"\u5929\u732b"},{key:"foo-4",type:"submenu",label:"\u5176\u4ed6\u5c0f\u670b\u53cb",children:[{key:"\u5c0f\u7ea2\u7ea2",label:"\u5c0f\u7ea2\u7ea2"},{key:"\u5c0f\u84dd\u84dd",label:"\u5c0f\u84dd\u84dd"},{key:"\u5c0f\u7070\u7070",label:"\u5c0f\u7070\u7070"}]}]},{key:"2\u53f7\u52a8\u7269\u56ed",type:"group",helper:"1.12 \u76db\u5927\u5f00\u4e1a",label:"2\u53f7\u52a8\u7269\u56ed",children:[{key:"\u5c0f\u8111\u864e",label:"\u5c0f\u8111\u864e"},{key:"\u5c0f\u72ee\u5b50",label:"\u5c0f\u72ee\u5b50",selected:!0},{key:"\u5c0f\u4f01\u9e45",label:"\u5c0f\u4f01\u9e45"},{key:"bar-4",type:"submenu",label:"\u5c0f\u670b\u53cb",children:[{key:"\u5c0f\u7ea2\u7ea2",label:"\u5c0f\u7ea2\u7ea2"},{key:"\u5c0f\u84dd\u84dd",label:"\u5c0f\u84dd\u84dd"},{key:"\u5c0f\u7070\u7070",label:"\u5c0f\u7070\u7070"}]}]}],b={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/menu.stories.tsx",loc:{start:{line:22,column:0},end:{line:68,column:2}},name:"groupAndSubMenuDataSource",value:d,source:"const groupAndSubMenuDataSource = [\n  { key: '1', label: '\u9009\u9879 1', selected: true, helper: 'Ctrl+P' },\n  { key: '2', label: 'Option 2', disabled: true },\n  { key: '3', type: 'divider' },\n  { key: '4', label: '\u52a8\u7269\u56ed' },\n  {\n    key: 'zoo',\n    type: 'submenu',\n    label: '\u963f\u91cc\u52a8\u7269\u56ed',\n    children: [\n      { key: '\u76d2\u9a6c', label: '\u76d2\u9a6c' },\n      { key: '\u6dd8\u5b9d', label: '\u6dd8\u5b9d', selected: true },\n      { key: '\u5929\u732b', label: '\u5929\u732b' },\n      {\n        key: 'foo-4',\n        type: 'submenu',\n        label: '\u5176\u4ed6\u5c0f\u670b\u53cb',\n        children: [\n          { key: '\u5c0f\u7ea2\u7ea2', label: '\u5c0f\u7ea2\u7ea2' },\n          { key: '\u5c0f\u84dd\u84dd', label: '\u5c0f\u84dd\u84dd' },\n          { key: '\u5c0f\u7070\u7070', label: '\u5c0f\u7070\u7070' },\n        ],\n      },\n    ],\n  },\n  {\n    key: '2\u53f7\u52a8\u7269\u56ed',\n    type: 'group',\n    helper: '1.12 \u76db\u5927\u5f00\u4e1a',\n    label: '2\u53f7\u52a8\u7269\u56ed',\n    children: [\n      { key: '\u5c0f\u8111\u864e', label: '\u5c0f\u8111\u864e' },\n      { key: '\u5c0f\u72ee\u5b50', label: '\u5c0f\u72ee\u5b50', selected: true },\n      { key: '\u5c0f\u4f01\u9e45', label: '\u5c0f\u4f01\u9e45' },\n      {\n        key: 'bar-4',\n        type: 'submenu',\n        label: '\u5c0f\u670b\u53cb',\n        children: [\n          { key: '\u5c0f\u7ea2\u7ea2', label: '\u5c0f\u7ea2\u7ea2' },\n          { key: '\u5c0f\u84dd\u84dd', label: '\u5c0f\u84dd\u84dd' },\n          { key: '\u5c0f\u7070\u7070', label: '\u5c0f\u7070\u7070' },\n        ],\n      },\n    ],\n  },\n];",deps:function(){return[]},provides:{}};function y(){return a.a.createElement(i.Menu,{style:{width:200},dataSource:d,onItemClick:function(e,n){console.log("YOUR click",e,n)}})}var p={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/menu.stories.tsx",loc:{start:{line:70,column:7},end:{line:80,column:1}},name:"GroupAndSubMenu",value:y,source:"function GroupAndSubMenu() {\n  return (\n    <Menu\n      style={{ width: 200 }}\n      dataSource={groupAndSubMenuDataSource}\n      onItemClick={(key, detail) => {\n        console.log('YOUR click', key, detail);\n      }}\n    />\n  );\n}",deps:function(){return[b]},provides:{Menu:i.Menu}};function k(){var e=Object(c.useState)(["1","3"]),n=e[0],l=e[1];return a.a.createElement("div",null,a.a.createElement("p",null,"selectedKeys: ",n.join(",")),a.a.createElement(i.Menu,{style:{width:200},dataSource:[{key:"1",label:"\u9009\u9879 1 ",helper:"Ctrl+P"},{key:"2",label:"\u9009\u9879 2"},{key:"3",label:"Option 3"}],selectMode:"multiple",selectedKeys:n,onSelect:l}))}y.__doc_info=p,y.__inner_source="function GroupAndSubMenu() {\n  return (\n    <Menu\n      style={{ width: 200 }}\n      dataSource={groupAndSubMenuDataSource}\n      onItemClick={(key, detail) => {\n        console.log('YOUR click', key, detail);\n      }}\n    />\n  );\n}";var m={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/menu.stories.tsx",loc:{start:{line:82,column:7},end:{line:101,column:1}},name:"MultiSelect",value:k,source:"function MultiSelect() {\n  const [selectedKeys, onSelect] = useState(['1', '3']);\n\n  return (\n    <div>\n      <p>selectedKeys: {selectedKeys.join(',')}</p>\n      <Menu\n        style={{ width: 200 }}\n        dataSource={[\n          { key: '1', label: '\u9009\u9879 1 ', helper: 'Ctrl+P' },\n          { key: '2', label: '\u9009\u9879 2' },\n          { key: '3', label: 'Option 3' },\n        ]}\n        selectMode=\"multiple\"\n        selectedKeys={selectedKeys}\n        onSelect={onSelect}\n      />\n    </div>\n  );\n}",deps:function(){return[]},provides:{useState:c.useState,Menu:i.Menu}};function f(){return a.a.createElement(i.Menu,{style:{width:200},dataSource:[{key:"1",label:"\u9009\u9879 1 ",helper:"Ctrl+P"},{key:"2",label:"\u9009\u9879 2"},{key:"3",label:"Option 3"}],selectMode:"single",defaultSelectedKeys:["1"],onSelect:function(e,n){console.log("onSelect",{nextKeys:e,detail:n})}})}k.__doc_info=m,k.__inner_source="function MultiSelect() {\n  const [selectedKeys, onSelect] = useState(['1', '3']);\n\n  return (\n    <div>\n      <p>selectedKeys: {selectedKeys.join(',')}</p>\n      <Menu\n        style={{ width: 200 }}\n        dataSource={[\n          { key: '1', label: '\u9009\u9879 1 ', helper: 'Ctrl+P' },\n          { key: '2', label: '\u9009\u9879 2' },\n          { key: '3', label: 'Option 3' },\n        ]}\n        selectMode=\"multiple\"\n        selectedKeys={selectedKeys}\n        onSelect={onSelect}\n      />\n    </div>\n  );\n}";var h={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/menu.stories.tsx",loc:{start:{line:103,column:7},end:{line:119,column:1}},name:"UncontrolledSingleSelect",value:f,source:"function UncontrolledSingleSelect() {\n  return (\n    <Menu\n      style={{ width: 200 }}\n      dataSource={[\n        { key: '1', label: '\u9009\u9879 1 ', helper: 'Ctrl+P' },\n        { key: '2', label: '\u9009\u9879 2' },\n        { key: '3', label: 'Option 3' },\n      ]}\n      selectMode=\"single\"\n      defaultSelectedKeys={['1']}\n      onSelect={(nextKeys, detail) => {\n        console.log('onSelect', { nextKeys, detail });\n      }}\n    />\n  );\n}",deps:function(){return[]},provides:{Menu:i.Menu}};function S(){return a.a.createElement(i.Popup,{trigger:a.a.createElement(i.Button,null,"\u66f4\u591a\u64cd\u4f5c"),hasArrow:!0},a.a.createElement(i.Menu,{style:{width:200},dataSource:d,onItemClick:function(e,n){console.log("onItemClick",e,n)}}))}f.__doc_info=h,f.__inner_source="function UncontrolledSingleSelect() {\n  return (\n    <Menu\n      style={{ width: 200 }}\n      dataSource={[\n        { key: '1', label: '\u9009\u9879 1 ', helper: 'Ctrl+P' },\n        { key: '2', label: '\u9009\u9879 2' },\n        { key: '3', label: 'Option 3' },\n      ]}\n      selectMode=\"single\"\n      defaultSelectedKeys={['1']}\n      onSelect={(nextKeys, detail) => {\n        console.log('onSelect', { nextKeys, detail });\n      }}\n    />\n  );\n}";var g={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/menu.stories.tsx",loc:{start:{line:121,column:7},end:{line:133,column:1}},name:"DropdownMenu",value:S,source:"function DropdownMenu() {\n  return (\n    <Popup trigger={<Button>\u66f4\u591a\u64cd\u4f5c</Button>} hasArrow>\n      <Menu\n        style={{ width: 200 }}\n        dataSource={groupAndSubMenuDataSource}\n        onItemClick={(key, detail) => {\n          console.log('onItemClick', key, detail);\n        }}\n      />\n    </Popup>\n  );\n}",deps:function(){return[b]},provides:{Popup:i.Popup,Button:i.Button,Menu:i.Menu}};S.__inner_source="function DropdownMenu() {\n  return (\n    <Popup trigger={<Button>\u66f4\u591a\u64cd\u4f5c</Button>} hasArrow>\n      <Menu\n        style={{ width: 200 }}\n        dataSource={groupAndSubMenuDataSource}\n        onItemClick={(key, detail) => {\n          console.log('onItemClick', key, detail);\n        }}\n      />\n    </Popup>\n  );\n}",S.__doc_info=g;var M={id:"menu",title:"Menu \u83dc\u5355"},v={unversionedId:"menu",id:"menu",isDocsHomePage:!1,title:"Menu \u83dc\u5355",description:"\u4f7f\u7528\u573a\u666f",source:"@site/docs/menu.mdx",sourceDirName:".",slug:"/menu",permalink:"/rex-design/docs/menu",editUrl:"https://github.com/alibaba/rex-design/edit/main/packages/doc/docs/menu.mdx",version:"current",frontMatter:{id:"menu",title:"Menu \u83dc\u5355"},sidebar:"docs",previous:{title:"Steps \u6b65\u9aa4\u6761",permalink:"/rex-design/docs/steps"},next:{title:"Tabs \u9009\u9879\u5361",permalink:"/rex-design/docs/tabs"}},O=[{value:"\u4f7f\u7528\u573a\u666f",id:"\u4f7f\u7528\u573a\u666f",children:[]},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",children:[{value:"\u57fa\u672c\u7528\u6cd5",id:"\u57fa\u672c\u7528\u6cd5",children:[]},{value:"\u5206\u7ec4\u4e0e\u5b50\u83dc\u5355",id:"\u5206\u7ec4\u4e0e\u5b50\u83dc\u5355",children:[]},{value:"\u591a\u9009",id:"\u591a\u9009",children:[]},{value:"\u975e\u53d7\u63a7\u72b6\u6001",id:"\u975e\u53d7\u63a7\u72b6\u6001",children:[]},{value:"\u4e94\u5341\u4e2a\u83dc\u5355\u9879",id:"\u4e94\u5341\u4e2a\u83dc\u5355\u9879",children:[]}]},{value:"API",id:"api",children:[]}],x=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(r.b)("div",n)}},w=x("Story"),_=x("PropsTable"),j={toc:O};function C(e){var n=e.components,l=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(t.a)({},j,l,{components:n,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"\u4f7f\u7528\u573a\u666f"},"\u4f7f\u7528\u573a\u666f"),Object(r.b)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),Object(r.b)("h3",{id:"\u57fa\u672c\u7528\u6cd5"},"\u57fa\u672c\u7528\u6cd5"),Object(r.b)(w,{fn:u,mdxType:"Story"}),Object(r.b)("h3",{id:"\u5206\u7ec4\u4e0e\u5b50\u83dc\u5355"},"\u5206\u7ec4\u4e0e\u5b50\u83dc\u5355"),Object(r.b)(w,{fn:y,mdxType:"Story"}),Object(r.b)("h3",{id:"\u591a\u9009"},"\u591a\u9009"),Object(r.b)(w,{fn:k,mdxType:"Story"}),Object(r.b)("h3",{id:"\u975e\u53d7\u63a7\u72b6\u6001"},"\u975e\u53d7\u63a7\u72b6\u6001"),Object(r.b)(w,{fn:void 0,mdxType:"Story"}),Object(r.b)("h3",{id:"\u4e94\u5341\u4e2a\u83dc\u5355\u9879"},"\u4e94\u5341\u4e2a\u83dc\u5355\u9879"),Object(r.b)(w,{fn:void 0,mdxType:"Story"}),Object(r.b)("h2",{id:"api"},"API"),Object(r.b)(_,{component:i.Menu,mdxType:"PropsTable"}))}C.isMDXComponent=!0}}]);