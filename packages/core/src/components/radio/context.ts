import { createContext } from '../../utils';
import { UseRadioGroupProps } from './use-radio-group';

export interface RadioGroupContext extends Pick<UseRadioGroupProps, 'onChange' | 'value' | 'name'> {}

const [RadioGroupProvider, useRadioGroupContext] = createContext<RadioGroupContext>({
  name: 'RadioGroupContext',
  strict: false,
});

export { RadioGroupProvider, useRadioGroupContext };
