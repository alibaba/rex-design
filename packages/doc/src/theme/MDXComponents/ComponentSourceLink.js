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

export default function ComponentSourceLink({ componentName, label }) {
  const location = useComponentSourceLocation(componentName);
  const { siteConfig } = useDocusaurusContext();

  if (location) {
    const defaultBranch = 'main';
    const href = `${siteConfig.url}/tree/${defaultBranch}/packages/core/src/${location}`;
    return (
      <a href={href} target="_blank">
        {label ?? `${componentName} 组件源码`}
      </a>
    );
  } else {
    return <span>{componentName} 组件源码</span>;
  }
}
