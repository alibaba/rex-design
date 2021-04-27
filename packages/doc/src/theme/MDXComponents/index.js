import React from 'react';
import OriginalMDXComponents from '@theme-original/MDXComponents';
import Story from './Story';
import PropsTable from './PropsTable';
import ComponentSourceLink from './ComponentSourceLink';

function Image(props) {
  const [alt, meta] = props.alt.split('#');

  if (meta == null) {
    return <img src={props.src} alt={props.alt} />;
  }

  const align = meta.includes('center') ? 'center' : meta.includes('right') ? 'right' : undefined;
  const [_, w] = /width=(\d+)/.exec(meta) ?? [];
  const width = w == null ? undefined : Number(w);

  return (
    <span style={{ display: 'block', textAlign: align }}>
      <img src={props.src} alt={alt} style={{ width }} />
    </span>
  );
}

export default {
  ...OriginalMDXComponents,
  img: Image,
  PropsTable,
  Story,
  ComponentSourceLink,
};
