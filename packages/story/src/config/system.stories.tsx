import React from 'react';
import { Box, Group, Button } from '@rexd/core';
import { Form, FormItem, FormModel } from '@rexd/xform';

export default {
  title: 'Config/System',
};

const FormItemGroup = Form.ItemGroup;

const model = new FormModel({});

export function System() {
  return (
    <Box display="flex" borderRadius="l" bg="#FFF" overflow="hidden">
      <Box flex="1" pl="120px" py="48px">
        <Form model={model} layout={{ labelPosition: 'top' }}>
          <FormItem
            component="input"
            label="视距"
            name="distance"
            componentProps={{
              type: 'number',
              rightElement: <Box fontSize="body">mm</Box>,
            }}
          />
          <FormItem
            component="input"
            label="屏幕对角线"
            name="size"
            componentProps={{
              type: 'number',
              rightElement: <Box fontSize="body">英寸</Box>,
            }}
          />
          <FormItemGroup label="分辨率" inline controlWidth={148}>
            <FormItem
              component="input"
              label={null}
              name="resolution.width"
              componentProps={{ placeholder: '宽度', rightElement: <Box fontSize="body">px</Box>, width: 148 }}
              style={{ marginRight: 12 }}
            />
            <FormItem
              component="input"
              label={null}
              name="resolution.height"
              componentProps={{ placeholder: '宽度', rightElement: <Box fontSize="body">px</Box>, width: 148 }}
            />
          </FormItemGroup>
          <FormItem component="input" label="操作方式" name="operation" />
          <Group>
            <Button>预览效果</Button>
            <Button type="primary">确认下载组件</Button>
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
    </Box>
  );
}
