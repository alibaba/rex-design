import React from 'react';
import { ThemeProvider } from 'styled-components';
import { OverlayAnimationStyles } from '../components/overlays/overlay-utils/animations';
import { OverlayGlobalStyles } from '../components/overlays/overlay-utils/OverlayGlobalStyles';
import { ColorMode, ColorModeProvider } from './color-mode-provider';
import { Device, DeviceProvider } from './device-provider';
import { ConfigProvider } from './config-provider';
import { Normalize } from './global-styles';

export interface AppProviderProps {
  device?: Device;
  colorMode?: ColorMode;
  config?: any;
  theme?: any;
  isNormalized?: boolean;
}

// TODO AppProvider 重构
export function AppProvider(props: React.PropsWithChildren<AppProviderProps>) {
  const { device, colorMode, config, theme, isNormalized = true, children } = props;

  return (
    <ColorModeProvider value={colorMode} theme={theme}>
      <ThemeProvider theme={{ ...theme, colorMode, device }}>
        <DeviceProvider value={device}>
          <ConfigProvider value={config}>
            {isNormalized && <Normalize />}
            {children}

            {/* TODO 下面两个是临时放的，可能需要换个地方 */}
            <OverlayGlobalStyles />
            <OverlayAnimationStyles />
          </ConfigProvider>
        </DeviceProvider>
      </ThemeProvider>
    </ColorModeProvider>
  );
}
