import * as React from 'react';

const SvgMobilePhone = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M746.667 949.333H277.333c-40.533 0-74.666-34.133-74.666-74.666V149.333c0-40.533 34.133-74.666 74.666-74.666h469.334c40.533 0 74.666 34.133 74.666 74.666v725.334c0 40.533-34.133 74.666-74.666 74.666zM277.333 138.667c-6.4 0-10.666 4.266-10.666 10.666v725.334c0 6.4 4.266 10.666 10.666 10.666h469.334c6.4 0 10.666-4.266 10.666-10.666V149.333c0-6.4-4.266-10.666-10.666-10.666H277.333zm192 629.333a42.667 42.667 0 1085.334 0 42.667 42.667 0 10-85.334 0zm128-522.667H426.667c-17.067 0-32-14.933-32-32s14.933-32 32-32h170.666c17.067 0 32 14.934 32 32s-14.933 32-32 32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgMobilePhone);
export default ForwardRef;
