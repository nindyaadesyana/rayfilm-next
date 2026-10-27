/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        ink:    "#0a0a0a",
        "ink-2": "#1a1a1a",
        "ink-3": "#2e2e2e",
        mid:    "#6b6b6b",
        "mid-2": "#9a9a9a",
        border: "#e4e4e4",
        "border-2": "#f0f0f0",
        surface: "#f8f8f8",
        "surface-2": "#f2f2f2",
      },
    },
  },
  plugins: [],
};
