import * as React from 'react';

const SvgNavigation = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M834.133 213.333c-6.4-12.8-17.066-23.466-29.866-27.733-12.8-4.267-27.734-4.267-40.534 2.133l-657.066 313.6c-14.934 6.4-25.6 21.334-29.867 36.267-6.4 27.733 12.8 57.6 40.533 64l249.6 53.333 53.334 249.6C424.533 921.6 435.2 934.4 450.133 940.8c6.4 4.267 14.934 4.267 23.467 4.267 19.2 0 38.4-10.667 49.067-29.867l313.6-657.067c6.4-12.8 6.4-29.866-2.134-44.8zM477.867 861.867l-51.2-238.934c-2.134-12.8-12.8-21.333-23.467-23.466l-241.067-53.334 601.6-288-285.866 603.734z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgNavigation);
export default ForwardRef;
