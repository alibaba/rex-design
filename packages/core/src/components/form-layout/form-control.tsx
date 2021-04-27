import React from 'react';
import { Box, BoxProps } from '../layout';
import { useFormLayout } from './form-layout';

interface FormControlBaseProps {
  label?: React.ReactNode;
  /**
   * 标签宽度
   */
  labelWidth?: string;
  help?: React.ReactNode;
  error?: string | string[];
  required?: boolean;
  children?: React.ReactNode;
}

export interface FormControlProps extends FormControlBaseProps {
  labelPosition?: 'left' | 'top';
  isInline?: boolean;
}

export function FormControl(props: FormControlProps) {
  const form = useFormLayout(props);
  const newProps = {
    labelWidth: form.labelWidth,
    ...props,
  };

  if (form.isInline) {
    return <InlineFormControl {...newProps} />;
  }

  return form.labelPosition === 'left' ? <RowFormControl {...newProps} /> : <ColumnFormControl {...newProps} />;
}

function InlineFormControl(props: FormControlBaseProps) {
  const { label, children } = props;
  return (
    <Box display="inline-block" mr="m">
      <FormLabel display="inline-block">{label}</FormLabel>
      {children}
    </Box>
  );
}

function ColumnFormControl(props: FormControlBaseProps) {
  const { label, help, error, required, children } = props;
  return (
    <Box mb="m">
      <FormLabel required={required}>{label}</FormLabel>
      {children}
      {help && <FormHelperText>{help}</FormHelperText>}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
    </Box>
  );
}

function RowFormControl(props: FormControlBaseProps) {
  const { label, labelWidth = '100px', help, error, required, children } = props;
  return (
    <Box display="flex">
      <FormLabel required={required} flex={`0 0 ${labelWidth}`} verticalAlign="top" textAlign="right">
        {label}
      </FormLabel>
      <Box flex="1" pb="m">
        {children}
        {help && <FormHelperText>{help}</FormHelperText>}
        {error && <FormErrorMessage>{error}</FormErrorMessage>}
      </Box>
    </Box>
  );
}

interface FormLabelProps extends BoxProps {
  required?: boolean;
}

function FormLabel(props: FormLabelProps) {
  const { required, children, ...rest } = props;
  return (
    <Box pr="m" color="text.note" fontSize="body" lineHeight="32px" verticalAlign="middle" {...rest}>
      {children}
      {children && required && <FormRequiredIndicator />}
    </Box>
  );
}

function FormRequiredIndicator(props: BoxProps) {
  const { children, ...rest } = props;
  return (
    <Box role="presentation" display="inline-block" color="error.normal" {...rest}>
      {children || '*'}
    </Box>
  );
}

function FormErrorMessage(props: BoxProps) {
  const { children, ...rest } = props;
  return (
    <Box color="error.normal" fontSize="body" lineHeight="2" {...rest}>
      {children}
    </Box>
  );
}

function FormHelperText(props: BoxProps) {
  const { children, ...rest } = props;
  return (
    <Box color="text.note" fontSize="body" lineHeight="2" {...rest}>
      {children}
    </Box>
  );
}
