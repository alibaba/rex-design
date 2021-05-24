import React from 'react';
import { Confirm, Button, Group, Box } from '@rexd/core';

export default { title: 'Confirm' };

export const Basic = () => {
  const handlers = {
    onOk() {
      console.log('clicked ok');
    },
    onCancel() {
      console.log('clicked cancel');
    },
  };

  return (
    <Group>
      <Confirm title="确认删除吗？" {...handlers}>
        <Button shape="warning">删除</Button>
      </Confirm>
      <Confirm {...handlers}>
        <Box display="inline-block" p="m" bg="#333" color="#fff">
          点击盒子试试
        </Box>
      </Confirm>
    </Group>
  );
};
