import * as React from 'react';

const SvgRunUp = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M409.6 294.661l71.053-71.053v248.686c0 16.718 14.629 31.347 31.347 31.347s31.347-14.629 31.347-31.347V221.518l71.053 71.053c6.27 6.27 14.629 8.36 22.988 8.36s16.718-2.09 22.988-8.36c12.538-12.538 12.538-31.347 0-43.885L534.988 123.298c-12.539-12.539-31.347-12.539-43.886 0L365.714 248.686c-12.538 12.538-12.538 31.347 0 43.885 10.45 12.54 31.347 12.54 43.886 2.09zm526.629 156.735l-242.417-81.502c-16.718-6.27-33.436 4.18-39.706 18.808-6.27 16.718 4.18 33.437 18.808 39.706l156.735 52.245L512 593.502 194.351 480.653l156.735-52.245c16.718-6.27 25.077-22.988 18.808-39.706-6.27-16.718-22.988-25.078-39.706-18.808L87.77 451.396c-12.538 4.18-20.898 16.718-20.898 29.257 0 12.539 8.36 25.078 20.898 29.257l413.78 146.286c4.18 2.09 6.27 2.09 10.449 2.09s6.27 0 10.449-2.09l413.78-146.286c12.538-4.18 20.898-16.718 20.898-29.257 0-14.629-8.36-25.077-20.898-29.257zM512 714.71c-16.718 0-31.347 14.629-31.347 31.347v156.735c0 16.718 14.629 31.347 31.347 31.347s31.347-14.629 31.347-31.347V746.057c0-16.718-14.629-31.347-31.347-31.347z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgRunUp);
export default ForwardRef;