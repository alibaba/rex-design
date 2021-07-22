import React from 'react';
import Layout from '@theme/Layout';
import DocSidebar from '@theme/DocSidebar';

import { useLocation } from 'react-router-dom';

export default function Templates() {
  const location = useLocation();
  console.log({ location });

  return (
    <Layout title="样板间">
      <div style={{ display: 'flex' }}>
        <div style={{ marginTop: -52.5 }}>
          <DocSidebar
            path="/templates"
            sidebar={[
              { type: 'link', href: '/templates', label: '样板间1' },
              { type: 'link', href: '/templates/test-2', label: '样板间2' },
            ]}
          />
        </div>
        <div style={{ background: 'rgba(255,0,0,0.1)', flex: '1' }}>
          <div>hello world</div>
          <h1>!!!</h1>
        </div>
      </div>
    </Layout>
  );
}
