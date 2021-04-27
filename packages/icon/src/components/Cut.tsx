import * as React from 'react';

const SvgCut = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M917.333 202.667h-96v-96c0-17.067-14.933-32-32-32s-32 14.933-32 32v96h-480c-40.533 0-74.666 34.133-74.666 74.666v480h-96c-17.067 0-32 14.934-32 32s14.933 32 32 32h96v96c0 17.067 14.933 32 32 32s32-14.933 32-32v-96h480c40.533 0 74.666-34.133 74.666-74.666v-480h96c17.067 0 32-14.934 32-32s-14.933-32-32-32zm-160 544c0 6.4-4.266 10.666-10.666 10.666h-480v-480c0-6.4 4.266-10.666 10.666-10.666h480v480z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgCut);
export default ForwardRef;
