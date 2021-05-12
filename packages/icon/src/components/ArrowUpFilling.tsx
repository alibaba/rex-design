import * as React from 'react';

const SvgArrowUpFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M481.835 332.501l-256 256c-26.88 26.88-7.851 72.832 30.165 72.832h512c38.016 0 57.045-45.952 30.165-72.832l-256-256a42.667 42.667 0 00-60.33 0z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowUpFilling);
export default ForwardRef;
