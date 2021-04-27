import * as React from 'react';

const SvgLayoutFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M928 853.333C928 893.867 893.867 928 853.333 928h-448V437.333H928v416zm-586.667-416V928H170.667C130.133 928 96 893.867 96 853.333v-416h245.333zM96 170.667C96 130.133 130.133 96 170.667 96h682.666C893.867 96 928 130.133 928 170.667v202.666H96V170.667z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgLayoutFilling);
export default ForwardRef;
