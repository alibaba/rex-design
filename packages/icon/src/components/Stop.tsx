import * as React from 'react';

const SvgStop = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zM885.333 512c0 85.333-29.866 164.267-78.933 228.267L273.067 226.133c64-55.466 149.333-87.466 238.933-87.466 204.8 0 373.333 168.533 373.333 373.333zm-746.666 0c0-91.733 34.133-174.933 87.466-241.067L761.6 787.2c-66.133 59.733-153.6 98.133-251.733 98.133-202.667 0-371.2-168.533-371.2-373.333z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgStop);
export default ForwardRef;
