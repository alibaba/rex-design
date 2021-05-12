import * as React from 'react';

const SvgMinus = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M0 0h1024v1024H0z" fillOpacity={0.01} />
    <path d="M821.333 480a32 32 0 013.072 63.85l-3.072.15H224a32 32 0 01-3.072-63.85L224 480h597.333z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgMinus);
export default ForwardRef;
