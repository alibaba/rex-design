import * as React from 'react';

const SvgElectronics = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M840.533 117.333H183.467c-59.734 0-108.8 49.067-108.8 108.8v379.734c0 59.733 49.066 108.8 108.8 108.8H416v115.2h-74.667c-17.066 0-32 14.933-32 32s14.934 32 32 32h341.334c17.066 0 32-14.934 32-32s-14.934-32-32-32H608v-115.2h232.533c59.734 0 108.8-49.067 108.8-108.8V226.133c0-59.733-49.066-108.8-108.8-108.8zM544 829.867h-64v-115.2h64v115.2zm341.333-224c0 25.6-19.2 44.8-44.8 44.8H183.467c-25.6 0-44.8-19.2-44.8-44.8V226.133c0-25.6 19.2-44.8 44.8-44.8h657.066c25.6 0 44.8 19.2 44.8 44.8v379.734z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgElectronics);
export default ForwardRef;
