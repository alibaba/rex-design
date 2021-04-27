import * as React from 'react';

const SvgCapsUnlockFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M170.667 928C130.133 928 96 893.867 96 853.333V170.667C96 130.133 130.133 96 170.667 96h682.666C893.867 96 928 130.133 928 170.667v682.666C928 893.867 893.867 928 853.333 928H170.667zm268.8-202.667h147.2c12.8 0 21.333-6.4 21.333-19.2v-204.8h89.6c6.4 0 14.933-6.4 17.067-12.8 2.133-6.4 0-14.933-6.4-19.2L524.8 324.267c-6.4-6.4-17.067-6.4-23.467 0l-185.6 145.066c-4.266 4.267-6.4 8.534-6.4 14.934 0 2.133 0 4.266 2.134 6.4 2.133 6.4 8.533 12.8 17.066 12.8h91.734v204.8c0 10.666 6.4 17.066 19.2 17.066z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgCapsUnlockFilling);
export default ForwardRef;
