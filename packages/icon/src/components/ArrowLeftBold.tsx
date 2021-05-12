import * as React from 'react';

const SvgArrowLeftBold = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M631.168 225.835a42.667 42.667 0 0162.827 57.621l-2.496 2.71L465.707 512 691.52 737.835a42.667 42.667 0 012.496 57.621l-2.496 2.71a42.667 42.667 0 01-57.621 2.495l-2.71-2.496-256-256a42.667 42.667 0 01-2.496-57.621l2.496-2.71 256-256z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowLeftBold);
export default ForwardRef;
