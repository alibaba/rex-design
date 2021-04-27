import * as React from 'react';

const SvgEmail = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M874.667 181.333H149.333c-40.533 0-74.666 34.134-74.666 74.667v512c0 40.533 34.133 74.667 74.666 74.667h725.334c40.533 0 74.666-34.134 74.666-74.667V256c0-40.533-34.133-74.667-74.666-74.667zm-725.334 64h725.334c6.4 0 10.666 4.267 10.666 10.667v25.6L512 516.267 138.667 281.6V256c0-6.4 4.266-10.667 10.666-10.667zm725.334 533.334H149.333c-6.4 0-10.666-4.267-10.666-10.667V356.267l356.266 224c4.267 4.266 10.667 4.266 17.067 4.266s12.8-2.133 17.067-4.266l356.266-224V768c0 6.4-4.266 10.667-10.666 10.667z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgEmail);
export default ForwardRef;
