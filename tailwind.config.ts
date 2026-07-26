import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#faf8f5",
          100: "#f5f0eb",
          200: "#ede5da",
          300: "#ddd0bf",
          400: "#c9b69e",
          500: "#b89e82",
          600: "#aa8b6d",
          700: "#8e735b",
          800: "#745e4c",
          900: "#5f4e3f",
        },
        violet: {
          50: "#f2f0ff",
          100: "#e4e0ff",
          200: "#c9c2ff",
          300: "#a99cff",
          400: "#8970ff",
          500: "#6d4aff",
          600: "#5a30e0",
          700: "#4a26bd",
          800: "#3d2099",
          900: "#341d7d",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "gentle-pulse": "gentle-pulse 4s ease-in-out infinite",
        grain: "grain 0.5s steps(4) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "gentle-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
        grain: {
          "0%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -5%)" },
          "20%": { transform: "translate(-10%, 5%)" },
          "30%": { transform: "translate(5%, -10%)" },
          "40%": { transform: "translate(-5%, 15%)" },
          "50%": { transform: "translate(-10%, 5%)" },
          "60%": { transform: "translate(15%, 0)" },
          "70%": { transform: "translate(0, 10%)" },
          "80%": { transform: "translate(-15%, 0)" },
          "90%": { transform: "translate(10%, 5%)" },
          "100%": { transform: "translate(5%, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
