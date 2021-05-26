import * as React from 'react';

const SvgCapsLock = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 96H170.667C130.133 96 96 130.133 96 170.667v682.666C96 893.867 130.133 928 170.667 928h682.666C893.867 928 928 893.867 928 853.333V170.667C928 130.133 893.867 96 853.333 96zM864 853.333c0 6.4-4.267 10.667-10.667 10.667H170.667c-6.4 0-10.667-4.267-10.667-10.667V170.667c0-6.4 4.267-10.667 10.667-10.667h682.666c6.4 0 10.667 4.267 10.667 10.667v682.666zM544 298.667c-19.2-12.8-42.667-12.8-61.867 0l-185.6 145.066L294.4 448c-6.4 6.4-17.067 19.2-17.067 38.4 0 8.533 2.134 14.933 4.267 21.333 8.533 17.067 25.6 29.867 44.8 29.867h59.733v172.8c0 27.733 21.334 51.2 51.2 51.2h147.2c29.867 0 53.334-21.333 53.334-51.2V537.6h57.6c21.333 0 42.666-14.933 46.933-36.267 4.267-19.2 0-38.4-14.933-51.2L544 298.667zm29.867 172.8v221.866h-121.6V471.467h-85.334L512 356.267l145.067 115.2h-83.2z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgCapsLock);
export default ForwardRef;