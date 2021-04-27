import * as React from 'react';

const SvgWorkFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M885.333 256h-160v-57.6c-2.133-40.533-36.266-70.4-76.8-70.4H349.867c-40.534 2.133-72.534 34.133-72.534 74.667V256H138.667C98.133 256 64 290.133 64 330.667V448h896V330.667C960 290.133 925.867 256 885.333 256zm-544-53.333c2.134-6.4 6.4-10.667 12.8-10.667h296.534c6.4 0 10.666 6.4 10.666 10.667V256h-320v-53.333zM672 576c0 40.533-34.133 74.667-74.667 74.667H426.667C386.133 650.667 352 616.533 352 576v-64H64v309.333C64 861.867 98.133 896 138.667 896h746.666C925.867 896 960 861.867 960 821.333V512H672v64z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgWorkFilling);
export default ForwardRef;
