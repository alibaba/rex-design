import * as React from 'react';

const SvgUpload = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M896 629.333c-17.067 0-32 14.934-32 32V832c0 6.4-4.267 10.667-10.667 10.667H170.667c-6.4 0-10.667-4.267-10.667-10.667V661.333c0-17.066-14.933-32-32-32s-32 14.934-32 32V832c0 40.533 34.133 74.667 74.667 74.667h682.666C893.867 906.667 928 872.533 928 832V661.333c0-17.066-14.933-32-32-32zM322.133 407.467L480 249.6V704c0 17.067 14.933 32 32 32s32-14.933 32-32V247.467l157.867 157.866c6.4 6.4 14.933 8.534 23.466 8.534s17.067-2.134 23.467-8.534c12.8-12.8 12.8-32 0-44.8L535.467 147.2c-12.8-12.8-32-12.8-44.8 0L277.333 360.533c-12.8 12.8-12.8 32 0 44.8 10.667 12.8 32 12.8 44.8 2.134z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgUpload);
export default ForwardRef;
