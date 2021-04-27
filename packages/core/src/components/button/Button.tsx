import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Button as OneButton, View } from '@rexd/one';
import { Dict } from '../../types';
import { space, getToken } from '../../utils';
import { Loading } from '../loading';

const buttonSize = (height?: string, px?: string, fontSize?: string) => {
  return `
    font-size: ${fontSize};
    height: ${height};
    padding-left: ${px};
    padding-right: ${px};
  `;
};

type StringOrNull = string | undefined;

const buttonType = (
  textColor?: StringOrNull,
  bg?: StringOrNull,
  borderColor?: StringOrNull,
  hoverColor?: StringOrNull,
  hoverBg?: StringOrNull,
  hoverBorderColor?: StringOrNull,
  selectedColor?: StringOrNull,
  selectedBg?: StringOrNull,
  selectedBorderColor?: StringOrNull,
) => {
  return `
    color: ${textColor};
    background-color: ${bg};
    border-color: ${borderColor};

    &:hover {
      color: ${hoverColor};
      background-color: ${hoverBg};
      border-color: ${hoverBorderColor};
    }

    &:focus {
      outline: 2px auto ${selectedBorderColor};
    }

    &.rex-selected {
      color: ${selectedColor};
      background-color: ${selectedBg};
      border-color: ${selectedBorderColor};
    }
  `;
};

const SystemButton = styled(OneButton)<Dict<any>>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  cursor: pointer;
  width: ${(props: Dict) => (props.$isFullWidth ? '100%' : null)};
  border-radius: var(--rex-radii-m);
  border: var(--rex-borders-solid);

  svg {
    vertical-align: middle;
  }

  &.rex-btn-small {
    ${buttonSize('var(--rex-sizes-formHeights-s)', 'var(--rex-space-l)', 'var(--rex-fontSizes-body)')}
  }

  &.rex-btn-medium {
    ${buttonSize('var(--rex-sizes-formHeights-m)', 'var(--rex-space-xl)', 'var(--rex-fontSizes-body)')}
  }

  &.rex-btn-large {
    ${buttonSize('var(--rex-sizes-formHeights-l)', 'var(--rex-space-xxl)', 'var(--rex-fontSizes-title)')}
  }

  &.rex-btn-link {
    padding: 0;
    border: 0;
    outline: none;
    background: transparent;
  }

  &.rex-disabled {
    opacity: 0.4;
    cursor: not-allowed;
    pointer-events: none;
  }

  &.rex-btn-solid.rex-disabled,
  &.rex-btn-warning.rex-disabled {
    color: ${getToken('Button.textDisabled')};
    background-color: ${getToken('Button.bgDisabled')};
    border-color: ${getToken('Button.borderColorDisabled')};
  }

  &.rex-btn-solid.rex-btn-primary:not(.rex-disabled) {
    ${buttonType(
      getToken('Button.textPrimary'),
      getToken('Button.bgPrimary'),
      getToken('Button.borderColorPrimary'),
      getToken('Button.textPrimaryHover'),
      getToken('Button.bgPrimaryHover'),
      getToken('Button.borderColorPrimaryHover'),
      getToken('Button.textPrimaryActive'),
      getToken('Button.bgPrimaryActive'),
      getToken('Button.borderColorPrimaryActive'),
    )}
  }

  &.rex-btn-solid.rex-btn-secondary:not(.rex-disabled) {
    ${buttonType(
      getToken('Button.textSecondary'),
      getToken('Button.bgSecondary'),
      getToken('Button.borderColorSecondary'),
      getToken('Button.textSecondaryHover'),
      getToken('Button.bgSecondaryHover'),
      getToken('Button.borderColorSecondaryHover'),
      getToken('Button.textSecondaryActive'),
      getToken('Button.bgSecondaryActive'),
      getToken('Button.borderColorSecondaryActive'),
    )}
  }

  &.rex-btn-solid.rex-btn-normal:not(.rex-disabled) {
    ${buttonType(
      getToken('Button.textNormal'),
      getToken('Button.bgNormal'),
      getToken('Button.borderColorNormal'),
      getToken('Button.textNormalHover'),
      getToken('Button.bgNormalHover'),
      getToken('Button.borderColorNormalHover'),
      getToken('Button.textNormalActive'),
      getToken('Button.bgNormalActive'),
      getToken('Button.borderColorNormalActive'),
    )}
  }

  &.rex-btn-text {
    background-color: transparent;
    border: 0;
  }

  &.rex-btn-text.rex-disabled {
    color: ${getToken('Button.textDisabled')};
  }

  &.rex-btn-text.rex-btn-primary:not(.rex-disabled) {
    ${buttonType(
      getToken('TextButton.colorPrimary'),
      undefined,
      undefined,
      getToken('TextButton.colorPrimaryHover'),
      getToken('TextButton.bgPrimaryHover'),
      undefined,
      getToken('TextButton.colorPrimaryActive'),
      getToken('TextButton.bgPrimaryActive'),
      undefined,
    )};
  }

  &.rex-btn-text.rex-btn-normal:not(.rex-disabled) {
    ${buttonType(
      getToken('TextButton.colorNormal'),
      undefined,
      undefined,
      getToken('TextButton.colorNormalHover'),
      getToken('TextButton.bgNormalHover'),
      undefined,
      getToken('TextButton.colorNormalActive'),
      getToken('TextButton.bgNormalActive'),
      undefined,
    )};
  }

  &.rex-btn-link.rex-btn-primary:not(.rex-disabled) {
    ${buttonType(getToken('TextButton.colorPrimary'), undefined, undefined, getToken('TextButton.colorPrimaryHover'))};
  }

  &.rex-btn-link.rex-btn-normal:not(.rex-disabled) {
    ${buttonType(getToken('TextButton.colorNormal'), undefined, undefined, getToken('TextButton.colorNormalHover'))};
  }

  &.rex-btn-warning.rex-btn-normal:not(.rex-disabled) {
    ${buttonType(
      getToken('WarningButton.textNormal'),
      getToken('WarningButton.bgNormal'),
      getToken('WarningButton.borderColorNormal'),
      getToken('WarningButton.textNormalHover'),
      getToken('WarningButton.bgNormalHover'),
      getToken('WarningButton.borderColorNormalHover'),
      getToken('WarningButton.textNormalActive'),
      getToken('WarningButton.bgNormalActive'),
      getToken('WarningButton.borderColorNormalActive'),
    )}
  }

  &.rex-btn-warning.rex-btn-primary:not(.rex-disabled) {
    ${buttonType(
      getToken('WarningButton.textPrimary'),
      getToken('WarningButton.bgPrimary'),
      getToken('WarningButton.borderColorPrimary'),
      getToken('WarningButton.textPrimaryHover'),
      getToken('WarningButton.bgPrimaryHover'),
      getToken('WarningButton.borderColorPrimaryHover'),
      getToken('WarningButton.textPrimaryActive'),
      getToken('WarningButton.bgPrimaryActive'),
      getToken('WarningButton.borderColorPrimaryActive'),
    )}
  }
