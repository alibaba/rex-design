import * as React from 'react';

const SvgToggleLeft = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M874.667 800H149.333c-17.066 0-32 14.933-32 32s14.934 32 32 32h725.334c17.066 0 32-14.933 32-32s-14.934-32-32-32zM149.333 224h725.334c17.066 0 32-14.933 32-32s-14.934-32-32-32H149.333c-17.066 0-32 14.933-32 32s14.934 32 32 32zm192 256c-17.066 0-32 14.933-32 32s14.934 32 32 32h512c17.067 0 32-14.933 32-32s-14.933-32-32-32h-512zM275.2 684.8c6.4 6.4 14.933 8.533 23.467 8.533s17.066-2.133 23.466-8.533c12.8-12.8 12.8-32 0-44.8l-128-128L320 386.133c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L125.867 490.667c-12.8 12.8-12.8 32 0 44.8L275.2 684.8z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgToggleLeft);
export default ForwardRef;
