import { extendTheme } from '../theme';
import phoneTheme from '../theme-phone';
import { colors, components } from '../theme-dark';

export default extendTheme(
  {
    colors,
    components,
  },
  phoneTheme,
);
