import React, { useCallback, useMemo } from 'react';
import { Group, SearchFormLayout, SearchFormLayoutProps, Text, Box, BoxProps } from '@rexd/core';
import { FieldOption } from '@alifd/field';
import { FormProvider } from './context';
import { Field } from './field';
import { Submit, Reset } from './form-item';

export interface SearchFormProps extends Omit<SearchFormLayoutProps, 'onSubmit' | 'onReset'> {
  field?: Field;
  fieldOptions?: FieldOption;
  onReset?: () => void;
  onSubmit?: (values: any) => void;
  onError?: (errors: any) => void;
  /**
   * 是否预览态
   */
  isPreview?: boolean;
  children?: React.ReactNode;
}

export function SearchForm(props: SearchFormProps) {
  const { field: fieldProp, fieldOptions, onSubmit, onError, onReset, children, ...rest } = props;
  const defaultField = Field.useField(fieldOptions);
  const field = useMemo(() => {
    return fieldProp ?? defaultField;
  }, [fieldProp, fieldOptions]);

  const form = {
    field,
    onError,
    onReset,
    onSubmit,
  };

  const renderFooter = useCallback(
    () => (
      <Group>
        <Submit />
        <Reset />
      </Group>
    ),
    [],
  );

  const renderCollapsed = useCallback(() => {
    let isEmpty = true;
    const ret = React.Children.map(children, (child: any) => {
      if (child) {
        const { name } = child.props;
        if (name && field.getValue(name)) {
          if (isEmpty) {
            isEmpty = false;
          }

          return (
            <PreviewTag mr="m">
              {React.cloneElement(child, {
                isPreview: true,
                isInline: true,
              })}
            </PreviewTag>
          );
        }
      }
      return null;
    });

    return isEmpty ? (
      <Text fontSize="note" color="text.note">
        暂无搜索条件
      </Text>
    ) : (
      ret
    );
  }, [children, field]);

  return (
    <FormProvider value={form}>
      <SearchFormLayout renderFooterMain={renderFooter} renderCollapsed={renderCollapsed} {...rest}>
        {children}
      </SearchFormLayout>
    </FormProvider>
  );
}

function PreviewTag(props: BoxProps) {
  const { children, ...rest } = props;
  return (
    <Box display="inline-block" border="solid" borderColor="line.border" borderRadius="s" px="m" {...rest}>
      {children}
    </Box>
  );
}
