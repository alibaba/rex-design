import React from 'react';
import styled from 'styled-components';
import { Box, Group, Button, Image, Dialog, ToggleButtonGroup, ActionSheet, THEMES, extendTheme } from '@rexd/core';
import { Icon } from '@rexd/icon';
import { Form, FormItem, FormModel } from '@rexd/xform';
import { generateFontSizeTokens } from './token-factory';
import { AudioIcon, MouseIcon, EyeIcon, GestureIcon } from './icons';

export default {
  title: 'Config/System',
};

const FormItemGroup = Form.ItemGroup;

const FontBox = styled(Box)`
  border: 1px dashed transparent;
  line-height: 2;
  padding-left: var(--rex-space-l);
  padding-right: var(--rex-space-l);

  &:hover {
    border-color: var(--rex-colors-line-border);
  }
`;

FormItem.register({
  name: 'toggleButtonGroup',
  component: ToggleButtonGroup,
  fallbackValue: null,
  isEmpty(value) {
    if (Array.isArray(value) && !value.length) {
      return true;
    }
    return !!value;
  },
});

const model = new FormModel({
  distance: 350,
  diagonal: 21,
  width: 1024,
  height: 768,
  operation: 'mouse',
});

const downloads = [
  { key: 'json', label: '下载 JSON 文件' },
  { key: 'sketch', label: '下载 Sketch 文件', disabled: true },
];

const gifMap = {
  phone: '//img.alicdn.com/imgextra/i2/O1CN018Q4bIe1VbMZsZlIAL_!!6000000002671-1-tps-1080-810.gif',
  desktop: '//img.alicdn.com/imgextra/i1/O1CN019VkD4J1bZszf4vCqV_!!6000000003480-1-tps-1080-810.gif',
};

const SCREEN_BREAKPOINT_FOR_PHONE = 416;

const getDevice = (width: number) => {
  let device = 'desktop';
  if (width < SCREEN_BREAKPOINT_FOR_PHONE) {
    device = 'phone';
  }
  return device;
};

const iconProps = {
  width: '16px',
  height: '16px',
};

export function System() {
  const operations = [
    { value: 'mouse', label: <MouseIcon {...iconProps} />, title: '鼠标操作' },
    { value: 'gesture', label: <GestureIcon {...iconProps} />, title: '手势操作' },
    { value: 'eye', label: <EyeIcon {...iconProps} />, disabled: true, title: '仅阅读' },
    { value: 'audio', label: <AudioIcon {...iconProps} />, disabled: true, title: '语音操作' },
  ];

  const handlePreview = () => {
    const device = getDevice(model.values.width);
    const fontSizes = generateFontSizeTokens(model.values);
    Dialog.show({
      title: 'ReX 主题效果预览',
      content: (
        <Box display="flex">
          <Box flex="1">
            <Image src={gifMap[device]} width="400px" />
          </Box>
          <Box flex="1">
            <Box fontSize="title" pl="l" mb="l">
              根据输入视距推荐的字号序列
            </Box>
            <Box>
              {Object.keys(fontSizes).map((item) => (
                <FontBox key={item} fontSize={fontSizes[item]}>
                  {item} ({fontSizes[item]}px)
                </FontBox>
              ))}
            </Box>
          </Box>
        </Box>
      ),
      style: {
        width: 800,
      },
    });
  };

  const handleDownload = (action: string) => {
    const device = getDevice(model.values.width);

    if (action === 'json') {
      const fontSizes = generateFontSizeTokens(model.values);
      const theme = extendTheme(THEMES.light[device], { fontSizes });
      const dataStr = `data:text/json;chartset=utf-8,${encodeURIComponent(JSON.stringify(theme))}`;
      const node = document.createElement('a');
      node.setAttribute('href', dataStr);
      node.setAttribute('download', 'theme.rex.json');
      document.body.appendChild(node);
      node.click();
      node.remove();
    } else if (action === 'sketch') {
      // TODO: download sketch 暂不提供，需要支持 sketch 动态生成能力
    }
  };

  return (
    <Box display="flex" borderRadius="l" overflow="hidden" position="relative">
      <Box flex="1" pl="60px" py="48px" bg="fill.layer1">
        <Form model={model} layout={{ labelPosition: 'top' }}>
          <FormItem
            component="input"
            label="视距"
            name="distance"
            componentProps={{
              type: 'number',
              rightElement: <Box fontSize="body">mm</Box>,
              min: 200,
              max: 10000,
            }}
          />
          <FormItem
            component="input"
            label="屏幕对角线"
            name="diagonal"
            componentProps={{
              type: 'number',
              rightElement: <Box fontSize="body">英寸</Box>,
              min: 3,
              max: 85,
            }}
          />
          <FormItemGroup label="分辨率" inline controlWidth={148}>
            <FormItem
              component="input"
              label={null}
              name="width"
              componentProps={{ placeholder: '宽度', rightElement: <Box fontSize="body">px</Box>, width: 148 }}
              style={{ marginRight: 12 }}
            />
            <FormItem
              component="input"
              label={null}
              name="height"
              componentProps={{ placeholder: '宽度', rightElement: <Box fontSize="body">px</Box>, width: 148 }}
            />
          </FormItemGroup>
          <FormItem
            component="toggleButtonGroup"
            label="主要操作方式"
            name="operation"
            componentProps={{
              dataSource: operations,
              selectMode: 'single',
              buttonProps: {
                isIconButton: true,
              },
            }}
          />
          <Group>
            <Button onClick={handlePreview}>预览效果</Button>
            <ActionSheet
              target={
                <Button type="primary" rightElement={<Icon type="arrow-down-bold" />}>
                  确认下载组件
                </Button>
              }
              dataSource={downloads}
              onItemClick={handleDownload}
            />
          </Group>
        </Form>
      </Box>
      <Box
        flexBasis="400px"
        style={{
          background:
            'url(https://img.alicdn.com/imgextra/i1/O1CN01cg5Nkk1R3gzn9k9rG_!!6000000002056-2-tps-800-1286.png) top left no-repeat',
          backgroundSize: '100%',
          backgroundPositionY: '-100px',
        }}
      />
      <Box position="absolute" top="32px" right="32px">
        <Image src="https://img.alicdn.com/imgextra/i2/O1CN01ReQtHu25fmZ7MZkba_!!6000000007554-55-tps-72-15.svg" />
      </Box>
    </Box>
  );
}
