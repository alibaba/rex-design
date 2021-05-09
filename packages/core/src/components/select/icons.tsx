import React from 'react';

export interface IconProps extends React.SVGProps<SVGElement> {
  height?: number;
  preserveAspectRatio?: string;
  title?: string;
  viewBox?: string;
  width?: number;
  xmlns?: string;
  ref?: any;
}

export const TickIcon = React.memo(({ stroke = '#3862CF', ...props }: IconProps & { stroke?: string }) => (
  <svg width="14" height="14" {...props}>
    <path
      fill="none"
      stroke={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M1.5 6.8l3.7 3.7 7-7"
    />
  </svg>
));

export const ClearIcon = React.memo((props: IconProps) => (
  <svg width="14" height="14" {...props}>
    <path
      fill="#8C8C8C"
      fillRule="nonzero"
      d="M7 13A6 6 0 117 1a6 6 0 010 12zM5.1 8.9h.6L7 7.6l1.3 1.3a.4.4 0 00.6-.6L7.6 7l1.3-1.3a.4.4 0 00-.6-.6L7 6.4 5.7 5.1a.4.4 0 00-.6.6L6.4 7 5.1 8.3V9z"
    />
  </svg>
));

export const CaretDownIcon = React.memo((props: IconProps) => (
  <svg width="14" height="14" fill="transparent" {...props} viewBox="0 0 14 14">
    <path
      stroke="#8C8C8C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M2.33333333 4.66666667L7 9.33333333 11.6666667 4.66666667"
    />
  </svg>
));
