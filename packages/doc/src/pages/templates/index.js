import React from 'react';
import Layout from '@theme/Layout';
import DocSidebar from '@theme/DocSidebar';
import { useLocation } from 'react-router-dom';
import { Box } from '@rexd/core';
// import { SearchList } from 'story/src/template/list.stories';
import { ApproveTicket } from 'story/src/template/approve.stories';

export default function Templates() {
  const location = useLocation();
  console.log({ location });

  return (
    <Layout title="样板间">
      <Box display="flex">
        <Box mt="-52px" borderRight="solid" borderRightColor="var(--ifm-color-emphasis-200)">
          <DocSidebar
            path="/templates"
            sidebar={[
              { type: 'link', href: '/templates', label: '审批单据' },
              // { type: 'link', href: '/templates/test-2', label: '搜索列表' },
            ]}
          />
        </Box>
        <Box flex="1">
          <ApproveTicket />
        </Box>
      </Box>
    </Layout>
  );
}
