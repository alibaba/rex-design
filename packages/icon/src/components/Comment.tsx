import * as React from 'react';

const SvgComment = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 138.667H170.667C130.133 138.667 96 172.8 96 213.333v512C96 765.867 130.133 800 170.667 800h151.466v117.333c0 12.8 8.534 25.6 19.2 29.867 4.267 2.133 8.534 2.133 12.8 2.133 8.534 0 17.067-4.266 23.467-10.666L514.133 800h339.2C893.867 800 928 765.867 928 725.333v-512c0-40.533-34.133-74.666-74.667-74.666zM864 725.333c0 6.4-4.267 10.667-10.667 10.667h-352c-8.533 0-17.066 4.267-23.466 10.667l-89.6 93.866V768c0-17.067-14.934-32-32-32h-185.6c-6.4 0-10.667-4.267-10.667-10.667v-512c0-6.4 4.267-10.666 10.667-10.666h682.666c6.4 0 10.667 4.266 10.667 10.666v512zM512 490.667H298.667c-17.067 0-32 14.933-32 32s14.933 32 32 32H512c17.067 0 32-14.934 32-32s-14.933-32-32-32zm160-149.334H298.667c-17.067 0-32 14.934-32 32s14.933 32 32 32H672c17.067 0 32-14.933 32-32s-14.933-32-32-32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgComment);
export default ForwardRef;