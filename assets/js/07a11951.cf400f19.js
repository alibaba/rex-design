(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{113:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return u})),t.d(n,"metadata",(function(){return x})),t.d(n,"toc",(function(){return m})),t.d(n,"default",(function(){return f}));var o=t(3),i=t(7),c=t(0),r=t.n(c),a=t(160),p=t(164),s=t(158);const l=()=>{const[e,n]=Object(c.useState)("");return r.a.createElement(s.Box,null,r.a.createElement(s.Box,null,r.a.createElement(s.Input,{placeholder:"\u8f93\u5165\u56fe\u6807\u540d\u79f0\u8fdb\u884c\u68c0\u7d22",onChange:n})),r.a.createElement(s.Flex,{wrap:"wrap"},p.b.filter(n=>!e||n.includes(e)).map(e=>r.a.createElement(s.Flex,{direction:"column",justify:"center",align:"center",width:"160px",height:"120px",key:e},r.a.createElement(p.a,{type:e,style:{height:"50px",width:"50px"}}),r.a.createElement(s.Box,{fontSize:"16px"},e)))))},d={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/icon.stories.tsx",loc:{start:{line:7,column:7},end:{line:27,column:2}},name:"Basic",value:l,source:'const Basic = () => {\n  const [query, setQuery] = useState(\'\');\n\n  return (\n    <Box>\n      <Box>\n        <Input placeholder="\u8f93\u5165\u56fe\u6807\u540d\u79f0\u8fdb\u884c\u68c0\u7d22" onChange={setQuery} />\n      </Box>\n      <Flex wrap="wrap">\n        {iconTypes\n          .filter((name) => !query || name.includes(query))\n          .map((iconType) => (\n            <Flex direction="column" justify="center" align="center" width="160px" height="120px" key={iconType}>\n              <Icon type={iconType} style={{ height: \'50px\', width: \'50px\' }} />\n              <Box fontSize="16px">{iconType}</Box>\n            </Flex>\n          ))}\n      </Flex>\n    </Box>\n  );\n};',deps:()=>[],provides:{useState:c.useState,Box:s.Box,Input:s.Input,Flex:s.Flex,iconTypes:p.b,Icon:p.a}};l.__inner_source='() => {\n  const [query, setQuery] = useState(\'\');\n\n  return (\n    <Box>\n      <Box>\n        <Input placeholder="\u8f93\u5165\u56fe\u6807\u540d\u79f0\u8fdb\u884c\u68c0\u7d22" onChange={setQuery} />\n      </Box>\n      <Flex wrap="wrap">\n        {iconTypes\n          .filter((name) => !query || name.includes(query))\n          .map((iconType) => (\n            <Flex direction="column" justify="center" align="center" width="160px" height="120px" key={iconType}>\n              <Icon type={iconType} style={{ height: \'50px\', width: \'50px\' }} />\n              <Box fontSize="16px">{iconType}</Box>\n            </Flex>\n          ))}\n      </Flex>\n    </Box>\n  );\n}',l.__doc_info=d;var u={id:"icon",title:"Icon \u56fe\u6807"},x={unversionedId:"icon",id:"icon",isDocsHomePage:!1,title:"Icon \u56fe\u6807",description:"\u4f7f\u7528\u573a\u666f",source:"@site/docs/icon.mdx",sourceDirName:".",slug:"/icon",permalink:"/rex-design/docs/icon",editUrl:"https://github.com/alibaba/rex-design/edit/main/packages/doc/docs/icon.mdx",version:"current",frontMatter:{id:"icon",title:"Icon \u56fe\u6807"},sidebar:"docs",previous:{title:"Loading \u52a0\u8f7d\u4e2d",permalink:"/rex-design/docs/loading"},next:{title:"Image \u56fe\u7247",permalink:"/rex-design/docs/image"}},m=[{value:"\u4f7f\u7528\u573a\u666f",id:"\u4f7f\u7528\u573a\u666f",children:[]},{value:"\u793a\u4f8b",id:"\u793a\u4f8b",children:[]},{value:"API",id:"api",children:[]}],y=function(e){return function(n){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(a.b)("div",n)}},h=y("Story"),b=y("PropsTable"),g={toc:m};function f(e){var n=e.components,t=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},g,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"\u4f7f\u7528\u573a\u666f"},"\u4f7f\u7528\u573a\u666f"),Object(a.b)("p",null,"\u4e00\u7ec4\u4fbf\u4e8e\u4f7f\u7528\u7684 SVG \u56fe\u6807\u3002"),Object(a.b)("h2",{id:"\u793a\u4f8b"},"\u793a\u4f8b"),Object(a.b)(h,{fn:l,mdxType:"Story"}),Object(a.b)("h2",{id:"api"},"API"),Object(a.b)(b,{component:p.a,mdxType:"PropsTable"}))}f.isMDXComponent=!0}}]);