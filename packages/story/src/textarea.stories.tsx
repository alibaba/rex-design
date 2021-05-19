import React from 'react';
import { Textarea, Flex, Group } from '@rexd/core';

export default { title: 'Textarea' };

export function Basic() {
  const text =
    '盒马是阿里巴巴集团旗下，以数据和技术驱动的新零售平台。盒马以鲜活水产和新鲜蔬果为主打，开创了“不卖隔夜菜”的“盒马日日鲜”等系列心智商品，为您提供最快30分钟极速送达的智能购物体验。盒马希望为消费者打造社区化的一站式新零售体验中心，期待用科技和人情味带给盒区居民“鲜美生活”，让远亲更近，让近邻更亲！';
  return (
    <Flex direction="column" spacing="m">
      <Textarea onChange={console.log} />

      <Textarea defaultValue={text} onChange={console.log} />

      <Textarea defaultValue={text} onChange={console.log} readOnly />

      <Textarea defaultValue={text} onChange={console.log} disabled />
    </Flex>
  );
}

export function Rows() {
  return (
    <Group>
      <Textarea rows={2} />
      <Textarea rows={5} />
    </Group>
  );
}

export function Controlled() {
  return <Textarea value="hello" onChange={console.log} />;
}
