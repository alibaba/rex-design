import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

type ImageStatusType = 'loading' | 'pending' | 'loaded' | 'failed';

export interface UseImageProps {
  /**
   * 图片地址
   */
  src?: string;
  /**
   * 图片加载后的回调
   */
  onLoad?: any;
  /**
   * 图片加载出错的回调
   */
  onError?: any;
  /**
   * 是否忽略 fallback
   */
  ignoreFallback?: boolean;
}

export function useImage(props: UseImageProps) {
  const { src, onLoad, onError, ignoreFallback } = props;

  const ignore = ignoreFallback || typeof window === 'undefined';

  const imageRef = useRef<HTMLImageElement>();

  const [status, setStatus] = useState<ImageStatusType>(() => {
    return src ? 'loading' : 'pending';
  });

  useEffect(() => {
    setStatus(src ? 'loading' : 'pending');
  }, [src]);

  const flush = () => {
    if (imageRef.current) {
      imageRef.current.onload = null;
      imageRef.current.onerror = null;
      imageRef.current = null;
    }
  };

  const load = useCallback(() => {
    if (!src) return;

    flush();

    const image = new Image();

    image.src = src;

    image.onload = (e) => {
      flush();
      setStatus('loaded');
      onLoad?.(e);
    };

    image.onerror = (err) => {
      flush();
      setStatus('failed');
      onError?.(err);
    };

    imageRef.current = image;
  }, [src, onLoad, onError]);

  useLayoutEffect(() => {
    if (ignore) return;

    if (status === 'loading') {
      load();
    }

    return () => {
      flush();
    };
  }, [status, load, ignore]);

  return ignore ? 'loaded' : status;
}
