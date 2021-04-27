import * as React from 'react';

const SvgDeleteFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 949.333C270.933 949.333 74.667 753.067 74.667 512S270.933 74.667 512 74.667 949.333 270.933 949.333 512 753.067 949.333 512 949.333zM360.533 657.067c10.667 10.666 29.867 12.8 42.667 2.133l2.133-2.133 104.534-102.4 102.4 102.4 2.133 2.133c12.8 10.667 32 8.533 42.667-2.133 12.8-12.8 12.8-32 0-44.8l-102.4-102.4 102.4-102.4 2.133-2.134c10.667-12.8 8.533-32-2.133-42.666s-29.867-12.8-42.667-2.134l-2.133 2.134-102.4 102.4-102.4-102.4-2.134-2.134c-12.8-10.666-32-8.533-42.666 2.134-12.8 12.8-12.8 32 0 44.8l102.4 102.4-102.4 102.4-2.134 2.133c-10.666 12.8-10.666 32 0 42.667z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgDeleteFilling);
export default ForwardRef;
