(window.webpackJsonp=window.webpackJsonp||[]).push([[81],{159:function(e,n,l){"use strict";l.r(n),l.d(n,"frontMatter",(function(){return _})),l.d(n,"metadata",(function(){return B})),l.d(n,"toc",(function(){return y})),l.d(n,"default",(function(){return T}));var t=l(3),o=l(7),x=l(0),a=l.n(x),i=l(164),r=l(162),c=l(26);const m=()=>a.a.createElement(r.Flex,{spacing:"l",direction:"row"},a.a.createElement(r.Box,{width:"40px",height:"40px",bg:"brand.normal",color:"white"},"1"),a.a.createElement(r.Box,{width:"40px",height:"40px",bg:"brand.normal",color:"white"},"2"),a.a.createElement(r.Box,{width:"40px",height:"40px",bg:"brand.normal",color:"white"},"3")),s={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/layout/flex.stories.tsx",loc:{start:{line:7,column:7},end:{line:19,column:2}},name:"Simple",value:m,source:'const Simple = () => (\n  <Flex spacing="l" direction="row">\n    <Box width="40px" height="40px" bg="brand.normal" color="white">\n      1\n    </Box>\n    <Box width="40px" height="40px" bg="brand.normal" color="white">\n      2\n    </Box>\n    <Box width="40px" height="40px" bg="brand.normal" color="white">\n      3\n    </Box>\n  </Flex>\n);',deps:()=>[],provides:{Flex:r.Flex,Box:r.Box}};m.__doc_info=s,m.__inner_source='() => (\n  <Flex spacing="l" direction="row">\n    <Box width="40px" height="40px" bg="brand.normal" color="white">\n      1\n    </Box>\n    <Box width="40px" height="40px" bg="brand.normal" color="white">\n      2\n    </Box>\n    <Box width="40px" height="40px" bg="brand.normal" color="white">\n      3\n    </Box>\n  </Flex>\n)';const d=()=>a.a.createElement(r.Flex,{spacing:"l",direction:"column"},a.a.createElement(r.Box,{width:"40px",height:"40px",bg:"brand.normal",color:"white"},"1"),a.a.createElement(r.Box,{width:"40px",height:"40px",bg:"brand.normal",color:"white"},"2"),a.a.createElement(r.Box,{width:"40px",height:"40px",bg:"brand.normal",color:"white"},"3")),p={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/layout/flex.stories.tsx",loc:{start:{line:21,column:7},end:{line:33,column:2}},name:"VerticalStack",value:d,source:'const VerticalStack = () => (\n  <Flex spacing="l" direction="column">\n    <Box width="40px" height="40px" bg="brand.normal" color="white">\n      1\n    </Box>\n    <Box width="40px" height="40px" bg="brand.normal" color="white">\n      2\n    </Box>\n    <Box width="40px" height="40px" bg="brand.normal" color="white">\n      3\n    </Box>\n  </Flex>\n);',deps:()=>[],provides:{Flex:r.Flex,Box:r.Box}};d.__doc_info=p,d.__inner_source='() => (\n  <Flex spacing="l" direction="column">\n    <Box width="40px" height="40px" bg="brand.normal" color="white">\n      1\n    </Box>\n    <Box width="40px" height="40px" bg="brand.normal" color="white">\n      2\n    </Box>\n    <Box width="40px" height="40px" bg="brand.normal" color="white">\n      3\n    </Box>\n  </Flex>\n)';const F=c.e.div`
  .rex-flex-item {
    padding: 12px 0;
    background-color: #ddd;
    border: 1px solid #ccc;
    text-align: center;
  }
`,b={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/layout/flex.stories.tsx",loc:{start:{line:35,column:0},end:{line:42,column:2}},name:"Example",value:F,source:"const Example = styled.div`\n  .rex-flex-item {\n    padding: 12px 0;\n    background-color: #ddd;\n    border: 1px solid #ccc;\n    text-align: center;\n  }\n`;",deps:()=>[],provides:{styled:c.e}},u=()=>a.a.createElement(F,null,a.a.createElement(r.Flex,null,a.a.createElement(r.FlexItem,null,"1/3"),a.a.createElement(r.FlexItem,null,"1/3"),a.a.createElement(r.FlexItem,null,"1/3"))),h={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/layout/flex.stories.tsx",loc:{start:{line:44,column:7},end:{line:52,column:2}},name:"EqualCols",value:u,source:"const EqualCols = () => (\n  <Example>\n    <Flex>\n      <FlexItem>1/3</FlexItem>\n      <FlexItem>1/3</FlexItem>\n      <FlexItem>1/3</FlexItem>\n    </Flex>\n  </Example>\n);",deps:()=>[b],provides:{Flex:r.Flex,FlexItem:r.FlexItem}};u.__doc_info=h,u.__inner_source="() => (\n  <Example>\n    <Flex>\n      <FlexItem>1/3</FlexItem>\n      <FlexItem>1/3</FlexItem>\n      <FlexItem>1/3</FlexItem>\n    </Flex>\n  </Example>\n)";const g=()=>a.a.createElement(F,null,a.a.createElement(r.Flex,null,a.a.createElement(r.FlexItem,null,"1/4"),a.a.createElement(r.FlexItem,{span:6},"1/2"),a.a.createElement(r.FlexItem,null,"1/4"))),I={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/layout/flex.stories.tsx",loc:{start:{line:54,column:7},end:{line:62,column:2}},name:"ColSpan",value:g,source:"const ColSpan = () => (\n  <Example>\n    <Flex>\n      <FlexItem>1/4</FlexItem>\n      <FlexItem span={6}>1/2</FlexItem>\n      <FlexItem>1/4</FlexItem>\n    </Flex>\n  </Example>\n);",deps:()=>[b],provides:{Flex:r.Flex,FlexItem:r.FlexItem}};g.__doc_info=I,g.__inner_source="() => (\n  <Example>\n    <Flex>\n      <FlexItem>1/4</FlexItem>\n      <FlexItem span={6}>1/2</FlexItem>\n      <FlexItem>1/4</FlexItem>\n    </Flex>\n  </Example>\n)";const f=()=>a.a.createElement(F,null,a.a.createElement(r.Flex,null,a.a.createElement(r.FlexItem,null,"item"),a.a.createElement(r.FlexItem,{span:"auto"},"\u52a8\u6001\u5bbd\u5ea6\u7684\u5185\u5bb9"),a.a.createElement(r.FlexItem,null,"item"))),w={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/layout/flex.stories.tsx",loc:{start:{line:64,column:7},end:{line:72,column:2}},name:"AutoCol",value:f,source:'const AutoCol = () => (\n  <Example>\n    <Flex>\n      <FlexItem>item</FlexItem>\n      <FlexItem span="auto">\u52a8\u6001\u5bbd\u5ea6\u7684\u5185\u5bb9</FlexItem>\n      <FlexItem>item</FlexItem>\n    </Flex>\n  </Example>\n);',deps:()=>[b],provides:{Flex:r.Flex,FlexItem:r.FlexItem}};f.__doc_info=w,f.__inner_source='() => (\n  <Example>\n    <Flex>\n      <FlexItem>item</FlexItem>\n      <FlexItem span="auto">\u52a8\u6001\u5bbd\u5ea6\u7684\u5185\u5bb9</FlexItem>\n      <FlexItem>item</FlexItem>\n    </Flex>\n  </Example>\n)';const E=()=>a.a.createElement(F,null,a.a.createElement(r.Flex,{wrap:"wrap"},a.a.createElement(r.FlexItem,{span:{s:12,m:6,l:4}},"responsive"),a.a.createElement(r.FlexItem,null,"item"),a.a.createElement(r.FlexItem,null,"item"))),v={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/layout/flex.stories.tsx",loc:{start:{line:74,column:7},end:{line:82,column:2}},name:"ResponsiveCol",value:E,source:'const ResponsiveCol = () => (\n  <Example>\n    <Flex wrap="wrap">\n      <FlexItem span={{ s: 12, m: 6, l: 4 }}>responsive</FlexItem>\n      <FlexItem>item</FlexItem>\n      <FlexItem>item</FlexItem>\n    </Flex>\n  </Example>\n);',deps:()=>[b],provides:{Flex:r.Flex,FlexItem:r.FlexItem}};E.__inner_source='() => (\n  <Example>\n    <Flex wrap="wrap">\n      <FlexItem span={{ s: 12, m: 6, l: 4 }}>responsive</FlexItem>\n      <FlexItem>item</FlexItem>\n      <FlexItem>item</FlexItem>\n    </Flex>\n  </Example>\n)',E.__doc_info=v;var _={id:"flex",title:"Flex Flexbox\u76d2\u5b50"},B={unversionedId:"flex",id:"flex",isDocsHomePage:!1,title:"Flex Flexbox\u76d2\u5b50",description:"\u4f7f\u7528\u573a\u666f",source:"@site/docs/flex.mdx",sourceDirName:".",slug:"/flex",permalink:"/rex-design/docs/flex",editUrl:"https://github.com/alibaba/rex-design/edit/main/packages/doc/docs/flex.mdx",version:"current",frontMatter:{id:"flex",title:"Flex Flexbox\u76d2\u5b50"},sidebar:"docs",previous:{title:"Box \u76d2\u5b50",permalink:"/rex-design/docs/box"},next:{title:"Grid Grid\u76d2\u5b50",permalink:"/rex-design/docs/grid"}},y=[{value:"\u4f7f\u7528\u573a\u666f",id:"\u4f7f\u7528\u573a\u666f",children:[]},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",children:[{value:"\u57fa\u672c\u793a\u4f8b",id:"\u57fa\u672c\u793a\u4f8b",children:[]},{value:"\u5782\u76f4\u5e03\u5c40",id:"\u5782\u76f4\u5e03\u5c40",children:[]},{value:"\u591a\u5217",id:"\u591a\u5217",children:[]},{value:"\u4e0d\u540c\u5217\u5bbd",id:"\u4e0d\u540c\u5217\u5bbd",children:[]},{value:"\u81ea\u52a8\u5217\u5bbd",id:"\u81ea\u52a8\u5217\u5bbd",children:[]},{value:"\u54cd\u5e94\u5f0f\u5217\u5bbd",id:"\u54cd\u5e94\u5f0f\u5217\u5bbd",children:[]}]},{value:"API",id:"api",children:[{value:"Flex",id:"flex",children:[]},{value:"FlexItem",id:"flexitem",children:[]}]}],j=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(i.b)("div",n)}},O=j("Story"),k=j("PropsTable"),S={toc:y};function T(e){var n=e.components,l=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(t.a)({},S,l,{components:n,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"\u4f7f\u7528\u573a\u666f"},"\u4f7f\u7528\u573a\u666f"),Object(i.b)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),Object(i.b)("h3",{id:"\u57fa\u672c\u793a\u4f8b"},"\u57fa\u672c\u793a\u4f8b"),Object(i.b)(O,{fn:m,mdxType:"Story"}),Object(i.b)("h3",{id:"\u5782\u76f4\u5e03\u5c40"},"\u5782\u76f4\u5e03\u5c40"),Object(i.b)(O,{fn:d,mdxType:"Story"}),Object(i.b)("h3",{id:"\u591a\u5217"},"\u591a\u5217"),Object(i.b)(O,{fn:u,mdxType:"Story"}),Object(i.b)("h3",{id:"\u4e0d\u540c\u5217\u5bbd"},"\u4e0d\u540c\u5217\u5bbd"),Object(i.b)(O,{fn:g,mdxType:"Story"}),Object(i.b)("h3",{id:"\u81ea\u52a8\u5217\u5bbd"},"\u81ea\u52a8\u5217\u5bbd"),Object(i.b)(O,{fn:f,mdxType:"Story"}),Object(i.b)("h3",{id:"\u54cd\u5e94\u5f0f\u5217\u5bbd"},"\u54cd\u5e94\u5f0f\u5217\u5bbd"),Object(i.b)(O,{fn:E,mdxType:"Story"}),Object(i.b)("h2",{id:"api"},"API"),Object(i.b)("h3",{id:"flex"},"Flex"),Object(i.b)(k,{component:r.Flex,mdxType:"PropsTable"}),Object(i.b)("h3",{id:"flexitem"},"FlexItem"),Object(i.b)(k,{component:r.FlexItem,mdxType:"PropsTable"}))}T.isMDXComponent=!0}}]);