import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./contexts/**/*.{js,ts,jsx,tsx,mdx}",
    "./functions/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // primary: {
        //   DEFAULT: "#20DFDF",
        //   50: "#FFFFFF",
        //   100: "#D2F9F9",
        //   200: "#A6F2F2",
        //   300: "#79ECEC",
        //   400: "#4CE6E6",
        //   500: "#20DFDF",
        //   600: "#19B3B3",
        //   700: "#138686",
        //   800: "#0D5959",
        //   900: "#062D2D",
        //   950: "#000000",
        // },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
export default config;
