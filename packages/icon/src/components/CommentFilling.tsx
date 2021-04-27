import * as React from 'react';

const SvgCommentFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 138.667H170.667C130.133 138.667 96 172.8 96 213.333V729.6c2.133 38.4 34.133 70.4 74.667 70.4h151.466v119.467c2.134 27.733 36.267 38.4 55.467 19.2L514.133 800h339.2C893.867 800 928 765.867 928 725.333v-512c0-40.533-34.133-74.666-74.667-74.666zm-339.2 416H298.667c-17.067 0-32-14.934-32-32s12.8-29.867 29.866-32H512c17.067 0 32 14.933 32 32s-12.8 29.866-29.867 32zm160-149.334H298.667c-17.067 0-32-14.933-32-32s12.8-29.866 29.866-32H672c17.067 0 32 14.934 32 32s-12.8 29.867-29.867 32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgCommentFilling);
export default ForwardRef;
