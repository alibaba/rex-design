import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Icon } from '@rexd/icon';
import { Box } from '../layout';

const LoadingBox = styled(Box)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  /* color: var(--rex-colors-text-body); */

  > .rex-rotate {
    animation: rotate 1250ms linear infinite both;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(360deg);
    }
  }
`;

export interface LoadingProps {
  className?: string;
}

export function Loading(props: LoadingProps) {
  const { className, ...rest } = props;
  return (
    <LoadingBox className={cx('rex-loading', className)} {...rest}>
      <Icon type="loading" className="rex-rotate" />
    </LoadingBox>
  );
}
