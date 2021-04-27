import * as React from 'react';

const SvgArrowLeftFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M268.8 480l364.8-330.667c17.067-14.933 44.8-14.933 59.733 2.134 6.4 8.533 10.667 19.2 10.667 29.866v661.334c0 23.466-19.2 42.666-42.667 42.666-10.666 0-21.333-4.266-27.733-10.666L270.933 544c-17.066-14.933-19.2-42.667-2.133-59.733-2.133-2.134 0-2.134 0-4.267z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowLeftFilling);
export default ForwardRef;
