import { AppProvider, useColorMode, useDevice, Box, Text, Button } from '@rexd/core';
import * as React from 'react';

export default {
  title: 'AppProvider',
};

export const Basic = () => (
  <AppProvider>
    <Box>hello world</Box>
  </AppProvider>
);

export const ChangeColorMode = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = colorMode === 'dark' ? '#333' : '#eee';

  return (
    <Box bg={bg} p="xl">
      <Button onClick={() => toggleColorMode()}>切换色彩模式</Button>
      <Box mt="l">当前色彩模式: {colorMode}</Box>
    </Box>
  );
};

export const ChangeDeviceMode = () => {
  const { device } = useDevice();

  return (
    <Box>
      <Text as="mark">切换 storybook 的视图切换选项查看效果</Text>
      <Text as="p">name: {device.name}</Text>
      <Text as="p">breakpoint: {device.breakpoint}</Text>
    </Box>
  );
};
