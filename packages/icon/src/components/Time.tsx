import * as React from 'react';

const SvgTime = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm0 810.666C307.2 885.333 138.667 716.8 138.667 512S307.2 138.667 512 138.667 885.333 307.2 885.333 512 716.8 885.333 512 885.333zm183.467-317.866L544 497.067V277.333c0-17.066-14.933-32-32-32s-32 14.934-32 32v238.934c0 12.8 6.4 23.466 19.2 29.866L669.867 627.2c4.266 2.133 8.533 2.133 12.8 2.133 12.8 0 23.466-6.4 29.866-19.2 6.4-14.933 0-34.133-17.066-42.666z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgTime);
export default ForwardRef;