`;

const IconBox = styled(View)<Dict<any>>`
  display: flex;
  align-items: center;
  margin-left: ${(props) => space(props.ml)};
  margin-right: ${(props) => space(props.mr)};
`;

export interface ButtonProps extends Omit<React.ComponentPropsWithRef<'button'>, 'type'> {
  shape?: 'solid' | 'text' | 'link' | 'ghost' | 'warning';
  type?: 'primary' | 'secondary' | 'normal';
  size?: 'small' | 'medium' | 'large';
  htmlType?: 'button' | 'submit' | 'reset';
  isFullWidth?: boolean;
  isSelected?: boolean;
  loading?: boolean;
  className?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    shape = 'solid',
    type = 'normal',
    size = 'medium',
    htmlType = 'button',
    isFullWidth = false,
    isSelected = false,
    loading,
    disabled: disabledProp,
    className,
    leftElement: leftIconProp,
    rightElement,
    children,
    ...others
  } = props;

  const disabled = loading || disabledProp;
  const leftIcon = loading ? <Loading /> : leftIconProp;

  const clazz = cx(
    {
      'rex-btn': true,
      [`rex-btn-${shape}`]: shape,
      [`rex-btn-${type}`]: type,
      [`rex-btn-${size}`]: size,
      [`rex-selected`]: isSelected,
      [`rex-disabled`]: disabled,
    },
    className,
  );

  return (
    <SystemButton className={clazz} $isFullWidth={isFullWidth} type={htmlType} ref={ref} {...others}>
      {leftIcon && (
        <IconBox as="span" mr={children ? 's' : 0}>
          {leftIcon}
        </IconBox>
      )}
      {children}
      {rightElement && (
        <IconBox as="span" ml={children ? 's' : 0}>
          {rightElement}
        </IconBox>
      )}
    </SystemButton>
  );
});
