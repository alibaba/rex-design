import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekday from 'dayjs/plugin/weekday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localeData from 'dayjs/plugin/localeData';

dayjs.locale('zh-cn');

dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);
dayjs.extend(weekOfYear);
dayjs.extend(customParseFormat);
dayjs.extend(localeData);

export default dayjs;

export { Dayjs } from 'dayjs';
