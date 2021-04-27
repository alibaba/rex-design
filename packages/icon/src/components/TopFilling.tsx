import * as React from 'react';

const SvgTopFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M535.467 241.067c-12.8-8.534-27.734-8.534-40.534 0L183.467 488.533c-6.4 6.4-12.8 14.934-12.8 23.467 0 2.133 0 6.4 2.133 8.533 2.133 12.8 14.933 21.334 27.733 21.334h155.734V864c0 19.2 12.8 29.867 32 29.867h249.6C659.2 893.867 672 881.067 672 864V544h151.467c12.8 0 25.6-8.533 27.733-21.333s0-25.6-8.533-34.134l-307.2-247.466zM864 96H160c-17.067 0-32 14.933-32 32s14.933 32 32 32h704c17.067 0 32-14.933 32-32s-14.933-32-32-32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgTopFilling);
export default ForwardRef;
