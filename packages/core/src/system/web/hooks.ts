import { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import defaultTheme from '../../theme';
import { useColorMode } from '../color-mode';
import { useDevice } from '../device-provider';

export function useSystem() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { device } = useDevice();
  const theme = useTheme();

  return {
    theme,
    device,
    colorMode,
    toggleColorMode,
  };
}

export function useTheme() {
  const theme = useContext(ThemeContext);
  return theme || defaultTheme;
}
