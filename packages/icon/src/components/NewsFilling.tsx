import * as React from 'react';

const SvgNewsFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 516.267l388.267-245.334 49.066-32c-6.4-34.133-36.266-59.733-72.533-59.733H149.333c-36.266 0-66.133 25.6-72.533 57.6l46.933 32L512 516.267zm437.333-200.534L934.4 326.4l-405.333 256c-8.534 6.4-21.334 6.4-32 2.133l-2.134-2.133L89.6 326.4l-14.933-8.533v452.266c0 40.534 34.133 74.667 74.666 74.667h725.334c40.533 0 74.666-34.133 74.666-74.667v-454.4z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgNewsFilling);
export default ForwardRef;
