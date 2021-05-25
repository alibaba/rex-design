import React, { useContext, useMemo } from 'react';
import { OverlayAnimationStyles } from '../components/overlays/overlay-utils/animations';
import { OverlayGlobalStyles } from '../components/overlays/overlay-utils/OverlayGlobalStyles';
import { THEMES } from '../theme';
import { getTokenValue } from '../utils';
import { ConfigProvider } from './config-provider';
import { CssVariables, Normalize } from './global-styles';

// TODO device 相关的变量可以移动到 devices/ 目录下
export type DeviceName = 'phone' | 'tablet' | 'desktop';

export interface Device {
  /** 设备名 */
  name: DeviceName;
  /** 别名 */
  alias: string;
  /** 断点设置 */
  breakpoint: string;
}
export const DESKTOP_DEVICE: Device = { name: 'desktop', alias: 'l', breakpoint: '' } as const;
export const TABLET_DEVICE: Device = { name: 'tablet', alias: 'm', breakpoint: '835px' } as const;
export const PHONE_DEVICE: Device = { name: 'phone', alias: 's', breakpoint: '415px' } as const;

export type ColorMode = 'light' | 'dark';

export interface AppContextType {
  underRoot: boolean;
  /** 设备上下文，默认继承自上层节点；顶层默认为 DESKTOP_DEVICE */
  device: Device;
  /** 颜色模式，默认继承自上层节点；顶层默认为 'light' */
  colorMode: ColorMode;
  /** 组件配置上下文 */
  config: any;
  /** 主题，默认根据 colorMode 与 device 选取对应的 rexd 内置主题 */
  theme: any;
}

const AppContext = React.createContext<AppContextType>({
  underRoot: false,
  device: DESKTOP_DEVICE,
  config: undefined, // use internal config
  theme: THEMES.light.desktop,
  colorMode: 'light',
});

export const useAppContext = () => useContext(AppContext);
export const useColorMode = () => useAppContext().colorMode;
export const useDevice = () => useAppContext().device;
export const useTheme = () => {
  const { theme } = useAppContext();
  const getValue = (path: string) => getTokenValue(path, theme);
  return {
    theme,
    getValue,
  };
};

export interface AppProviderProps extends Omit<Partial<AppContextType>, 'underRoot'> {
  /** 是否为 root AppProvider */
  root?: boolean;

  /**
   * 样式调整，是否引入 normalize.css。root=true 的时候默认为 true；
   * 页面中已存在 normalize.css 的话可将该值设置为 false
   *
   * @category 其他
   * */
  includeNormalized?: boolean;
}

export function AppProvider(props: React.PropsWithChildren<AppProviderProps>) {
  const parent = useContext(AppContext);

  const {
    root = false,
    device = parent.device,
    colorMode = parent.colorMode,
    config = parent.config,
    theme = THEMES[colorMode][device.name],
    includeNormalized = root,
    children,
  } = props;

  if (!parent.underRoot && !root) {
    throw new Error('顶层的 <AppProvider /> 必须设置 root=true.');
  }

  if ((!parent.underRoot && !root) || (parent.underRoot && root)) {
    throw new Error('嵌套的 <AppProvider /> 不支持设置为 root=true.');
  }

  const underRoot = parent.underRoot || root;
  const appContextValue = useMemo(() => ({ underRoot, colorMode, theme, device, config }), [
    colorMode,
    config,
    device,
    theme,
    underRoot,
  ]);

  return (
    <AppContext.Provider value={appContextValue}>
      {includeNormalized && <Normalize />}
      {root && <OverlayGlobalStyles colorMode={colorMode} />}
      {root && <OverlayAnimationStyles />}
      <CssVariables root={root} theme={theme} />

      <ConfigProvider value={config}>{children}</ConfigProvider>
    </AppContext.Provider>
  );
}
