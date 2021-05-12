import * as React from 'react';

const SvgDirectionLeft = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M768 479.83a32 32 0 013.072 63.85l-3.072.15H256a32 32 0 01-3.072-63.851l3.072-.15h512z" />
    <path d="M489.387 233.387a32 32 0 0147.445 42.816l-2.197 2.432L301.227 512l233.386 233.387a32 32 0 012.198 42.816l-2.198 2.432a32 32 0 01-42.837 2.197l-2.432-2.197-256-256a32 32 0 01-2.197-42.838l2.197-2.432 256-256z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgDirectionLeft);
export default ForwardRef;
