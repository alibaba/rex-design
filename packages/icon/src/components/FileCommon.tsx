import * as React from 'react';

const SvgFileCommon = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M832 74.667H192c-17.067 0-32 14.933-32 32v765.866c0 12.8 4.267 23.467 12.8 34.134 8.533 10.666 21.333 17.066 36.267 19.2h6.4c12.8 0 23.466-4.267 34.133-12.8l264.533-213.334 264.534 213.334c8.533 8.533 21.333 12.8 34.133 12.8 29.867 0 53.333-23.467 53.333-53.334V106.667c-2.133-17.067-17.066-32-34.133-32zM800 851.2L531.2 633.6c-10.667-8.533-27.733-8.533-40.533 0L224 851.2V138.667h576V851.2zM341.333 341.333h320c17.067 0 32-14.933 32-32s-14.933-32-32-32h-320c-17.066 0-32 14.934-32 32s14.934 32 32 32zm0 170.667h213.334c17.066 0 32-14.933 32-32s-14.934-32-32-32H341.333c-17.066 0-32 14.933-32 32s14.934 32 32 32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgFileCommon);
export default ForwardRef;
