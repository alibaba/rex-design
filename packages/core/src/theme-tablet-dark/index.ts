import { extendTheme } from '../theme';
import tabletTheme from '../theme-tablet';
import { colors, components } from '../theme-dark';

export default extendTheme(
  {
    colors,
    components,
  },
  tabletTheme,
);
