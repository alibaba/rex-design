import React from 'react';
import cx from 'classnames';
import { rgba } from '../../utils';
import { Box, BoxProps } from '../layout';
import { useTheme } from '../../providers';

type BadgeStatusType = 'normal' | 'success' | 'error' | 'warning';

export interface BadgeProps extends BoxProps {
  /**
   * 外观
   */
  shape?: 'pill' | 'dot' | 'badge';
  /**
   * 状态
   */
  status?: BadgeStatusType;
}

function getColorToken(status: BadgeStatusType) {
  const map = {
    normal: 'colors.primary.50',
    success: 'colors.green.50',
    error: 'colors.red.50',
    warning: 'colors.yellow.50',
  };

  return map[status];
}

export function useBadge(props: BadgeProps) {
  const { shape = 'badge', status = 'normal', className, ...htmlProps } = props;
  const { getValue } = useTheme();

  let boxProps;

  if (shape === 'pill') {
    boxProps = {
      display: 'inline-block',
      borderRadius: '10px',
      height: '20px',
      lineHeight: '20px',
      px: 'm',
      bg: 'red.50',
      color: '#FFF',
      fontSize: 'body',
    } as BoxProps;
  } else if (shape === 'dot') {
    boxProps = {
      display: 'inline-block',
      size: '6px',
      borderRadius: '6px',
      bg: 'red.50',
    } as BoxProps;
  } else {
    const color = getColorToken(status);
    const bg = rgba(getValue(color), 0.1);
    boxProps = {
      display: 'inline-block',
      borderRadius: 's',
      px: 'm',
      height: '22px',
      lineHeight: '22px',
      color,
      bg,
      fontSize: 'body',
    } as BoxProps;
  }

  const clazz = cx(
    {
      'rex-badge': true,
      [`rex-badge-${shape}`]: true,
      [`rex-${status}`]: shape === 'badge' && status,
    },
    className,
  );

  return {
    boxProps,
    htmlProps: {
      ...htmlProps,
      className: clazz,
    },
  };
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const { boxProps, htmlProps } = useBadge(props);
  return <Box as="span" ref={ref} {...boxProps} {...htmlProps} />;
});
