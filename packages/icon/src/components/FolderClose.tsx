import * as React from 'react';

const SvgFolderClose = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 266.667h-339.2c-4.266 0-6.4-2.134-8.533-4.267l-38.4-66.133C454.4 174.933 428.8 160 403.2 160H170.667C130.133 160 96 194.133 96 234.667v554.666C96 829.867 130.133 864 170.667 864h682.666C893.867 864 928 829.867 928 789.333v-448c0-40.533-34.133-74.666-74.667-74.666zM170.667 224H403.2c4.267 0 6.4 2.133 8.533 4.267l38.4 66.133c12.8 21.333 38.4 36.267 64 36.267h339.2c6.4 0 10.667 4.266 10.667 10.666V416H160V234.667c0-6.4 4.267-10.667 10.667-10.667zm682.666 576H170.667c-6.4 0-10.667-4.267-10.667-10.667V480h704v309.333c0 6.4-4.267 10.667-10.667 10.667z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgFolderClose);
export default ForwardRef;
