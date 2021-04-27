import React from 'react';
import { Box, BoxProps } from '../layout';
import { useConfig } from '../../providers';
import { createContext } from '../../utils';
import { ResponsiveType } from '../../types';

type LabelPosition = 'left' | 'top';

interface FormLayoutContext {
  isInline?: boolean;
  labelPosition?: LabelPosition;
  labelWidth?: string;
  columns?: ResponsiveType;
}

const [FormLayoutProvider, useFormLayoutContext] = createContext<FormLayoutContext>({
  strict: false,
  name: 'FormLayoutContext',
});

export interface UseFormProps {
  isInline?: boolean;
  labelPosition?: LabelPosition;
  labelWidth?: string;
  columns?: ResponsiveType;
}

export function useFormLayout(props: UseFormProps) {
  const form = useFormLayoutContext();

  return {
    ...props,
    isInline: props?.isInline ?? form?.isInline,
    labelPosition: props?.labelPosition ?? form?.labelPosition,
    labelWidth: props?.labelWidth ?? form?.labelWidth,
    columns: props?.columns ?? form?.columns,
  };
}

export interface FormLayoutProps extends FormLayoutContext, BoxProps {}

/**
 * Form 布局容器
 */
export function FormLayout(props: FormLayoutProps) {
  const { id, columns, isInline, labelPosition, labelWidth, children, ...others } = useConfig<FormLayoutProps>(
    'Form',
    props,
  );
  const context = {
    id,
    columns,
    labelPosition,
    labelWidth,
    isInline,
  };

  return (
    <FormLayoutProvider value={context}>
      <Box as="form" {...others}>
        {children}
      </Box>
    </FormLayoutProvider>
  );
}
