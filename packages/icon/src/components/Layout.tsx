import * as React from 'react';

const SvgLayout = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 96H170.667C130.133 96 96 130.133 96 170.667v682.666C96 893.867 130.133 928 170.667 928h682.666C893.867 928 928 893.867 928 853.333V170.667C928 130.133 893.867 96 853.333 96zm-682.666 64h682.666c6.4 0 10.667 4.267 10.667 10.667V384H160V170.667c0-6.4 4.267-10.667 10.667-10.667zM160 853.333V448h181.333v416H170.667c-6.4 0-10.667-4.267-10.667-10.667zM853.333 864h-448V448H864v405.333c0 6.4-4.267 10.667-10.667 10.667z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgLayout);
export default ForwardRef;
