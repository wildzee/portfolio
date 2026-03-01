import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
      },
      colors: {
        background: "#050505",
        foreground: "#f5f5f5",
        primary: "#4F46E5",
        secondary: "#A855F7",
        surface: "rgba(255, 255, 255, 0.03)",
        "surface-hover": "rgba(255, 255, 255, 0.08)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      }
    },
  },
  plugins: [],
} satisfies Config;