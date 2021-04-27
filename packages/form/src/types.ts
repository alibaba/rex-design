export type FormItemComponentType =
  | 'switch'
  | 'checkboxGroup'
  | 'radioGroup'
  | 'filePicker'
  | 'mediaPicker'
  | 'input'
  | 'textarea'
  | 'numberInput'
  | 'select'
  | 'datePicker'
  | 'rangePicker'
  | 'timePicker'
  | 'treeSelect'
  | 'range';

export interface FieldRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
  maxLength?: number;
  length?: number;
  min?: number;
  max?: number;
  format?: 'url' | 'email' | 'tel' | 'number';
  validator?: (rule: FieldRule, value: any, callback: any) => any;
  trigger?: string;
  message?: string;
}
