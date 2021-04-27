import * as React from 'react';

const SvgFilterFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M825.6 117.333H198.4c-40.533 0-74.667 34.134-74.667 74.667v4.267c0 14.933 6.4 32 17.067 42.666l256 302.934V793.6c0 12.8 6.4 23.467 17.067 27.733L576 902.4l2.133 2.133c21.334 8.534 42.667-6.4 42.667-29.866v-332.8l256-302.934c27.733-32 23.467-78.933-8.533-104.533-8.534-10.667-25.6-17.067-42.667-17.067z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgFilterFilling);
export default ForwardRef;
