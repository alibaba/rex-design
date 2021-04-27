import * as React from 'react';

const SvgBack = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 245.333h-608l93.867-93.866c12.8-12.8 12.8-34.134 0-46.934-12.8-12.8-34.133-12.8-46.933 0L147.2 249.6c-12.8 12.8-12.8 34.133 0 46.933L292.267 441.6c6.4 6.4 14.933 10.667 23.466 10.667S332.8 448 339.2 441.6c12.8-12.8 12.8-34.133 0-46.933l-83.2-83.2h597.333c6.4 0 10.667 4.266 10.667 10.666V748.8c0 6.4-4.267 10.667-10.667 10.667H170.667c-17.067 0-32 14.933-32 32s14.933 32 32 32h682.666c40.534 0 74.667-34.134 74.667-74.667V320c0-40.533-34.133-74.667-74.667-74.667z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgBack);
export default ForwardRef;
