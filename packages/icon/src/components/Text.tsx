import * as React from 'react';

const SvgText = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M853.333 138.667H170.667c-17.067 0-32 14.933-32 32v128c0 17.066 14.933 32 32 32s32-14.934 32-32v-96H480v618.666h-96c-17.067 0-32 14.934-32 32s14.933 32 32 32h256c17.067 0 32-14.933 32-32s-14.933-32-32-32h-96V202.667h277.333v96c0 17.066 14.934 32 32 32s32-14.934 32-32v-128c0-17.067-14.933-32-32-32z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgText);
export default ForwardRef;
