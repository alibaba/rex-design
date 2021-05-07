(window.webpackJsonp=window.webpackJsonp||[]).push([[69],{151:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return T})),n.d(t,"metadata",(function(){return U})),n.d(t,"toc",(function(){return z})),n.d(t,"default",(function(){return M}));var o=n(3),u=n(7),a=n(0),r=n.n(a),s=n(164),i=n(162),c=n(169);const l=()=>r.a.createElement(i.Button,null,"hello world"),p={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/button.stories.tsx",loc:{start:{line:7,column:7},end:{line:7,column:56}},name:"basic",value:l,source:"const basic = () => <Button>hello world</Button>;",deps:()=>[],provides:{Button:i.Button}};l.__doc_info=p,l.__inner_source="() => <Button>hello world</Button>";const d=()=>r.a.createElement(i.Button,{type:"primary",isFullWidth:!0},"\u6574\u884c\u6309\u94ae"),m={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/button.stories.tsx",loc:{start:{line:9,column:7},end:{line:13,column:2}},name:"fullWidth",value:d,source:'const fullWidth = () => (\n  <Button type="primary" isFullWidth>\n    \u6574\u884c\u6309\u94ae\n  </Button>\n);',deps:()=>[],provides:{Button:i.Button}};d.__doc_info=m,d.__inner_source='() => (\n  <Button type="primary" isFullWidth>\n    \u6574\u884c\u6309\u94ae\n  </Button>\n)';const B=()=>r.a.createElement(i.DemoGroup,null,r.a.createElement(i.Button,{size:"small"},"small"),r.a.createElement(i.Button,{size:"medium"},"medium"),r.a.createElement(i.Button,{size:"large"},"large")),b={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/button.stories.tsx",loc:{start:{line:15,column:7},end:{line:21,column:2}},name:"size",value:B,source:'const size = () => (\n  <DemoGroup>\n    <Button size="small">small</Button>\n    <Button size="medium">medium</Button>\n    <Button size="large">large</Button>\n  </DemoGroup>\n);',deps:()=>[],provides:{DemoGroup:i.DemoGroup,Button:i.Button}};B.__doc_info=b,B.__inner_source='() => (\n  <DemoGroup>\n    <Button size="small">small</Button>\n    <Button size="medium">medium</Button>\n    <Button size="large">large</Button>\n  </DemoGroup>\n)';const h=()=>r.a.createElement(i.DemoGroup,null,r.a.createElement(i.Button,{leftElement:r.a.createElement(c.a,{type:"email"}),type:"primary"},"\u90ae\u7bb1"),r.a.createElement(i.Button,{leftElement:r.a.createElement(c.a,{type:"arrow-right"})},"\u70b9\u51fb\u4e86\u89e3\u66f4\u591a")),y={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/button.stories.tsx",loc:{start:{line:23,column:7},end:{line:30,column:2}},name:"addIcon",value:h,source:'const addIcon = () => (\n  <DemoGroup>\n    <Button leftElement={<Icon type="email" />} type="primary">\n      \u90ae\u7bb1\n    </Button>\n    <Button leftElement={<Icon type="arrow-right" />}>\u70b9\u51fb\u4e86\u89e3\u66f4\u591a</Button>\n  </DemoGroup>\n);',deps:()=>[],provides:{DemoGroup:i.DemoGroup,Button:i.Button,Icon:c.a}};h.__doc_info=y,h.__inner_source='() => (\n  <DemoGroup>\n    <Button leftElement={<Icon type="email" />} type="primary">\n      \u90ae\u7bb1\n    </Button>\n    <Button leftElement={<Icon type="arrow-right" />}>\u70b9\u51fb\u4e86\u89e3\u66f4\u591a</Button>\n  </DemoGroup>\n)';const g=()=>{const[e,t]=Object(a.useState)(9);return r.a.createElement(i.DemoGroup,null,r.a.createElement(i.Button,{rightElement:r.a.createElement(i.Badge,{status:"error",isPill:!0},e)},"\u5e26\u5fbd\u6807\u7684\u6309\u94ae"),r.a.createElement(i.NumberInput,{defaultValue:e,onChange:e=>t(e)}))},D={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/button.stories.tsx",loc:{start:{line:32,column:7},end:{line:48,column:2}},name:"AddBadge",value:g,source:'const AddBadge = () => {\n  const [count, setCount] = useState(9);\n  return (\n    <DemoGroup>\n      <Button\n        rightElement={\n          <Badge status="error" isPill>\n            {count}\n          </Badge>\n        }\n      >\n        \u5e26\u5fbd\u6807\u7684\u6309\u94ae\n      </Button>\n      <NumberInput defaultValue={count} onChange={(val) => setCount(val)} />\n    </DemoGroup>\n  );\n};',deps:()=>[],provides:{useState:a.useState,DemoGroup:i.DemoGroup,Button:i.Button,Badge:i.Badge,NumberInput:i.NumberInput}};g.__doc_info=D,g.__inner_source='() => {\n  const [count, setCount] = useState(9);\n  return (\n    <DemoGroup>\n      <Button\n        rightElement={\n          <Badge status="error" isPill>\n            {count}\n          </Badge>\n        }\n      >\n        \u5e26\u5fbd\u6807\u7684\u6309\u94ae\n      </Button>\n      <NumberInput defaultValue={count} onChange={(val) => setCount(val)} />\n    </DemoGroup>\n  );\n}';const f=()=>r.a.createElement(i.DemoGroup,null,r.a.createElement(i.IconButton,{icon:"close"})),G={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/button.stories.tsx",loc:{start:{line:50,column:7},end:{line:54,column:2}},name:"OnlyIcon",value:f,source:'const OnlyIcon = () => (\n  <DemoGroup>\n    <IconButton icon="close" />\n  </DemoGroup>\n);',deps:()=>[],provides:{DemoGroup:i.DemoGroup,IconButton:i.IconButton}};f.__doc_info=G,f.__inner_source='() => (\n  <DemoGroup>\n    <IconButton icon="close" />\n  </DemoGroup>\n)';const v=()=>r.a.createElement(i.DemoGroup,null,r.a.createElement(i.Button,{loading:!0}),r.a.createElement(i.Button,{loading:!0},"\u63d0\u4ea4\u4e2d")),_={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/button.stories.tsx",loc:{start:{line:56,column:7},end:{line:61,column:2}},name:"loading",value:v,source:"const loading = () => (\n  <DemoGroup>\n    <Button loading />\n    <Button loading>\u63d0\u4ea4\u4e2d</Button>\n  </DemoGroup>\n);",deps:()=>[],provides:{DemoGroup:i.DemoGroup,Button:i.Button}};v.__doc_info=_,v.__inner_source="() => (\n  <DemoGroup>\n    <Button loading />\n    <Button loading>\u63d0\u4ea4\u4e2d</Button>\n  </DemoGroup>\n)";const E=()=>r.a.createElement(i.DemoGroup,null,r.a.createElement(i.Button,{shape:"solid",type:"primary"},"\u4e3b\u8981\u6309\u94ae"),r.a.createElement(i.Button,{shape:"solid",type:"secondary"},"\u6b21\u8981\u6309\u94ae"),r.a.createElement(i.Button,{shape:"solid",type:"normal"},"\u666e\u901a\u6309\u94ae"),r.a.createElement(i.Button,{shape:"solid",disabled:!0},"\u7981\u7528\u6309\u94ae"),r.a.createElement(i.DemoDivider,null),r.a.createElement(i.Button,{shape:"text",type:"primary"},"\u4e3b\u8981\u6587\u672c\u6309\u94ae"),r.a.createElement(i.Button,{shape:"text"},"\u666e\u901a\u6587\u672c\u6309\u94ae"),r.a.createElement(i.Button,{shape:"text",disabled:!0},"\u7981\u7528\u6587\u672c\u6309\u94ae"),r.a.createElement(i.DemoDivider,null),r.a.createElement(i.Button,{shape:"link",type:"primary"},"\u4e3b\u8981\u94fe\u63a5\u6309\u94ae"),r.a.createElement(i.Button,{shape:"link"},"\u666e\u901a\u94fe\u63a5\u6309\u94ae"),r.a.createElement(i.Button,{shape:"link",disabled:!0},"\u7981\u7528\u94fe\u63a5\u6309\u94ae"),r.a.createElement(i.DemoDivider,null),r.a.createElement(i.Button,{shape:"warning",type:"primary"},"\u4e3b\u8981\u8b66\u544a\u6309\u94ae"),r.a.createElement(i.Button,{shape:"warning"},"\u666e\u901a\u8b66\u544a\u6309\u94ae"),r.a.createElement(i.Button,{shape:"warning",disabled:!0},"\u7981\u7528\u8b66\u544a\u6309\u94ae")),S={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/button.stories.tsx",loc:{start:{line:63,column:7},end:{line:102,column:2}},name:"shape",value:E,source:'const shape = () => (\n  <DemoGroup>\n    <Button shape="solid" type="primary">\n      \u4e3b\u8981\u6309\u94ae\n    </Button>\n    <Button shape="solid" type="secondary">\n      \u6b21\u8981\u6309\u94ae\n    </Button>\n    <Button shape="solid" type="normal">\n      \u666e\u901a\u6309\u94ae\n    </Button>\n    <Button shape="solid" disabled>\n      \u7981\u7528\u6309\u94ae\n    </Button>\n    <DemoDivider />\n    <Button shape="text" type="primary">\n      \u4e3b\u8981\u6587\u672c\u6309\u94ae\n    </Button>\n    <Button shape="text">\u666e\u901a\u6587\u672c\u6309\u94ae</Button>\n    <Button shape="text" disabled>\n      \u7981\u7528\u6587\u672c\u6309\u94ae\n    </Button>\n    <DemoDivider />\n    <Button shape="link" type="primary">\n      \u4e3b\u8981\u94fe\u63a5\u6309\u94ae\n    </Button>\n    <Button shape="link">\u666e\u901a\u94fe\u63a5\u6309\u94ae</Button>\n    <Button shape="link" disabled>\n      \u7981\u7528\u94fe\u63a5\u6309\u94ae\n    </Button>\n    <DemoDivider />\n    <Button shape="warning" type="primary">\n      \u4e3b\u8981\u8b66\u544a\u6309\u94ae\n    </Button>\n    <Button shape="warning">\u666e\u901a\u8b66\u544a\u6309\u94ae</Button>\n    <Button shape="warning" disabled>\n      \u7981\u7528\u8b66\u544a\u6309\u94ae\n    </Button>\n  </DemoGroup>\n);',deps:()=>[],provides:{DemoGroup:i.DemoGroup,Button:i.Button,DemoDivider:i.DemoDivider}};E.__doc_info=S,E.__inner_source='() => (\n  <DemoGroup>\n    <Button shape="solid" type="primary">\n      \u4e3b\u8981\u6309\u94ae\n    </Button>\n    <Button shape="solid" type="secondary">\n      \u6b21\u8981\u6309\u94ae\n    </Button>\n    <Button shape="solid" type="normal">\n      \u666e\u901a\u6309\u94ae\n    </Button>\n    <Button shape="solid" disabled>\n      \u7981\u7528\u6309\u94ae\n    </Button>\n    <DemoDivider />\n    <Button shape="text" type="primary">\n      \u4e3b\u8981\u6587\u672c\u6309\u94ae\n    </Button>\n    <Button shape="text">\u666e\u901a\u6587\u672c\u6309\u94ae</Button>\n    <Button shape="text" disabled>\n      \u7981\u7528\u6587\u672c\u6309\u94ae\n    </Button>\n    <DemoDivider />\n    <Button shape="link" type="primary">\n      \u4e3b\u8981\u94fe\u63a5\u6309\u94ae\n    </Button>\n    <Button shape="link">\u666e\u901a\u94fe\u63a5\u6309\u94ae</Button>\n    <Button shape="link" disabled>\n      \u7981\u7528\u94fe\u63a5\u6309\u94ae\n    </Button>\n    <DemoDivider />\n    <Button shape="warning" type="primary">\n      \u4e3b\u8981\u8b66\u544a\u6309\u94ae\n    </Button>\n    <Button shape="warning">\u666e\u901a\u8b66\u544a\u6309\u94ae</Button>\n    <Button shape="warning" disabled>\n      \u7981\u7528\u8b66\u544a\u6309\u94ae\n    </Button>\n  </DemoGroup>\n)';const x=()=>r.a.createElement(i.DemoGroup,null,r.a.createElement(i.Group,{isAttached:!0},r.a.createElement(i.Button,null,"Left Button"),r.a.createElement(i.Button,null,"Center Button"),r.a.createElement(i.Button,null,"Right Button")),r.a.createElement(i.Group,null,r.a.createElement(i.Button,null,"Left Button"),r.a.createElement(i.Button,null,"Center Button"),r.a.createElement(i.Button,null,"Right Button"))),k={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/button.stories.tsx",loc:{start:{line:104,column:7},end:{line:117,column:2}},name:"group",value:x,source:"const group = () => (\n  <DemoGroup>\n    <Group isAttached>\n      <Button>Left Button</Button>\n      <Button>Center Button</Button>\n      <Button>Right Button</Button>\n    </Group>\n    <Group>\n      <Button>Left Button</Button>\n      <Button>Center Button</Button>\n      <Button>Right Button</Button>\n    </Group>\n  </DemoGroup>\n);",deps:()=>[],provides:{DemoGroup:i.DemoGroup,Group:i.Group,Button:i.Button}};x.__doc_info=k,x.__inner_source="() => (\n  <DemoGroup>\n    <Group isAttached>\n      <Button>Left Button</Button>\n      <Button>Center Button</Button>\n      <Button>Right Button</Button>\n    </Group>\n    <Group>\n      <Button>Left Button</Button>\n      <Button>Center Button</Button>\n      <Button>Right Button</Button>\n    </Group>\n  </DemoGroup>\n)";const I=()=>{const[e,t]=Object(a.useState)(!1);return r.a.createElement(i.Button,{isSelected:e,onClick:()=>t(!e)},e?"\u5df2\u8ba2\u9605":"\u8ba2\u9605")},O={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/button.stories.tsx",loc:{start:{line:119,column:7},end:{line:126,column:2}},name:"Toggle",value:I,source:"const Toggle = () => {\n  const [isSelected, setIsSelected] = useState(false);\n  return (\n    <Button isSelected={isSelected} onClick={() => setIsSelected(!isSelected)}>\n      {isSelected ? '\u5df2\u8ba2\u9605' : '\u8ba2\u9605'}\n    </Button>\n  );\n};",deps:()=>[],provides:{useState:a.useState,Button:i.Button}};I.__doc_info=O,I.__inner_source="() => {\n  const [isSelected, setIsSelected] = useState(false);\n  return (\n    <Button isSelected={isSelected} onClick={() => setIsSelected(!isSelected)}>\n      {isSelected ? '\u5df2\u8ba2\u9605' : '\u8ba2\u9605'}\n    </Button>\n  );\n}";const w=()=>r.a.createElement(i.DemoGroup,null,r.a.createElement(i.Button,{isSelected:!0},"\u5df2\u8ba2\u9605"),r.a.createElement(i.Button,{isSelected:!0,type:"primary"},"\u5df2\u8ba2\u9605"),r.a.createElement(i.Button,{isSelected:!0,type:"secondary"},"\u5df2\u8ba2\u9605"),r.a.createElement(i.Button,{isSelected:!0,type:"primary",shape:"warning"},"\u5df2\u8ba2\u9605"),r.a.createElement(i.Button,{isSelected:!0,type:"primary",shape:"text"},"\u5df2\u8ba2\u9605")),C={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/button.stories.tsx",loc:{start:{line:128,column:7},end:{line:146,column:2}},name:"Toggled",value:w,source:'const Toggled = () => {\n  return (\n    <DemoGroup>\n      <Button isSelected>\u5df2\u8ba2\u9605</Button>\n      <Button isSelected type="primary">\n        \u5df2\u8ba2\u9605\n      </Button>\n      <Button isSelected type="secondary">\n        \u5df2\u8ba2\u9605\n      </Button>\n      <Button isSelected type="primary" shape="warning">\n        \u5df2\u8ba2\u9605\n      </Button>\n      <Button isSelected type="primary" shape="text">\n        \u5df2\u8ba2\u9605\n      </Button>\n    </DemoGroup>\n  );\n};',deps:()=>[],provides:{DemoGroup:i.DemoGroup,Button:i.Button}};w.__doc_info=C,w.__inner_source='() => {\n  return (\n    <DemoGroup>\n      <Button isSelected>\u5df2\u8ba2\u9605</Button>\n      <Button isSelected type="primary">\n        \u5df2\u8ba2\u9605\n      </Button>\n      <Button isSelected type="secondary">\n        \u5df2\u8ba2\u9605\n      </Button>\n      <Button isSelected type="primary" shape="warning">\n        \u5df2\u8ba2\u9605\n      </Button>\n      <Button isSelected type="primary" shape="text">\n        \u5df2\u8ba2\u9605\n      </Button>\n    </DemoGroup>\n  );\n}';const j=()=>{const[e,t]=Object(a.useState)("pc");return r.a.createElement(i.DemoGroup,null,r.a.createElement(i.Group,{isAttached:!0},r.a.createElement(i.Button,{isSelected:"pc"===e,onClick:()=>t("pc")},r.a.createElement(c.a,{type:"electronics"})),r.a.createElement(i.Button,{isSelected:"pad"===e,onClick:()=>t("pad")},r.a.createElement(c.a,{type:"pad"})),r.a.createElement(i.Button,{isSelected:"phone"===e,onClick:()=>t("phone")},r.a.createElement(c.a,{type:"mobile-phone"}))))},A={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/button.stories.tsx",loc:{start:{line:148,column:7},end:{line:165,column:2}},name:"ToggleGroup",value:j,source:"const ToggleGroup = () => {\n  const [active, setActive] = useState('pc');\n  return (\n    <DemoGroup>\n      <Group isAttached>\n        <Button isSelected={active === 'pc'} onClick={() => setActive('pc')}>\n          <Icon type=\"electronics\" />\n        </Button>\n        <Button isSelected={active === 'pad'} onClick={() => setActive('pad')}>\n          <Icon type=\"pad\" />\n        </Button>\n        <Button isSelected={active === 'phone'} onClick={() => setActive('phone')}>\n          <Icon type=\"mobile-phone\" />\n        </Button>\n      </Group>\n    </DemoGroup>\n  );\n};",deps:()=>[],provides:{useState:a.useState,DemoGroup:i.DemoGroup,Group:i.Group,Button:i.Button,Icon:c.a}};j.__inner_source="() => {\n  const [active, setActive] = useState('pc');\n  return (\n    <DemoGroup>\n      <Group isAttached>\n        <Button isSelected={active === 'pc'} onClick={() => setActive('pc')}>\n          <Icon type=\"electronics\" />\n        </Button>\n        <Button isSelected={active === 'pad'} onClick={() => setActive('pad')}>\n          <Icon type=\"pad\" />\n        </Button>\n        <Button isSelected={active === 'phone'} onClick={() => setActive('phone')}>\n          <Icon type=\"mobile-phone\" />\n        </Button>\n      </Group>\n    </DemoGroup>\n  );\n}",j.__doc_info=A;var T={id:"button",title:"Button \u6309\u94ae"},U={unversionedId:"button",id:"button",isDocsHomePage:!1,title:"Button \u6309\u94ae",description:"basic,",source:"@site/docs/button.mdx",sourceDirName:".",slug:"/button",permalink:"/rex-design/docs/button",editUrl:"https://github.com/alibaba/rex-design/edit/main/packages/doc/docs/button.mdx",version:"current",frontMatter:{id:"button",title:"Button \u6309\u94ae"},sidebar:"docs",previous:{title:"Badge \u63d0\u793a\u6846",permalink:"/rex-design/docs/badge"},next:{title:"Link \u94fe\u63a5",permalink:"/rex-design/docs/link"}},z=[{value:"\u4f7f\u7528\u573a\u666f",id:"\u4f7f\u7528\u573a\u666f",children:[]},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",children:[{value:"\u57fa\u672c\u793a\u4f8b",id:"\u57fa\u672c\u793a\u4f8b",children:[]},{value:"\u6574\u884c\u6309\u94ae",id:"\u6574\u884c\u6309\u94ae",children:[]},{value:"\u6309\u94ae\u5927\u5c0f",id:"\u6309\u94ae\u5927\u5c0f",children:[]},{value:"\u6309\u94ae\u7ec4",id:"\u6309\u94ae\u7ec4",children:[]},{value:"\u6309\u94ae\u4e2d\u7684\u56fe\u6807",id:"\u6309\u94ae\u4e2d\u7684\u56fe\u6807",children:[]},{value:"\u52a0\u8f7d\u72b6\u6001",id:"\u52a0\u8f7d\u72b6\u6001",children:[]},{value:"\u4e0d\u540c\u5f62\u72b6",id:"\u4e0d\u540c\u5f62\u72b6",children:[]}]},{value:"API",id:"api",children:[]}],P=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(s.b)("div",t)}},L=P("Story"),N=P("PropsTable"),R={toc:z};function M(e){var t=e.components,n=Object(u.a)(e,["components"]);return Object(s.b)("wrapper",Object(o.a)({},R,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("h2",{id:"\u4f7f\u7528\u573a\u666f"},"\u4f7f\u7528\u573a\u666f"),Object(s.b)("p",null,"\u6807\u8bb0\u4e86\u4e00\u4e2a\uff08\u6216\u5c01\u88c5\u4e00\u7ec4\uff09\u64cd\u4f5c\u547d\u4ee4\uff0c\u54cd\u5e94\u7528\u6237\u70b9\u51fb\u884c\u4e3a\uff0c\u89e6\u53d1\u76f8\u5e94\u7684\u4e1a\u52a1\u903b\u8f91\u3002"),Object(s.b)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),Object(s.b)("h3",{id:"\u57fa\u672c\u793a\u4f8b"},"\u57fa\u672c\u793a\u4f8b"),Object(s.b)(L,{fn:l,mdxType:"Story"}),Object(s.b)("h3",{id:"\u6574\u884c\u6309\u94ae"},"\u6574\u884c\u6309\u94ae"),Object(s.b)(L,{fn:d,mdxType:"Story"}),Object(s.b)("h3",{id:"\u6309\u94ae\u5927\u5c0f"},"\u6309\u94ae\u5927\u5c0f"),Object(s.b)(L,{fn:B,mdxType:"Story"}),Object(s.b)("h3",{id:"\u6309\u94ae\u7ec4"},"\u6309\u94ae\u7ec4"),Object(s.b)(L,{fn:x,mdxType:"Story"}),Object(s.b)("h3",{id:"\u6309\u94ae\u4e2d\u7684\u56fe\u6807"},"\u6309\u94ae\u4e2d\u7684\u56fe\u6807"),Object(s.b)(L,{fn:h,mdxType:"Story"}),Object(s.b)("h3",{id:"\u52a0\u8f7d\u72b6\u6001"},"\u52a0\u8f7d\u72b6\u6001"),Object(s.b)(L,{fn:v,mdxType:"Story"}),Object(s.b)("h3",{id:"\u4e0d\u540c\u5f62\u72b6"},"\u4e0d\u540c\u5f62\u72b6"),Object(s.b)(L,{fn:E,mdxType:"Story"}),Object(s.b)("h2",{id:"api"},"API"),Object(s.b)(N,{component:i.Button,mdxType:"PropsTable"}))}M.isMDXComponent=!0}}]);