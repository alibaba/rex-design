import { createContext } from '../../utils';

export interface RadioGroupContext {
  name?: string;
  value?: string;
  onSelect?: (value: string, checked: boolean) => void;
}

const [RadioGroupProvider, useRadioGroupContext] = createContext<RadioGroupContext>({
  name: 'RadioGroupContext',
  strict: false,
});

export { RadioGroupProvider, useRadioGroupContext };
