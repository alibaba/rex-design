import * as React from 'react';

const SvgDirectionRight = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M768 480.17a32 32 0 013.072 63.851l-3.072.15H256a32 32 0 01-3.072-63.851l3.072-.15h512z" />
    <path d="M489.387 233.387a32 32 0 0142.816-2.219l2.432 2.197 256 256a32 32 0 012.197 42.838l-2.197 2.432-256 256a32 32 0 01-47.467-42.838l2.197-2.432L722.773 512 489.387 278.613a32 32 0 01-2.198-42.816l2.198-2.432z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgDirectionRight);
export default ForwardRef;
