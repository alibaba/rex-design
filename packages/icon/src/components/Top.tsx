import * as React from 'react';

const SvgTop = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M896 96H128c-17.067 0-32 14.933-32 32s14.933 32 32 32h768c17.067 0 32-14.933 32-32s-14.933-32-32-32zM535.467 296.533c-12.8-12.8-32-12.8-44.8 0L277.333 509.867c-12.8 12.8-12.8 32 0 44.8s32 12.8 44.8 0L480 396.8v456.533c0 17.067 14.933 32 32 32s32-14.933 32-32V396.8l157.867 157.867c6.4 6.4 14.933 8.533 23.466 8.533s17.067-2.133 23.467-8.533c12.8-12.8 12.8-32 0-44.8L535.467 296.533z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgTop);
export default ForwardRef;
