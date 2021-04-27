import React, { useEffect } from 'react';

export interface WebViewProps {
  id?: string;
  src: string;
  /**
   * 通信回调
   */
  onMessage?: (event: MessageEvent<string>) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const WebView = React.forwardRef<HTMLIFrameElement, WebViewProps>((props, ref) => {
  const { onMessage, ...rest } = props;

  useEffect(() => {
    const listener = (event: any) => {
      if (typeof onMessage === 'function') {
        onMessage(event);
      }
    };

    window.addEventListener('message', listener, false);

    return () => window.removeEventListener('message', listener);
  }, [onMessage]);

  return <iframe {...rest} ref={ref} />;
});
