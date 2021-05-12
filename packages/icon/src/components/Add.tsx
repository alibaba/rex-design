import * as React from 'react';

const SvgAdd = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
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
    <path d="M513.344 181.333a32 32 0 0131.808 28.95l.15 3.093-.79 597.333a32 32 0 01-63.85 2.987l-.15-3.072.79-597.333a32 32 0 0132.042-31.958z" />
    <path d="M810.667 480a32 32 0 013.072 63.85l-3.072.15H213.333a32 32 0 01-3.072-63.85l3.072-.15h597.334z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgAdd);
export default ForwardRef;
