import * as React from 'react';

const SvgCheckItemFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 96C893.867 96 928 130.133 928 170.667v682.666C928 893.867 893.867 928 853.333 928H170.667C130.133 928 96 893.867 96 853.333V170.667C96 130.133 130.133 96 170.667 96h682.666zM748.8 384c-12.8-12.8-32-12.8-44.8 0L460.8 616.533 343.467 490.667l-2.134-2.134c-12.8-10.666-29.866-10.666-42.666 0-12.8 12.8-12.8 32-2.134 44.8l140.8 149.334 2.134 2.133c12.8 10.667 32 10.667 42.666-2.133l264.534-256 2.133-2.134c10.667-10.666 10.667-29.866 0-40.533z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgCheckItemFilling);
export default ForwardRef;
