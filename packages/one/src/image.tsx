import React from 'react';

const modeStyle = {
  scaleToFill: {
    backgroundSize: '100% 100%',
  },
  aspectFit: {
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  widthFix: {
    backgroundSize: '100% 100%',
    height: 'auto',
    lineHeight: 0,
  },
  aspectFill: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  top: {
    backgroundPosition: 'top',
  },
  bottom: {
    backgroundPosition: 'bottom',
  },
  center: {
    backgroundPosition: 'center',
  },
  left: {
    backgroundPosition: 'center left',
  },
  right: {
    backgroundPosition: 'center right',
  },
  'top left': {
    backgroundPosition: 'top left',
  },
  'top right': {
    backgroundPosition: 'top right',
  },
  'bottom left': {
    backgroundPosition: 'bottom left',
  },
  'bottom right': {
    backgroundPosition: 'bottom right',
  },
};

export interface ImageProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  src?: string;
  /**
   * 图片裁剪和缩放模式
   */
  mode?:
    | 'scaleToFill'
    | 'aspectFit'
    | 'aspectFill'
    | 'widthFix'
    | 'top'
    | 'bottom'
    | 'center'
    | 'left'
    | 'right'
    | 'top left'
    | 'top right'
    | 'bottom left'
    | 'bottom right';
  onTap?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onLoad?: (e: any) => void;
  onError?: (e: any) => void;
}

// TODO: refactor
export const Image = React.forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const { src, mode = 'scaleToFill', onTap, onLoad, onError, style, ...rest } = props;
  const isWidthFixMode = mode === 'widthFix';
  const boxStyle = {
    ...modeStyle[mode],
    backgroundImage: `url(${src})`,
    backgroundRepeat: `no-repeat`,
    ...style,
  };

  return (
    <div onClick={onTap} style={boxStyle} {...rest}>
      <img
        ref={ref}
        src={src}
        onLoad={onLoad}
        onError={onError}
        style={{
          visibility: 'hidden',
          width: isWidthFixMode ? '100%' : undefined,
          height: isWidthFixMode ? 'auto' : '1px',
        }}
      />
    </div>
  );
});
