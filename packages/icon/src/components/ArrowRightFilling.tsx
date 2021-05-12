import * as React from 'react';

const SvgArrowRightFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M384 256v512c0 38.016 45.952 57.045 72.832 30.165l256-256a42.667 42.667 0 000-60.33l-256-256C429.952 198.955 384 217.984 384 256z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowRightFilling);
export default ForwardRef;
