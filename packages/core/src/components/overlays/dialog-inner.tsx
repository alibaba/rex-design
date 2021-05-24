import { Icon } from '@rexd/icon';
import React from 'react';
import { Button } from '../button';
import { DialogProps } from './dialog';
import { batchedUpdates } from './overlay-utils/batchUpdate';

type DialogInnerProps = Pick<
  DialogProps,
  'footer' | 'onOk' | 'onCancel' | 'onRequestClose' | 'title' | 'content' | 'canCloseByIcon'
>;

export const DialogInner = ({
  footer,
  onOk,
  onCancel,
  onRequestClose,
  title,
  content,
  canCloseByIcon,
}: DialogInnerProps) => {
  return (
    <>
      {renderDialogHeader()}
      {renderDialogBody()}
      <DialogFooter footer={footer} onOk={onOk} onCancel={onCancel} onRequestClose={onRequestClose} />
      {renderCloseIcon()}
    </>
  );

  function renderDialogHeader() {
    return title && <div className="rex-dialog-header">{title}</div>;
  }

  function renderDialogBody() {
    return <div className="rex-dialog-body">{content}</div>;
  }

  function renderCloseIcon() {
    return (
      canCloseByIcon && (
        <div className="rex-dialog-close" onClick={onRequestClose}>
          <Icon type="close" className="rex-dialog-close-icon" />
        </div>
      )
    );
  }
};

export function DialogFooter({
  footer,
  onRequestClose,
  onCancel,
  onOk,
  className = 'rex-dialog-footer',
}: Pick<DialogProps, 'footer' | 'onOk' | 'onCancel' | 'onRequestClose' | 'className'>) {
  if (footer === null) {
    return null;
  }

  if (Array.isArray(footer)) {
    return (
      <div className={className}>
        {footer.map((item, index) => {
          if (item.component === 'button') {
            return (
              <Button
                key={index}
                type={item.type}
                onClick={(event) => {
                  batchedUpdates(() => {
                    item.onClick(event);
                    if (item.autoCloseDialog) {
                      onRequestClose('auto-close');
                    }
                  });
                }}
              >
                {item.label}
              </Button>
            );
          }
        })}
      </div>
    );
  }

  if (footer === undefined) {
    return (
      <div className={className}>
        <Button
          type="normal"
          onClick={() => {
            onCancel();
            onRequestClose('ok');
          }}
        >
          取消
        </Button>
        <Button
          type="primary"
          onClick={() => {
            onOk();
            onRequestClose('cancel');
          }}
        >
          确认
        </Button>
      </div>
    );
  }

  return <div className={className}>{footer}</div>;
}
