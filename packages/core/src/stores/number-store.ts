import { toNumber } from 'lodash';
import { StringOrNumber } from '../types';

type LocaleType = 'zh-CN' | string;

export class NumberStore {
  private numberFormatter: Intl.NumberFormat;

  constructor(locale: LocaleType, options: Intl.NumberFormatOptions = {}) {
    this.numberFormatter = new Intl.NumberFormat(locale, options);
  }

  parse(value: StringOrNumber) {
    if (typeof value === 'number') {
      return value;
    }

    // for string value
    const newValue = value.replace(/,/g, '');
    return Number(newValue);
  }

  format(value: StringOrNumber) {
    const number = toNumber(value);
    const ret = this.numberFormatter.format(number);
    return ret;
  }
}
