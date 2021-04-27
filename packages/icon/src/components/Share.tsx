import * as React from 'react';

const SvgShare = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M874.667 544c-17.067 0-32 14.933-32 32v256c0 6.4-4.267 10.667-10.667 10.667H192c-6.4 0-10.667-4.267-10.667-10.667V192c0-6.4 4.267-10.667 10.667-10.667h256c17.067 0 32-14.933 32-32s-14.933-32-32-32H192c-40.533 0-74.667 34.134-74.667 74.667v640c0 40.533 34.134 74.667 74.667 74.667h640c40.533 0 74.667-34.134 74.667-74.667V576c0-17.067-14.934-32-32-32zm0-426.667H640c-17.067 0-32 14.934-32 32s14.933 32 32 32h157.867l-288 285.867c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933 8.533 23.466 8.533S550.4 518.4 556.8 512l285.867-285.867V384c0 17.067 14.933 32 32 32s32-14.933 32-32V149.333c0-17.066-14.934-32-32-32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgShare);
export default ForwardRef;
