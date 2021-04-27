import * as React from 'react';
import { noop } from '../utils';

export type ColorMode = 'light' | 'dark';

interface ColorModeContextType {
  colorMode: ColorMode;
  toggleColorMode: () => void;
}

export const ColorModeContext = React.createContext<ColorModeContextType>({
  colorMode: 'light',
  toggleColorMode: noop,
});

export function useColorMode() {
  return React.useContext(ColorModeContext);
}

export function useColorModeState(options: any) {
  const [mode, setMode] = React.useState(() => {
    // TODO: save mode data in localStorage

    return options.defaultColorMode || 'light';
  });
  return [mode, setMode];
}

export interface ColorModeProviderProps {
  value?: ColorMode;
  defaultValue?: ColorMode;
  children?: React.ReactNode;
}

export const ColorModeProvider: React.FC<ColorModeProviderProps> = (props) => {
  const { value, defaultValue = 'light', children } = props;

  const config = {
    defaultColorMode: defaultValue,
  };

  const [colorMode, setColorMode] = useColorModeState(config);
  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };
  const context = {
    colorMode,
    toggleColorMode,
  };

  const controlledContext = {
    colorMode: value as ColorMode,
    toggleColorMode: noop,
  };

  return <ColorModeContext.Provider value={value ? controlledContext : context}>{children}</ColorModeContext.Provider>;
};

export const DarkMode: React.FC = ({ children }) => (
  <ColorModeContext.Provider value={{ colorMode: 'light', toggleColorMode: noop }} children={children} />
);

export const LightMode: React.FC = ({ children }) => (
  <ColorModeContext.Provider value={{ colorMode: 'dark', toggleColorMode: noop }} children={children} />
);
