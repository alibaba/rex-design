import * as React from 'react';

const SvgArrowLeftFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M609.835 225.835l-256 256a42.667 42.667 0 000 60.33l256 256c26.88 26.88 72.832 7.851 72.832-30.165V256c0-38.016-45.952-57.045-72.832-30.165z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowLeftFilling);
export default ForwardRef;
