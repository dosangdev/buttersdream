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
      keyframes: {
        coinAppear: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        coinDisappear: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        coinRotate: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(720deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        moveBackground: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "100% 0%" },
        },
        initialBackgroundMove: {
          "0%": { transform: "translateY(100%)" },
          "50%": { transform: "translateY(-20%)" },
          "100%": { transform: "translateY(0)" },
        },
        butterDrop: {
          "0%": { transform: "translateY(-100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        butterReturn: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-4px)" },
        },
        speechBubbleAppear: {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        coinAppear: "coinAppear 0.5s ease-out forwards",
        coinDisappear: "coinDisappear 0.5s ease-in forwards",
        coinRotate: "coinRotate 2s ease-in-out",
        fadeIn: "fadeIn 0.5s ease-out forwards",
        moveBackground: "moveBackground 130s linear infinite",
        initialBackgroundMove: "initialBackgroundMove 3.5s ease-out forwards",
        butterDrop: "butterDrop 1s ease-out forwards",
        butterReturn: "butterReturn 1s ease-out forwards",
        speechBubbleAppear: "speechBubbleAppear 0.5s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
