import * as React from 'react';

const SvgPictureFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 96C893.867 96 928 130.133 928 170.667v682.666C928 893.867 893.867 928 853.333 928H170.667C130.133 928 96 893.867 96 853.333V170.667C96 130.133 130.133 96 170.667 96h682.666zM746.667 469.333c-10.667-12.8-32-14.933-44.8-2.133L320 808.533l-2.133 2.134c-19.2 19.2-4.267 53.333 23.466 53.333h492.8C851.2 861.867 864 849.067 864 832V635.733c0-6.4-2.133-10.666-6.4-14.933L748.8 471.467l-2.133-2.134zM352 266.667c-46.933 0-85.333 38.4-85.333 85.333s38.4 85.333 85.333 85.333 85.333-38.4 85.333-85.333-38.4-85.333-85.333-85.333z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgPictureFilling);
export default ForwardRef;
