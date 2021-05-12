import * as React from 'react';

const SvgDirectionUp = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M512.17 226.133a32 32 0 0131.851 28.928l.15 3.094V768a32 32 0 01-63.851 3.072l-.15-3.072V258.133a32 32 0 0132-32z" />
    <path d="M489.387 233.387a32 32 0 0142.816-2.219l2.432 2.197 256 256a32 32 0 01-42.838 47.467l-2.432-2.197L512 301.227 278.613 534.613a32 32 0 01-42.816 2.198l-2.432-2.198a32 32 0 01-2.197-42.837l2.197-2.432 256-256z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgDirectionUp);
export default ForwardRef;
