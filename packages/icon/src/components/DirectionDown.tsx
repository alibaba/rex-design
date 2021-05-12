import * as React from 'react';

const SvgDirectionDown = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M512.17 224a32 32 0 0131.851 28.928l.15 3.072v509.867a32 32 0 01-63.851 3.072l-.15-3.072V256a32 32 0 0132-32z" />
    <path d="M745.387 489.387a32 32 0 0147.445 42.816l-2.197 2.432-256 256a32 32 0 01-42.838 2.197l-2.432-2.197-256-256a32 32 0 0142.838-47.467l2.432 2.197L512 722.773l233.387-233.386z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgDirectionDown);
export default ForwardRef;
