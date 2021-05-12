import * as React from 'react';

const SvgArrowLeft = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M1024 1024H0V0h1024z" fillOpacity={0.01} />
    <path d="M641.28 790.613a32 32 0 01-42.816 2.219l-2.432-2.197-256-256a32 32 0 01-2.197-42.838l2.197-2.432 256-256a32 32 0 0147.467 42.838l-2.198 2.432L407.893 512 641.28 745.387a32 32 0 012.197 42.816l-2.197 2.432z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowLeft);
export default ForwardRef;
