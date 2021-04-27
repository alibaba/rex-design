import * as React from 'react';

const SvgHomeFilling = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M925.867 396.8l-32-27.733c-78.934-66.134-185.6-157.867-320-273.067l-12.8-10.667c-27.734-23.466-70.4-23.466-98.134 0L311.467 215.467c-85.334 72.533-155.734 132.266-211.2 179.2-17.067 12.8-25.6 32-25.6 53.333v4.267c2.133 38.4 34.133 66.133 70.4 66.133H192v358.4c0 29.867 23.467 53.333 53.333 53.333H409.6c27.733-2.133 49.067-25.6 49.067-53.333V691.2c0-12.8 8.533-21.333 21.333-21.333h64c12.8 0 21.333 8.533 21.333 21.333v185.6c0 29.867 23.467 53.333 53.334 53.333h164.266C810.667 928 832 904.533 832 876.8V518.4h46.933c38.4 0 70.4-32 70.4-70.4 0-21.333-8.533-38.4-23.466-51.2z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgHomeFilling);
export default ForwardRef;
