import React from 'react';
import styled from 'styled-components';
import { View } from '@rexd/one';
import { Dict } from '../../types';
import { colors } from '../../utils';

const SystemBadge = styled(View)<Dict<any>>`
  display: inline-block;
  white-space: nowrap;

  border-radius: ${(props) => (props.$isPill ? '999px' : 'var(--rex-radii-s)')};
  padding-left: var(--rex-space-m);
  padding-right: var(--rex-space-m);

  font-size: ${(props) => props.fontSize || 'var(--rex-fontSizes-note)'};
  color: ${(props) => colors(props.color)};
  background-color: ${(props) => colors(props.bg)};
  line-height: 1.4;
`;

export interface BadgeProps {
  /**
   * 状态
   */
  status?: 'success' | 'error' | 'warning';
  /**
   * 是否为胶囊型
   */
  isPill?: boolean;
  color?: string;
  bg?: string;
  fontSize?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Badge = (props: BadgeProps) => {
  const { status, isPill, bg: bgProp, color = 'white', ...rest } = props;

  let bg = bgProp;
  if (status && !bg) {
    bg = `${status}.normal`;
  }

  return <SystemBadge $isPill={isPill} bg={bg} color={color} {...rest} />;
};
