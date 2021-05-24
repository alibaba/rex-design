import { omit } from 'lodash';
import React from 'react';
import { useImage, UseImageProps } from './use-image';

export interface ImageProps extends UseImageProps {
  fallbackSrc?: string;
  fallback?: React.ReactElement;
  width?: string;
  height?: string;
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
