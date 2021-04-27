import * as React from 'react';

const SvgPromptFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 74.667c241.067 0 437.333 196.266 437.333 437.333S753.067 949.333 512 949.333 74.667 753.067 74.667 512 270.933 74.667 512 74.667zM512 416c-17.067 0-32 14.933-32 32v300.8c2.133 17.067 14.933 29.867 32 29.867s32-14.934 32-32v-300.8C541.867 428.8 529.067 416 512 416zm0-160c-23.467 0-42.667 19.2-42.667 42.667s19.2 42.666 42.667 42.666 42.667-19.2 42.667-42.666S535.467 256 512 256z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgPromptFilling);
export default ForwardRef;
