import * as React from 'react';

const SvgSelect = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M409.6 757.333c-8.533 0-17.067-2.133-23.467-8.533L147.2 514.133c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l215.467 213.334 422.4-428.8c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8l-443.734 448c-4.266 8.533-12.8 10.666-21.333 10.666z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgSelect);
export default ForwardRef;
