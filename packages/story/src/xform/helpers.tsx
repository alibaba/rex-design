import { Checkbox } from '@rexd/core';
import { useModel } from '@rexd/xform';
import { action, toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';
import type { ReactJsonViewProps } from 'react-json-view';

function BrowserOnly({
  children,
  fallback,
}: {
  children?: () => React.ReactElement;
  fallback?: React.ReactElement;
}): React.ReactElement {
  if (typeof document === 'undefined' || children == null) {
    return fallback ?? null;
  }

  return <>{children()}</>;
}

export const BrowserOnlyReactJson = (props: ReactJsonViewProps) => {
  return (
    <BrowserOnly>
      {() => {
        const ReactJson = require('react-json-view').default;
        return <ReactJson style={{ marginTop: 8, fontSize: 12, ...props.style }} {...props} />;
      }}
    </BrowserOnly>
  );
};

// https://github.com/mac-s-g/react-json-view/issues/121#issuecomment-670431408

export const ValuePreview = observer(
  ({ style, defaultShow }: { style?: React.CSSProperties; defaultShow?: boolean }) => {
    const model = useModel();
    const data = toJS(model.values) as object;
    const showReactJson = model.state.showReactJson ?? defaultShow;

    return (
      <div style={style}>
        <div>
          <Checkbox
            checked={showReactJson}
            onChange={action((b) => {
              model.state.showReactJson = b;
            })}
          >
            显示 JSON
          </Checkbox>
        </div>
        {showReactJson && <BrowserOnlyReactJson name="表单状态预览" src={data} />}
      </div>
    );
  },
);
