import * as React from 'react';

const SvgSecurity = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M814.933 179.2L529.067 78.933c-10.667-4.266-23.467-4.266-34.134 0L209.067 179.2C179.2 189.867 160 217.6 160 249.6v347.733c0 194.134 157.867 352 352 352s352-157.866 352-352V249.6c0-32-19.2-61.867-49.067-70.4zM800 597.333c0 157.867-130.133 288-288 288s-288-130.133-288-288V249.6c0-4.267 2.133-8.533 6.4-10.667L512 140.8l281.6 98.133c4.267 2.134 6.4 6.4 6.4 10.667v347.733zM659.2 403.2l-192 194.133-85.333-68.266c-12.8-10.667-34.134-8.534-44.8 4.266-10.667 12.8-8.534 34.134 4.266 44.8L448 663.467c6.4 4.266 12.8 6.4 19.2 6.4 8.533 0 17.067-2.134 23.467-8.534L704 448c12.8-12.8 12.8-32 0-44.8-10.667-10.667-32-10.667-44.8 0z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgSecurity);
export default ForwardRef;
