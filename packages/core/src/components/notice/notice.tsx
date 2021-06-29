import { Icon } from '@rexd/icon';
import cx from 'classnames';
import React, { forwardRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../providers';
import { colors, rgba } from '../../utils';
import { Button } from '../button';
import { Box } from '../layout';
import { Toast, Toaster, ToasterProps, ToastRequest } from '../overlays';
import { ToastConfigCommon } from '../overlays/toast';

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
  /**
   * 状态
   */
  status: 'error' | 'success' | 'warning' | 'info';
  /**
   * 标题
   */
  title?: string;
  /**
   * 标题附加内容节点
   */
  extra?: React.ReactNode;
  /**
   * 是否可关闭
   */
  closeable?: boolean;
  /**
   * 点击关闭按钮的回调
   */
  onClose?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

type NoticeType = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<NoticeProps> & React.RefAttributes<HTMLDivElement>
> & {
  show?(req: NoticeToastRequest & { status: NoticeProps['status'] }): string;
  error?(req: NoticeToastRequest): string;
  success?(req: NoticeToastRequest): string;
  warning?(req: NoticeToastRequest): string;
  info?(req: NoticeToastRequest): string;

  config?(nextConfig: Partial<ToastConfigCommon>): void;
  getConfig?(): ToastConfigCommon;
  close?(key: string): void;
  closeAll?(): void;

  useNotice?: typeof useNotice;
};

export const Notice: NoticeType = forwardRef<HTMLDivElement, NoticeProps>((props, ref) => {
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
          <Icon type={icon as any} style={{ flexShrink: 0 }} />
          {title && <Box ml="m">{title}</Box>}
        </AlertTitle>
        <AlertExtra>
          {extra}
          {closeable && (
            <Button shape="text" size="small" iconOnly onClick={onClose}>
              <Icon type="close" />
            </Button>
          )}
        </AlertExtra>
      </AlertHead>
      {children && <AlertContent>{children}</AlertContent>}
    </Box>
  );
});

type NoticeToastRequest = Omit<ToastRequest, 'content' | 'renderContent'> & Partial<NoticeProps>;

function showNoticeFactory(toaster: { show(item: ToastRequest): string }, predefinedStatus?: NoticeProps['status']) {
  return (req: NoticeToastRequest) => {
    return toaster.show({
      ...req,
      renderContent({ ref, ...eventHandlers }, { close }) {
        return (
          <Toast.Panel
            ref={ref as React.Ref<HTMLDivElement>}
            {...eventHandlers}
            style={{ padding: 0, ...req.style }}
            className={req.className}
          >
            <Notice
              style={{ borderRadius: 0 }}
              status={predefinedStatus ?? req.status}
              title={req.title}
              extra={req.extra}
              closeable={req.closeable}
              onClose={close}
            />
          </Toast.Panel>
        );
      },
    });
  };
}

Notice.show = showNoticeFactory(Toaster);
Notice.error = showNoticeFactory(Toaster, 'error');
Notice.success = showNoticeFactory(Toaster, 'success');
Notice.warning = showNoticeFactory(Toaster, 'warning');
Notice.info = showNoticeFactory(Toaster, 'info');

Notice.config = Toaster.config;
Notice.getConfig = Toaster.getConfig;
Notice.close = Toaster.close;
Notice.closeAll = Toaster.closeAll;

Notice.useNotice = useNotice;

function useNotice(toasterProps: ToasterProps = {}) {
  const [toaster, contextHolder] = Toaster.useToaster(toasterProps);

  const notice = {
    show: showNoticeFactory(toaster, undefined),
    error: showNoticeFactory(toaster, 'error'),
    success: showNoticeFactory(toaster, 'success'),
    warning: showNoticeFactory(toaster, 'warning'),
    info: showNoticeFactory(toaster, 'info'),
    close: toaster.close,
    closeAll: toaster.closeAll,
  };

  return [notice, contextHolder] as const;
}
