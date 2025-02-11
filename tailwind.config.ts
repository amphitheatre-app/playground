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
        primary: {
          DEFAULT: "var(--color-primary)",
          dark: "#0F1419",
          light: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          dark: "#233341",
          light: "#F3F4F6",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          dark: "#374151",
          light: "#E5E7EB",
        },
      },
    },
  },
  plugins: [],
};
export default config;
