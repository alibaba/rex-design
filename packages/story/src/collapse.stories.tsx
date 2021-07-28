import React from 'react';
import { Collapse, CollapseGroup } from '@rexd/core/src/components/collapse';
import { useCollapse } from '@rexd/core/src/components/collapse/use-collapse';
import { Button, Flex, Text } from '@rexd/core';

export default { title: 'Collapse' };

export const Basic = () => (
  <CollapseGroup>
    <Collapse title="MFDT 多因子设计">
      <ul>
        <li>
          随着新零售的快速发展，新的端源源不断的出现，小二每天要面对大量的设备，PC、Pad、POS、Phone、RF、Watch、TV...
          每个端因为分辨率、屏幕精度、使用场景等条件等不同
        </li>
        <li>为了保持每个端更好的体验，设计师都需要分别设计一套组件和定义一套设计规范，开发者的维护成本也越来越高。</li>
      </ul>
    </Collapse>
    <Collapse title="品牌色">
      <ul>
        <li>主色</li>
        <li>辅色</li>
      </ul>
    </Collapse>
    <Collapse title="色彩体系">
      <img src="https://hippo-oss.oss-cn-hangzhou.aliyuncs.com/rex/design-images/colors/c166967f.png" />
    </Collapse>
    <Collapse title="语义色">
      语义色代表明确的信息以及状态，比如成功、出错、失败、提醒、链接等。功能色的选择需要按照常规色彩认知。比如：红色表达危险状态，橙色表达警示状态，绿色表达成功状态，蓝色为链接。在颜色选择上，请参考色板语义。
    </Collapse>
  </CollapseGroup>
);

const ds = [
  {
    title: 'simple title',
    content: (
      <ul>
        <li>Promotions are marketing campaigns ran by Marketplace</li>
        <li>Participate to sale your products during that promotion and make a profit</li>
      </ul>
    ),
  },
  {
    title: 'simple title 2',
    panelKey: 'title2',
    content: <div>wow</div>,
  },
  {
    title: 'simple title 3',
    panelKey: 'wow',
    content: <div>WOW</div>,
  },
];

const nestedDataSource = [
  {
    title: 'simple title',
    content: (
      <ul>
        <li>Promotions are marketing campaigns ran by Marketplace</li>
        <li>Participate to sale your products during that promotion and make a profit</li>
      </ul>
    ),
  },
  {
    title: 'simple title 2',
    content: <CollapseGroup dataSource={ds} onExpand={console.log} />,
  },
];

export const DataSource = () => <CollapseGroup dataSource={ds} onExpand={console.log} />;

export const Accordion = () => <CollapseGroup dataSource={ds} accordion onExpand={console.log} />;

export const Disabled = () => <CollapseGroup dataSource={ds} disabled />;

export const Nested = () => <CollapseGroup dataSource={nestedDataSource} onExpand={console.log} />;

export const Hooks = () => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({
    defaultExpanded: true,
  });

  return (
    <Flex width="300px" direction="column" border="1px solid rgba(0, 0, 0, 0.12)" borderRadius="4px" p="16px">
      <Text as="h2">小盒马大促销</Text>
      <div>
        <Button {...getToggleProps()}>{isExpanded ? '关闭' : '更多'}</Button>
      </div>
      <div {...getCollapseProps({})}>
        三元一斤十元三斤 Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores deleniti eius facere iusto
        nobis? Libero sequi veritatis vitae? Ex illo itaque modi molestiae quas, quis ratione unde veniam. Quis,
        voluptatibus?
      </div>
    </Flex>
  );
};
