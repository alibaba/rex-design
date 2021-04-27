import * as React from 'react';

const SvgFileCommonFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M832 85.333c17.067 0 32 14.934 32 32v768c0 29.867-23.467 53.334-53.333 53.334-12.8 0-23.467-4.267-34.134-12.8L512 712.533 247.467 925.867c-21.334 17.066-53.334 14.933-72.534-4.267l-2.133-2.133c-8.533-8.534-12.8-21.334-12.8-34.134v-768c0-17.066 14.933-32 32-32h640zM554.667 448H339.2c-17.067 2.133-29.867 14.933-29.867 32s14.934 32 32 32H556.8c17.067-2.133 29.867-14.933 29.867-32s-14.934-32-32-32zm106.666-170.667H339.2c-17.067 2.134-29.867 14.934-29.867 32s14.934 32 32 32h322.134c17.066-2.133 29.866-14.933 29.866-32s-14.933-32-32-32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgFileCommonFilling);
export default ForwardRef;
