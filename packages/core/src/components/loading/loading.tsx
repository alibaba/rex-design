import { Icon } from '@rexd/icon';
import cx from 'classnames';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotateKeyframes = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const LoadingDiv = styled.div`
  position: relative;

  .rex-loading-icon {
    position: absolute;
    width: 48px;
    height: 48px;
    left: calc(50% - 24px);
    top: calc(50% - 24px);
  }

  &.rex-medium .rex-loading-icon {
    width: 32px;
    height: 32px;
    left: calc(50% - 16px);
    top: calc(50% - 16px);
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

const RotateLoadingIcon: any = styled(Icon).attrs({ type: 'loading' })`
  animation: ${rotateKeyframes} 1250ms linear infinite both;
`;
const LoadingIcon = ({ className }: { className?: string }) => <RotateLoadingIcon className={className} />;

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;

  /** loading 状态, 默认 true */
  visible?: boolean;

  /** 动画尺寸，可选值为 'large' 或 'medium'	 */
  size?: 'large' | 'medium';

  children?: React.ReactNode;
}

type LoadingType = React.ExoticComponent<LoadingProps & React.RefAttributes<HTMLDivElement>> & {
  Icon(props: { className?: string }): React.ReactElement;
};

// @ts-ignore
export const Loading: LoadingType = React.forwardRef<HTMLDivElement, LoadingProps>((props, ref) => {
  const { className, visible, children, size = 'large', ...rest } = props;

  return (
    <LoadingDiv
      ref={ref}
      className={cx(
        'rex-loading',
        {
          'rex-medium': size === 'medium',
          'rex-large': size === 'large',
        },
        className,
      )}
      {...rest}
    >
      <div className="rex-loading-content">{children}</div>
      {visible && <div className="rex-loading-cover" />}
      {visible && <LoadingIcon className="rex-loading-icon" />}
    </LoadingDiv>
  );
});

Loading.Icon = LoadingIcon;
