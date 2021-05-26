import * as React from 'react';

const SvgFunction = (props: React.SVGProps<SVGSVGElement>, svgRef?: React.Ref<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    fill="currentColor"
    viewBox="0 0 1024 1024"
    xmlns="http://www.w3.org/2000/svg"
    ref={svgRef}
    {...props}
  >
    <path d="M510.665 801.536c13.038 0 22.254-7.296 22.254-20.334 0-5.76-1.536-8.832-5.76-16.896-46.812-72.503-73.29-155.757-73.29-245.924 0-87.095 24.942-174.19 73.29-247.077 4.206-8.046 5.76-11.118 5.76-16.878 0-12.288-9.216-20.333-22.254-20.333-12.672 0-23.04 5.741-35.291 22.637-57.564 73.271-86.711 164.572-86.711 261.267s27.995 185.307 86.692 260.9c12.288 16.878 22.638 22.638 35.292 22.638zm391.717 0c12.653 0 22.637-5.76 34.925-22.638 58.68-75.593 86.693-164.205 86.693-260.9 0-96.677-28.782-187.977-86.71-261.267-12.27-16.896-22.255-22.637-34.908-22.637-13.038 0-22.254 8.045-22.254 20.333 0 5.76 1.152 8.814 5.376 16.878 48.731 72.887 73.655 160 73.655 247.077 0 90.148-26.844 173.421-73.271 245.943-4.608 8.045-5.76 11.117-5.76 16.877 0 12.27 9.216 20.334 22.254 20.334zm-850.579-.768c75.191 0 110.099-32.238 128.128-118.565l43.74-209.865h69.449c22.254 0 36.443-11.885 36.443-31.085 0-16.476-10.733-26.844-28.379-26.844h-64.841l10.734-52.169c9.984-48.731 25.325-68.681 67.913-68.681 6.144 0 12.27-.384 16.493-.768 19.2-1.92 27.612-10.752 27.612-27.246 0-21.486-18.012-31.086-54.857-31.086-73.271 0-110.867 36.462-127.744 118.565l-13.056 61.385h-47.58c-22.235 0-36.827 11.886-36.827 31.086 0 16.494 11.136 26.843 28.782 26.843h43.337l-42.167 200.668c-10.789 50.249-26.514 68.663-67.548 68.663-5.376 0-10.368.384-14.19.768C9.583 744.74 0 754.322 0 770.45c0 20.718 17.646 30.318 51.803 30.318zm539.045-100.919c12.654 0 21.102-4.206 30.683-18.03l84.023-119.698h1.536l85.943 121.618c9.6 13.44 18.798 16.11 28.014 16.11 18.414 0 30.702-13.038 30.702-28.763 0-7.296-2.304-14.19-7.315-20.718L746.24 516.846l98.194-131.603c5.01-6.51 7.315-13.421 7.315-21.485 0-16.494-13.824-27.996-29.166-27.996-13.806 0-21.87 6.912-29.166 18.03l-80.95 118.546h-1.92l-81.336-118.93c-7.296-11.136-16.493-17.646-31.085-17.646-17.646 0-31.086 14.19-31.086 29.532 0 11.136 3.09 18.048 8.466 24.557l93.22 125.075-98.98 136.96c-5.76 7.314-6.912 13.824-6.912 21.504 0 14.957 12.672 26.46 28.014 26.46z" />
  </svg>
);

const ForwardRef = React.forwardRef(SvgFunction);
export default ForwardRef;