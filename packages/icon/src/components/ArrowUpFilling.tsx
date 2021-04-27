import * as React from 'react';

const SvgArrowUpFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M541.867 285.867l345.6 345.6c17.066 17.066 17.066 42.666 0 59.733-8.534 8.533-19.2 12.8-29.867 12.8H168.533c-23.466 0-42.666-19.2-42.666-42.667 0-10.666 4.266-21.333 12.8-29.866l343.466-345.6c17.067-17.067 42.667-17.067 59.734 0z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowUpFilling);
export default ForwardRef;
