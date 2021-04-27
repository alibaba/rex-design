import * as React from 'react';

const SvgColumnHorizontal = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M874.667 117.333H149.333c-40.533 0-74.666 34.134-74.666 74.667v640c0 40.533 34.133 74.667 74.666 74.667h725.334c40.533 0 74.666-34.134 74.666-74.667V192c0-40.533-34.133-74.667-74.666-74.667zM138.667 832V192c0-6.4 4.266-10.667 10.666-10.667H480v661.334H149.333c-6.4 0-10.666-4.267-10.666-10.667zm746.666 0c0 6.4-4.266 10.667-10.666 10.667H544V181.333h330.667c6.4 0 10.666 4.267 10.666 10.667v640z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgColumnHorizontal);
export default ForwardRef;
