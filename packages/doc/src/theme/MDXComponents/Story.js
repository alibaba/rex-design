import React from 'react';
import ReactLiveScope from '@theme/ReactLiveScope';
import Playground from '@theme/Playground';
import CodeBlock from '@theme/CodeBlock';

const storyUsageSample = `\
import { Basic } from 'stories/src/button.stories.tsx';

<Story fn={Basic} />`;

function getProvidesComments(provides) {
  const filteredProvides = Object.keys(provides).filter((name) => ReactLiveScope[name] == null);
  if (filteredProvides.length === 0) {
    return null;
  }
  return [`// 以下变量从其他模块中引入：`, '//  ' + filteredProvides.join(', '), ''].join('\n');
}

function getLinesAndProvides(docInfo) {
  const provides = {};
  const lines = [];
  const usedSet = new Set();

  function dfs(info) {
    if (usedSet.has(info.name)) {
      return;
    }
    usedSet.add(info.name);
    for (const dep of info.deps()) {
      dfs(dep);
    }
    lines.push(info.source);
    Object.assign(provides, info.provides);
  }

  dfs(docInfo);

  lines.push(`render(<${docInfo.name} />)`);

  return { provides, lines };
}

export default function Story({ fn, style, className }) {
  const inlineStorySource = fn?.__inner_source;
  const docInfo = fn?.__doc_info;

  if (!fn || !(docInfo || inlineStorySource)) {
    return (
      <div className="admonition admonition-danger alert alert--danger">
        <div className="admonition-heading">
          <h2>MDX 渲染 story 失败</h2>
        </div>
        <div className="admonition-content">
          请确认 story 是否正确被引入。正确的使用方式如下：
          <CodeBlock className="language-jsx">{storyUsageSample}</CodeBlock>
        </div>
      </div>
    );
  }

  const deps = docInfo.deps();

  if (deps.length > 0) {
    const { provides, lines } = getLinesAndProvides(docInfo);

    return (
      <Playground
        className="language-jsx"
        previewClassName={className}
        previewStyle={style}
        scope={{ ...ReactLiveScope, ...provides }}
        metastring=""
        noInline
        docInfo={docInfo}
      >
        {[getProvidesComments(provides), lines.join('\n\n')].filter((s) => s != null).join('\n')}
      </Playground>
    );
  }

  return (
    <Playground
      className="language-jsx"
      previewClassName={className}
      previewStyle={style}
      scope={{ ...ReactLiveScope, ...docInfo.provides }}
      metastring=""
      docInfo={docInfo}
    >
      {[getProvidesComments(docInfo.provides), inlineStorySource].filter((s) => s != null).join('\n')}
    </Playground>
  );
}
