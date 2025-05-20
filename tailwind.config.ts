import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jjibba: ["JJIBBABBA", "sans-serif"],
        "jjibba-bold": ["JJIBBABBA-Bold", "sans-serif"],
      },
      screens: {
        md: "28rem",
        sm: "24rem",
      },
      colors: {
        background: "#ffdfec",
        foreground: "#ffffff",
        primary: "#FFF9CC",
        secondary: "#757575",
      },
      fontSize: {
        xl: "16px",
        lg: "15px",
        md: "14px",
        base: "12px",
        sm: "11px",
        xs: "10px",
      },
      fontWeight: {
        normal: "400",
        bold: "700",
      },
    },
  },
  plugins: [],
};

export default config;
