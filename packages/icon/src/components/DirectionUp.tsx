import * as React from 'react';

const SvgDirectionUp = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M896 467.2L533.333 125.867c-2.133-2.134-6.4-4.267-8.533-6.4-4.267-2.134-6.4-2.134-10.667-2.134s-8.533 0-10.666 2.134c-4.267 2.133-6.4 4.266-8.534 6.4L132.267 467.2c-12.8 12.8-12.8 32-2.134 44.8 12.8 12.8 32 12.8 44.8 2.133L484.267 224v650.667c0 17.066 14.933 32 32 32s32-14.934 32-32V224l305.066 290.133c6.4 6.4 14.934 8.534 21.334 8.534 8.533 0 17.066-4.267 23.466-10.667 12.8-12.8 10.667-32-2.133-44.8z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgDirectionUp);
export default ForwardRef;
