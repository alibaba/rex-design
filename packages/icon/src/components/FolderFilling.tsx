import * as React from 'react';

const SvgFolderFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M403.2 160c25.6 0 51.2 12.8 64 36.267l38.4 66.133c2.133 4.267 6.4 4.267 8.533 4.267h339.2c40.534 0 74.667 34.133 74.667 74.666v448C928 829.867 893.867 864 853.333 864H170.667C130.133 864 96 829.867 96 789.333V234.667C96 194.133 130.133 160 170.667 160H403.2zm87.467 256h-236.8C236.8 418.133 224 430.933 224 448s14.933 32 32 32h236.8c17.067-2.133 29.867-14.933 29.867-32s-14.934-32-32-32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgFolderFilling);
export default ForwardRef;
