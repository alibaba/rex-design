import * as React from 'react';

const SvgArrowDownFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M768 362.667H256c-38.016 0-57.045 45.952-30.165 72.832l256 256a42.667 42.667 0 0060.33 0l256-256c26.88-26.88 7.851-72.832-30.165-72.832z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowDownFilling);
export default ForwardRef;
