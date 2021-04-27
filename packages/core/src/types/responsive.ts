import { StringOrNumber } from './common';

export interface ResponsiveObject {
  s?: StringOrNumber;
  m?: StringOrNumber;
  l?: StringOrNumber;
}

export type ResponsiveType = StringOrNumber | ResponsiveObject | StringOrNumber[];
