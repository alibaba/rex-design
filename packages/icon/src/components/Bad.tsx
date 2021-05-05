import * as React from 'react';

const SvgBad = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M904.533 522.667l-51.2-337.067C844.8 134.4 797.867 96 746.667 96H204.8C145.067 96 96 142.933 96 202.667V460.8c0 57.6 49.067 106.667 108.8 106.667h91.733l125.867 281.6c2.133 2.133 2.133 4.266 4.267 6.4 14.933 23.466 38.4 36.266 64 36.266 12.8 0 25.6-4.266 38.4-10.666 57.6-34.134 87.466-72.534 87.466-117.334V646.4H800c32 0 59.733-12.8 81.067-36.267 19.2-25.6 29.866-55.466 23.466-87.466zM288 501.333h-83.2c-25.6 0-44.8-19.2-44.8-42.666v-256C160 179.2 179.2 160 204.8 160H288v341.333zm544 66.134C823.467 576 810.667 582.4 797.867 582.4H584.533c-17.066 0-32 14.933-32 32v149.333c0 25.6-29.866 49.067-55.466 64-4.267 2.134-10.667 2.134-14.934-4.266L352 533.333V160h394.667c21.333 0 40.533 14.933 42.666 36.267l53.334 337.066C844.8 544 840.533 556.8 832 567.467z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgBad);
export default ForwardRef;