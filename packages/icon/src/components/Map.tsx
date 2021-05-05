import * as React from 'react';

const SvgMap = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 74.667c-194.133 0-352 160-352 354.133 0 264.533 320 484.267 334.933 492.8 6.4 4.267 10.667 6.4 17.067 6.4s12.8-2.133 17.067-6.4C541.867 913.067 864 693.333 864 428.8c0-194.133-157.867-354.133-352-354.133zm0 782.933c-66.133-49.067-288-228.267-288-426.667 0-160 130.133-290.133 288-290.133s288 130.133 288 290.133c0 196.267-221.867 377.6-288 426.667zm0-548.267c-76.8 0-138.667 61.867-138.667 138.667S435.2 586.667 512 586.667 650.667 524.8 650.667 448 588.8 309.333 512 309.333zm0 213.334c-40.533 0-74.667-34.134-74.667-74.667s34.134-74.667 74.667-74.667 74.667 34.134 74.667 74.667-34.134 74.667-74.667 74.667z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgMap);
export default ForwardRef;