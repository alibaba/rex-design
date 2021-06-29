import { Icon } from '@rexd/icon';
import React from 'react';
import styled from 'styled-components';
import { getToken } from '../../utils';
import { Box, BoxProps } from '../layout';
import { InputElement } from './element';
import { useInput, UseInputProps } from './use-input';

const InputWrapper = styled(Box)`
  display: inline-flex;
  position: relative;
  vertical-align: middle;
  font-size: var(--rex-fontSizes-body);
  color: ${getToken('Input.textColor')};
  background-color: ${getToken('Input.bg')};
  height: var(--rex-sizes-formHeights-m);
  width: ${getToken('Input.width')};
  padding-left: var(--rex-space-l);
  transition: box-shadow 300ms cubic-bezier(0.19, 1, 0.22, 1), border-color 300ms cubic-bezier(0.19, 1, 0.22, 1);

  input {
    flex: 1;
    outline: 0;
    appearance: none;
    border: 0;
    height: 100%;
    width: 100%;
    padding: 0;
    background: transparent;
    color: inherit;
  }

  &.rex-fill {
    width: 100%;
  }

  &.rex-solid {
    border: var(--rex-borders-solid) ${getToken('Input.borderColor')};
    border-radius: var(--rex-radii-s);

    &:focus-within {
      outline: 0;
      box-shadow: 0 0 0 3px ${getToken('Input.borderColorFocus')};
    }

    &:hover {
      border-color: ${getToken('Input.borderColorHover')};
    }

    &.rex-error {
      border-color: ${getToken('Input.borderColorError')};

      &:focus-within {
        box-shadow: 0 0 0 3px ${getToken('Input.borderColorErrorFocus')};
      }
    }

    &.rex-warning {
      border-color: ${getToken('Input.borderColorWarning')};

      &:focus-within {
        box-shadow: 0 0 0 3px ${getToken('Input.borderColorWarningFocus')};
      }
      /* outline-color: ${getToken('Input.borderColorWarning')}; */
    }

    &.rex-success {
      border-color: ${getToken('Input.borderColorSuccess')};

      &:focus-within {
        box-shadow: 0 0 0 3px ${getToken('Input.borderColorSuccessFocus')};
      }
    }
  }

  &.rex-simple {
    border: 0;
    background-color: transparent;
  }

  &.rex-disabled {
    pointer-events: none;
    color: ${getToken('Input.textColorDisabled')};
    border-color: ${getToken('Input.borderColorDisabled')};
    background-color: ${getToken('Input.bgDisabled')};
    /* safari */
    -webkit-text-fill-color: ${getToken('Input.textColorDisabled')};
  }
`;

const Center = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export interface InputProps extends UseInputProps {
  /**
   * 左侧附加元素
   */
  leftElement?: React.ReactNode;
  /**
   * 右侧附加元素
   */
  rightElement?: React.ReactNode;
  /**
   * 自定义右侧元素渲染（自定义布局）
   */
  renderRightElement?: () => React.ReactNode;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const Input = React.forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const { leftElement, rightElement, renderRightElement, ...rest } = props;
  const { hasClear, getRootProps, getInputProps, getClearButtonProps } = useInput(rest);
  const rootProps = getRootProps();
  const inputProps = getInputProps();
  const clearProps = getClearButtonProps();

  const hasRightElement = rightElement || renderRightElement || hasClear;
  const renderRight =
    typeof renderRightElement === 'function'
      ? renderRightElement
      : () => {
          return rightElement ? (
            <Center ml={hasClear ? 'm' : 0} mr="l">
              {rightElement}
            </Center>
          ) : null;
        };

  return (
    <InputWrapper ref={ref} {...rootProps}>
      {leftElement && <InputElement mr="s">{leftElement}</InputElement>}
      <input {...inputProps} />
      {hasRightElement ? (
        <InputElement>
          {hasClear && <ClearButton mr={rightElement ? 0 : 'l'} {...clearProps} />}
          {renderRight()}
        </InputElement>
      ) : null}
    </InputWrapper>
  );
});

function ClearButton(props: BoxProps) {
  return (
    <Box height="100%" display="inline-flex" alignItems="center" {...props}>
      <Icon type="delete-filling" />
    </Box>
  );
}
