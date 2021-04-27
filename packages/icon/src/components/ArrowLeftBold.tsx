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
    <path d="M755.373 988.39c20.713-20.713 20.713-51.781 0-72.494L351.477 512l403.896-403.896c20.713-20.713 20.713-51.781 0-72.494-20.712-20.713-51.781-20.713-72.494 0L242.736 475.753c-10.356 10.356-15.534 23.302-15.534 36.247s5.178 25.89 15.534 36.247L682.879 988.39c20.713 20.713 51.782 20.713 72.494 0z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowLeftBold);
export default ForwardRef;
