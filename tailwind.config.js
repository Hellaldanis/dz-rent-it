/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#007AFF",
        "background-light": "#FFFFFF",
        "background-dark": "#1D1D1F",
        "secondary-light": "#F2F2F7",
        "secondary-dark": "#2c2c2e",
        "text-light": "#1D1D1F",
        "text-dark": "#F5F5F7",
        "text-muted-light": "#6E6E73",
        "text-muted-dark": "#8E8E93"
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
