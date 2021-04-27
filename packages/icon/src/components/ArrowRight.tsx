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
    <path d="M320 885.333c-8.533 0-17.067-4.266-23.467-10.666-12.8-12.8-10.666-34.134 2.134-44.8L654.933 512 298.667 194.133c-12.8-10.666-14.934-32-2.134-44.8 10.667-12.8 32-14.933 44.8-2.133l384 341.333c6.4 6.4 10.667 14.934 10.667 23.467s-4.267 17.067-10.667 23.467l-384 341.333c-6.4 6.4-12.8 8.533-21.333 8.533z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowRight);
export default ForwardRef;
