import { Icon } from '@rexd/icon';
import cx from 'classnames';
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

const rotateKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const rotateAnimation = css`
  ${rotateKeyframes} 1250ms linear infinite both;
`;

const LoadingDiv = styled.div`
  position: relative;

  .rex-loading-icon {
    width: 48px;
    height: 48px;
    animation: ${rotateAnimation};
    pointer-events: none;

    // todo 根据内容div 与 上层滚动容器两者的 clip-rect 来确定 loading icon 的位置
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &.rex-median .rex-loading-icon {
    width: 32px;
    height: 32px;
  }

  .rex-loading-cover {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--rex-colors-emphasis-0);
    opacity: 0.4;
    pointer-events: none;
  }
`;

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;

  /** loading 状态, 默认 true */
  visible?: boolean;

  /** 动画尺寸，可选值为 'large' 或 'medium'	 */
  size?: 'large' | 'median';

  children?: React.ReactNode;
}

export const Loading = React.forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
  const { className, visible, children, size = 'large', ...rest } = props;

  return (
    <LoadingDiv
      ref={ref}
      className={cx(
        'rex-loading',
        {
          'rex-median': size === 'median',
          'rex-large': size === 'large',
        },
        className,
      )}
      {...rest}
    >
      <div className="rex-loading-content">{children}</div>
      {visible && <div className="rex-loading-cover" />}
      {visible && <Icon type="loading" className="rex-loading-icon" />}
    </LoadingDiv>
  );
});
