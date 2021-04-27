import * as React from 'react';

const SvgArrowDown = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 714.667c-8.533 0-17.067-2.134-23.467-8.534L147.2 364.8c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l320 317.867 317.867-320c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L533.333 704c-4.266 8.533-12.8 10.667-21.333 10.667z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowDown);
export default ForwardRef;
