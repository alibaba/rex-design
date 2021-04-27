import * as React from 'react';

const SvgIntermediateFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 96H170.667C130.133 96 96 130.133 96 170.667v682.666C96 893.867 130.133 928 170.667 928h682.666C893.867 928 928 893.867 928 853.333V170.667C928 130.133 893.867 96 853.333 96zm-128 448H298.667c-17.067 0-32-14.933-32-32s14.933-32 32-32h426.666c17.067 0 32 14.933 32 32s-14.933 32-32 32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgIntermediateFilling);
export default ForwardRef;
