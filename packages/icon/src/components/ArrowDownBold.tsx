import * as React from 'react';

const SvgArrowDownBold = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M988.39 268.627c-20.713-20.713-51.781-20.713-72.494 0L512 672.523 108.104 268.627c-20.713-20.713-51.781-20.713-72.494 0-20.713 20.712-20.713 51.781 0 72.494l440.143 440.143c10.356 10.356 23.302 15.534 36.247 15.534s25.89-5.178 36.247-15.534L988.39 341.121c20.713-20.713 20.713-51.782 0-72.494z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowDownBold);
export default ForwardRef;
