import * as React from 'react';

const SvgDirectionDown = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M898.133 512c-12.8-12.8-32-12.8-44.8-2.133L544 800V149.333c0-17.066-14.933-32-32-32s-32 14.934-32 32V800L170.667 509.867c-12.8-12.8-34.134-10.667-44.8 2.133-12.8 12.8-10.667 34.133 2.133 44.8l362.667 341.333c2.133 2.134 6.4 4.267 8.533 6.4 4.267 2.134 6.4 2.134 10.667 2.134s8.533 0 10.666-2.134c4.267-2.133 6.4-4.266 8.534-6.4L891.733 556.8c17.067-12.8 19.2-32 6.4-44.8z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgDirectionDown);
export default ForwardRef;
