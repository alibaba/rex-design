import * as React from 'react';

const SvgPad = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M810.667 949.333H213.333c-40.533 0-74.666-34.133-74.666-74.666V149.333c0-40.533 34.133-74.666 74.666-74.666h597.334c40.533 0 74.666 34.133 74.666 74.666v725.334c0 40.533-34.133 74.666-74.666 74.666zM213.333 138.667c-6.4 0-10.666 4.266-10.666 10.666v725.334c0 6.4 4.266 10.666 10.666 10.666h597.334c6.4 0 10.666-4.266 10.666-10.666V149.333c0-6.4-4.266-10.666-10.666-10.666H213.333zM469.333 768a42.667 42.667 0 1085.334 0 42.667 42.667 0 10-85.334 0z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgPad);
export default ForwardRef;
