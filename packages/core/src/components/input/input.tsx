import React from 'react';
import styled from 'styled-components';
import { Icon } from '@rexd/icon';
import { Box, BoxProps } from '../layout';
import { InputElement } from './element';
import { useInput, UseInputProps } from './use-input';
import { getToken } from '../../utils';

const InputWrapper = styled(Box)`
  display: inline-flex;
  position: relative;
  font-size: var(--rex-fontSizes-body);
  color: ${getToken('Input.textColor')};
  background-color: ${getToken('Input.bg')};
  height: var(--rex-sizes-formHeights-m);
  width: ${(props) => props.width || getToken('Input.width')};

  input {
    flex: 1;
    outline: 0;
    appearance: none;
    border: 0;
    height: 100%;
    width: 100%;
    padding: 0;
    margin-left: var(--rex-space-m);
    margin-right: var(--rex-space-m);
    background: transparent;
    color: inherit;
  }

  &.rex-solid {
    border: var(--rex-borders-solid) ${getToken('Input.borderColor')};
    border-radius: var(--rex-radii-s);

    &:focus-within {
      outline: 2px auto ${getToken('Input.borderColorFocus')};
    }

    &:hover {
      border-color: ${getToken('Input.borderColorHover')};
    }

    &.rex-error {
      border-color: ${getToken('Input.borderColorError')};
    }

    &.rex-warning {
      border-color: ${getToken('Input.borderColorWarning')};
    }

    &.rex-success {
      border-color: ${getToken('Input.borderColorSuccess')};
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
  }
`;

export interface InputProps extends UseInputProps {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
  hasClear?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const Input = React.forwardRef<HTMLDivElement, InputProps>((props, ref) => {
  const { leftElement, rightElement, ...rest } = props;
  const { hasClear, getRootProps, getInputProps, getClearButtonProps } = useInput(rest);
  const rootProps = getRootProps();
  const inputProps = getInputProps();
  const clearProps = getClearButtonProps();

  const hasRightElement = rightElement || hasClear;

  return (
    <InputWrapper ref={ref} {...rootProps}>
      {leftElement && <InputElement>{leftElement}</InputElement>}
      <input {...inputProps} />
      {hasRightElement ? (
        <InputElement>
          {hasClear && <ClearButton {...clearProps} />}
          {rightElement}
        </InputElement>
      ) : null}
    </InputWrapper>
  );
});

function ClearButton(props: BoxProps) {
  return (
    <Box px="m" height="100%" display="inline-flex" alignItems="center" {...props}>
      <Icon type="delete-filling" />
    </Box>
  );
}
