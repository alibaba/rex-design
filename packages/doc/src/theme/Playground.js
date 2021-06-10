import * as React from 'react';
import { useReducer } from 'react';
import { Button, Confirm, Tooltip } from '@rexd/core';
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

const EditorWrapperDiv = styled.div`
  // 默认隐藏源码编辑器
  display: none;
  border: 1px solid var(--ifm-color-emphasis-300);
  border-top: none;
  font-size: 14px;
  margin-bottom: var(--ifm-leading);

  .playground-live-error {
    padding: 0.5rem;
    margin: 0 0.75rem 0.75rem;
    color: var(--ifm-color-danger-dark);
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

    & + ${EditorWrapperDiv} {
      display: block;
    }
  }

  .hint {
    font-size: 14px;
    position: absolute;
    right: 8px;
    color: var(--ifm-color-emphasis-500);
  }
`;

function PlaygroundToolbar({ hint, defaultShowEditor, code, onRefresh }) {
  const [showEditor, setShowEditor] = React.useState(defaultShowEditor);
  const [showCopySuccess, setShowCopySuccess] = React.useState(false);

  return (
    <PlaygroundToolbarDiv className={cx({ showEditor })}>
      {hint.length > 0 && <span className="hint">{hint.join(' ')}</span>}

      <Tooltip title="在 CodeSandbox 中打开 (开发中)" interactionKind="hover-target">
        <Button shape="text" size="small">
          <Icon style={{ fontSize: 16 }} type="file-open" />
        </Button>
      </Tooltip>

      <Confirm title="重置示例？" onOk={onRefresh}>
        <Button shape="text" size="small">
          <Icon style={{ fontSize: 16 }} type="refresh" />
        </Button>
      </Confirm>

      <Tooltip
        title={showCopySuccess ? '复制成功' : '复制代码'}
        interactionKind="hover-target"
        afterClose={() => {
          setShowCopySuccess(false);
        }}
      >
        <Button
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
      </Tooltip>

      <Tooltip title={showEditor ? '隐藏代码' : '显示代码'} interactionKind="hover-target">
        <Button shape="text" size="small" onClick={() => setShowEditor(!showEditor)}>
          <Icon style={{ fontSize: 16 }} type="code" />
        </Button>
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
  const [count, onRefresh] = useReducer((c) => c + 1, 0);

  const hint = [];
  hint.push(noInline ? 'noInline' : 'inline');

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
      </PlaygroundPreviewDiv>

      <PlaygroundToolbar code={code} hint={hint} defaultShowEditor={defaultShow} onRefresh={onRefresh} />
      <EditorWrapperDiv className="playground-editor-wrapper">
        <LiveEditor
          key={count}
          className="playground-editor"
          style={{ fontSize: 12, fontFamily: 'var(--ifm-font-family-monospace)' }}
        />
        <LiveError className="playground-live-error" />
      </EditorWrapperDiv>
    </LiveProvider>
  );
}
