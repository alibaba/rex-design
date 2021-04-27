import * as React from 'react';

const SvgPrompt = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm0 810.666C307.2 885.333 138.667 716.8 138.667 512S307.2 138.667 512 138.667 885.333 307.2 885.333 512 716.8 885.333 512 885.333zM469.333 320a42.667 42.667 0 1085.334 0 42.667 42.667 0 10-85.334 0zM512 437.333c-17.067 0-32 14.934-32 32V704c0 17.067 14.933 32 32 32s32-14.933 32-32V469.333c0-17.066-14.933-32-32-32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgPrompt);
export default ForwardRef;
