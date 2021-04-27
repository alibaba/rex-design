import * as React from 'react';

const SvgDownload = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M896 672c-17.067 0-32 14.933-32 32v128c0 6.4-4.267 10.667-10.667 10.667H170.667c-6.4 0-10.667-4.267-10.667-10.667V704c0-17.067-14.933-32-32-32s-32 14.933-32 32v128c0 40.533 34.133 74.667 74.667 74.667h682.666C893.867 906.667 928 872.533 928 832V704c0-17.067-14.933-32-32-32zm-407.467 55.467c6.4 6.4 14.934 8.533 23.467 8.533s17.067-2.133 23.467-8.533L748.8 514.133c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L546.133 627.2V170.667c0-17.067-14.933-32-32-32S480 153.6 480 170.667V627.2L322.133 469.333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l211.2 213.334z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgDownload);
export default ForwardRef;
