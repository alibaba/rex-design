import { omit } from 'lodash-es';
import React from 'react';
import { useImage, UseImageProps } from './use-image';

export interface ImageProps extends UseImageProps {
  /**
   * 备选图片地址
   */
  fallbackSrc?: string;
  /**
   * 备选渲染元素
   */
  fallback?: React.ReactElement;
  /**
   * 图片宽度
   */
  width?: string;
  /**
   * 图片高度
   */
  height?: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (props, ref): React.ReactElement => {
    const { src, fallbackSrc, fallback, ignoreFallback, ...rest } = props;

    const status = useImage(props);

    const passed = {
      ref,
      ...(ignoreFallback ? rest : omit(rest, ['onError', 'onLoad'])),
    };

    if (status !== 'loaded') {
      if (fallback) return fallback;

      return <img src={fallbackSrc} {...passed} />;
    }

    return <img src={src} {...passed} />;
  },
);
