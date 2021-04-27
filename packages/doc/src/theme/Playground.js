import * as React from 'react';
import { Button, Tooltip } from '@rexd/core';
import { Icon } from '@rexd/icon';
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live';
import usePrismTheme from '@theme/hooks/usePrismTheme';
import styled from 'styled-components';
import cx from 'classnames';

const PlaygroundPreviewDiv = styled.div.withConfig({ componentId: 'playground-preview' })`
  border: 1px solid var(--ifm-color-emphasis-300);
  border-bottom: none;
  font-size: 14px;
  padding: 1rem;
  position: relative;

  li + li {
    margin-top: initial;
  }

  li > p {
    margin-top: initial;
  }
`;

const PlaygroundToolbarDiv = styled.div`
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-top: 1px dashed var(--ifm-color-emphasis-300);
  margin-bottom: var(--ifm-leading);

  &.showEditor {
    margin-bottom: 0;
    border-bottom: 1px dashed var(--ifm-color-emphasis-300);
  }

  .hint {
    font-size: 14px;
    position: absolute;
    right: 8px;
    color: var(--ifm-color-emphasis-500);
  }
`;

const StyledLiveEditor = styled(LiveEditor)`
  font-size: 12px;
  font-family: var(--ifm-font-family-monospace) !important;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-top: none;
  margin-bottom: var(--ifm-leading);
`;

function PlaygroundToolbar({ hint, showCopySuccess, showEditor, setShowEditor, setShowCopySuccess, code }) {
  return (
    <PlaygroundToolbarDiv className={cx({ showEditor })}>
      {hint.length > 0 && <span className="hint">{hint.join(' ')}</span>}

      <Tooltip
        renderTrigger={(arg) => (
          <Button
            {...arg}
            shape="text"
            size="small"
            onClick={() => {
              window.navigator.clipboard.writeText(code).then(() => {
                setShowCopySuccess(true);
              });
            }}
          >
            <Icon style={{ fontSize: 16 }} type={showCopySuccess ? 'select' : 'copy'} />
          </Button>
        )}
        afterClose={() => {
          setShowCopySuccess(false);
        }}
      >
        {showCopySuccess ? '复制成功' : '复制代码'}
      </Tooltip>

      <Tooltip
        renderTrigger={(arg) => (
          <Button
            {...arg}
            style={{ marginLeft: 4 }}
            shape="text"
            size="small"
            onClick={() => setShowEditor(!showEditor)}
          >
            <Icon style={{ fontSize: 16 }} type="code" />
          </Button>
        )}
      >
        {showEditor ? '隐藏代码' : '显示代码'}
      </Tooltip>
    </PlaygroundToolbarDiv>
  );
}

export default function Playground({
  children,
  theme,
  transformCode,
  noInline,
  docInfo,
  metastring,
  previewClassName,
  previewStyle,
  ...props
}) {
  const contextTheme = usePrismTheme();
  const defaultShow = metastring.includes('open');

  const [showEditor, setShowEditor] = React.useState(defaultShow);
  const [showCopySuccess, setShowCopySuccess] = React.useState(false);

  const hint = [];
  hint.push(noInline ? '非内联模式' : '内联模式');

  // storyDataset 用于标记这个 playground 是通过 <Story /> 产生的
  const storyDataset = docInfo ? { 'data-story': docInfo.name } : null;

  const code = children.replace(/\n$/, '');

  return (
    <LiveProvider
      code={code}
      transformCode={transformCode || ((code) => `${code};`)}
      theme={theme ?? contextTheme}
      noInline={noInline}
      {...props}
    >
      <PlaygroundPreviewDiv className={previewClassName} style={previewStyle} {...storyDataset}>
        <LivePreview className="playground-live-preview" />
        <LiveError className="playground-live-error" />
      </PlaygroundPreviewDiv>

      <PlaygroundToolbar
        code={code}
        hint={hint}
        showEditor={showEditor}
        setShowEditor={setShowEditor}
        showCopySuccess={showCopySuccess}
        setShowCopySuccess={setShowCopySuccess}
      />
      <StyledLiveEditor style={{ display: showEditor ? undefined : 'none' }} />
    </LiveProvider>
  );
}
