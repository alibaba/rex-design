import * as React from 'react';

const SvgCheckItem = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 96H170.667C130.133 96 96 130.133 96 170.667v682.666C96 893.867 130.133 928 170.667 928h682.666C893.867 928 928 893.867 928 853.333V170.667C928 130.133 893.867 96 853.333 96zM864 853.333c0 6.4-4.267 10.667-10.667 10.667H170.667c-6.4 0-10.667-4.267-10.667-10.667V170.667c0-6.4 4.267-10.667 10.667-10.667h682.666c6.4 0 10.667 4.267 10.667 10.667v682.666zM704 381.867L460.8 616.533 343.467 490.667c-12.8-12.8-32-12.8-44.8-2.134-12.8 12.8-12.8 32-2.134 44.8l140.8 149.334c6.4 6.4 14.934 10.666 23.467 10.666s17.067-4.266 21.333-8.533l264.534-256c12.8-12.8 12.8-32 0-44.8C736 371.2 716.8 369.067 704 381.867z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgCheckItem);
export default ForwardRef;
