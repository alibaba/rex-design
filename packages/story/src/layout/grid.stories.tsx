import React from 'react';
import { Box, Grid, GridItem } from '@rexd/core';

export default { title: 'Layout/Grid' };

/**
 * 多列
 */
export function Columns() {
  return (
    <Grid columns={3} spacing={12}>
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
    </Grid>
  );
}

/**
 * 预设响应式
 */
export function Responsive() {
  return (
    <Grid columns={{ s: 2, m: 4, l: 6 }} spacing="12px">
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
    </Grid>
  );
}

/**
 * 自动响应式
 */
export function AutoResponsive() {
  return (
    <Grid minChildWidth="120px" spacing="12px">
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
    </Grid>
  );
}

/**
 * 间距
 */
export function Spacing() {
  return (
    <Grid columns={3} spacingX={6} spacingY={12}>
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
      <Box bg="blue" height="80px" />
    </Grid>
  );
}

/**
 * 不同列宽
 */
export function ColSpan() {
  return (
    <Grid height="100px" templateColumns="repeat(12, 1fr)" gap="4px">
      <GridItem colSpan={4} bg="blue" />
      <GridItem colSpan={8} bg="orange" />
    </Grid>
  );
}

/**
 * 自定义用法
 */
export function Complex() {
  return (
    <Grid
      height="200px"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(5, 1fr)"
      gap="4px">
      <GridItem rowSpan={2} colSpan={1} bg="black" />
      <GridItem colSpan={2} bg="orange" />
      <GridItem colSpan={2} bg="orange" />
      <GridItem colSpan={4} bg="black" />
    </Grid>
  );
}

export function StartEnd() {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap="4px">
      <GridItem colSpan={2} height="40px" bg="tomato" />
      <GridItem colStart={4} colEnd={6} height="40px" bg="papayawhip" />
    </Grid>
  );
}
