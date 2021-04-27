import * as React from 'react';

const SvgAdd = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 480H544V170.667c0-17.067-14.933-32-32-32s-32 14.933-32 32V480H170.667c-17.067 0-32 14.933-32 32s14.933 32 32 32H480v309.333c0 17.067 14.933 32 32 32s32-14.933 32-32V544h309.333c17.067 0 32-14.933 32-32s-14.933-32-32-32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgAdd);
export default ForwardRef;
