import * as React from 'react';

const SvgComplete = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M874.667 501.333c-17.067 0-32 14.934-32 32V832c0 6.4-4.267 10.667-10.667 10.667H192c-6.4 0-10.667-4.267-10.667-10.667V192c0-6.4 4.267-10.667 10.667-10.667h469.333c17.067 0 32-14.933 32-32s-14.933-32-32-32H192c-40.533 0-74.667 34.134-74.667 74.667v640c0 40.533 34.134 74.667 74.667 74.667h640c40.533 0 74.667-34.134 74.667-74.667V533.333c0-17.066-14.934-32-32-32zm66.133-332.8c-12.8-12.8-32-12.8-44.8 0l-390.4 384-106.667-106.666c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l130.134 128c6.4 6.4 14.933 8.533 23.466 8.533s17.067-2.133 23.467-8.533l411.733-405.334c8.534-10.666 10.667-32-2.133-44.8z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgComplete);
export default ForwardRef;
