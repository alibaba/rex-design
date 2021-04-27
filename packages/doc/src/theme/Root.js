import React from 'react';
import { StyleSheetManager } from 'styled-components';

export default function Root({ children }) {
  // SystemProvider 会在 Layout 组件中进行注入，Root 中就不需要注入了
  return (
    <StyleSheetManager disableVendorPrefixes={process.env.NODE_ENV !== 'production'}>
      <>{children}</>
    </StyleSheetManager>
  );
}
