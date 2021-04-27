import { createGlobalStyle } from 'styled-components';
import { Dict } from '../../types';

export const CssVariables = createGlobalStyle`
  :root {
    ${(props: Dict) =>
      props.variables.map((item: string[]) => item.join(':')).join(';')}
  }
`;
