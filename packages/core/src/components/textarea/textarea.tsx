import React from 'react';
import styled from 'styled-components';
import { useTextarea, UseTextareaProps } from './use-textarea';
import { getToken } from '../../utils';
import { Dict } from '../../types';

interface OneTextareaProps {
  onConfirm: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const OneTextarea = React.forwardRef<HTMLTextAreaElement, OneTextareaProps>((props, ref) => {
  const { onConfirm, onKeyPress } = props;
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && typeof onConfirm === 'function') {
      onConfirm(e);
    }
    if (typeof onKeyPress === 'function') {
      onKeyPress(e);
    }
  };

  return <textarea {...props} onKeyPress={handleKeyPress} ref={ref} />;
});

const TextBox = styled(OneTextarea)<Dict<any>>`
  position: relative;
  outline: 0;
  appearance: none;
  transition: all 0.2s;
  font-size: var(--rex-fontSizes-body);
  line-height: 1.4;
  padding: var(--rex-space-m);
  width: 100%;
  border: var(--rex-borders-solid) var(--rex-colors-line-border);
  border-radius: var(--rex-radii-s);
  color: var(--rex-colors-text-body);
  background-color: transparent;

  &:focus {
    border-color: var(--rex-colors-brand-normal);
  }

  &.rex-disabled {
    color: ${getToken('Input.textColorDisabled')};
    border-color: ${getToken('Input.borderColorDisabled')};
    background-color: ${getToken('Input.bgDisabled')};
  }

  &.rex-error {
    border-color: ${getToken('Input.borderColorError')};
  }
`;

export interface TextareaProps extends UseTextareaProps {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { getInputProps } = useTextarea(props);
  const inputProps = getInputProps({}, ref);
  return <TextBox ref={ref} {...inputProps} />;
});
