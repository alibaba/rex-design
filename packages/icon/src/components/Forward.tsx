import * as React from 'react';

const SvgForward = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 757.333H170.667c-6.4 0-10.667-4.266-10.667-10.666V320c0-6.4 4.267-10.667 10.667-10.667h599.466l-83.2 83.2c-12.8 12.8-12.8 34.134 0 46.934 6.4 6.4 14.934 10.666 23.467 10.666s17.067-4.266 23.467-10.666L878.933 294.4c12.8-12.8 12.8-34.133 0-46.933L733.867 102.4c-12.8-12.8-34.134-12.8-46.934 0-12.8 12.8-12.8 34.133 0 46.933L780.8 243.2H170.667C130.133 243.2 96 277.333 96 317.867v426.666c0 40.534 34.133 74.667 74.667 74.667h682.666c17.067 0 32-14.933 32-32s-14.933-29.867-32-29.867z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgForward);
export default ForwardRef;
