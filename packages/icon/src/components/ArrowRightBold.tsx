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
    <path d="M796.453 470.575L299.351 28.705c-22.094-19.331-57.996-19.331-77.328 5.524-19.331 22.094-19.331 57.995 5.524 77.327L677.7 512 227.547 912.444c-22.094 19.332-24.855 55.233-5.524 77.327 11.047 11.047 24.856 19.332 41.426 19.332 13.808 0 24.855-5.524 35.902-13.809l497.102-441.869C807.5 542.378 815.785 528.57 815.785 512s-5.523-30.378-19.332-41.425z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowRightBold);
export default ForwardRef;
