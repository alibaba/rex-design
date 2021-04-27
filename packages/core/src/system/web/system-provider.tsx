import React from 'react';
import { ThemeProvider } from 'styled-components';
import { OverlayAnimationStyles } from '../../components/overlays/overlay-utils/animations';
import { OverlayGlobalStyles } from '../../components/overlays/overlay-utils/OverlayGlobalStyles';
import { ColorMode, ColorModeProvider } from '../color-mode';
import { DeviceProvider, Device } from '../device-provider';
import { Normalize } from './global-style';
import { CssVariables } from './css-variables';
import baseTheme from '../../theme';
import darkTheme from '../../theme-dark';
import { Dict } from '../../types';
import { getToken, isValidTokenPath } from '../../utils';

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

export interface SystemProviderProps {
  children?: React.ReactNode;
  theme?: any;
  device?: Device;
  colorMode?: ColorMode;
  includeNormalize?: boolean;
}

export function SystemProvider(props: SystemProviderProps) {
  const {
    device,
    colorMode,
    theme = colorMode === 'dark' ? darkTheme : baseTheme,
    children,
    // TODO 只有顶层的 SystemProvider 才允许指定 includeNormalize
    includeNormalize = true,
  } = props;

  const variables = themeToVariables(theme);

  return (
    <ColorModeProvider value={colorMode}>
      <DeviceProvider value={device}>
        <ThemeProvider theme={theme}>
          {includeNormalize && <Normalize />}
          <CssVariables variables={variables} />
          {children}

          {/* TODO 下面两个是临时放的，可能需要换个地方 */}
          <OverlayGlobalStyles />
          <OverlayAnimationStyles />
        </ThemeProvider>
      </DeviceProvider>
    </ColorModeProvider>
  );
}
