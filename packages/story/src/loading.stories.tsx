import { Flex, Loading, RadioGroup } from '@rexd/core';
import React, { useState } from 'react';

export default { title: 'Loading' };

const hippoIntroduction =
  '盒马是阿里巴巴集团旗下，以数据和技术驱动的新零售平台。盒马希望为消费者打造社区化的一站式新零售体验中心，用科技和人情味带给人们“鲜美生活”。';

const Content = () => (
  <>
    {hippoIntroduction}
    {hippoIntroduction}
    {hippoIntroduction}
    <br />
    {hippoIntroduction}
    {hippoIntroduction}
    {hippoIntroduction}
    <br />
    {hippoIntroduction}
    {hippoIntroduction}
    {hippoIntroduction}
    <br />
  </>
);

export function Basic() {
  return (
    <Loading visible>
      <div style={{ minHeight: 400, fontSize: 16, lineHeight: 1.5, background: 'var(--rex-colors-emphasis-20)' }}>
        <Content />
      </div>
    </Loading>
  );
}

export function Controlled() {
  const [size, setSize] = useState('large');
  const [visible, setVisible] = useState(true);

  return (
    <div>
      <Flex alignItems="center">
        可见：
        <RadioGroup
          dataSource={[
            { value: 'true', label: '显示' },
            { value: 'false', label: '隐藏' },
          ]}
          value={String(visible)}
          onChange={(s) => setVisible(s === 'true')}
        />
      </Flex>
      <Flex alignItems="center">
        尺寸：
        <RadioGroup
          dataSource={[
            { value: 'mediun', label: '中尺寸' },
            { value: 'large', label: '大尺寸' },
          ]}
          value={size}
          onChange={setSize}
        />
      </Flex>

      <Loading visible={visible} size={size as any}>
        <div style={{ minHeight: 400, fontSize: 16, lineHeight: 1.5, background: 'var(--rex-colors-emphasis-20)' }}>
          <Content />
        </div>
      </Loading>
    </div>
  );
}
