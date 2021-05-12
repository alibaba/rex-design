import * as React from 'react';

const SvgCloseBold = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M268.501 268.501a42.667 42.667 0 0157.622-2.496l2.709 2.496 426.667 426.667a42.667 42.667 0 01-57.622 62.827l-2.709-2.496-426.667-426.667a42.667 42.667 0 010-60.33z" />
    <path d="M695.168 268.501a42.667 42.667 0 0162.827 57.622l-2.496 2.709-426.667 426.667a42.667 42.667 0 01-62.827-57.622l2.496-2.709 426.667-426.667z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgCloseBold);
export default ForwardRef;
