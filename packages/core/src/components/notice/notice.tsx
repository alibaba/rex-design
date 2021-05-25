import cx from 'classnames';
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Icon } from '@rexd/icon';
import { colors, rgba } from '../../utils';
import { Button } from '../button';
import { Box } from '../layout';
import { useTheme } from '../../providers';

const AlertHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--rex-fontSizes-body);
`;

const AlertTitle = styled.div`
  flex: 1;
  display: flex;
  align-items: center;

  > svg {
    color: var(--rex-notice-iconColor);
    font-size: 20px;
  }
`;

const AlertExtra = styled.div`
  display: inline-flex;
  align-items: center;

  > * {
    margin-left: var(--rex-space-m);
  }
`;

const AlertContent = styled.div`
  margin-left: 20px;
  font-size: var(--rex-fontSizes-body);
`;

function getMeta(status: string) {
  return (
    {
      error: ['error', 'colors.red.10', 'colors.red.50'],
      success: ['success', 'colors.green.10', 'colors.green.50'],
      warning: ['prompt', 'colors.yellow.10', 'colors.yellow.50'],
      info: ['prompt', 'colors.primary.10', 'colors.primary.50'],
    }[status] || status
  );
}

export interface NoticeProps {
  status: 'error' | 'success' | 'warning' | 'info';
  title?: string;
  /**
   * 标题附加内容节点
   */
  extra?: React.ReactNode;
  closeable?: boolean;
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const Notice = forwardRef<HTMLDivElement, NoticeProps>((props, ref) => {
  const { status, title, extra, closeable, onClose, style: styleProp, className, children, ...rest } = props;
  const { getValue } = useTheme();
  const [icon, bg, color] = getMeta(status);
  const style = {
    ['--rex-notice-iconColor']: colors(color),
    ...styleProp,
  };

  const bgColor = rgba(getValue(bg), 0.55);

  const clazz = cx(
    {
      [`rex-${status}`]: status,
    },
    className,
  );
  return (
    <Box borderRadius="s" p="l" bg={bgColor} ref={ref} className={clazz} style={style} {...rest}>
      <AlertHead>
        <AlertTitle>
          <Icon type={icon as any} />
          {title && <Box ml="m">{title}</Box>}
        </AlertTitle>
        <AlertExtra>
          {extra}
          {closeable && (
            <Button shape="text" size="small" isIconButton onClick={onClose}>
              <Icon type="close" />
            </Button>
          )}
        </AlertExtra>
      </AlertHead>
      {children && <AlertContent>{children}</AlertContent>}
    </Box>
  );
});
