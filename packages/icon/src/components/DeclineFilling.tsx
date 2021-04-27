import * as React from 'react';

const SvgDeclineFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M635.733 341.333c19.2 0 32 12.8 32 29.867V608h155.734c12.8 0 25.6 8.533 27.733 21.333 2.133 4.267 2.133 6.4 2.133 10.667 0 8.533-6.4 19.2-12.8 25.6L529.067 910.933c-12.8 8.534-27.734 8.534-40.534 0l-307.2-247.466c-8.533-8.534-12.8-21.334-8.533-34.134 2.133-12.8 14.933-21.333 27.733-21.333H352V371.2c0-19.2 12.8-29.867 34.133-29.867h249.6zm-6.4-128c17.067 0 32 14.934 32 32s-14.933 32-32 32H394.667c-17.067 0-32-14.933-32-32s14.933-32 32-32h234.666zm0-106.666c17.067 0 32 14.933 32 32s-14.933 32-32 32H394.667c-17.067 0-32-14.934-32-32s14.933-32 32-32h234.666z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgDeclineFilling);
export default ForwardRef;
