import * as React from 'react';

const SvgArrowLeftCircle = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm0 810.666C307.2 885.333 138.667 716.8 138.667 512S307.2 138.667 512 138.667 885.333 307.2 885.333 512 716.8 885.333 512 885.333zM682.667 480H405.333L524.8 352c12.8-12.8 10.667-34.133-2.133-44.8s-34.134-10.667-44.8 2.133L307.2 490.667c-10.667 12.8-10.667 32 0 44.8L477.867 716.8c6.4 6.4 14.933 10.667 23.466 10.667 8.534 0 14.934-2.134 21.334-8.534 12.8-12.8 12.8-32 2.133-44.8l-119.467-128h277.334c17.066 0 32-14.933 32-32S699.733 480 682.667 480z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgArrowLeftCircle);
export default ForwardRef;
