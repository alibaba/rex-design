import { ActionSheet, Box, Button, Dialog, extendTheme, Group, Image, THEMES } from '@rexd/core';
import { Icon } from '@rexd/icon';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ToggleButtonGroup } from './components';
import { AudioIcon, EyeIcon, GestureIcon, MouseIcon } from './icons';
import { Form, FormItem, FormModel } from './mini-xform';
import { FormItemView } from './mini-xform/form-ui';
import { generateFontSizeTokens } from './token-factory';

export default {
  title: 'Config/System',
};

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

const getDevice = (width: number, operation?: string) => {
  let device = 'desktop';
  if (width < SCREEN_BREAKPOINT_FOR_PHONE || operation === 'gesture') {
    device = 'phone';
  }
  return device;
};

const iconProps = {
  width: '16px',
  height: '16px',
};

const SystemInner = observer(() => {
  const operations = [
    { value: 'mouse', label: <MouseIcon {...iconProps} />, title: '鼠标操作' },
    { value: 'gesture', label: <GestureIcon {...iconProps} />, title: '手势操作' },
    { value: 'eye', label: <EyeIcon {...iconProps} />, disabled: true, title: '仅阅读' },
    { value: 'audio', label: <AudioIcon {...iconProps} />, disabled: true, title: '语音操作' },
  ];

  const handlePreview = () => {
    const device = getDevice(model.values.width, model.values.operation);
    const fontSizes = generateFontSizeTokens(model.values);
    Dialog.show({
      title: 'ReX 主题效果预览',
      disableScroll: 'force',
      content: (
        <Box display="flex">
          <Box flex="1">
            <Image src={gifMap[device]} width="400px" />
          </Box>
          <Box flex="1">
            <Box fontSize="title" pl="l" mb="xl">
              根据最小视距推荐的字号序列：
            </Box>
            <Box>
              {Object.keys(fontSizes).map((item) => (
                <Box key={item} px="l" fontSize="14px" lineHeight={2}>
                  <Box display="inline-block" width="80px" textAlign="right" mr="m" fontWeight="bold">
                    {item}
                  </Box>
                  <Box display="inline-block">{fontSizes[item]}px</Box>
                </Box>
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
      <Box flex="1" pl="60px" py="48px" bg="#f0f0f0">
        <Form model={model} layout={{ labelPosition: 'top' }}>
          <FormItem
            component="input"
            label="最小阅读距离"
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
          <Form.ItemGroup label="分辨率" inline controlWidth={240}>
            <FormItem
              component="input"
              label={null}
              name="width"
              componentProps={{ placeholder: '宽度', rightElement: <Box fontSize="body">px</Box> }}
              style={{ marginRight: 12 }}
            />
            <FormItem
              component="input"
              label={null}
              name="height"
              componentProps={{ placeholder: '宽度', rightElement: <Box fontSize="body">px</Box> }}
            />
          </Form.ItemGroup>
          <FormItemView label="主要操作方式">
            <ToggleButtonGroup
              value={model.getField('operation').value}
              onChange={model.getField('operation').handleChange}
              {...{
                dataSource: operations,
                selectMode: 'single',
                buttonProps: {
                  iconOnly: true,
                },
              }}
            />
          </FormItemView>
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
            'url(https://img.alicdn.com/imgextra/i1/O1CN01cg5Nkk1R3gzn9k9rG_!!6000000002056-2-tps-800-1286.png) top left',
          backgroundColor: '#2d3987',
          backgroundSize: 'cover',
          backgroundPositionY: '-100px',
        }}
      />
      <Box position="absolute" top="32px" right="32px">
        <Image src="https://img.alicdn.com/imgextra/i2/O1CN01ReQtHu25fmZ7MZkba_!!6000000007554-55-tps-72-15.svg" />
      </Box>
    </Box>
  );
});

export const System = () => <SystemInner />;
