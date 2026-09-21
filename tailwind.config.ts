import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#E31837",
        "primary-dark": "#C41230",
        secondary: "#4A5568",
        dark: "#1A202C",
        light: "#F7FAFC",
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)"],
        opensans: ["var(--font-opensans)"],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config; 