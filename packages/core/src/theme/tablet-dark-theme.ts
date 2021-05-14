import { darkColors, darkComponents } from './desktop-dark-theme';
import { tabletLightTheme } from './tablet-light-theme';
import { extendTheme } from './theme-utils';

export const tabletDarkTheme = extendTheme(tabletLightTheme, {
  colors: darkColors,
  components: darkComponents,
});
