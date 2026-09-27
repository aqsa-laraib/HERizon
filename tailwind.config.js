/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0b1220",
        charcoal: "#161c27",
        brandblue: "#2f6fed",
        softblue: "#9db9f5",
        panel: "#0f1522",
        line: "#2a3242",
        good: "#3fb27f",
        warn: "#e0a63e"
      }
    }
  },
  plugins: []
}
