import * as React from 'react';

const SvgArrowRight = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M382.72 233.387a32 32 0 0142.816-2.219l2.432 2.197 256 256a32 32 0 012.197 42.838l-2.197 2.432-256 256a32 32 0 01-47.467-42.838l2.198-2.432L616.107 512 382.72 278.613a32 32 0 01-2.197-42.816l2.197-2.432z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowRight);
export default ForwardRef;
