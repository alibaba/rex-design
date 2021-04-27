import * as React from 'react';

const SvgDirectionLeft = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M874.667 480H224l290.133-309.333c12.8-12.8 10.667-34.134-2.133-44.8S480 115.2 467.2 128L125.867 490.667c-2.134 2.133-4.267 6.4-6.4 8.533-2.134 4.267-2.134 6.4-2.134 10.667s0 8.533 2.134 10.666c2.133 4.267 4.266 6.4 6.4 8.534L467.2 891.733c6.4 6.4 14.933 10.667 23.467 10.667 8.533 0 14.933-2.133 21.333-8.533 12.8-12.8 12.8-32 2.133-44.8L224 544h650.667c17.066 0 32-14.933 32-32s-14.934-32-32-32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgDirectionLeft);
export default ForwardRef;
