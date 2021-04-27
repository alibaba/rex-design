import * as React from 'react';

const SvgSuccessFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm238.933 349.866l-2.133 2.134L471.467 704c-10.667 10.667-29.867 12.8-42.667 2.133L426.667 704 277.333 554.667c-12.8-12.8-12.8-32 0-44.8C288 499.2 307.2 497.067 320 507.733l2.133 2.134L448 635.733l253.867-253.866c10.666-10.667 29.866-12.8 42.666-2.134l2.134 2.134c12.8 12.8 12.8 32 4.266 42.666z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgSuccessFilling);
export default ForwardRef;
