/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        secondary: "#0F172A",
        dark: "#020617",
        card: "#111827",
      },
      boxShadow: {
        glow: "0 0 20px rgba(124,58,237,0.35)",
      },
    },
  },
  plugins: [],
}