import * as React from 'react';

const SvgChartPie = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M887.467 642.133c-17.067-6.4-34.134 0-42.667 17.067-64 151.467-221.867 243.2-386.133 221.867-164.267-21.334-294.4-149.334-315.734-313.6C119.467 405.333 209.067 245.333 358.4 179.2c17.067-6.4 23.467-25.6 17.067-42.667-6.4-17.066-25.6-23.466-42.667-17.066C155.733 198.4 51.2 386.133 78.933 578.133c27.734 192 179.2 343.467 371.2 369.067 19.2 2.133 36.267 4.267 55.467 4.267 170.667 0 330.667-102.4 398.933-264.534 6.4-17.066-2.133-36.266-17.066-44.8zm-72.534-433.066c-87.466-87.467-202.666-134.4-324.266-134.4-17.067 0-32 14.933-32 32v426.666c0 17.067 14.933 32 32 32h426.666c17.067 0 32-14.933 32-32 0-121.6-46.933-236.8-134.4-324.266zM522.667 501.333V140.8c93.866 6.4 179.2 46.933 247.466 115.2 66.134 66.133 106.667 153.6 115.2 247.467H522.667z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgChartPie);
export default ForwardRef;