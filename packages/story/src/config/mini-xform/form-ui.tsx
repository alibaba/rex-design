// 请勿使用该组件，等内部的 hippo-xform 和 hippo3 成熟后，xform 将会重新回归开源
import { Tooltip } from '@rexd/core';
import { Icon } from '@rexd/icon';
import cx from 'classnames';
import React, { ReactNode } from 'react';
import styled from 'styled-components';

function asCSSLength(len: number | string) {
  return typeof len === 'number' ? `${len}px` : len;
}

const FormLayoutContainer = styled.div`
  --label-width: auto;
  --control-width: auto;
  --form-item-gap: 0;
  font-size: 12px;

  .form-item {
    margin-bottom: var(--form-item-gap);
  }

  .form-item.minimal {
    margin-bottom: 0;

    > .error-message,
    > .form-item-label {
      display: none;
    }
  }

  &.horizontal {
    .form-item {
      display: flex;
    }

    .form-item-label {
      flex: 0 0 var(--label-width);
      padding-top: 8px;
      padding-right: 12px;
      text-align: right;
      line-height: 1.5;
    }
  }

  &.vertical {
    .form-item-label {
      font-size: 12px;
      line-height: 1.5;
      margin-bottom: 4px;
    }
  }

  .form-item-preview {
    > .form-item-label {
      padding-top: 0;
    }
    > .form-item-control {
      line-height: 1.5;
    }
  }

  .required-indicator {
    margin-right: 4px;
    color: #eb4141;
    ::before {
      content: '*';
    }
  }

  .error-message {
    margin-top: 4px;
    color: #eb4141;
  }

  .tip {
    margin-left: 4px;
    color: #999;
    height: 18px;
    vertical-align: top;
  }

  .help {
    color: #999999;
    margin-top: 4px;
    line-height: 1.5;
  }

  .form-item-control {
    width: var(--control-width);

    > .next-input,
    > .next-select {
      width: 100%;
    }

    > .next-range {
      padding: 8px 0;
    }

    > .next-checkbox-group,
    > .next-radio-group,
    > .next-checkbox-wrapper {
      display: inline-block;
      line-height: 18px;
    }
  }

  &.horizontal .form-item-control {
    > .next-checkbox-group,
    > .next-radio-group,
    > .next-checkbox-wrapper {
      padding-top: 8px;
    }
  }
`;

export interface FormLayoutParams {
  /** 标签位置，可选 'left' 或 'top'  */
  labelPosition?: 'left' | 'top';

  /** 标签宽度 */
  labelWidth?: string | number;

  /** 控件宽度 */
  controlWidth?: string | number;

  /** 两个 form item 之间的间距 */
  formItemGap?: string | number;
}

export interface FormLayoutProps extends Partial<FormLayoutParams> {
  style?: React.CSSProperties;
  className?: string;
  children?: ReactNode;
}

export function FormLayout({
  children,
  className,
  style,
  labelPosition = 'left',
  labelWidth = labelPosition === 'left' ? 120 : 'auto',
  formItemGap = labelPosition === 'left' ? 12 : 16,
  controlWidth = 320,
}: FormLayoutProps) {
  return (
    <FormLayoutContainer
      style={
        {
          '--label-width': asCSSLength(labelWidth),
          '--control-width': asCSSLength(controlWidth),
          '--form-item-gap': asCSSLength(formItemGap),
          ...style,
        } as any
      }
      className={cx(
        {
          horizontal: labelPosition === 'left',
          vertical: labelPosition === 'top',
        },
        className,
      )}
    >
      {children}
    </FormLayoutContainer>
  );
}

const FormItemGroupDiv = styled.div`
  ${FormLayoutContainer}.horizontal & {
    display: flex;
  }

  &.inline {
    .form-item-group-content {
      display: flex;
    }
  }
`;

export interface FormItemGroupProps {
  label?: React.ReactNode;
  tip?: React.ReactNode;
  asterisk?: boolean;
  children?: React.ReactNode;
  labelWidth?: number | string;
  controlWidth?: number | string;
  className?: string;
  style?: React.CSSProperties;
  inline?: boolean;
}

export const FormItemGroup = ({
  label,
  asterisk,
  tip,
  children,
  labelWidth,
  controlWidth,
  className,
  style,
  inline,
}: FormItemGroupProps) => {
  return (
    <FormItemGroupDiv className={cx('form-item-group', { inline }, className)} style={style}>
      {label == null && tip == null ? null : (
        <div className="form-item-label">
          {asterisk && <span className="required-indicator" />}
          {label && <span className="form-item-label-text">{label}</span>}
          {tip && <Tip title={tip} />}
        </div>
      )}

      <div
        className="form-item-group-content"
        style={
          {
            '--label-width': asCSSLength(labelWidth),
            '--control-width': asCSSLength(controlWidth),
          } as any
        }
      >
        {children}
      </div>
    </FormItemGroupDiv>
  );
};

const Tip = ({ title }: { align?: any; title?: React.ReactNode }) => (
  <Tooltip
    interactionKind="hover"
    title={title}
    renderTarget={(arg) => <Icon {...arg} type="prompt" className="tip" />}
  />
);

export interface FormItemViewProps {
  label: React.ReactNode;
  help?: React.ReactNode;
  tip?: React.ReactNode;
  asterisk?: boolean;
  error?: React.ReactNode;
  children: React.ReactNode;

  style?: React.CSSProperties;
  className?: string;
}

export function FormItemView({ label, help, tip, asterisk, error, children, className, style }: FormItemViewProps) {
  return (
    <div className={cx('form-item', className)} style={style}>
      {label == null && tip == null ? null : (
        <div className="form-item-label">
          {asterisk && <span className="required-indicator" />}
          {label && <span className="form-item-label-text">{label}</span>}
          {tip && <Tip title={tip} />}
        </div>
      )}

      <div className="form-item-control">
        {children}
        {help && <div className="help">{help}</div>}
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
}
