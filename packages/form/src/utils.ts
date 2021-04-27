import { FieldRule, FormItemComponentType } from './types';

export function getFieldRules(props: any) {
  const { rules: rulesProp = [], required, requiredMessage = '该字段为必填字段' } = props;

  const rules: FieldRule[] = [...rulesProp];

  if (required) {
    rules.push({
      required: true,
      message: requiredMessage,
    });
  }

  return rules;
}

const initialValueMap: Record<FormItemComponentType, any> = {
  input: '',
  textarea: '',
  numberInput: '',
  datePicker: null,
  rangePicker: null,
  timePicker: null,
  switch: null,
  checkboxGroup: null,
  radioGroup: null,
  filePicker: null,
  mediaPicker: null,
  treeSelect: null,
  select: null,
  range: null,
};

export function getInitialValueByComponentName(name: string) {
  return initialValueMap[name] ?? null;
}
