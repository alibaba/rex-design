import * as React from 'react';

const SvgArrowRightBold = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M375.168 225.835a42.667 42.667 0 0157.621-2.496l2.71 2.496 256 256a42.667 42.667 0 012.496 57.621l-2.496 2.71-256 256a42.667 42.667 0 01-62.827-57.622l2.496-2.71L600.96 512 375.168 286.165a42.667 42.667 0 01-2.496-57.621l2.496-2.71z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowRightBold);
export default ForwardRef;
