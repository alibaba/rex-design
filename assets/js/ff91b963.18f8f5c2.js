(window.webpackJsonp=window.webpackJsonp||[]).push([[85],{162:function(e,n,a){"use strict";a.r(n),a.d(n,"frontMatter",(function(){return W})),a.d(n,"metadata",(function(){return F})),a.d(n,"toc",(function(){return G})),a.d(n,"default",(function(){return ne}));var t,o=a(3),r=a(7),s=a(0),i=a.n(s),c=a(166),l=a(163),d=a(165),u=a(167),m=a.n(u),p=a(26),b=a(375);function h(e,n){for(var a=[],t=0;t<n;t++)a=a.concat(e);return a}var g={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:10,column:0},end:{line:16,column:1}},name:"repeat",value:h,source:"function repeat(arr, n) {\n  let result = [];\n  for (let i = 0; i < n; i++) {\n    result = result.concat(arr);\n  }\n  return result;\n}",deps:function(){return[]},provides:{}};function f(e){return i.a.createElement("svg",Object(o.a)({focusable:"false",preserveAspectRatio:"xMidYMid meet",fill:"currentColor",width:"16",height:"16",viewBox:"0 0 32 32"},e),i.a.createElement("path",{d:"M24 12L16 22 8 12z"}))}var x={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:18,column:0},end:{line:32,column:1}},name:"CaretDown",value:f,source:'function CaretDown(props) {\n  return (\n    <svg\n      focusable="false"\n      preserveAspectRatio="xMidYMid meet"\n      fill="currentColor"\n      width="16"\n      height="16"\n      viewBox="0 0 32 32"\n      {...props}\n    >\n      <path d="M24 12L16 22 8 12z" />\n    </svg>\n  );\n}',deps:function(){return[]},provides:{}},v=p.f.div(t||(t=Object(d.a)(["\n  display: flex;\n  height: 20px;\n  align-items: center;\n\n  .item {\n    height: 20px;\n    cursor: pointer;\n    color: #3858cf;\n    display: flex;\n    align-items: center;\n\n    &.danger {\n      color: #eb4141;\n    }\n  }\n\n  .sep {\n    height: 10px;\n    width: 1px;\n    margin-left: 12px;\n    margin-right: 12px;\n    background: #eeeeee;\n  }\n"]))),w={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:34,column:0},end:{line:58,column:2}},name:"OperationsDiv",value:v,source:"const OperationsDiv = styled.div`\n  display: flex;\n  height: 20px;\n  align-items: center;\n\n  .item {\n    height: 20px;\n    cursor: pointer;\n    color: #3858cf;\n    display: flex;\n    align-items: center;\n\n    &.danger {\n      color: #eb4141;\n    }\n  }\n\n  .sep {\n    height: 10px;\n    width: 1px;\n    margin-left: 12px;\n    margin-right: 12px;\n    background: #eeeeee;\n  }\n`;",deps:function(){return[]},provides:{styled:p.f}};function C(){return i.a.createElement(v,null,i.a.createElement("div",{className:"item"},"\u7f16\u8f91"),i.a.createElement("div",{className:"sep"}),i.a.createElement("div",{className:"item danger"},"\u5220\u9664"),i.a.createElement("div",{className:"sep"}),i.a.createElement(b.a,{trigger:i.a.createElement("div",{className:"item"},"\u66f4\u591a",i.a.createElement(f,{style:{color:"#A6A6A6"}})),menuDataSource:"1,2,3,4".split(",").map((function(e){return{key:"Option "+e,label:"Option "+e}}))}))}var S={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:60,column:0},end:{line:82,column:1}},name:"renderOptions",value:C,source:'function renderOptions() {\n  return (\n    <OperationsDiv>\n      <div className="item">\u7f16\u8f91</div>\n      <div className="sep" />\n      <div className="item danger">\u5220\u9664</div>\n      <div className="sep" />\n\n      <DropdownMenu\n        trigger={\n          <div className="item">\n            \u66f4\u591a\n            <CaretDown style={{ color: \'#A6A6A6\' }} />\n          </div>\n        }\n        menuDataSource={\'1,2,3,4\'.split(\',\').map((n) => ({\n          key: `Option ${n}`,\n          label: `Option ${n}`,\n        }))}\n      />\n    </OperationsDiv>\n  );\n}',deps:function(){return[w,x]},provides:{DropdownMenu:b.a}},k={lock:!0,name:"\u64cd\u4f5c",render:C,width:200},y={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:84,column:0},end:{line:84,column:83}},name:"operationCol",value:k,source:"const operationCol = { lock: true, name: '\u64cd\u4f5c', render: renderOptions, width: 200 };",deps:function(){return[S]},provides:{}},B=[{id:"1",name:"\u963f\u91cc\u5df4\u5df4\u7f51\u7edc\u6280\u672f\u6709\u9650\u516c\u53f8",amount:"600,000.00(CNY)",dept:"\u62db\u5546\u94f6\u884c\u4e28\u676d\u5dde\u5206\u884c",applier:"James Collier"},{id:"2",name:"\u963f\u91cc\u5df4\u5df4\u7f51\u7edc\u6280\u672f\u6709\u9650\u516c\u53f8",amount:"600,000.00(CNY)",dept:"\u5efa\u8bbe\u94f6\u884c\u4e28\u672a\u6765\u79d1\u6280\u57ce",applier:"Philip Burke"},{id:"3",name:"\u963f\u91cc\u5df4\u5df4\u7f51\u7edc\u6280\u672f\u6709\u9650\u516c\u53f8",amount:"600,000.00(CNY)",dept:"\u4ea4\u901a\u94f6\u884c\u4e28\u6d59\u5927\u8def\u652f\u884c",applier:"Wesley Cruz"},{id:"4",name:"\u963f\u91cc\u5df4\u5df4\u7f51\u7edc\u6280\u672f\u6709\u9650\u516c\u53f8",amount:"600,000.00(CNY)",dept:"\u62db\u5546\u94f6\u884c\u4e28\u5e86\u6625\u8def\u652f\u884c",applier:"Billy Horton"},{id:"5",name:"\u963f\u91cc\u5df4\u5df4\u7f51\u7edc\u6280\u672f\u6709\u9650\u516c\u53f8",amount:"600,000.00(CNY)",dept:"\u62db\u5546\u94f6\u884c\u4e28\u6587\u4e00\u8def\u5206\u884c",applier:"Paul Tran"},{id:"6",name:"\u963f\u91cc\u5df4\u5df4\u7f51\u7edc\u6280\u672f\u6709\u9650\u516c\u53f8",amount:"600,000.00(CNY)",dept:"\u519c\u4e1a\u94f6\u884c\u4e28\u676d\u5dde\u5206\u884c",applier:"Anna Poole"}],_={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:87,column:0},end:{line:94,column:2}},name:"dataSource1",value:B,source:"const dataSource1 = [\n  { id: '1', name: '\u963f\u91cc\u5df4\u5df4\u7f51\u7edc\u6280\u672f\u6709\u9650\u516c\u53f8', amount: '600,000.00(CNY)', dept: '\u62db\u5546\u94f6\u884c\u4e28\u676d\u5dde\u5206\u884c', applier: 'James Collier' },\n  { id: '2', name: '\u963f\u91cc\u5df4\u5df4\u7f51\u7edc\u6280\u672f\u6709\u9650\u516c\u53f8', amount: '600,000.00(CNY)', dept: '\u5efa\u8bbe\u94f6\u884c\u4e28\u672a\u6765\u79d1\u6280\u57ce', applier: 'Philip Burke' },\n  { id: '3', name: '\u963f\u91cc\u5df4\u5df4\u7f51\u7edc\u6280\u672f\u6709\u9650\u516c\u53f8', amount: '600,000.00(CNY)', dept: '\u4ea4\u901a\u94f6\u884c\u4e28\u6d59\u5927\u8def\u652f\u884c', applier: 'Wesley Cruz' },\n  { id: '4', name: '\u963f\u91cc\u5df4\u5df4\u7f51\u7edc\u6280\u672f\u6709\u9650\u516c\u53f8', amount: '600,000.00(CNY)', dept: '\u62db\u5546\u94f6\u884c\u4e28\u5e86\u6625\u8def\u652f\u884c', applier: 'Billy Horton' },\n  { id: '5', name: '\u963f\u91cc\u5df4\u5df4\u7f51\u7edc\u6280\u672f\u6709\u9650\u516c\u53f8', amount: '600,000.00(CNY)', dept: '\u62db\u5546\u94f6\u884c\u4e28\u6587\u4e00\u8def\u5206\u884c', applier: 'Paul Tran' },\n  { id: '6', name: '\u963f\u91cc\u5df4\u5df4\u7f51\u7edc\u6280\u672f\u6709\u9650\u516c\u53f8', amount: '600,000.00(CNY)', dept: '\u519c\u4e1a\u94f6\u884c\u4e28\u676d\u5dde\u5206\u884c', applier: 'Anna Poole' },\n];",deps:function(){return[]},provides:{}},T=[{code:"name",width:220,name:"\u516c\u53f8\u540d\u79f0"},{code:"amount",width:160,align:"right",name:"\u91d1\u989d"},{code:"dept",width:160,name:"\u91d1\u878d\u673a\u6784"},{code:"applier",width:120,name:"\u7533\u8bf7\u4eba"},k],D={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:96,column:0},end:{line:102,column:2}},name:"columns1",value:T,source:"const columns1 = [\n  { code: 'name', width: 220, name: '\u516c\u53f8\u540d\u79f0' },\n  { code: 'amount', width: 160, align: 'right', name: '\u91d1\u989d' },\n  { code: 'dept', width: 160, name: '\u91d1\u878d\u673a\u6784' },\n  { code: 'applier', width: 120, name: '\u7533\u8bf7\u4eba' },\n  operationCol,\n];",deps:function(){return[y]},provides:{}},L=[{name:"\u8682\u8681\u91d1\u670d",dept:"\u6d88\u8d39\u8005\u4e8b\u4e1a\u90e8-\u6dd8\u5b9d-UED",dest:"South Maddison",guide:"Don Moreno"},{name:"\u963f\u91cc\u5df4\u5df4(\u4e2d\u56fd)\u6709\u9650\u516c\u53f8",dept:"\u822a\u65c5\u4e8b\u4e1a\u90e8-\u9152\u5e97\u4e1a\u52a1",dest:"Emilhaven",guide:"Douglas Richards"},{name:"\u83dc\u9e1f\u7f51\u7edc",dept:"\u6d88\u8d39\u8005\u4e8b\u4e1a\u90e8-\u6dd8\u5b9d-UED",dest:"\u4e91\u5357\u5927\u7406",guide:"Douglas Lee"},{name:"\u8682\u8681\u91d1\u670d",dept:"\u4fe1\u606f\u5e73\u53f0\u90e8-\u7528\u6237\u4f53\u9a8c\u90e8",dest:"\u676d\u5dde\u5343\u5c9b\u6e56",guide:"Eric Castillo"},{name:"\u963f\u91cc\u5df4\u5df4(\u4e2d\u56fd)\u6709\u9650\u516c\u53f8",dept:"\u6d88\u8d39\u8005\u4e8b\u4e1a\u90e8-\u6dd8\u5b9d-UED",dest:"East Karl",guide:"Herbert Patton"}],E={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:105,column:0},end:{line:111,column:2}},name:"dataSource2",value:L,source:"const dataSource2 = [\n  { name: '\u8682\u8681\u91d1\u670d', dept: '\u6d88\u8d39\u8005\u4e8b\u4e1a\u90e8-\u6dd8\u5b9d-UED', dest: 'South Maddison', guide: 'Don Moreno' },\n  { name: '\u963f\u91cc\u5df4\u5df4(\u4e2d\u56fd)\u6709\u9650\u516c\u53f8', dept: '\u822a\u65c5\u4e8b\u4e1a\u90e8-\u9152\u5e97\u4e1a\u52a1', dest: 'Emilhaven', guide: 'Douglas Richards' },\n  { name: '\u83dc\u9e1f\u7f51\u7edc', dept: '\u6d88\u8d39\u8005\u4e8b\u4e1a\u90e8-\u6dd8\u5b9d-UED', dest: '\u4e91\u5357\u5927\u7406', guide: 'Douglas Lee' },\n  { name: '\u8682\u8681\u91d1\u670d', dept: '\u4fe1\u606f\u5e73\u53f0\u90e8-\u7528\u6237\u4f53\u9a8c\u90e8', dest: '\u676d\u5dde\u5343\u5c9b\u6e56', guide: 'Eric Castillo' },\n  { name: '\u963f\u91cc\u5df4\u5df4(\u4e2d\u56fd)\u6709\u9650\u516c\u53f8', dept: '\u6d88\u8d39\u8005\u4e8b\u4e1a\u90e8-\u6dd8\u5b9d-UED', dest: 'East Karl', guide: 'Herbert Patton' },\n];",deps:function(){return[]},provides:{}},O=[{code:"name",name:"\u516c\u53f8\u540d\u79f0",width:200},{code:"dept",name:"\u90e8\u95e8\u540d\u79f0",width:180},{code:"dest",name:"\u56e2\u5efa\u76ee\u7684\u5730",width:160},{code:"guide",name:"\u5f53\u5730\u5bfc\u6e38",width:160}],M={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:113,column:0},end:{line:118,column:2}},name:"columns2",value:O,source:"const columns2 = [\n  { code: 'name', name: '\u516c\u53f8\u540d\u79f0', width: 200 },\n  { code: 'dept', name: '\u90e8\u95e8\u540d\u79f0', width: 180 },\n  { code: 'dest', name: '\u56e2\u5efa\u76ee\u7684\u5730', width: 160 },\n  { code: 'guide', name: '\u5f53\u5730\u5bfc\u6e38', width: 160 },\n];",deps:function(){return[]},provides:{}};function N(){return i.a.createElement(l.BaseTable,{dataSource:B,columns:T})}var H={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:120,column:7},end:{line:122,column:1}},name:"Basic",value:N,source:"function Basic() {\n  return <BaseTable dataSource={dataSource1} columns={columns1} />;\n}",deps:function(){return[_,D]},provides:{BaseTable:l.BaseTable}};function R(){return i.a.createElement(l.BaseTable,{dataSource:B,columns:[{code:"name",width:120,name:"\u516c\u53f8\u540d\u79f0"},{code:"amount",width:120,align:"right",name:"\u91d1\u989d"},{code:"dept",width:80,name:"\u91d1\u878d\u673a\u6784"},{code:"applier",width:80,name:"\u7533\u8bf7\u4eba"},Object.assign({},k,{width:170,lock:!1})]})}N.__doc_info=H,N.__inner_source="function Basic() {\n  return <BaseTable dataSource={dataSource1} columns={columns1} />;\n}";var U={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:124,column:7},end:{line:137,column:1}},name:"BasicMobile",value:R,source:"function BasicMobile() {\n  return (\n    <BaseTable\n      dataSource={dataSource1}\n      columns={[\n        { code: 'name', width: 120, name: '\u516c\u53f8\u540d\u79f0' },\n        { code: 'amount', width: 120, align: 'right', name: '\u91d1\u989d' },\n        { code: 'dept', width: 80, name: '\u91d1\u878d\u673a\u6784' },\n        { code: 'applier', width: 80, name: '\u7533\u8bf7\u4eba' },\n        { ...operationCol, width: 170, lock: false },\n      ]}\n    />\n  );\n}",deps:function(){return[_,y]},provides:{BaseTable:l.BaseTable}};function j(){var e=Object(s.useState)(!0),n=e[0],a=e[1],t=Object(s.useState)(!1),o=t[0],r=t[1],c=Object(s.useState)(!1),d=c[0],u=c[1],p=Object(s.useState)(!0),b=p[0],h=p[1],g=Object(s.useState)(!1),f=g[0],x=g[1];return i.a.createElement("div",null,i.a.createElement("div",{style:{marginBottom:16}},i.a.createElement(l.Checkbox,{checked:n,onChange:function(){return a(!n)}},"\u7d27\u51d1\u578b"),i.a.createElement(l.Checkbox,{style:{marginLeft:16},checked:o,onChange:function(){return r(!o)}},"\u6591\u9a6c\u7ebf"),i.a.createElement(l.Checkbox,{style:{marginLeft:16},checked:d,onChange:function(){return u(!d)}},"\u8fb9\u6846"),i.a.createElement(l.Checkbox,{style:{marginLeft:40},checked:b,onChange:function(){return h(!b)}},"\u5c55\u793a\u8868\u5934"),i.a.createElement(l.Checkbox,{style:{marginLeft:16},checked:f,onChange:function(){return x(!f)}},"\u52a0\u8f7d\u72b6\u6001")),i.a.createElement("pre",null,'<Table\n  dataSource={dataSource}\n  columns={columns}\n  className="'+m()({compact:n,zebra:o,bordered:d})+'" \n  hasHeader={'+b+"} \n  isLoading={"+f+"} \n/>"),i.a.createElement(l.BaseTable,{className:m()({compact:n,zebra:o,bordered:d}),isLoading:f,hasHeader:b,dataSource:B,columns:T}))}R.__doc_info=U,R.__inner_source="function BasicMobile() {\n  return (\n    <BaseTable\n      dataSource={dataSource1}\n      columns={[\n        { code: 'name', width: 120, name: '\u516c\u53f8\u540d\u79f0' },\n        { code: 'amount', width: 120, align: 'right', name: '\u91d1\u989d' },\n        { code: 'dept', width: 80, name: '\u91d1\u878d\u673a\u6784' },\n        { code: 'applier', width: 80, name: '\u7533\u8bf7\u4eba' },\n        { ...operationCol, width: 170, lock: false },\n      ]}\n    />\n  );\n}";var A={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:139,column:7},end:{line:183,column:1}},name:"\u8868\u683c\u6837\u5f0f",value:j,source:'function \u8868\u683c\u6837\u5f0f() {\n  const [compact, setCompact] = useState(true);\n  const [zebra, setZebra] = useState(false);\n  const [bordered, setBordered] = useState(false);\n  const [hasHeader, setHasHeader] = useState(true);\n  const [isLoading, setIsLoading] = useState(false);\n\n  return (\n    <div>\n      <div style={{ marginBottom: 16 }}>\n        <Checkbox checked={compact} onChange={() => setCompact(!compact)}>\n          \u7d27\u51d1\u578b\n        </Checkbox>\n        <Checkbox style={{ marginLeft: 16 }} checked={zebra} onChange={() => setZebra(!zebra)}>\n          \u6591\u9a6c\u7ebf\n        </Checkbox>\n        <Checkbox style={{ marginLeft: 16 }} checked={bordered} onChange={() => setBordered(!bordered)}>\n          \u8fb9\u6846\n        </Checkbox>\n        <Checkbox style={{ marginLeft: 40 }} checked={hasHeader} onChange={() => setHasHeader(!hasHeader)}>\n          \u5c55\u793a\u8868\u5934\n        </Checkbox>\n        <Checkbox style={{ marginLeft: 16 }} checked={isLoading} onChange={() => setIsLoading(!isLoading)}>\n          \u52a0\u8f7d\u72b6\u6001\n        </Checkbox>\n      </div>\n      <pre>\n        {`<Table` +\n          `\\n  dataSource={dataSource}` +\n          `\\n  columns={columns}` +\n          `\\n  className="${cx({ compact, zebra, bordered })}" ` +\n          `\\n  hasHeader={${hasHeader}} ` +\n          `\\n  isLoading={${isLoading}} ` +\n          `\\n/>`}\n      </pre>\n      <BaseTable\n        className={cx({ compact, zebra, bordered })}\n        isLoading={isLoading}\n        hasHeader={hasHeader}\n        dataSource={dataSource1}\n        columns={columns1}\n      />\n    </div>\n  );\n}',deps:function(){return[_,D]},provides:{useState:s.useState,Checkbox:l.Checkbox,cx:m.a,BaseTable:l.BaseTable}};function q(){return i.a.createElement(l.BaseTable,{dataSource:[],columns:O})}j.__doc_info=A,j.__inner_source='function \u8868\u683c\u6837\u5f0f() {\n  const [compact, setCompact] = useState(true);\n  const [zebra, setZebra] = useState(false);\n  const [bordered, setBordered] = useState(false);\n  const [hasHeader, setHasHeader] = useState(true);\n  const [isLoading, setIsLoading] = useState(false);\n\n  return (\n    <div>\n      <div style={{ marginBottom: 16 }}>\n        <Checkbox checked={compact} onChange={() => setCompact(!compact)}>\n          \u7d27\u51d1\u578b\n        </Checkbox>\n        <Checkbox style={{ marginLeft: 16 }} checked={zebra} onChange={() => setZebra(!zebra)}>\n          \u6591\u9a6c\u7ebf\n        </Checkbox>\n        <Checkbox style={{ marginLeft: 16 }} checked={bordered} onChange={() => setBordered(!bordered)}>\n          \u8fb9\u6846\n        </Checkbox>\n        <Checkbox style={{ marginLeft: 40 }} checked={hasHeader} onChange={() => setHasHeader(!hasHeader)}>\n          \u5c55\u793a\u8868\u5934\n        </Checkbox>\n        <Checkbox style={{ marginLeft: 16 }} checked={isLoading} onChange={() => setIsLoading(!isLoading)}>\n          \u52a0\u8f7d\u72b6\u6001\n        </Checkbox>\n      </div>\n      <pre>\n        {`<Table` +\n          `\\n  dataSource={dataSource}` +\n          `\\n  columns={columns}` +\n          `\\n  className="${cx({ compact, zebra, bordered })}" ` +\n          `\\n  hasHeader={${hasHeader}} ` +\n          `\\n  isLoading={${isLoading}} ` +\n          `\\n/>`}\n      </pre>\n      <BaseTable\n        className={cx({ compact, zebra, bordered })}\n        isLoading={isLoading}\n        hasHeader={hasHeader}\n        dataSource={dataSource1}\n        columns={columns1}\n      />\n    </div>\n  );\n}';var P={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:185,column:7},end:{line:187,column:1}},name:"\u6570\u636e\u4e3a\u7a7a",value:q,source:"function \u6570\u636e\u4e3a\u7a7a() {\n  return <BaseTable dataSource={[]} columns={columns2} />;\n}",deps:function(){return[M]},provides:{BaseTable:l.BaseTable}};function z(){return i.a.createElement(l.BaseTable,{isLoading:!0,dataSource:L,columns:O})}q.__doc_info=P,q.__inner_source="function \u6570\u636e\u4e3a\u7a7a() {\n  return <BaseTable dataSource={[]} columns={columns2} />;\n}";var I={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:189,column:7},end:{line:191,column:1}},name:"\u8868\u683c\u6570\u636e\u52a0\u8f7d",value:z,source:"function \u8868\u683c\u6570\u636e\u52a0\u8f7d() {\n  return <BaseTable isLoading dataSource={dataSource2} columns={columns2} />;\n}",deps:function(){return[E,M]},provides:{BaseTable:l.BaseTable}};function Y(){return i.a.createElement(l.BaseTable,{isLoading:!0,dataSource:[],columns:O})}z.__doc_info=I,z.__inner_source="function \u8868\u683c\u6570\u636e\u52a0\u8f7d() {\n  return <BaseTable isLoading dataSource={dataSource2} columns={columns2} />;\n}";var V={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:193,column:7},end:{line:195,column:1}},name:"\u7a7a\u6570\u636e\u52a0\u8f7d",value:Y,source:"function \u7a7a\u6570\u636e\u52a0\u8f7d() {\n  return <BaseTable isLoading dataSource={[]} columns={columns2} />;\n}",deps:function(){return[M]},provides:{BaseTable:l.BaseTable}};function $(){var e=[{code:"amount",width:160,align:"right",name:"\u91d1\u989d"},{code:"dept",width:160,name:"\u91d1\u878d\u673a\u6784"},{code:"applier",width:120,name:"\u7533\u8bf7\u4eba"}];return i.a.createElement(l.BaseTable,{style:{"--header-row-height":"40px"},dataSource:B,columns:[{lock:!0,code:"name",width:200,name:"\u516c\u53f8\u540d\u79f0"},{name:"\u5206\u7ec41",children:e},{name:"\u5206\u7ec42",children:e},{name:"\u5206\u7ec43",children:e},{name:"\u5206\u7ec44",children:e},{name:"\u5206\u7ec45",children:e},{name:"\u5206\u7ec46",children:e},k]})}Y.__doc_info=V,Y.__inner_source="function \u7a7a\u6570\u636e\u52a0\u8f7d() {\n  return <BaseTable isLoading dataSource={[]} columns={columns2} />;\n}";var J={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:197,column:7},end:{line:220,column:1}},name:"\u8868\u5934\u5206\u7ec4\u4e0e\u5de6\u53f3\u9501\u5217",value:$,source:"function \u8868\u5934\u5206\u7ec4\u4e0e\u5de6\u53f3\u9501\u5217() {\n  const repeats = [\n    { code: 'amount', width: 160, align: 'right', name: '\u91d1\u989d' },\n    { code: 'dept', width: 160, name: '\u91d1\u878d\u673a\u6784' },\n    { code: 'applier', width: 120, name: '\u7533\u8bf7\u4eba' },\n  ];\n\n  return (\n    <BaseTable\n      style={{ '--header-row-height': '40px' }}\n      dataSource={dataSource1}\n      columns={[\n        { lock: true, code: 'name', width: 200, name: '\u516c\u53f8\u540d\u79f0' },\n        { name: '\u5206\u7ec41', children: repeats },\n        { name: '\u5206\u7ec42', children: repeats },\n        { name: '\u5206\u7ec43', children: repeats },\n        { name: '\u5206\u7ec44', children: repeats },\n        { name: '\u5206\u7ec45', children: repeats },\n        { name: '\u5206\u7ec46', children: repeats },\n        operationCol,\n      ]}\n    />\n  );\n}",deps:function(){return[_,y]},provides:{BaseTable:l.BaseTable}};function K(){return i.a.createElement(l.BaseTable,{style:{width:800,height:385,overflow:"auto"},dataSource:h(B,10),columns:[{name:"\u5e8f\u53f7",width:70,align:"right",lock:!0,getValue:function(e,n){return String(n+1)}},{lock:!0,code:"name",width:200,name:"\u516c\u53f8\u540d\u79f0"}].concat(h([{code:"amount",width:160,align:"right",name:"\u91d1\u989d"},{code:"dept",width:160,name:"\u91d1\u878d\u673a\u6784"},{code:"applier",width:120,name:"\u7533\u8bf7\u4eba"}],5),[k])})}$.__doc_info=J,$.__inner_source="function \u8868\u5934\u5206\u7ec4\u4e0e\u5de6\u53f3\u9501\u5217() {\n  const repeats = [\n    { code: 'amount', width: 160, align: 'right', name: '\u91d1\u989d' },\n    { code: 'dept', width: 160, name: '\u91d1\u878d\u673a\u6784' },\n    { code: 'applier', width: 120, name: '\u7533\u8bf7\u4eba' },\n  ];\n\n  return (\n    <BaseTable\n      style={{ '--header-row-height': '40px' }}\n      dataSource={dataSource1}\n      columns={[\n        { lock: true, code: 'name', width: 200, name: '\u516c\u53f8\u540d\u79f0' },\n        { name: '\u5206\u7ec41', children: repeats },\n        { name: '\u5206\u7ec42', children: repeats },\n        { name: '\u5206\u7ec43', children: repeats },\n        { name: '\u5206\u7ec44', children: repeats },\n        { name: '\u5206\u7ec45', children: repeats },\n        { name: '\u5206\u7ec46', children: repeats },\n        operationCol,\n      ]}\n    />\n  );\n}";var Z={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/base-table.stories.tsx",loc:{start:{line:222,column:7},end:{line:250,column:1}},name:"\u9650\u5b9a\u8868\u683c\u5bb9\u5668\u5927\u5c0f",value:K,source:"function \u9650\u5b9a\u8868\u683c\u5bb9\u5668\u5927\u5c0f() {\n  const nameCol = { lock: true, code: 'name', width: 200, name: '\u516c\u53f8\u540d\u79f0' };\n  const repeats = [\n    { code: 'amount', width: 160, align: 'right', name: '\u91d1\u989d' },\n    { code: 'dept', width: 160, name: '\u91d1\u878d\u673a\u6784' },\n    { code: 'applier', width: 120, name: '\u7533\u8bf7\u4eba' },\n  ];\n\n  return (\n    <BaseTable\n      style={{ width: 800, height: 385, overflow: 'auto' }}\n      dataSource={repeat(dataSource1, 10)}\n      columns={[\n        {\n          name: '\u5e8f\u53f7',\n          width: 70,\n          align: 'right',\n          lock: true,\n          getValue(_, rowIndex) {\n            return String(rowIndex + 1);\n          },\n        },\n        nameCol,\n        ...repeat(repeats, 5),\n        operationCol,\n      ]}\n    />\n  );\n}",deps:function(){return[g,_,y]},provides:{BaseTable:l.BaseTable}};K.__inner_source="function \u9650\u5b9a\u8868\u683c\u5bb9\u5668\u5927\u5c0f() {\n  const nameCol = { lock: true, code: 'name', width: 200, name: '\u516c\u53f8\u540d\u79f0' };\n  const repeats = [\n    { code: 'amount', width: 160, align: 'right', name: '\u91d1\u989d' },\n    { code: 'dept', width: 160, name: '\u91d1\u878d\u673a\u6784' },\n    { code: 'applier', width: 120, name: '\u7533\u8bf7\u4eba' },\n  ];\n\n  return (\n    <BaseTable\n      style={{ width: 800, height: 385, overflow: 'auto' }}\n      dataSource={repeat(dataSource1, 10)}\n      columns={[\n        {\n          name: '\u5e8f\u53f7',\n          width: 70,\n          align: 'right',\n          lock: true,\n          getValue(_, rowIndex) {\n            return String(rowIndex + 1);\n          },\n        },\n        nameCol,\n        ...repeat(repeats, 5),\n        operationCol,\n      ]}\n    />\n  );\n}",K.__doc_info=Z;var X,W={id:"base-table",title:"BaseTable \u57fa\u7840\u8868\u683c"},F={unversionedId:"base-table",id:"base-table",isDocsHomePage:!1,title:"BaseTable \u57fa\u7840\u8868\u683c",description:"\u4f7f\u7528\u573a\u666f",source:"@site/docs/base-table.mdx",sourceDirName:".",slug:"/base-table",permalink:"/rex-design/docs/base-table",editUrl:"https://github.com/alibaba/rex-design/edit/main/packages/doc/docs/base-table.mdx",version:"current",frontMatter:{id:"base-table",title:"BaseTable \u57fa\u7840\u8868\u683c"},sidebar:"docs",previous:{title:"Toaster \u5410\u53f8\u63d0\u793a",permalink:"/rex-design/docs/toaster"},next:{title:"ProTable \u8fdb\u9636\u8868\u683c",permalink:"/rex-design/docs/pro-table"}},G=[{value:"\u4f7f\u7528\u573a\u666f",id:"\u4f7f\u7528\u573a\u666f",children:[]},{value:"\u7528\u6cd5",id:"\u7528\u6cd5",children:[]}],Q=(X="Story",function(e){return console.warn("Component "+X+" was not imported, exported, or provided by MDXProvider as global scope"),Object(c.b)("div",e)}),ee={toc:G};function ne(e){var n=e.components,a=Object(r.a)(e,["components"]);return Object(c.b)("wrapper",Object(o.a)({},ee,a,{components:n,mdxType:"MDXLayout"}),Object(c.b)("h2",{id:"\u4f7f\u7528\u573a\u666f"},"\u4f7f\u7528\u573a\u666f"),Object(c.b)("p",null,"\u901a\u7528\u7684\u57fa\u7840\u8868\u683c\u3002\u8be5\u7ec4\u4ef6\u5728\u5f00\u6e90\u8868\u683c\u7ec4\u4ef6 ali-react-table \u7684\u57fa\u7840\u4e0a\u8fdb\u884c\u4e86\u6837\u5f0f\u4e0a\u7684\u8c03\u6574\uff0c\u7528\u6cd5",Object(c.b)("a",{parentName:"p",href:"https://ali-react-table.js.org/docs/table/basic-usage"},"\u8be6\u89c1\u5f00\u6e90\u6587\u6863"),"\u3002"),Object(c.b)("p",null,"\u65e5\u5e38\u4e1a\u52a1\u63a8\u8350\u4f7f\u7528\u5c01\u88c5\u7a0b\u5ea6\u66f4\u9ad8\u7684 ",Object(c.b)("a",{parentName:"p",href:"pro-table"},"\u8fdb\u9636\u8868\u683c\u7ec4\u4ef6"),"."),Object(c.b)("h2",{id:"\u7528\u6cd5"},"\u7528\u6cd5"),Object(c.b)(Q,{fn:N,mdxType:"Story"}))}ne.isMDXComponent=!0},375:function(e,n,a){"use strict";a.d(n,"a",(function(){return s}));var t=a(163),o=a(0),r=a.n(o);function s(e){var n=e.trigger,a=e.menuDataSource,s=Object(o.useState)(!1),i=s[0],c=s[1],l=function(){return c(!1)};return r.a.createElement(t.AdaptivePopup,{visible:i,onRequestOpen:function(){return c(!0)},onRequestClose:l,trigger:n,triggerType:"click"},r.a.createElement(t.Menu,{style:{boxShadow:"0 0 0 1px rgba(16,22,26,.1), 0 2px 4px rgba(16,22,26,.2), 0 8px 24px rgba(16,22,26,.2)"},dataSource:a,onItemClick:function(){l()}}))}var i={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/table/DropdownMenu.tsx",loc:{start:{line:9,column:7},end:{line:33,column:1}},name:"DropdownMenu",value:s,source:"function DropdownMenu({ trigger, menuDataSource }) {\n  const [visible, setVisible] = useState(false);\n  const onRequestClose = () => setVisible(false);\n  const onRequestOpen = () => setVisible(true);\n\n  return (\n    <AdaptivePopup\n      visible={visible}\n      onRequestOpen={onRequestOpen}\n      onRequestClose={onRequestClose}\n      trigger={trigger}\n      triggerType=\"click\"\n    >\n      <Menu\n        style={{\n          boxShadow: '0 0 0 1px rgba(16,22,26,.1), 0 2px 4px rgba(16,22,26,.2), 0 8px 24px rgba(16,22,26,.2)',\n        }}\n        dataSource={menuDataSource}\n        onItemClick={() => {\n          onRequestClose();\n        }}\n      />\n    </AdaptivePopup>\n  );\n}",deps:function(){return[]},provides:{useState:o.useState,AdaptivePopup:t.AdaptivePopup,Menu:t.Menu}};s.__inner_source="function DropdownMenu({ trigger, menuDataSource }) {\n  const [visible, setVisible] = useState(false);\n  const onRequestClose = () => setVisible(false);\n  const onRequestOpen = () => setVisible(true);\n\n  return (\n    <AdaptivePopup\n      visible={visible}\n      onRequestOpen={onRequestOpen}\n      onRequestClose={onRequestClose}\n      trigger={trigger}\n      triggerType=\"click\"\n    >\n      <Menu\n        style={{\n          boxShadow: '0 0 0 1px rgba(16,22,26,.1), 0 2px 4px rgba(16,22,26,.2), 0 8px 24px rgba(16,22,26,.2)',\n        }}\n        dataSource={menuDataSource}\n        onItemClick={() => {\n          onRequestClose();\n        }}\n      />\n    </AdaptivePopup>\n  );\n}",s.__doc_info=i;try{s.displayName="DropdownMenu",s.__docgenInfo={description:"",displayName:"DropdownMenu",props:{trigger:{defaultValue:null,description:"",name:"trigger",required:!0,type:{name:"ReactNode"}},menuDataSource:{defaultValue:null,description:"",name:"menuDataSource",required:!0,type:{name:"MenuItem[]"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["../story/src/table/DropdownMenu.tsx#DropdownMenu"]={docgenInfo:s.__docgenInfo,name:"DropdownMenu",path:"../story/src/table/DropdownMenu.tsx#DropdownMenu"})}catch(c){}}}]);