import * as React from 'react';

const SvgEllipsis = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M128 512a64 64 0 10128 0 64 64 0 10-128 0zm320 0a64 64 0 10128 0 64 64 0 10-128 0zm320 0a64 64 0 10128 0 64 64 0 10-128 0z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgEllipsis);
export default ForwardRef;
