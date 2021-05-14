import { AppProvider, Box, Button, Text, useColorMode, useDevice } from '@rexd/core';
import * as React from 'react';
import { useState } from 'react';

export default {
  title: 'AppProvider',
};

export const Basic = () => (
  <AppProvider>
    <Box>hello world</Box>
  </AppProvider>
);

export const ChangeColorMode = () => {
  const [colorMode, setColorMode] = useState(useColorMode());

  return (
    <Box>
      <AppProvider colorMode={colorMode}>
        <Box height="400px" color="emphasis.10" bg="emphasis.10">
          <Button onClick={() => setColorMode(colorMode === 'light' ? 'dark' : 'light')}>切换色彩模式</Button>
          <Box mt="l">当前色彩模式: {colorMode}</Box>
          <Box data-innerbox height="250px" m="l" p="l" bg="emphasis.30">
            <AppProvider colorMode="light">
              <Button>Always light</Button>
            </AppProvider>
          </Box>
        </Box>
      </AppProvider>
    </Box>
  );
};

export const ChangeDeviceMode = () => {
  const device = useDevice();

  return (
    <Box>
      <Text as="mark">切换 storybook 的视图切换选项查看效果</Text>
      <Text as="p">name: {device.name}</Text>
      <Text as="p">breakpoint: {device.breakpoint}</Text>
    </Box>
  );
};
