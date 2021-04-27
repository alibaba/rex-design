import * as React from 'react';

const SvgClockFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 74.667c241.067 0 437.333 196.266 437.333 437.333S753.067 949.333 512 949.333 74.667 753.067 74.667 512 270.933 74.667 512 74.667zm0 170.666c-17.067 0-32 14.934-32 32V518.4c2.133 10.667 8.533 21.333 19.2 25.6l170.667 81.067L672 627.2c14.933 6.4 32-2.133 40.533-17.067l2.134-2.133c6.4-14.933-2.134-32-17.067-40.533l-151.467-70.4V275.2c-4.266-17.067-17.066-29.867-34.133-29.867z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgClockFilling);
export default ForwardRef;
