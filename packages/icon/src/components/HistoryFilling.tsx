import * as React from 'react';

const SvgHistoryFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M768 74.667c40.533 0 72.533 32 74.667 70.4v294.4c-40.534-21.334-89.6-34.134-138.667-34.134-164.267 0-298.667 134.4-298.667 298.667 0 102.4 51.2 192 128 245.333H192c-40.533 0-72.533-32-74.667-70.4v-729.6c0-40.533 32-72.533 70.4-74.666H768zM362.667 437.333h-108.8c-17.067 2.134-29.867 14.934-29.867 32s12.8 29.867 29.867 32H364.8c17.067-2.133 29.867-14.933 29.867-32s-14.934-32-32-32zm320-170.666h-428.8C236.8 268.8 224 281.6 224 298.667s12.8 29.866 29.867 32H684.8c17.067-2.134 29.867-14.934 29.867-32s-14.934-32-32-32zm32 202.666C851.2 469.333 960 578.133 960 714.667S851.2 960 714.667 960 469.333 851.2 469.333 714.667s108.8-245.334 245.334-245.334zm0 106.667c-17.067 0-32 14.933-32 32v113.067c2.133 10.666 8.533 21.333 19.2 25.6l85.333 38.4 2.133 2.133c14.934 4.267 32-2.133 38.4-17.067l2.134-2.133c4.266-14.933-2.134-32-17.067-38.4l-66.133-29.867v-93.866c-2.134-17.067-14.934-29.867-32-29.867z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgHistoryFilling);
export default ForwardRef;