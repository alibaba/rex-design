import * as React from 'react';

const SvgUser = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm-224 736c0-123.734 100.267-224 224-224s224 100.266 224 224c-61.867 46.933-140.8 74.666-224 74.666S349.867 857.6 288 810.667zm128-384c0-53.334 42.667-96 96-96s96 42.666 96 96-42.667 96-96 96-96-42.667-96-96zM793.6 755.2c-19.2-96-85.333-174.933-174.933-211.2 32-29.867 51.2-70.4 51.2-117.333 0-87.467-72.534-160-160-160s-160 72.533-160 160c0 46.933 19.2 87.466 51.2 117.333-89.6 36.267-155.734 115.2-174.934 211.2C170.667 689.067 134.4 605.867 134.4 512c0-204.8 168.533-373.333 373.333-373.333S885.333 307.2 885.333 512c0 93.867-34.133 177.067-91.733 243.2z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgUser);
export default ForwardRef;