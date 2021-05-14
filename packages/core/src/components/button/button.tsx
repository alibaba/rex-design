import React from 'react';
import styled from 'styled-components';
import cx from 'classnames';
import { Button as OneButton, View } from '@rexd/one';
import { Dict } from '../../types';
import { space, getToken, mergeProps } from '../../utils';
import { Loading } from '../loading';
import { useHover } from '../../hooks/use-hover';

const buttonSize = (height?: string, px?: string, fontSize?: string, iconSize?: string) => {
  return `
    font-size: ${fontSize};
    height: ${height};
    padding-left: ${px};
    padding-right: ${px};

    svg {
      font-size: ${iconSize};
    }

    &.rex-btn-iconOnly {
      width: ${height};
      padding: 0;
    }
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
  foucsOutline?: StringOrNull,
) => {
  return `
    color: ${textColor};
    background-color: ${bg};
    border-color: ${borderColor};

    &:focus {
      outline: 0;
      box-shadow: 0 0 0 3px ${foucsOutline};
    }

    &.rex-hover {
      color: ${hoverColor};
      background-color: ${hoverBg};
      border-color: ${hoverBorderColor};
    }

    &:active, .rex-selected {
      color: ${selectedColor};
      background-color: ${selectedBg};
      border-color: ${selectedBorderColor};
    }
  `;
};

const StyledButton = styled(OneButton)<any>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  width: ${(props: any) => (props.$isFullWidth ? '100%' : null)};
  border-radius: var(--rex-radii-s);
  border: var(--rex-borders-solid);
  transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);

  /* Disable user-select */
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */

  svg {
    vertical-align: middle;
  }

  .rext-btn-children {
    display: flex;
    align-items: center;
    font-weight: 500;
  }

  &.rex-btn-small {
    ${buttonSize(
      'var(--rex-sizes-formHeights-s)',
      getToken('Button.spx'),
      getToken('Button.sFontSize'),
      getToken('Button.sIconSize'),
    )}
  }

  &.rex-btn-medium {
    ${buttonSize(
      'var(--rex-sizes-formHeights-m)',
      getToken('Button.mpx'),
      getToken('Button.mFontSize'),
      getToken('Button.mIconSize'),
    )}
  }

  &.rex-btn-large {
    ${buttonSize(
      'var(--rex-sizes-formHeights-l)',
      getToken('Button.lpx'),
      getToken('Button.lFontSize'),
      getToken('Button.lIconSize'),
    )}
  }

  &.rex-btn-link {
    padding: 0;
    border: 0;
    outline: none;
    background: transparent;
  }

  &.rex-btn-loading {
    .rext-btn-children {
      opacity: 0;
    }

    .rex-loading {
      position: absolute;
    }
  }

  &.rex-disabled {
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
      getToken('Button.outlinePrimary'),
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
      getToken('Button.outlineSecondary'),
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
      getToken('Button.outlineNormal'),
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
      getToken('WarningButton.outline'),
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
      getToken('WarningButton.outline'),
    )}
  }
`;

const IconBox = styled(View)<Dict<any>>`
  display: flex;
  align-items: center;
  margin-left: ${(props) => space(props.ml)};
  margin-right: ${(props) => space(props.mr)};
`;

const formatChildren = (text: any) => {
  // 如果是两个汉字的话，给汉字间加空格
  if (typeof text === 'string' && /^[\u3400-\u9FBF]{2}$/.test(text)) {
    const list = text.split('');
    list.splice(1, 0, ' ');
    return list.join('');
  }

  return text;
};

export interface ButtonProps extends Omit<React.ComponentPropsWithRef<'button'>, 'type'> {
  shape?: 'solid' | 'text' | 'link' | 'ghost' | 'warning';
  type?: 'primary' | 'secondary' | 'normal';
  size?: 'small' | 'medium' | 'large';
  htmlType?: 'button' | 'submit' | 'reset';
  isFullWidth?: boolean;
  /**
   * 是否为纯图标按钮
   */
  isIconOnly?: boolean;
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
    isIconOnly = false,
    isSelected = false,
    loading,
    disabled,
    className,
    leftElement,
    rightElement,
    children,
    ...others
  } = props;

  const { hoverProps, isHover } = useHover({ disabled, loading });

  const loadingIcon = loading ? <Loading /> : null;

  const clazz = cx(
    {
      'rex-btn': true,
      'rex-btn-loading': loading,
      'rex-btn-iconOnly': isIconOnly,
      [`rex-btn-${shape}`]: shape,
      [`rex-btn-${type}`]: type,
      [`rex-btn-${size}`]: size,
      [`rex-selected`]: isSelected,
      [`rex-disabled`]: disabled,
      [`rex-hover`]: isHover,
    },
    className,
  );

  const shouldFormatChildren = ['solid', 'warning'].includes(shape) && !leftElement && !rightElement;

  return (
    <StyledButton
      className={clazz}
      $isFullWidth={isFullWidth}
      type={htmlType}
      ref={ref}
      {...mergeProps(others, hoverProps)}
    >
      {loadingIcon}
      <span className="rext-btn-children">
        {leftElement && (
          <IconBox as="span" mr={children ? 'm' : 0}>
            {leftElement}
          </IconBox>
        )}
        {shouldFormatChildren ? formatChildren(children) : children}
        {rightElement && (
          <IconBox as="span" ml={children ? 'm' : 0}>
            {rightElement}
          </IconBox>
        )}
      </span>
    </StyledButton>
  );
});
