import * as React from 'react';

const SvgSorting = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M273.067 405.333H748.8c10.667 0 21.333-4.266 29.867-12.8 17.066-17.066 17.066-42.666 0-59.733l-236.8-238.933C524.8 76.8 499.2 76.8 482.133 93.867L243.2 332.8c-8.533 8.533-12.8 19.2-12.8 29.867 0 23.466 19.2 42.666 42.667 42.666zm477.866 213.334H273.067c-10.667 0-21.334 4.266-29.867 12.8-17.067 17.066-17.067 42.666 0 59.733l238.933 238.933c17.067 17.067 42.667 17.067 59.734 0L780.8 691.2c8.533-8.533 12.8-19.2 12.8-29.867 0-23.466-19.2-42.666-42.667-42.666z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgSorting);
export default ForwardRef;
