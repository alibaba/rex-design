(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{276:function(e,n,t){"use strict";t.d(n,"a",(function(){return b}));var a=t(177),l=t(0),r=t(697),c=t(376),o=t(246),u=t(561),i=t(208);const s=Object(r.a)(()=>fetch("https://item.hemaos.com/itemAPI/QueryMerchantCategoryTree.json",{credentials:"include"})).pipe(c.a(e=>e.json()),o.a(e=>e.result[0].children),o.a(e=>Object(a.d)(e=>({key:e.key,label:e.name,children:e.children}))(e)),u.a(1)),d={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/test-tree-data.tsx",loc:{start:{line:21,column:0},end:{line:41,column:2}},name:"cateTree$",value:s,source:"const cateTree$ = defer(() =>\n  fetch('https://item.hemaos.com/itemAPI/QueryMerchantCategoryTree.json', {\n    credentials: 'include',\n  }),\n).pipe(\n  op.switchMap((res) => res.json()),\n  op.map((result) => result.result[0].children ),\n  op.map((cateTree) => {\n    const mapper = makeRecursiveMapper((cateItem) => {\n      const treeItem = {\n        key: cateItem.key,\n        label: cateItem.name,\n        children: cateItem.children,\n      };\n      return treeItem;\n    });\n    const result = mapper(cateTree);\n    return result;\n  }),\n  op.shareReplay(1),\n);",deps:()=>[],provides:{defer:r.a,op:i,makeRecursiveMapper:a.d}};function b(){const[e,n]=Object(l.useState)([]);return Object(l.useEffect)(()=>{s.subscribe(n)},[]),e}const p={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/test-tree-data.tsx",loc:{start:{line:43,column:7},end:{line:51,column:1}},name:"useCateTree",value:b,source:"function useCateTree() {\n  const [dataSource, setDataSource] = useState([]);\n\n  useEffect(() => {\n    cateTree$.subscribe(setDataSource);\n  }, []);\n\n  return dataSource;\n}",deps:()=>[d],provides:{useState:l.useState,useEffect:l.useEffect}};b.__inner_source="function useCateTree() {\n  const [dataSource, setDataSource] = useState([]);\n\n  useEffect(() => {\n    cateTree$.subscribe(setDataSource);\n  }, []);\n\n  return dataSource;\n}",b.__doc_info=p},309:function(e,n,t){"use strict";t.d(n,"e",(function(){return u})),t.d(n,"a",(function(){return s})),t.d(n,"d",(function(){return b})),t.d(n,"b",(function(){return h})),t.d(n,"c",(function(){return m}));var a=t(165),l=t(177),r=t(0),c=t.n(r),o=t(276);const u=[{value:"1",label:"Option 1"},{value:"2",label:"Option 2",disabled:!0},{value:"4",label:"\u52a8\u7269\u56ed"},{value:"zoo",label:"\u963f\u91cc\u52a8\u7269\u56ed",children:[{value:"\u76d2\u9a6c",label:"\u76d2\u9a6c"},{value:"\u6dd8\u5b9d",label:"\u6dd8\u5b9d"},{value:"\u5929\u732b",label:"\u5929\u732b"},{value:"foo-4",label:"\u5176\u4ed6\u5c0f\u670b\u53cb",children:[{value:"\u5c0f\u7ea2\u7ea2",label:"\u5c0f\u7ea2\u7ea2"},{value:"\u5c0f\u84dd\u84dd",label:"\u5c0f\u84dd\u84dd"},{value:"\u5c0f\u7070\u7070",label:"\u5c0f\u7070\u7070"}]}]},{value:"2\u53f7\u52a8\u7269\u56ed",label:"2\u53f7\u52a8\u7269\u56ed",children:[{value:"\u5c0f\u8111\u864e",label:"\u5c0f\u8111\u864e"},{value:"\u5c0f\u72ee\u5b50",label:"\u5c0f\u72ee\u5b50"},{value:"\u5c0f\u4f01\u9e45",label:"\u5c0f\u4f01\u9e45"},{value:"bar-4",label:"\u5c0f\u670b\u53cb",children:[{value:"bar-4-\u5c0f\u7ea2\u7ea2",label:"\u5c0f\u7ea2\u7ea2"},{value:"bar-4-\u5c0f\u84dd\u84dd",label:"\u5c0f\u84dd\u84dd"},{value:"bar-4-\u5c0f\u7070\u7070",label:"\u5c0f\u7070\u7070"}]}]}],i={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/select/tree-select.stories.tsx",loc:{start:{line:11,column:7},end:{line:51,column:2}},name:"bigTreeDataSource",value:u,source:"const bigTreeDataSource = [\n  { value: '1', label: 'Option 1' },\n  { value: '2', label: 'Option 2', disabled: true },\n  { value: '4', label: '\u52a8\u7269\u56ed' },\n  {\n    value: 'zoo',\n    label: '\u963f\u91cc\u52a8\u7269\u56ed',\n    children: [\n      { value: '\u76d2\u9a6c', label: '\u76d2\u9a6c' },\n      { value: '\u6dd8\u5b9d', label: '\u6dd8\u5b9d' },\n      { value: '\u5929\u732b', label: '\u5929\u732b' },\n      {\n        value: 'foo-4',\n        label: '\u5176\u4ed6\u5c0f\u670b\u53cb',\n        children: [\n          { value: '\u5c0f\u7ea2\u7ea2', label: '\u5c0f\u7ea2\u7ea2' },\n          { value: '\u5c0f\u84dd\u84dd', label: '\u5c0f\u84dd\u84dd' },\n          { value: '\u5c0f\u7070\u7070', label: '\u5c0f\u7070\u7070' },\n        ],\n      },\n    ],\n  },\n  {\n    value: '2\u53f7\u52a8\u7269\u56ed',\n    label: '2\u53f7\u52a8\u7269\u56ed',\n    children: [\n      { value: '\u5c0f\u8111\u864e', label: '\u5c0f\u8111\u864e' },\n      { value: '\u5c0f\u72ee\u5b50', label: '\u5c0f\u72ee\u5b50' },\n      { value: '\u5c0f\u4f01\u9e45', label: '\u5c0f\u4f01\u9e45' },\n      {\n        value: 'bar-4',\n        label: '\u5c0f\u670b\u53cb',\n        children: [\n          { value: 'bar-4-\u5c0f\u7ea2\u7ea2', label: '\u5c0f\u7ea2\u7ea2' },\n          { value: 'bar-4-\u5c0f\u84dd\u84dd', label: '\u5c0f\u84dd\u84dd' },\n          { value: 'bar-4-\u5c0f\u7070\u7070', label: '\u5c0f\u7070\u7070' },\n        ],\n      },\n    ],\n  },\n];",deps:()=>[],provides:{}};function s(){const[e,n]=Object(r.useState)("");return c.a.createElement(a.TreeSelect.Single,{defaultExpandAll:!0,onChange:n,value:e,dataSource:u})}const d={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/select/tree-select.stories.tsx",loc:{start:{line:53,column:7},end:{line:56,column:1}},name:"Basic",value:s,source:"function Basic() {\n  const [value, onChange] = useState('');\n  return <TreeSelect.Single defaultExpandAll onChange={onChange} value={value} dataSource={bigTreeDataSource} />;\n}",deps:()=>[i],provides:{useState:r.useState,TreeSelect:a.TreeSelect}};function b(){const[e,n]=Object(r.useState)("");return c.a.createElement(a.TreeSelect.Single,{fill:!0,defaultExpandAll:!0,showSearch:!0,onChange:n,value:e,dataSource:u})}s.__doc_info=d,s.__inner_source="function Basic() {\n  const [value, onChange] = useState('');\n  return <TreeSelect.Single defaultExpandAll onChange={onChange} value={value} dataSource={bigTreeDataSource} />;\n}";const p={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/select/tree-select.stories.tsx",loc:{start:{line:58,column:7},end:{line:70,column:1}},name:"ShowSearch",value:b,source:"function ShowSearch() {\n  const [value, onChange] = useState('');\n  return (\n    <TreeSelect.Single\n      fill\n      defaultExpandAll\n      showSearch\n      onChange={onChange}\n      value={value}\n      dataSource={bigTreeDataSource}\n    />\n  );\n}",deps:()=>[i],provides:{useState:r.useState,TreeSelect:a.TreeSelect}};function h(){const e=Object(o.a)(),n=Object(l.d)(e=>({...e,value:e.key}))(e);return 0===n.length?"loading...":c.a.createElement(a.TreeSelect.Single,{style:{width:200},popupProps:{style:{width:350}},dataSource:n,defaultExpandAll:!0,showSearch:!0,placeholder:"\u8bf7\u9009\u62e9\u4e00\u4e2a\u9879\u76ee"})}b.__doc_info=p,b.__inner_source="function ShowSearch() {\n  const [value, onChange] = useState('');\n  return (\n    <TreeSelect.Single\n      fill\n      defaultExpandAll\n      showSearch\n      onChange={onChange}\n      value={value}\n      dataSource={bigTreeDataSource}\n    />\n  );\n}";const S={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/select/tree-select.stories.tsx",loc:{start:{line:72,column:7},end:{line:93,column:1}},name:"HippoCategoryTree",value:h,source:"function HippoCategoryTree() {\n  const cateTree = useCateTree();\n\n  const dataSource = (makeRecursiveMapper((item) => ({ ...item, value: item.key }))(\n    cateTree,\n  ) ) ;\n\n  if (dataSource.length === 0) {\n    return 'loading...';\n  }\n\n  return (\n    <TreeSelect.Single\n      style={{ width: 200 }}\n      popupProps={{ style: { width: 350 } }}\n      dataSource={dataSource}\n      defaultExpandAll\n      showSearch\n      placeholder=\"\u8bf7\u9009\u62e9\u4e00\u4e2a\u9879\u76ee\"\n    />\n  );\n}",deps:()=>[],provides:{useCateTree:o.a,makeRecursiveMapper:l.d,TreeSelect:a.TreeSelect}};function m(){const e=Object(o.a)(),n=Object(l.d)(e=>({...e,value:e.key}))(e),[t,u]=Object(r.useState)([]);return 0===n.length?"loading...":c.a.createElement(a.TreeSelect.Multi,{style:{width:300},value:t,onChange:u,dataSource:n,showSearch:!0,placeholder:"\u8bf7\u9009\u62e9\u7c7b\u76ee",defaultExpandAll:!0})}h.__doc_info=S,h.__inner_source="function HippoCategoryTree() {\n  const cateTree = useCateTree();\n\n  const dataSource = (makeRecursiveMapper((item) => ({ ...item, value: item.key }))(\n    cateTree,\n  ) ) ;\n\n  if (dataSource.length === 0) {\n    return 'loading...';\n  }\n\n  return (\n    <TreeSelect.Single\n      style={{ width: 200 }}\n      popupProps={{ style: { width: 350 } }}\n      dataSource={dataSource}\n      defaultExpandAll\n      showSearch\n      placeholder=\"\u8bf7\u9009\u62e9\u4e00\u4e2a\u9879\u76ee\"\n    />\n  );\n}";const v={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/select/tree-select.stories.tsx",loc:{start:{line:95,column:7},end:{line:119,column:1}},name:"MultiHippoCategoryTree",value:m,source:"function MultiHippoCategoryTree() {\n  const cateTree = useCateTree();\n\n  const dataSource = (makeRecursiveMapper((item) => ({ ...item, value: item.key }))(\n    cateTree,\n  ) ) ;\n\n  const [value, onChange] = useState([]);\n\n  if (dataSource.length === 0) {\n    return 'loading...';\n  }\n\n  return (\n    <TreeSelect.Multi\n      style={{ width: 300 }}\n      value={value}\n      onChange={onChange}\n      dataSource={dataSource}\n      showSearch\n      placeholder=\"\u8bf7\u9009\u62e9\u7c7b\u76ee\"\n      defaultExpandAll\n    />\n  );\n}",deps:()=>[],provides:{useCateTree:o.a,makeRecursiveMapper:l.d,useState:r.useState,TreeSelect:a.TreeSelect}};m.__inner_source="function MultiHippoCategoryTree() {\n  const cateTree = useCateTree();\n\n  const dataSource = (makeRecursiveMapper((item) => ({ ...item, value: item.key }))(\n    cateTree,\n  ) ) ;\n\n  const [value, onChange] = useState([]);\n\n  if (dataSource.length === 0) {\n    return 'loading...';\n  }\n\n  return (\n    <TreeSelect.Multi\n      style={{ width: 300 }}\n      value={value}\n      onChange={onChange}\n      dataSource={dataSource}\n      showSearch\n      placeholder=\"\u8bf7\u9009\u62e9\u7c7b\u76ee\"\n      defaultExpandAll\n    />\n  );\n}",m.__doc_info=v},88:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return u})),t.d(n,"metadata",(function(){return i})),t.d(n,"toc",(function(){return s})),t.d(n,"default",(function(){return S}));var a=t(3),l=t(8),r=(t(0),t(168)),c=t(165),o=t(309),u={id:"tree-select",title:"TreeSelect \u6811\u5f62\u9009\u62e9"},i={unversionedId:"tree-select",id:"tree-select",isDocsHomePage:!1,title:"TreeSelect \u6811\u5f62\u9009\u62e9",description:"\u4f7f\u7528\u573a\u666f",source:"@site/docs/tree-select.mdx",sourceDirName:".",slug:"/tree-select",permalink:"/rex-design/docs/tree-select",editUrl:"https://github.com/alibaba/rex-design/edit/main/packages/doc/docs/tree-select.mdx",version:"current",frontMatter:{id:"tree-select",title:"TreeSelect \u6811\u5f62\u9009\u62e9"},sidebar:"docs",previous:{title:"Select \u9009\u62e9\u5668",permalink:"/rex-design/docs/select"},next:{title:"CascaderSelect \u7ea7\u8054\u9009\u62e9",permalink:"/rex-design/docs/cascader-select"}},s=[{value:"\u4f7f\u7528\u573a\u666f",id:"\u4f7f\u7528\u573a\u666f",children:[{value:"\u5355\u9009\u4e0e\u591a\u9009",id:"\u5355\u9009\u4e0e\u591a\u9009",children:[]},{value:"\u4f7f\u7528\u8bf4\u660e",id:"\u4f7f\u7528\u8bf4\u660e",children:[]}]},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",children:[{value:"\u57fa\u672c\u793a\u4f8b",id:"\u57fa\u672c\u793a\u4f8b",children:[]},{value:"\u641c\u7d22\u7528\u6cd5",id:"\u641c\u7d22\u7528\u6cd5",children:[]}]},{value:"\u5b9e\u8df5",id:"\u5b9e\u8df5",children:[{value:"\u76d2\u9a6c\u7c7b\u76ee\u641c\u7d22",id:"\u76d2\u9a6c\u7c7b\u76ee\u641c\u7d22",children:[]},{value:"\u76d2\u9a6c\u7c7b\u76ee\u591a\u9009",id:"\u76d2\u9a6c\u7c7b\u76ee\u591a\u9009",children:[]}]},{value:"API",id:"api",children:[]}],d=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(r.b)("div",n)}},b=d("Story"),p=d("PropsTable"),h={toc:s};function S(e){var n=e.components,t=Object(l.a)(e,["components"]);return Object(r.b)("wrapper",Object(a.a)({},h,t,{components:n,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"\u4f7f\u7528\u573a\u666f"},"\u4f7f\u7528\u573a\u666f"),Object(r.b)("p",null,"\u6811\u5f62\u7ed3\u6784\u7684\u9009\u62e9\u5668\uff0c\u5e38\u7528\u4e8e\u76d2\u9a6c\u95e8\u5e97\u9009\u62e9\uff08\u4e00\u822c\u662f\u4e09\u5c42\u7ed3\u6784\uff1a\u5546\u5bb6\u3001\u5b50\u516c\u53f8\u3001\u95e8\u5e97\uff09\uff0c\u76d2\u9a6c\u5546\u54c1\u7c7b\u76ee\u9009\u62e9\uff08\u4e00\u7ea7\u7c7b\u76ee\u3001\u4e8c\u7ea7\u7c7b\u76ee\u3001\u4e09\u7ea7\u7c7b\u76ee\uff09\u7b49\u573a\u666f\u3002"),Object(r.b)("h3",{id:"\u5355\u9009\u4e0e\u591a\u9009"},"\u5355\u9009\u4e0e\u591a\u9009"),Object(r.b)("p",null,"TreeSelect \u652f\u6301\u4ee5\u4e0b\u4e24\u79cd\u65b9\u5f0f\u6765\u5f00\u542f\u591a\u9009\u6a21\u5f0f\uff1a"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},"\u8bbe\u7f6e ",Object(r.b)("inlineCode",{parentName:"li"},"multiple={true}")),Object(r.b)("li",{parentName:"ul"},"\u4f7f\u7528 ",Object(r.b)("inlineCode",{parentName:"li"},"<TreeSelect.Multi />")," \u7ec4\u4ef6")),Object(r.b)("p",null,"\u5728 TypeScript \u9879\u76ee\u4e2d\uff0c\u6211\u4eec\u63a8\u8350\u4f7f\u7528\u7ec4\u4ef6\u6765\u5207\u6362\u5355\u9009\uff08TreeSelect.Single\uff09\u548c\u591a\u9009\uff08TreeSelect.Multi\uff09\uff0c\u7c7b\u578b\u63d0\u793a\u548c\u68c0\u67e5\u5c06\u66f4\u51c6\u786e\u3002"),Object(r.b)("h3",{id:"\u4f7f\u7528\u8bf4\u660e"},"\u4f7f\u7528\u8bf4\u660e"),Object(r.b)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),Object(r.b)("h3",{id:"\u57fa\u672c\u793a\u4f8b"},"\u57fa\u672c\u793a\u4f8b"),Object(r.b)(b,{fn:o.a,mdxType:"Story"}),Object(r.b)("h3",{id:"\u641c\u7d22\u7528\u6cd5"},"\u641c\u7d22\u7528\u6cd5"),Object(r.b)(b,{fn:o.d,mdxType:"Story"}),Object(r.b)("h2",{id:"\u5b9e\u8df5"},"\u5b9e\u8df5"),Object(r.b)("h3",{id:"\u76d2\u9a6c\u7c7b\u76ee\u641c\u7d22"},"\u76d2\u9a6c\u7c7b\u76ee\u641c\u7d22"),Object(r.b)(b,{fn:o.b,mdxType:"Story"}),Object(r.b)("h3",{id:"\u76d2\u9a6c\u7c7b\u76ee\u591a\u9009"},"\u76d2\u9a6c\u7c7b\u76ee\u591a\u9009"),Object(r.b)(b,{fn:o.c,mdxType:"Story"}),Object(r.b)("h2",{id:"api"},"API"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"TreeSelect.Multi")," \u548c ",Object(r.b)("inlineCode",{parentName:"p"},"TreeSelect.Single")," \u7684\u533a\u522b\uff1a"),Object(r.b)("ul",null,Object(r.b)("li",{parentName:"ul"},Object(r.b)("inlineCode",{parentName:"li"},"value")," \u7684\u7c7b\u578b\u4e0d\u540c\uff0c",Object(r.b)("inlineCode",{parentName:"li"},"defaultValue"),", ",Object(r.b)("inlineCode",{parentName:"li"},"onChange")," \u7684\u7c7b\u578b\u4e5f\u6709\u76f8\u5e94\u7684\u533a\u522b"),Object(r.b)("li",{parentName:"ul"},"\u591a\u9009\u989d\u5916\u652f\u6301 ",Object(r.b)("inlineCode",{parentName:"li"},"checkStrictly")," \u548c ",Object(r.b)("inlineCode",{parentName:"li"},"checkedStrategy"),"\uff0c\u8fd9\u4e24\u4e2a props \u542b\u4e49\u8be6\u89c1 ",Object(r.b)("a",{parentName:"li",href:"tree#api"},"Tree \u7ec4\u4ef6\u6587\u6863"))),Object(r.b)(p,{component:c.TreeSelect,mdxType:"PropsTable"}))}S.isMDXComponent=!0}}]);