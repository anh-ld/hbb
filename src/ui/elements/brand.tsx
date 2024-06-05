const Brand = ({ className = "" }) => {
  return (
    <svg
      width="294"
      height="300"
      viewBox="0 0 294 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <title>Logo Raw</title>
      <mask
        id="b3"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="294"
        height="300"
      >
        <path
          d="m110.871 217.606.186-20.406 38.491.107 29.715 3.187 2.228-4.43-23.447-19.14L0 14.157 14.126 0 172.17 162.767l18.591 24.007 4.394-2.206-2.787-30.174.354-39.037 20.121.055-.355 39.038-3.336 30.156 4.354 2.231 19.026-23.903 27.37-27.429 13.868 14.234-27.369 27.429-23.794 19.01 2.146 4.442 29.773-3.023 38.491.106-.185 20.406-38.492-.106-29.716-3.188-2.227 4.43 23.447 19.141 26.869 27.578-14.126 14.157-26.869-27.579-18.591-24.006-4.394 2.206 2.787 30.173-.354 39.038-20.121-.056.355-39.037 3.336-30.157-4.354-2.23-19.026 23.903-27.369 27.428-13.868-14.234 27.369-27.428 23.793-19.01-2.147-4.442-29.771 3.023-38.492-.107Z"
          fill="url(#a)"
        />
      </mask>
      <g mask="url(#b3)">
        <path fill="currentColor" d="M-7.981-8.839h306.349v322.76H-7.981z" />
      </g>
      <defs>
        <linearGradient id="a" x1="205.093" y1="208.37" x2="13.914" y2="10.295" gradientUnits="userSpaceOnUse">
          <stop offset=".391" stopColor="#1B1818" />
          <stop offset="1" stopColor="#1B1818" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Brand;
