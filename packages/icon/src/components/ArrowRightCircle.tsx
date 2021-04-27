import * as React from 'react';

const SvgArrowRightCircle = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm0 810.666C307.2 885.333 138.667 716.8 138.667 512S307.2 138.667 512 138.667 885.333 307.2 885.333 512 716.8 885.333 512 885.333zm34.133-576c-12.8-12.8-32-12.8-44.8-2.133-12.8 12.8-12.8 32-2.133 44.8l119.467 128H341.333c-17.066 0-32 14.933-32 32s14.934 32 32 32h277.334L499.2 672c-12.8 12.8-10.667 34.133 2.133 44.8 6.4 6.4 14.934 8.533 21.334 8.533 8.533 0 17.066-4.266 23.466-10.666L716.8 533.333c10.667-12.8 10.667-32 0-44.8l-170.667-179.2z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowRightCircle);
export default ForwardRef;
