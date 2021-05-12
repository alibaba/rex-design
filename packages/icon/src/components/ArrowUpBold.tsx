import * as React from 'react';

const SvgArrowUpBold = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M503.168 353.835a42.667 42.667 0 0157.621-2.496l2.71 2.496 256 256a42.667 42.667 0 01-57.622 62.826l-2.709-2.496-225.835-225.792L307.5 670.165a42.667 42.667 0 01-57.622 2.496l-2.709-2.496a42.667 42.667 0 01-2.496-57.621l2.496-2.71 256-256z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowUpBold);
export default ForwardRef;
