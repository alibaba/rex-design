import { extendTheme } from '../theme';
import tabletTheme from '../theme-tablet';
import { colors } from '../theme-dark';

export default extendTheme(
  {
    colors,
  },
  tabletTheme,
);
