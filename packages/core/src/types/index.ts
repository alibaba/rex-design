export * from './common';
export * from './responsive';
export * from './system';

declare module 'styled-components' {
  interface StyledConfig {
    componentId?: string;
  }
}
