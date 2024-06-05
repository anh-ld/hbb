import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      screens: {
        xl: "1200px",
      },
      colors: {
        foundation: {
          cream: "#FFF8E7",
          dark: "#34282C",
          grey: "#C7C7C7",
        },
        green: {
          strong: "#064044",
          accent: "#118780",
          pastel: "#CFF1E4",
        },
        blue: {
          strong: "#234366",
          accent: "#3875B8",
          pastel: "#D3E9F4",
        },
        pink: {
          strong: "#5D2C4C",
          accent: "#E73B7C",
          pastel: "#FFDBE8",
        },
        orange: {
          strong: "#C44023",
          accent: "#FD8728",
          pastel: "#FFD5AE",
        },
        yellow: {
          strong: "#EF9E00",
          accent: "#FFBD37",
          pastel: "#F0E1BC",
        },
      },
      fontFamily: {
        grotesk: ["var(--font-grotesk)", "sans-serif"],
        epilogue: ["var(--font-epilogue)", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
