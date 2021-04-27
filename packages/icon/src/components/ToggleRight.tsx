import * as React from 'react';

const SvgToggleRight = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M874.667 800H149.333c-17.066 0-32 14.933-32 32s14.934 32 32 32h725.334c17.066 0 32-14.933 32-32s-14.934-32-32-32zM149.333 224h725.334c17.066 0 32-14.933 32-32s-14.934-32-32-32H149.333c-17.066 0-32 14.933-32 32s14.934 32 32 32zm0 320h512c17.067 0 32-14.933 32-32s-14.933-32-32-32h-512c-17.066 0-32 14.933-32 32s14.934 32 32 32zM748.8 339.2c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l125.867 125.867L704 635.733c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933 8.534 23.467 8.534s17.066-2.134 23.466-8.534L900.267 531.2c12.8-12.8 12.8-32 0-44.8L748.8 339.2z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgToggleRight);
export default ForwardRef;
