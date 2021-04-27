import * as React from 'react';

const SvgBottom = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M896 864H128c-17.067 0-32 14.933-32 32s14.933 32 32 32h768c17.067 0 32-14.933 32-32s-14.933-32-32-32zM488.533 727.467c6.4 6.4 14.934 8.533 23.467 8.533s17.067-2.133 23.467-8.533L748.8 514.133c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L546.133 627.2V170.667c0-17.067-14.933-32-32-32S480 153.6 480 170.667V627.2L322.133 469.333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l211.2 213.334z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgBottom);
export default ForwardRef;
