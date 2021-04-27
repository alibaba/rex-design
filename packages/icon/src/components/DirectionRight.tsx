import * as React from 'react';

const SvgDirectionRight = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M904.533 522.667c2.134-4.267 2.134-6.4 2.134-10.667s0-8.533-2.134-10.667c-2.133-4.266-4.266-6.4-6.4-8.533L556.8 130.133c-12.8-12.8-32-12.8-44.8-2.133-12.8 12.8-12.8 32-2.133 44.8L800 482.133H149.333c-17.066 0-32 14.934-32 32s14.934 32 32 32H800l-290.133 307.2c-12.8 12.8-10.667 34.134 2.133 44.8 6.4 6.4 14.933 8.534 21.333 8.534 8.534 0 17.067-4.267 23.467-10.667l341.333-362.667c2.134-2.133 4.267-6.4 6.4-10.666z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgDirectionRight);
export default ForwardRef;
