import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import micromatch from 'micromatch';

// 获取一个组件对应的文件路径
function useComponentSourceLocation(componentName) {
  const data = usePluginData('components-source-location');

  const filtered = micromatch(data.files, [`**/${componentName}.tsx`, `**/${componentName}/index.tsx`], {
    nocase: true,
  });

  return filtered[0];
}

// todo 优化该组件，现在估计有些小问题
export default function ComponentSourceLink({ componentName, label }) {
  const location = useComponentSourceLocation(componentName);
  const { siteConfig } = useDocusaurusContext();

  if (location) {
    // href 示例： https://github.com/alibaba/ali-react-table/blob/master/packages/website/docs/changelog.md
    const defaultBranch = 'main';
    const href = `${siteConfig.url}/tree/${defaultBranch}/packages/core/${location}`;
    return (
      <a href={href} target="_blank">
        {label ?? `${componentName} 组件源码`}
      </a>
    );
  } else {
    return <span>{componentName} 组件源码</span>;
  }
}
