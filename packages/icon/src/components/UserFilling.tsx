import * as React from 'react';

const SvgUserFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M512 74.667C270.933 74.667 74.667 270.933 74.667 512S270.933 949.333 512 949.333 949.333 753.067 949.333 512 753.067 74.667 512 74.667zm0 160c70.4 0 128 57.6 128 128s-57.6 128-128 128-128-57.6-128-128 57.6-128 128-128zM748.8 742.4c-23.467 32-117.333 100.267-236.8 100.267S298.667 774.4 275.2 742.4c-8.533-10.667-10.667-21.333-8.533-32C296.533 599.467 396.8 522.667 512 522.667s215.467 76.8 245.333 187.733c2.134 10.667 0 21.333-8.533 32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgUserFilling);
export default ForwardRef;
