import { extendTheme } from '../theme';
import phoneTheme from '../theme-phone';
import { colors } from '../theme-dark';

export default extendTheme(
  {
    colors,
  },
  phoneTheme,
);
