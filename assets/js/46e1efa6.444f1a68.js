(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{125:function(n,t,e){"use strict";e.r(t),e.d(t,"frontMatter",(function(){return C})),e.d(t,"metadata",(function(){return j})),e.d(t,"toc",(function(){return w})),e.d(t,"default",(function(){return _}));var i,o=e(3),r=e(7),l=e(0),s=e.n(l),a=e(166),u=e(163),c=e(165),d=e(543);function p(){return s.a.createElement(u.Tooltip,{trigger:s.a.createElement(u.Button,null,"hover me")},s.a.createElement("div",{style:{maxWidth:200}},"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias quas nisi maiores odio nihil modi accusantium inventore minus est ipsa natus pariatur, cumque, facilis minima. Consequatur ratione voluptas earum eveniet!"))}var m={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/overlays/tooltip.stories.tsx",loc:{start:{line:7,column:7},end:{line:16,column:1}},name:"Basic",value:p,source:"function Basic() {\n  return (\n    <Tooltip trigger={<Button>hover me</Button>}>\n      <div style={{ maxWidth: 200 }}>\n        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias quas nisi maiores odio nihil modi accusantium\n        inventore minus est ipsa natus pariatur, cumque, facilis minima. Consequatur ratione voluptas earum eveniet!\n      </div>\n    </Tooltip>\n  );\n}",deps:function(){return[]},provides:{Tooltip:u.Tooltip,Button:u.Button}};p.__doc_info=m,p.__inner_source="function Basic() {\n  return (\n    <Tooltip trigger={<Button>hover me</Button>}>\n      <div style={{ maxWidth: 200 }}>\n        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias quas nisi maiores odio nihil modi accusantium\n        inventore minus est ipsa natus pariatur, cumque, facilis minima. Consequatur ratione voluptas earum eveniet!\n      </div>\n    </Tooltip>\n  );\n}";var g=d.styled.div(i||(i=Object(c.a)(["\n  margin: 100px;\n  display: grid;\n  grid: repeat(5, 40px) / repeat(5, auto);\n  gap: 8px;\n  justify-content: center;\n  align-items: center;\n"]))),b={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/overlays/tooltip.stories.tsx",loc:{start:{line:18,column:0},end:{line:25,column:2}},name:"ButtonGrid",value:g,source:"const ButtonGrid = styled.div`\n  margin: 100px;\n  display: grid;\n  grid: repeat(5, 40px) / repeat(5, auto);\n  gap: 8px;\n  justify-content: center;\n  align-items: center;\n`;",deps:function(){return[]},provides:{styled:d.styled}},f=function(){return s.a.createElement("div",{style:{width:200,height:100}},"tooltip content")},v={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/overlays/tooltip.stories.tsx",loc:{start:{line:27,column:0},end:{line:27,column:92}},name:"TooltipContent",value:f,source:"const TooltipContent = () => <div style={{ width: 200, height: 100 }}>tooltip content</div>;",deps:function(){return[]},provides:{}};function x(){var n=function(n,t){return n.map((function(n,e){return s.a.createElement(u.Tooltip,{key:n,flip:!1,renderTrigger:function(i){return s.a.createElement(u.Button,Object(o.a)({},i,{style:t(e)}),n)},placement:n},s.a.createElement(f,null))}))};return s.a.createElement(g,null,n(["top-end","top","top-start"],(function(n){return{gridRow:1,gridColumn:n+2}})),n(["left-end","left","left-start"],(function(n){return{gridColumn:1,gridRow:n+2}})),n(["right-end","right","right-start"],(function(n){return{gridColumn:5,gridRow:n+2}})),n(["bottom-end","bottom","bottom-start"],(function(n){return{gridRow:5,gridColumn:n+2}})))}var h={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/overlays/tooltip.stories.tsx",loc:{start:{line:29,column:7},end:{line:73,column:1}},name:"Placements",value:x,source:"function Placements() {\n  const renderButtons = (\n    placements,\n    getStyle,\n  ) => {\n    return placements.map((placement, index) => (\n      <Tooltip\n        key={placement}\n        flip={false}\n        renderTrigger={(pass) => (\n          <Button {...pass} style={getStyle(index)}>\n            {placement}\n          </Button>\n        )}\n        placement={placement}\n      >\n        <TooltipContent />\n      </Tooltip>\n    ));\n  };\n\n  return (\n    <ButtonGrid>\n      {renderButtons(['top-end', 'top', 'top-start'], (index) => ({\n        gridRow: 1,\n        gridColumn: index + 2,\n      }))}\n\n      {renderButtons(['left-end', 'left', 'left-start'], (index) => ({\n        gridColumn: 1,\n        gridRow: index + 2,\n      }))}\n\n      {renderButtons(['right-end', 'right', 'right-start'], (index) => ({\n        gridColumn: 5,\n        gridRow: index + 2,\n      }))}\n\n      {renderButtons(['bottom-end', 'bottom', 'bottom-start'], (index) => ({\n        gridRow: 5,\n        gridColumn: index + 2,\n      }))}\n    </ButtonGrid>\n  );\n}",deps:function(){return[v,b]},provides:{Tooltip:u.Tooltip,Button:u.Button}};function T(){var n=Object(l.useState)(!1),t=n[0],e=n[1];return s.a.createElement(u.Tooltip,{visible:t,triggerType:"click",onRequestClose:function(){return e(!1)},trigger:s.a.createElement(u.Button,{onClick:function(){return e(!t)}},"\u70b9\u51fb\u5f39\u51fa\u63d0\u793a\u4fe1\u606f")},s.a.createElement(f,null))}x.__doc_info=h,x.__inner_source="function Placements() {\n  const renderButtons = (\n    placements,\n    getStyle,\n  ) => {\n    return placements.map((placement, index) => (\n      <Tooltip\n        key={placement}\n        flip={false}\n        renderTrigger={(pass) => (\n          <Button {...pass} style={getStyle(index)}>\n            {placement}\n          </Button>\n        )}\n        placement={placement}\n      >\n        <TooltipContent />\n      </Tooltip>\n    ));\n  };\n\n  return (\n    <ButtonGrid>\n      {renderButtons(['top-end', 'top', 'top-start'], (index) => ({\n        gridRow: 1,\n        gridColumn: index + 2,\n      }))}\n\n      {renderButtons(['left-end', 'left', 'left-start'], (index) => ({\n        gridColumn: 1,\n        gridRow: index + 2,\n      }))}\n\n      {renderButtons(['right-end', 'right', 'right-start'], (index) => ({\n        gridColumn: 5,\n        gridRow: index + 2,\n      }))}\n\n      {renderButtons(['bottom-end', 'bottom', 'bottom-start'], (index) => ({\n        gridRow: 5,\n        gridColumn: index + 2,\n      }))}\n    </ButtonGrid>\n  );\n}";var y={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/overlays/tooltip.stories.tsx",loc:{start:{line:75,column:7},end:{line:88,column:1}},name:"Controlled",value:T,source:'function Controlled() {\n  const [visible, setVisible] = useState(false);\n\n  return (\n    <Tooltip\n      visible={visible}\n      triggerType="click"\n      onRequestClose={() => setVisible(false)}\n      trigger={<Button onClick={() => setVisible(!visible)}>\u70b9\u51fb\u5f39\u51fa\u63d0\u793a\u4fe1\u606f</Button>}\n    >\n      <TooltipContent />\n    </Tooltip>\n  );\n}',deps:function(){return[v]},provides:{useState:l.useState,Tooltip:u.Tooltip,Button:u.Button}};T.__inner_source='function Controlled() {\n  const [visible, setVisible] = useState(false);\n\n  return (\n    <Tooltip\n      visible={visible}\n      triggerType="click"\n      onRequestClose={() => setVisible(false)}\n      trigger={<Button onClick={() => setVisible(!visible)}>\u70b9\u51fb\u5f39\u51fa\u63d0\u793a\u4fe1\u606f</Button>}\n    >\n      <TooltipContent />\n    </Tooltip>\n  );\n}',T.__doc_info=y;var B,C={id:"tooltip",title:"Tooltip \u6587\u5b57\u63d0\u793a"},j={unversionedId:"tooltip",id:"tooltip",isDocsHomePage:!1,title:"Tooltip \u6587\u5b57\u63d0\u793a",description:"\u4f7f\u7528\u573a\u666f",source:"@site/docs/tooltip.mdx",sourceDirName:".",slug:"/tooltip",permalink:"/rex-design/docs/tooltip",editUrl:"https://github.com/alibaba/rex-design/edit/main/packages/doc/docs/tooltip.mdx",version:"current",frontMatter:{id:"tooltip",title:"Tooltip \u6587\u5b57\u63d0\u793a"},sidebar:"docs",previous:{title:"Popup \u5f39\u5c42",permalink:"/rex-design/docs/popup"},next:{title:"Dialog \u5bf9\u8bdd\u6846",permalink:"/rex-design/docs/dialog"}},w=[{value:"\u4f7f\u7528\u573a\u666f",id:"\u4f7f\u7528\u573a\u666f",children:[]},{value:"\u4f7f\u7528\u65b9\u5f0f",id:"\u4f7f\u7528\u65b9\u5f0f",children:[]},{value:"\u52a8\u753b\u6548\u679c",id:"\u52a8\u753b\u6548\u679c",children:[]},{value:"API",id:"api",children:[]}],k=(B="PropsTable",function(n){return console.warn("Component "+B+" was not imported, exported, or provided by MDXProvider as global scope"),Object(a.b)("div",n)}),O={toc:w};function _(n){var t=n.components,e=Object(r.a)(n,["components"]);return Object(a.b)("wrapper",Object(o.a)({},O,e,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"\u4f7f\u7528\u573a\u666f"},"\u4f7f\u7528\u573a\u666f"),Object(a.b)("p",null,"\u7b80\u5355\u7684\u6587\u5b57\u63d0\u793a\u6c14\u6ce1\u6846\u3002"),Object(a.b)("p",null,"\u9f20\u6807\u79fb\u5165\u5219\u663e\u793a\u63d0\u793a\uff0c\u79fb\u51fa\u6d88\u5931\uff0c\u6587\u5b57\u63d0\u793a\u4e0d\u627f\u8f7d\u590d\u6742\u6587\u672c\u548c\u64cd\u4f5c\u3002\u53ef\u7528\u6765\u4ee3\u66ff\u7cfb\u7edf\u9ed8\u8ba4\u7684 title \u63d0\u793a\uff0c\u63d0\u4f9b\u4e00\u4e2a \u6309\u94ae/\u6587\u5b57/\u64cd\u4f5c \u7684\u6587\u6848\u89e3\u91ca\u3002"),Object(a.b)("h2",{id:"\u4f7f\u7528\u65b9\u5f0f"},"\u4f7f\u7528\u65b9\u5f0f"),Object(a.b)("p",null,"\u6587\u5b57\u63d0\u793a\u8986\u76d6\u4e86",Object(a.b)("a",{parentName:"p",href:"popup"},"\u5f39\u5c42\u7ec4\u4ef6"),"\u9ed8\u8ba4\u7684\u6837\u5f0f\u548c\u52a8\u753b\u6548\u679c\uff0c\u5176\u7528\u6cd5\u4e0e\u5f39\u5c42\u7ec4\u4ef6\u76f8\u540c\u3002"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-jsx",metastring:"live",live:!0},"function App() {\n  return (\n    <Tooltip trigger={<div style={{ border: '1px solid currentColor', padding: 4 }}>\u9f20\u6807\u60ac\u505c\u67e5\u770b\u8be6\u60c5</div>}>\n      \u6700\u8fd1\u5de5\u4f5c\uff1a\u9ad8\u7ea7\u7ecf\u7406\uff5c\u62db\u5546\u94f6\u884c\u4e28\u676d\u5dde\u5206\u884c\uff5c2009-07-01 \u81f3\u4eca\n      <br />\n      \u5de5\u4f5c\u804c\u8d23\uff1a\u5df4\u62c9\u5df4\u62c9\u5c0f\u9b54\u4ed9\n      <br />\n      \u8054\u7cfb\u65b9\u5f0f\uff1a67676767\uff5c1212121@163.con\n      <br />\n      \u6559\u80b2\u7ecf\u7406\uff1a\u5317\u4eac\u5927\u5b66\uff5c\u5de5\u5546\u7ba1\u7406\uff5c2007-09-01 \u81f3 2006-06-01\n      <br />\n      \u4e2d\u592e\u8d22\u7ecf\u5927\u5b66\uff5c2004-09-01 \u81f3 2007-06-01\n    </Tooltip>\n  );\n}\n")),Object(a.b)("h2",{id:"\u52a8\u753b\u6548\u679c"},"\u52a8\u753b\u6548\u679c"),Object(a.b)("p",null,"\u6587\u5b57\u63d0\u793a\u7ec4\u4ef6\u7684\u52a8\u753b\u662f\u56fa\u5b9a\u7684\uff0c\u76ee\u524d\u4e0d\u652f\u6301\u5728\u4e0a\u5c42\u6307\u5b9a\u3002"),Object(a.b)(x,null),Object(a.b)("h2",{id:"api"},"API"),Object(a.b)(k,{component:u.Tooltip,mdxType:"PropsTable"}))}_.isMDXComponent=!0}}]);