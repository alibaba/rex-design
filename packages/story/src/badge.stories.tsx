import React from 'react';
import { Box, Badge, Group } from '@rexd/core';

export default { title: 'Badge' };

export const Basic = () => (
  <Group>
    <Badge shape="pill">99</Badge>
    <Badge shape="dot" />
    <Badge shape="badge">普通标签</Badge>
  </Group>
);

export const StatusBadge = () => (
  <Group>
    <Badge status="normal">普通</Badge>
    <Badge status="success">成功</Badge>
    <Badge status="error">错误</Badge>
    <Badge status="warning">警告</Badge>
  </Group>
);

export const CustomColor = () => (
  <Group>
    <Badge bg="#BADA55" color="#FFF">
      #BADA55
    </Badge>
    <Badge bg="#FFA500" color="#FFF">
      #FFA500
    </Badge>
    <Badge bg="#0000FF" color="#FFF">
      #0000FF
    </Badge>
  </Group>
);

export const NumberBadge = () => (
  <Group>
    <Badge shape="pill">1</Badge>
    <Badge shape="pill">99</Badge>
    <Badge shape="pill">129</Badge>
  </Group>
);

export const TopRight = () => (
  <Box display="inline-block" position="relative">
    <Box display="inline-block" size="40px" borderRadius="2px" bg="#333" />
    <Badge shape="pill" style={{ verticalAlign: 'top', position: 'absolute' }}>
      99+
    </Badge>
  </Box>
);
