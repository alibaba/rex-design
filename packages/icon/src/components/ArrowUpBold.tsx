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
    <path d="M35.61 755.373c20.713 20.713 51.781 20.713 72.494 0L512 351.477l403.896 403.896c20.713 20.713 51.781 20.713 72.494 0 20.713-20.712 20.713-51.781 0-72.494L548.247 242.736c-10.356-10.356-23.302-15.534-36.247-15.534s-25.89 5.178-36.247 15.534L35.61 682.879c-20.713 20.713-20.713 51.782 0 72.494z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowUpBold);
export default ForwardRef;
