import * as React from 'react';

const SvgSelectBold = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M992.533 169.551c-22.094-22.093-57.996-22.093-77.327 0l-535.767 541.29L108.794 445.72c-22.093-22.094-57.995-22.094-77.327 0-22.093 22.093-22.093 57.995 0 77.327l309.309 303.785c11.046 11.046 24.855 16.57 38.663 16.57 13.809 0 27.617-5.524 38.664-16.57l574.43-579.953c22.093-22.094 22.093-55.234 0-77.328z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgSelectBold);
export default ForwardRef;
