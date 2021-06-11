import React from 'react';
import OriginalMDXComponents from '@theme-original/MDXComponents';
import Story from './Story';
import PropsTable from './PropsTable';

function Image(props) {
  const [alt, meta] = props.alt.split('#');

  if (meta == null) {
    return <img src={props.src} alt={props.alt} />;
  }

  const align = meta.includes('center') ? 'center' : meta.includes('right') ? 'right' : undefined;
  // eslint-disable-next-line no-unused-vars
  const [_, w] = /width=(\d+)/.exec(meta) ?? [];
  const width = w == null ? undefined : Number(w);

  return (
    <span style={{ display: 'block', textAlign: align }}>
      <img src={props.src} alt={alt} style={{ width }} />
    </span>
  );
}

function FormulaCenter({ children }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <p
        style={{
          textAlign: 'center',
          color: 'rgb(56,98,207)',
          background: '#DEE8FC',
          display: 'inline-block',
          fontWeight: 500,
          fontSize: 16,
        }}
      >
        {children}
      </p>
    </div>
  );
}

export default {
  ...OriginalMDXComponents,
  img: Image,
  PropsTable,
  Story,

  // 设计文档使用的额外样式
  FormulaCenter,
};
