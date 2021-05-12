import * as React from 'react';

const SvgArrowDownBold = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M247.168 353.835a42.667 42.667 0 0157.621-2.496l2.71 2.496 225.834 225.792 225.835-225.814a42.667 42.667 0 0157.621-2.496l2.71 2.496a42.667 42.667 0 012.496 57.622l-2.496 2.709-256 256a42.667 42.667 0 01-57.622 2.496l-2.709-2.496-256-256a42.667 42.667 0 010-60.33z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowDownBold);
export default ForwardRef;
