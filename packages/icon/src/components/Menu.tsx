import * as React from 'react';

const SvgMenu = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M106.667 213.333a64 64 0 10128 0 64 64 0 10-128 0zm0 298.667a64 64 0 10128 0 64 64 0 10-128 0zm0 298.667a64 64 0 10128 0 64 64 0 10-128 0zm789.333-32H362.667c-17.067 0-32 14.933-32 32s14.933 32 32 32H896c17.067 0 32-14.934 32-32s-14.933-32-32-32zM362.667 245.333H896c17.067 0 32-14.933 32-32s-14.933-32-32-32H362.667c-17.067 0-32 14.934-32 32s14.933 32 32 32zM896 480H362.667c-17.067 0-32 14.933-32 32s14.933 32 32 32H896c17.067 0 32-14.933 32-32s-14.933-32-32-32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgMenu);
export default ForwardRef;
