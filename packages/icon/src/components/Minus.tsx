import * as React from 'react';

const SvgMinus = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 544H170.667c-17.067 0-32-14.933-32-32s14.933-32 32-32h682.666c17.067 0 32 14.933 32 32s-14.933 32-32 32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgMinus);
export default ForwardRef;
