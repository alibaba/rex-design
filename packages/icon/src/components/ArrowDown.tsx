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
    <path d="M0 0h1024v1024H0z" fillOpacity={0.01} />
    <path d="M766.72 361.387a32 32 0 0147.445 42.816l-2.197 2.432-256 256a32 32 0 01-42.837 2.197l-2.432-2.197-256-256a32 32 0 0142.837-47.467l2.432 2.197 233.365 233.408L766.72 361.387z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowDown);
export default ForwardRef;
