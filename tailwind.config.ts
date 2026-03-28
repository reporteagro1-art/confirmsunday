import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#1e3a5f",
        blue: {
          DEFAULT: "#2563eb",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        bg: "#fafaf8",
        border: "#e8e6e0",
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
