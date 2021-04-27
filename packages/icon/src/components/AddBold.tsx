import * as React from 'react';

const SvgAddBold = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M924.634 463.455H560.545V99.365c0-26.699-21.845-48.544-48.545-48.544s-48.545 21.845-48.545 48.545v364.089H99.365c-26.699 0-48.544 21.845-48.544 48.545s21.845 48.545 48.545 48.545h364.089v364.09c0 26.699 21.845 48.544 48.545 48.544s48.545-21.845 48.545-48.545V560.545h364.09c26.699 0 48.544-21.845 48.544-48.545s-21.845-48.545-48.545-48.545z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgAddBold);
export default ForwardRef;
