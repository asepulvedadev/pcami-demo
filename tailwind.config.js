/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#00ff00",
        "accent": "#ff00ff",
        "accent-fuchsia": "#ff00ff",
        "accent-cyan": "#00ffff",
        "cyber-blue": "#00f0ff",
        "cyber-pink": "#ff00ff",
        "background-light": "#f5f8f5",
        "background-dark": "#050a05",
        "surface-dark": "#0f230f",
      },
      fontFamily: {
        "display": ["Space Grotesk", "sans-serif"]
      },
      borderRadius: { "DEFAULT": "0.125rem", "lg": "0.25rem", "xl": "0.5rem", "full": "0.75rem" },
    },
  },
  plugins: [],
}