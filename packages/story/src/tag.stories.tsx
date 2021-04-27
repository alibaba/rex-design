import { DemoGroup, Tag } from '@rexd/core';
import { Icon } from '@rexd/icon';
import React, { useState } from 'react';

export default { title: 'Tag' };

export const Basic = () => {
  const [tags, setTags] = useState<string[]>(['Unremovable', 'Tag 2', 'Tag 3']);

  return (
    <DemoGroup>
      <DemoGroup>
        <p>基本用法</p>
        <Tag>标签 tag</Tag>
        <Tag interactive>可交互</Tag>
      </DemoGroup>

      <DemoGroup>
        <p>可关闭, 关闭时触发 onClose 回调</p>
        <Tag isCloseable onClose={() => alert('点击了X')}>
          可关闭标签
        </Tag>
      </DemoGroup>

      <DemoGroup>
        <p>标签尺寸</p>
        <Tag size="small">加大</Tag>
        <Tag size="medium">加大</Tag>
        <Tag size="large">再加大</Tag>
      </DemoGroup>

      <DemoGroup>
        <p>
          shape: <small>outline | solid</small>
        </p>
        <Tag shape="outline">outline</Tag>
        <Tag shape="solid">solid</Tag>
      </DemoGroup>

      <DemoGroup>
        <p>自定义图标</p>
        <Tag shape="outline" icon={<Icon type="edit" />} interactive>
          编辑数据
        </Tag>
        <Tag shape="solid" icon={<Icon type="data-view" />} interactive>
          查看报表
        </Tag>
        <Tag icon={<Icon type="download" />} isCloseable interactive>
          下载报表
        </Tag>
      </DemoGroup>
      <DemoGroup>
        <p>数据源写法示例</p>
        {tags.map((tagLabel) => (
          <Tag isCloseable onClose={() => setTags([...tags.filter((tag) => tag !== tagLabel)])} key={tagLabel}>
            {tagLabel}
          </Tag>
        ))}
      </DemoGroup>
    </DemoGroup>
  );
};
