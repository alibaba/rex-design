import * as React from 'react';

const SvgDirectionDownCircle = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm0 810.666C307.2 885.333 138.667 716.8 138.667 512S307.2 138.667 512 138.667 885.333 307.2 885.333 512 716.8 885.333 512 885.333zM672 499.2L544 618.667V341.333c0-17.066-14.933-32-32-32s-32 14.934-32 32v277.334L352 499.2c-12.8-12.8-34.133-10.667-44.8 2.133-12.8 12.8-10.667 34.134 2.133 44.8L490.667 716.8c6.4 6.4 14.933 8.533 21.333 8.533s14.933-2.133 21.333-8.533l181.334-170.667c12.8-12.8 12.8-32 2.133-44.8-12.8-12.8-32-14.933-44.8-2.133z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgDirectionDownCircle);
export default ForwardRef;
