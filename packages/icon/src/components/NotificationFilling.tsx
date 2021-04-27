import * as React from 'react';

const SvgNotificationFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M388.267 874.667c23.466 44.8 70.4 74.666 123.733 74.666s100.267-29.866 123.733-74.666H388.267zM885.333 780.8c-2.133-70.4-29.866-128-81.066-172.8L800 603.733V448c0-117.333-70.4-217.6-170.667-262.4C625.067 123.733 573.867 74.667 512 74.667S398.933 123.733 394.667 185.6C294.4 230.4 224 330.667 224 448v155.733L219.733 608c-53.333 46.933-81.066 108.8-81.066 181.333 0 17.067 14.933 32 32 32h682.666c17.067 0 32-14.933 32-32V780.8z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgNotificationFilling);
export default ForwardRef;
