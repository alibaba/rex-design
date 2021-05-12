import * as React from 'react';

const SvgClose = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M276.053 276.053a32 32 0 0142.816-2.218l2.432 2.197 426.667 426.667a32 32 0 01-42.837 47.466l-2.432-2.197-426.667-426.667a32 32 0 010-45.269z" />
    <path d="M702.72 276.053a32 32 0 0147.445 42.816l-2.197 2.432-426.667 426.667a32 32 0 01-47.466-42.837l2.197-2.432 426.667-426.667z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgClose);
export default ForwardRef;
