import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0b1727",
      },
      fontFamily: {
        sans: [
          "'Plus Jakarta Sans Variable'",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 20px 40px -12px rgba(11, 23, 39, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
