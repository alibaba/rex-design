import React from 'react';
import { useEffect } from 'react';

export interface UseIconfontProps {
  /**
   * Iconfont 的脚本地址
   */
  scriptUrl: string;
  /**
   * 透传给 Svg 元素的属性
   */
  svgProps?: React.SVGAttributes<SVGElement>;
}

export interface SvgIconProps extends React.SVGAttributes<SVGElement> {
  type: string;
  size?: string;
  color?: string;
}

const customCache = new Set();

export function useIconfont(props: UseIconfontProps) {
  const { scriptUrl, svgProps } = props;

  useEffect(() => {
    if (
      typeof document !== 'undefined' &&
      typeof window !== 'undefined' &&
      typeof document.createElement === 'function' &&
      typeof scriptUrl === 'string' &&
      scriptUrl.length &&
      !customCache.has(scriptUrl)
    ) {
      const script = document.createElement('script');
      script.setAttribute('src', scriptUrl);
      script.setAttribute('data-namespace', scriptUrl);
      customCache.add(scriptUrl);
      document.body.appendChild(script);
    }
  }, [scriptUrl]);

  return ({ type, size, color: colorProp, ...rest }: SvgIconProps) => {
    const width = size || '1em';
    const height = size || '1em';
    const color = colorProp || 'currentColor';

    return (
      <svg width={width} height={height} fill={color} focusable={false} {...svgProps} {...rest}>
        <use xlinkHref={`#icon${type}`} />
      </svg>
    );
  };
}
