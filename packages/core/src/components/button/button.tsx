import cx from 'classnames';
import React from 'react';
import styled from 'styled-components';
import { useHover } from '../../hooks/use-hover';
import { getToken, mergeProps, space } from '../../utils';
import { Loading } from '../loading';

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

    &:active,
    &.rex-selected {
      color: ${selectedColor};
      background-color: ${selectedBg};
      border-color: ${selectedBorderColor};
    }
  `;
};

const StyledButton = styled.button<any>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  white-space: nowrap;
  vertical-align: middle;
  cursor: pointer;
  border-radius: var(--rex-radii-s);
  border: var(--rex-borders-solid);
  transition: all 300ms cubic-bezier(0.19, 1, 0.22, 1);
  user-select: none;

  svg {
    vertical-align: middle;
  }

  .rex-btn-children {
    display: flex;
    align-items: center;
    font-weight: 500;
  }

  &.rex-fill {
    width: 100%;
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
    .rex-btn-children {
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

const IconBox = styled.span<any>`
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
  as?: 'button' | 'a';
  /**
   * 外观
   */
  shape?: 'solid' | 'text' | 'link' | 'ghost' | 'warning';
  /**
   * 级别
   */
  type?: 'primary' | 'secondary' | 'normal';
  /**
   * 尺寸
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * html 原生类型
   */
  htmlType?: 'button' | 'submit' | 'reset';
  /**
   * 按钮长度是否占满容器
   */
  fill?: boolean;
  /**
   * 是否为仅包含单个图标的按钮
   */
  iconOnly?: boolean;
  /**
   * 是否选中/激活
   */
  selected?: boolean;
  /**
   * 是否载入中
   */
  loading?: boolean;
  /**
   * 内部左侧元素
   */
  leftElement?: React.ReactNode;
  /**
   * 内部右侧元素
   */
  rightElement?: React.ReactNode;
  /**
   * 仅在 as="a" 时生效
   */
  href?: string;
  /**
   * 仅在 as="a" 时生效
   */
  target?: '_blank' | '_self' | '_parent' | '_top' | string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    shape = 'solid',
    type = 'normal',
    size = 'medium',
    htmlType = 'button',
    fill = false,
    iconOnly = false,
    selected = false,
    loading,
    disabled,
    className,
    leftElement,
    rightElement,
    children,
    ...others
  } = props;

  const { hoverProps, isHover } = useHover({ disabled, loading });

  const loadingIcon = loading ? <Loading.Icon className="rex-loading" /> : null;

  const clazz = cx(
    {
      'rex-btn': true,
      'rex-btn-loading': loading,
      'rex-btn-iconOnly': iconOnly,
      [`rex-btn-${shape}`]: shape,
      [`rex-btn-${type}`]: type,
      [`rex-btn-${size}`]: size,
      'rex-selected': selected,
      'rex-disabled': disabled,
      'rex-hover': isHover,
      'rex-fill': fill,
    },
    className,
  );

  const shouldFormatChildren = ['solid', 'warning'].includes(shape) && !leftElement && !rightElement;

  return (
    <StyledButton className={clazz} type={htmlType} ref={ref} {...mergeProps(others, hoverProps)}>
      {loadingIcon}
      <span className="rex-btn-children">
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
