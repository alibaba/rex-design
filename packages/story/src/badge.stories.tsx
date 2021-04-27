import React from 'react';
import { Box, Badge, DemoGroup } from '@rexd/core';

export default { title: 'Badge' };

export const basic = () => (
  <DemoGroup>
    <Badge status="success">成功</Badge>
    <Badge status="error">错误</Badge>
    <Badge status="warning">警告</Badge>
  </DemoGroup>
);

export const customColor = () => (
  <Badge color="#fff" bg="deeppink" fontSize="14px">
    自定义
  </Badge>
);

export const NumberBadge = () => (
  <DemoGroup>
    <Badge status="error" isPill>
      1
    </Badge>
    <Badge status="error" isPill>
      99
    </Badge>
    <Badge status="error" isPill>
      129
    </Badge>
  </DemoGroup>
);

export const TopRight = () => (
  <div>
    <Box display="inline-block" size="40px" borderRadius="2px" bg="#aaa" />
    <Badge status="error" isPill style={{ verticalAlign: 'top', position: 'absolute' }}>
      99+
    </Badge>
  </div>
);
