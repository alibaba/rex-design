import * as React from 'react';

const SvgSave = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M906.667 298.667L725.333 117.333C710.4 102.4 693.333 96 672 96H170.667C130.133 96 96 130.133 96 170.667v682.666C96 893.867 130.133 928 170.667 928h682.666C893.867 928 928 893.867 928 853.333V349.867c0-19.2-8.533-38.4-21.333-51.2zM652.8 864H371.2V648.533h281.6V864zM864 853.333c0 6.4-4.267 10.667-10.667 10.667h-140.8V618.667c0-17.067-12.8-29.867-29.866-29.867H341.333c-17.066 0-29.866 12.8-29.866 29.867V864h-140.8c-6.4 0-10.667-4.267-10.667-10.667V170.667c0-6.4 4.267-10.667 10.667-10.667h140.8v160c0 17.067 12.8 29.867 29.866 29.867h277.334c17.066 0 29.866-12.8 29.866-29.867s-12.8-29.867-29.866-29.867H371.2V160h302.933c2.134 0 6.4 2.133 8.534 2.133l179.2 179.2C864 343.467 864 345.6 864 349.867v503.466z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgSave);
export default ForwardRef;