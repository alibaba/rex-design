import { Anchor } from '@rexd/core';
import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';

export default { title: 'Anchor' };

const StyledH2 = styled.h2`
  &:target {
    background: #ccc;
    color: red;
  }
`;

const StyledH3 = styled.h3`
  &:target {
    background: #ccc;
    color: red;
  }
`;

export function Basic() {
  const repeat = (txt: string, n: number) => {
    return _.range(n).map((i) => (
      <p key={i} style={{ fontSize: 16, padding: 4, paddingLeft: 0, margin: 0 }}>
        {txt} {i}
      </p>
    ));
  };

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 'auto' }}>
        {repeat('主题文案', 5)}

        <div>
          <StyledH2 id="s1">1 Section1</StyledH2>
          <StyledH3 id="s1_1">1_1 Section1_1</StyledH3>
          <Contentful repeat={10} />

          <StyledH3 id="s1_2">1_2 Section1_2</StyledH3>
          <Contentful repeat={10} />

          <StyledH3 id="s1_3">1_3 Section1_3</StyledH3>
          <Contentful repeat={10} />
        </div>

        <div>
          <StyledH2 id="s2">2 Section2</StyledH2>
          <Contentful repeat={10} />
          <Contentful repeat={10} />
        </div>

        <div>
          <StyledH2 id="s3">3 Section3</StyledH2>
          <Contentful repeat={10} />
          <Contentful repeat={10} />
        </div>
      </div>

      <Anchor style={{ marginLeft: 12, flex: '0 0 140px', alignSelf: 'flex-start' }}>
        <Anchor.Item title="1 Section" href="#s1">
          <Anchor.Item title="1_1 Section1_1" href="#s1_1" />
          <Anchor.Item title="1_2 Section1_2" href="#s1_2" />
          <Anchor.Item title="1_3 Section1_3" href="#s1_3" />
        </Anchor.Item>
        <Anchor.Item title="2 Section 2" href="#s2" />
        <Anchor.Item title="3 Section 3" href="#s3" />
      </Anchor>
    </div>
  );
}

const hippo =
  '盒马是阿里巴巴集团旗下，以数据和技术驱动的新零售平台。盒马希望为消费者打造社区化的一站式新零售体验中心，用科技和人情味带给人们“鲜美生活”。';

const Contentful = ({ repeat = 2 }: { repeat?: number }) => {
  return <p style={{ fontSize: 14, color: 'var(--rex-colors-emphasis-60)' }}>{hippo.repeat(repeat)}</p>;
};

export function Basic2() {
  return (
    <div
      style={{
        display: 'flex',
        height: 400,
        overflow: 'auto',
        outline: '1px dashed var(--rex-colors-emphasis-40)',
      }}
    >
      <div style={{ flex: 'auto' }}>
        <StyledH2 id="test_usage">使用场景</StyledH2>
        <p style={{ fontSize: 14, color: 'var(--rex-colors-emphasis-60)' }}>
          ProTable 负责将数据渲染为 HTML 表格，其核心功能是将结构化的数据用表格的方式展现在页面中，并以组件 props
          的形式提供了丰富的表格功能，例如排序，过滤，滚动，锁列，行多选等。
          <br />
          在实现层面，ProTable 是对 ali-react-table 的封装，除了保留 基础的表格特性 之外，ProTable 也默认集成了
          大量表格功能拓展 。
        </p>
        <StyledH3 id="test_caution">注意事项</StyledH3>
        <Contentful />
        <StyledH3 id="test_extensions">拓展功能</StyledH3>
        <Contentful />
        <StyledH3 id="test_virtual">虚拟滚动</StyledH3>
        <Contentful />

        <StyledH2 id="test_examples">用法示例</StyledH2>
        <StyledH3 id="test_basic">基本表格</StyledH3>
        <Contentful />
        <Contentful />
        <StyledH3 id="test_style">表格样式</StyledH3>
        <Contentful />
        <Contentful />
        <StyledH3 id="test_loading">数据加载状态</StyledH3>
        <Contentful />
        <Contentful />
        <StyledH3 id="test_tree">树形表格</StyledH3>
        <Contentful />
        <Contentful />

        <StyledH2 id="test_api">API</StyledH2>
        <Contentful repeat={5} />
        <Contentful repeat={5} />
        <Contentful repeat={5} />
      </div>

      <Anchor style={{ marginLeft: 12, flex: '0 0 120px', alignSelf: 'flex-start' }}>
        <Anchor.Item title="使用场景" href="#test_usage">
          <Anchor.Item title="注意事项" href="#test_caution" />
          <Anchor.Item title="拓展功能" href="#test_extensions" />
          <Anchor.Item title="虚拟滚动" href="#test_virtual" />
        </Anchor.Item>
        <Anchor.Item title="用法示例" href="#test_examples">
          <Anchor.Item title="基本表格" href="#test_basic" />
          <Anchor.Item title="表格样式" href="#test_style" />
          <Anchor.Item title="数据加载状态数据加载状态数据加载状态数据加载状态" href="#test_loading" />
          <Anchor.Item title="树形表格" href="#test_tree" />
        </Anchor.Item>
        <Anchor.Item title="API" href="#test_api" />
      </Anchor>
    </div>
  );
}
