import cx from 'classnames';
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { Icon } from '@rexd/icon';
import { colors } from '../../utils';
import { Button } from '../button';
import { Box } from '../layout';

const NoticeBox = styled.div`
  padding: var(--rex-space-m);
  background-color: var(--rex-notice-bg);
`;

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
  const get = (icon: string, bg: string, color: string) => {
    return [icon, colors(bg), colors(color)];
  };

  return (
    {
      error: get('error', 'red.10', 'red.50'),
      success: get('success', 'green.10', 'green.50'),
      warning: get('warning', 'yellow.10', 'yelllow.50'),
      info: get('prompt', 'primary.10', 'primary.50'),
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
  const [icon, bg, color] = getMeta(status);
  const style = {
    ['--rex-notice-bg']: bg,
    ['--rex-notice-iconColor']: color,
    ...styleProp,
  };
  const clazz = cx(
    {
      [`rex-${status}`]: status,
    },
    className,
  );
  return (
    <NoticeBox ref={ref} className={clazz} style={style} {...rest}>
      <AlertHead>
        <AlertTitle>
          <Icon type={icon as any} />
          {title && <Box ml="m">{title}</Box>}
        </AlertTitle>
        <AlertExtra>
          {extra}
          {closeable && (
            <Button shape="text" size="small" isIconOnly onClick={onClose}>
              <Icon type="close" />
            </Button>
          )}
        </AlertExtra>
      </AlertHead>
      {children && <AlertContent>{children}</AlertContent>}
    </NoticeBox>
  );
});
