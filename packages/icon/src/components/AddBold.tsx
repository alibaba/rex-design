import * as React from 'react';

const SvgAddBold = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M513.344 170.667a42.667 42.667 0 0142.496 39.53l.128 3.2-.79 597.334a42.667 42.667 0 01-85.226 3.072l-.107-3.2.79-597.334a42.667 42.667 0 0142.709-42.602z" />
    <path d="M810.667 469.333a42.667 42.667 0 013.2 85.227l-3.2.107H213.333a42.667 42.667 0 01-3.2-85.227l3.2-.107h597.334z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgAddBold);
export default ForwardRef;
