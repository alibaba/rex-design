import React from 'react';
import { CssVariables } from './global-styles';
import { createContext } from '../utils';
import { useControllableState } from '../hooks';
import baseTheme from '../theme';
import darkTheme from '../theme-dark';

import { getToken, isValidTokenPath } from '../utils';
import { Dict } from '../types';

function themeToVariables(obj: Dict, prefix = '--rex') {
  let paths: string[][] = [];

  Object.keys(obj).forEach((key) => {
    const keypath = prefix ? [prefix, key].join('-') : key;
    if (typeof obj[key] === 'string') {
      let val = obj[key];

      if (isValidTokenPath(val)) {
        val = getToken(val, 'common');
      }

      paths.push([keypath, val]);
    } else {
      paths = paths.concat(themeToVariables(obj[key], keypath));
    }
  });

  return paths;
}

export type ColorMode = 'light' | 'dark';

interface ColorModeContext {
  colorMode: ColorMode;
  toggleColorMode?: () => void;
}

const [Provider, useColorMode] = createContext<ColorModeContext>({
  strict: true,
  name: 'ColorModeContext',
});

export interface ColorModeProviderProps {
  value?: ColorMode;
  defaultValue?: ColorMode;
  theme?: any;
}

export function ColorModeProvider(props: React.PropsWithChildren<ColorModeProviderProps>) {
  const { value: valueProp, defaultValue = 'light', theme: themeProp, children } = props;

  const [colorMode, updateColorMode] = useControllableState({
    value: valueProp,
    defaultValue,
    name: 'ColorModeProvider',
  });

  const internalTheme = colorMode === 'light' ? baseTheme : darkTheme;
  const theme = themeProp || internalTheme;

  const context = {
    colorMode,
    toggleColorMode() {
      updateColorMode(colorMode === 'light' ? 'dark' : 'light');
    },
  };

  const controlledContext = {
    colorMode,
  };

  const variables = themeToVariables(theme);

  return (
    <Provider value={valueProp ? controlledContext : context}>
      <CssVariables variables={variables} />
      {children}
    </Provider>
  );
}

export { useColorMode };
