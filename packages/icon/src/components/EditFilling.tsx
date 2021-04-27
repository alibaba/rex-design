import * as React from 'react';

const SvgEditFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M603.733 181.333l-217.6 219.734c-6.4 6.4-10.666 14.933-12.8 25.6l-51.2 211.2c-8.533 38.4 23.467 74.666 61.867 64l200.533-53.334c8.534-2.133 17.067-6.4 23.467-14.933l234.667-236.8v456.533c0 40.534-32 72.534-70.4 74.667h-601.6C130.133 928 96 893.867 96 853.333V256c0-40.533 34.133-74.667 74.667-74.667h433.066zm134.4-34.133L435.2 448c-4.267 4.267-6.4 8.533-8.533 14.933l-32 125.867c-6.4 23.467 14.933 44.8 38.4 38.4l128-29.867c6.4-2.133 10.666-4.266 14.933-8.533l300.8-302.933c38.4-38.4 38.4-102.4 0-140.8s-100.267-38.4-138.667 2.133z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgEditFilling);
export default ForwardRef;
