import * as React from 'react';

const SvgWarningFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M934.4 770.133l-328.533-588.8C586.667 147.2 550.4 128 512 128s-74.667 21.333-93.867 53.333L89.6 770.133c-19.2 34.134-19.2 76.8 0 110.934s55.467 57.6 93.867 57.6h657.066c40.534 0 74.667-21.334 93.867-57.6 19.2-34.134 19.2-76.8 0-110.934zM480 362.667c0-17.067 14.933-32 32-32s29.867 12.8 32 29.866V640c0 17.067-14.933 32-32 32s-29.867-12.8-32-29.867V362.667zM512 832c-23.467 0-42.667-19.2-42.667-42.667s19.2-42.666 42.667-42.666 42.667 19.2 42.667 42.666S535.467 832 512 832z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgWarningFilling);
export default ForwardRef;
