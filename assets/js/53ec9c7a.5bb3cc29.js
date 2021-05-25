(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{360:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var o=n(0),i=n.n(o),a=n(26);const r=a.d.div`
  height: 400px;
  border: 2px solid var(--ifm-color-emphasis-300, #dadde1);
  position: relative;
  display: grid;
  grid: repeat(3, 1fr) / repeat(3, 1fr);

  .h-line {
    position: absolute;
    top: calc(50% - 1px);
    height: 2px;
    width: 100%;
    border-top: var(--ifm-color-emphasis-400, #ccd0d5) dashed 2px;
  }

  .v-line {
    position: absolute;
    left: calc(50% - 1px);
    width: 2px;
    height: 100%;
    border-left: var(--ifm-color-emphasis-400, #ccd0d5) dashed 2px;
  }

  .placement {
    display: flex;
    align-items: center;
    justify-content: center;

    > * {
      width: 75%;
      height: 75%;
      border-radius: 6px;
      font-weight: bold;
      padding: 8px;

      code {
        font-size: 14px;
      }
    }
  }
`,s={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/overlays/position.stories.tsx",loc:{start:{line:8,column:0},end:{line:48,column:2}},name:"StyledDiv",value:r,source:"const StyledDiv = styled.div`\n  height: 400px;\n  border: 2px solid var(--ifm-color-emphasis-300, #dadde1);\n  position: relative;\n  display: grid;\n  grid: repeat(3, 1fr) / repeat(3, 1fr);\n\n  .h-line {\n    position: absolute;\n    top: calc(50% - 1px);\n    height: 2px;\n    width: 100%;\n    border-top: var(--ifm-color-emphasis-400, #ccd0d5) dashed 2px;\n  }\n\n  .v-line {\n    position: absolute;\n    left: calc(50% - 1px);\n    width: 2px;\n    height: 100%;\n    border-left: var(--ifm-color-emphasis-400, #ccd0d5) dashed 2px;\n  }\n\n  .placement {\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    > * {\n      width: 75%;\n      height: 75%;\n      border-radius: 6px;\n      font-weight: bold;\n      padding: 8px;\n\n      code {\n        font-size: 14px;\n      }\n    }\n  }\n`;",deps:()=>[],provides:{styled:a.d}};function d(){return i.a.createElement("div",{style:{paddingTop:"1rem",marginBottom:"1rem"}},i.a.createElement(r,null,i.a.createElement("span",{style:{position:"absolute",top:"-1rem",left:8}},i.a.createElement("code",null,"container")),i.a.createElement("div",{className:"h-line"}),i.a.createElement("div",{className:"v-line"}),["top-left","top","top-right","left","center","right","bottom-left","bottom","bottom-right"].map(e=>i.a.createElement("div",{className:"placement",key:e},i.a.createElement("div",{style:{background:"var(--ifm-color-emphasis-200, #ebedf0)"}},i.a.createElement("code",null,e))))))}const c={filename:"/Users/feichao.sfc/code/github/alibaba/rex-design/packages/story/src/overlays/position.stories.tsx",loc:{start:{line:50,column:7},end:{line:72,column:1}},name:"PlacementDiagram",value:d,source:"function PlacementDiagram() {\n  return (\n    <div style={{ paddingTop: '1rem', marginBottom: '1rem' }}>\n      <StyledDiv>\n        <span style={{ position: 'absolute', top: '-1rem', left: 8 }}>\n          <code>container</code>\n        </span>\n        <div className=\"h-line\" />\n        <div className=\"v-line\" />\n\n        {['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right'].map(\n          (placement) => (\n            <div className=\"placement\" key={placement}>\n              <div style={{ background: 'var(--ifm-color-emphasis-200, #ebedf0)' }}>\n                <code>{placement}</code>\n              </div>\n            </div>\n          ),\n        )}\n      </StyledDiv>\n    </div>\n  );\n}",deps:()=>[s],provides:{}};d.__inner_source="function PlacementDiagram() {\n  return (\n    <div style={{ paddingTop: '1rem', marginBottom: '1rem' }}>\n      <StyledDiv>\n        <span style={{ position: 'absolute', top: '-1rem', left: 8 }}>\n          <code>container</code>\n        </span>\n        <div className=\"h-line\" />\n        <div className=\"v-line\" />\n\n        {['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right'].map(\n          (placement) => (\n            <div className=\"placement\" key={placement}>\n              <div style={{ background: 'var(--ifm-color-emphasis-200, #ebedf0)' }}>\n                <code>{placement}</code>\n              </div>\n            </div>\n          ),\n        )}\n      </StyledDiv>\n    </div>\n  );\n}",d.__doc_info=c},93:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return d})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return f}));var o=n(3),i=n(8),a=(n(0),n(166)),r=n(164),s=n(360),d={id:"position",title:"Position \u5b9a\u4f4d"},c={unversionedId:"position",id:"position",isDocsHomePage:!1,title:"Position \u5b9a\u4f4d",description:"\u4f7f\u7528\u573a\u666f",source:"@site/docs/position.mdx",sourceDirName:".",slug:"/position",permalink:"/rex-design/docs/position",editUrl:"https://github.com/alibaba/rex-design/edit/main/packages/doc/docs/position.mdx",version:"current",frontMatter:{id:"position",title:"Position \u5b9a\u4f4d"},sidebar:"docs",previous:{title:"Drawer \u62bd\u5c49",permalink:"/rex-design/docs/drawer"},next:{title:"Toaster \u5410\u53f8\u63d0\u793a",permalink:"/rex-design/docs/toaster"}},l=[{value:"\u4f7f\u7528\u573a\u666f",id:"\u4f7f\u7528\u573a\u666f",children:[]}],p=function(e){return function(t){return console.warn("Component "+e+" was not imported, exported, or provided by MDXProvider as global scope"),Object(a.b)("div",t)}},m=p("Story"),b=p("PropsTable"),u={toc:l};function f(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(o.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"\u4f7f\u7528\u573a\u666f"},"\u4f7f\u7528\u573a\u666f"),Object(a.b)("p",null,"\u5bb9\u5668\u5185\u5b9a\u4f4d\u7ec4\u4ef6\u3002",Object(a.b)("inlineCode",{parentName:"p"},"<Position />")," \u662f\u4e00\u4e2a\u8f83\u4e3a\u5e95\u5c42\u7684\u7ec4\u4ef6\uff0c\u4e00\u822c\u4e0d\u4f1a\u5355\u72ec\u8fdb\u884c\u4f7f\u7528\u3002"),Object(a.b)("p",null,"Position \u63d0\u4f9b\u4e86 ",Object(a.b)("a",{parentName:"p",href:"dialog"},"\u5bf9\u8bdd\u6846"),"\u3001",Object(a.b)("a",{parentName:"p",href:"toast"},"\u5410\u53f8\u63d0\u793a")," \u7b49\u4e0a\u5c42\u7ec4\u4ef6\u6240\u9700\u7684",Object(a.b)("strong",{parentName:"p"},"\u5bb9\u5668\u5185\u90e8\u5b9a\u4f4d\u80fd\u529b"),"\u3002"),Object(a.b)(m,{fn:s.a,mdxType:"Story"}),Object(a.b)(b,{component:r.Position,mdxType:"PropsTable"}))}f.isMDXComponent=!0}}]);