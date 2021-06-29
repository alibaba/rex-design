import { Box, Tab, Tabs } from '@rexd/core';
import React from 'react';

export default { title: 'Tabs' };

export const Basic = () => {
  return (
    <Tabs onChange={console.log}>
      <Tab value="t1" title="例子">
        <Box fontSize="body" p="m">
          例子内容
        </Box>
      </Tab>
      <Tab value="t2" title="代码片段">
        <Box fontSize="body" p="m">
          代码片段内容
        </Box>
      </Tab>
      <Tab value="t3" title="组件属性" disabled>
        <Box fontSize="body" p="m">
          组件属性内容
        </Box>
      </Tab>
      <Tab value="t4" title="设计文档">
        <Box fontSize="body" p="m">
          设计文档内容
        </Box>
      </Tab>
    </Tabs>
  );
};

/**
 * 对于较小视图，可以实现等宽满屏效果
 */
export const Fill = () => {
  return (
    <Tabs fill onChange={console.log}>
      <Tab value="t1" title="例子" />
      <Tab value="t2" title="代码片段" />
      <Tab value="t3" title="组件属性" />
      <Tab value="t4" title="设计文档" />
    </Tabs>
  );
};

/**
 * 垂直 Tabs
 */
export const Vertical = () => {
  return (
    <Tabs direction="column" onChange={console.log}>
      <Tab value="t1" title="例子">
        <Box fontSize="body" p="m">
          例子内容
        </Box>
      </Tab>
      <Tab value="t2" title="代码片段">
        <Box fontSize="body" p="m">
          代码片段内容
        </Box>
      </Tab>
      <Tab value="t3" title="组件属性" disabled>
        <Box fontSize="body" p="m">
          组件属性内容
        </Box>
      </Tab>
      <Tab value="t4" title="设计文档">
        <Box fontSize="body" p="m">
          设计文档内容
        </Box>
      </Tab>
    </Tabs>
  );
};

/**
 * 超出滚动的例子
 */
export const Scrollable = () => {
  return (
    <Tabs onChange={console.log}>
      <Tab value="t1" title="选项卡 1" />
      <Tab value="t2" title="选项卡 2" />
      <Tab value="t3" title="选项卡 3" />
      <Tab value="t4" title="选项卡 4" />
      <Tab value="t5" title="选项卡 5" />
      <Tab value="t6" title="选项卡 6" />
      <Tab value="t7" title="选项卡 7" />
      <Tab value="t8" title="选项卡 8" />
    </Tabs>
  );
};
