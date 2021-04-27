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
    <path d="M926.252 563.782H97.748c-28.48 0-51.782-23.302-51.782-51.782s23.302-51.782 51.782-51.782h828.504c28.48 0 51.782 23.302 51.782 51.782s-23.302 51.782-51.782 51.782z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgMinusBold);
export default ForwardRef;
