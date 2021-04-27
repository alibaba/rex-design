import * as React from 'react';

const SvgRiseFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M629.333 853.333H394.667c-17.067 0-32 14.934-32 32s14.933 32 32 32h234.666c17.067 0 32-14.933 32-32s-14.933-32-32-32zm213.334-492.8l-307.2-247.466c-12.8-8.534-27.734-8.534-40.534 0L183.467 360.533c-6.4 6.4-12.8 14.934-12.8 23.467 0 2.133 0 6.4 2.133 8.533 2.133 12.8 14.933 21.334 27.733 21.334h155.734v236.8c0 19.2 12.8 29.866 32 29.866h249.6c21.333 0 34.133-12.8 34.133-29.866V416h151.467c12.8 0 25.6-8.533 27.733-21.333s0-25.6-8.533-34.134zM629.333 746.667H394.667c-17.067 0-32 14.933-32 32s14.933 32 32 32h234.666c17.067 0 32-14.934 32-32s-14.933-32-32-32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgRiseFilling);
export default ForwardRef;
