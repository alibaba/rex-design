import React from 'react';
import styled from 'styled-components';
import { colors } from '../../utils';
import { Box, BoxProps } from '../layout';

const Dot = styled(Box)`
  position: relative;
  padding-left: var(--dot-size);
  padding-right: var(--dot-size);

  &::before {
    content: '';
    width: var(--dot-size);
    height: var(--dot-size);
    border-radius: 100%;
    background-color: var(--active-color);
    position: absolute;
    z-index: 1;
    left: 50%;
    top: 8px;
    transform: translateX(-50%);
  }

  &::after {
    content: '';
    visibility: var(--dot-line-visible);
    position: absolute;
    top: 50%;
    bottom: -36px;
    width: 1px;
    background-color: var(--active-color);
    transform: translate(-50%, -50%);
  }
`;

const HozDot = styled(Box)`
  position: relative;
  padding-top: var(--dot-size);
  padding-bottom: var(--dot-size);

  &::before {
    content: '';
    width: var(--dot-size);
    height: var(--dot-size);
    border-radius: 100%;
    background-color: var(--active-color);
    position: absolute;
    z-index: 1;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  &::after {
    content: '';
    visibility: var(--dot-line-visible);
    position: absolute;
    top: 50%;
    left: 18px;
    right: 6px;
    transform: translateY(-50%);
    height: 1px;
    background-color: var(--active-color);
  }
`;

type TimlineAlignType = 'double' | 'right';

type TimelineStatusType = 'success' | 'error' | 'process';

export interface TimelineItemProps {
  /**
   * 状态
   */
  status?: TimelineStatusType;
  /**
   * 标题
   */
  title?: React.ReactNode;
  /**
   * 标签
   */
  label?: React.ReactNode;
  showDotLine?: boolean;
  align?: TimlineAlignType;
  children?: React.ReactNode;
}

const LeftNode = ({ children, ...rest }: BoxProps) => (
  <Box fontSize="body" color="text.note" {...rest}>
    {children}
  </Box>
);

const TitleNode = ({ children, ...rest }: BoxProps) => (
  <Box fontSize="title1" mb="m" {...rest}>
    {children}
  </Box>
);

const ContentNode = ({ children, ...rest }: BoxProps) => (
  <Box fontSize="body" color="text.note" {...rest}>
    {children}
  </Box>
);

const getDotProps = ({ style, status, showDotLine, ...rest }: any) => {
  const color =
    {
      success: 'success.normal',
      error: 'error.normal',
      process: 'brand.normal',
    }[status] || 'fill.layer3';

  return {
    ...rest,
    style: {
      ...style,
      ['--dot-size' as any]: '12px',
      ['--active-color' as any]: colors(color),
      ['--dot-line-visible' as any]: showDotLine ? 'visible' : 'hidden',
    },
  };
};

export function TimelineItem(props: TimelineItemProps) {
  const { status, label, title, showDotLine, align, children, ...rest } = props;
  const dotProps = getDotProps({ status, showDotLine });

  const alignRight = align === 'right';
  const labelNode = <LeftNode>{label}</LeftNode>;

  return (
    <Box as="li" display="table-row" {...rest}>
      {!alignRight && labelNode}
      <Dot display="table-cell" {...dotProps} />
      <Box display="table-cell">
        <TitleNode>{title}</TitleNode>
        {alignRight && labelNode}
        <ContentNode pb="64px">{children}</ContentNode>
      </Box>
    </Box>
  );
}

export function HozTimelineItem(props: TimelineItemProps) {
  const { status, title, label, showDotLine = true, children, ...rest } = props;
  const dotProps = getDotProps({ status, showDotLine });

  return (
    <Box as="li" flex="1" display="flex" flexDirection="column" {...rest}>
      <LeftNode>{label}</LeftNode>
      <HozDot {...dotProps} />
      <Box>
        <TitleNode>{title}</TitleNode>
        <ContentNode>{children}</ContentNode>
      </Box>
    </Box>
  );
}
