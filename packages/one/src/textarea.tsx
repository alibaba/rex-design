import React from 'react';

export interface TextareaProps {
  onConfirm: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyPress: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
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
