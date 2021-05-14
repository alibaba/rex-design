import { darkColors, darkComponents } from './desktop-dark-theme';
import { phoneLightTheme } from './phone-light-theme';
import { extendTheme } from './theme-utils';

export const phoneDarkTheme = extendTheme(phoneLightTheme, {
  colors: darkColors,
  components: darkComponents,
});
