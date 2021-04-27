import * as React from 'react';

const SvgCloseBold = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M584.494 512l326.224-326.224c20.712-20.712 20.712-51.781 0-72.494-20.713-20.712-51.782-20.712-72.494 0L512 439.506 185.776 113.282c-20.712-20.712-51.781-20.712-72.494 0-20.712 20.713-20.712 51.782 0 72.494L439.506 512 113.282 838.224c-20.712 20.712-20.712 51.781 0 72.494 10.357 10.356 23.302 15.534 36.247 15.534s25.891-5.178 36.247-15.534L512 584.494l326.224 326.224c10.356 10.356 23.301 15.534 36.247 15.534s25.89-5.178 36.247-15.534c20.712-20.713 20.712-51.782 0-72.494L584.494 512z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgCloseBold);
export default ForwardRef;
