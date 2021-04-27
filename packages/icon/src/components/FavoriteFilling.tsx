import * as React from 'react';

const SvgFavoriteFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M465.067 89.6L360.533 302.933l-234.666 34.134C115.2 339.2 104.533 343.467 96 352l-2.133 2.133C76.8 375.467 76.8 407.467 98.133 426.667l170.667 166.4-40.533 234.666c-2.134 10.667 0 23.467 6.4 34.134L236.8 864c14.933 23.467 44.8 32 70.4 19.2l211.2-110.933L729.6 883.2c10.667 6.4 21.333 6.4 34.133 6.4H768c27.733-6.4 44.8-32 40.533-61.867L768 593.067l170.667-166.4c8.533-8.534 12.8-19.2 14.933-29.867v-4.267c2.133-27.733-17.067-53.333-44.8-57.6L674.133 300.8 569.6 87.467C554.667 78.933 546.133 70.4 535.467 64c-25.6-12.8-57.6-2.133-70.4 25.6z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgFavoriteFilling);
export default ForwardRef;
