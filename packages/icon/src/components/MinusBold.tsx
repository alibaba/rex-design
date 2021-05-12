import * as React from 'react';

const SvgMinusBold = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M821.333 469.333a42.667 42.667 0 013.2 85.227l-3.2.107H224a42.667 42.667 0 01-3.2-85.227l3.2-.107h597.333z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgMinusBold);
export default ForwardRef;
