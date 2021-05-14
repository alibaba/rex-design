import { base } from './base';
import { desktopDarkTheme } from './desktop-dark-theme';
import { desktopLightTheme } from './desktop-light-theme';
import { phoneDarkTheme } from './phone-dark-theme';
import { phoneLightTheme } from './phone-light-theme';
import { tabletDarkTheme } from './tablet-dark-theme';
import { tabletLightTheme } from './tablet-light-theme';

export const THEMES = {
  base,
  light: {
    desktop: desktopLightTheme,
    tablet: tabletLightTheme,
    phone: phoneLightTheme,
  },
  dark: {
    desktop: desktopDarkTheme,
    tablet: tabletDarkTheme,
    phone: phoneDarkTheme,
  },
} as const;

export { getThemeValue, extendTheme } from './theme-utils';
