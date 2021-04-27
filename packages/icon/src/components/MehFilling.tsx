import * as React from 'react';

const SvgMehFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 74.667c241.067 0 437.333 196.266 437.333 437.333S753.067 949.333 512 949.333 74.667 753.067 74.667 512 270.933 74.667 512 74.667zm-187.733 576h-2.134c-17.066 2.133-29.866 14.933-29.866 32s14.933 32 32 32h375.466c17.067-2.134 29.867-14.934 29.867-32s-14.933-32-32-32H324.267zm38.4-288c-23.467 0-42.667 19.2-42.667 42.666v66.134C322.133 492.8 339.2 512 362.667 512s42.666-19.2 42.666-42.667V403.2c-2.133-23.467-19.2-40.533-42.666-40.533zm298.666 0c-23.466 0-42.666 19.2-42.666 42.666v66.134C620.8 492.8 637.867 512 661.333 512S704 492.8 704 469.333V403.2c-2.133-23.467-19.2-40.533-42.667-40.533z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgMehFilling);
export default ForwardRef;
