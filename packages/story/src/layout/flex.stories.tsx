import React from 'react';
import styled from 'styled-components';
import { Box, Flex, FlexItem } from '@rexd/core';

export default { title: 'Layout/Flex', component: Flex };

export const Simple = () => (
  <Flex spacing="l" direction="row">
    <Box width="40px" height="40px" bg="brand.normal" color="white">
      1
    </Box>
    <Box width="40px" height="40px" bg="brand.normal" color="white">
      2
    </Box>
    <Box width="40px" height="40px" bg="brand.normal" color="white">
      3
    </Box>
  </Flex>
);

export const VerticalStack = () => (
  <Flex spacing="l" direction="column">
    <Box width="40px" height="40px" bg="brand.normal" color="white">
      1
    </Box>
    <Box width="40px" height="40px" bg="brand.normal" color="white">
      2
    </Box>
    <Box width="40px" height="40px" bg="brand.normal" color="white">
      3
    </Box>
  </Flex>
);

const Example = styled.div`
  .rex-flex-item {
    padding: 12px 0;
    background-color: #ddd;
    border: 1px solid #ccc;
    text-align: center;
  }
`;

export const EqualCols = () => (
  <Example>
    <Flex>
      <FlexItem>1/3</FlexItem>
      <FlexItem>1/3</FlexItem>
      <FlexItem>1/3</FlexItem>
    </Flex>
  </Example>
);

export const ColSpan = () => (
  <Example>
    <Flex>
      <FlexItem span={1}>1/12</FlexItem>
      <FlexItem span={2}>1/6</FlexItem>
      <FlexItem span={3}>1/4</FlexItem>
      <FlexItem span={6}>1/2</FlexItem>
    </Flex>
  </Example>
);

export const AutoCol = () => (
  <Example>
    <Flex>
      <FlexItem>item</FlexItem>
      <FlexItem span="auto">动态宽度的内容</FlexItem>
      <FlexItem>item</FlexItem>
    </Flex>
  </Example>
);

export const ResponsiveCol = () => (
  <Example>
    <Flex wrap="wrap">
      <FlexItem span={{ s: 12, m: 6, l: 4 }}>responsive</FlexItem>
      <FlexItem>item</FlexItem>
      <FlexItem>item</FlexItem>
    </Flex>
  </Example>
);

export const JustifyAndAlign = () => (
  <Example>
    <Flex justify="space-around">
      <FlexItem span="auto">一个居中的盒子</FlexItem>
    </Flex>
  </Example>
);
