import * as React from 'react';

const SvgClose = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M556.8 512L832 236.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2 236.8 189.867c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8L467.2 512 189.867 787.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933 8.533 23.466 8.533S230.4 838.4 236.8 832L512 556.8 787.2 832c6.4 6.4 14.933 8.533 23.467 8.533s17.066-2.133 23.466-8.533c12.8-12.8 12.8-32 0-44.8L556.8 512z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgClose);
export default ForwardRef;
