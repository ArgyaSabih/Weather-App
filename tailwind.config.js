/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**.{js,jsx}"],
  theme: {
    extend: {
      keyframes: {
        slideDown: {
          "0%": {
            transform: "translateY(-30%)",
            opacity: "0"
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1"
          }
        }
      },
      animation: {
        slideDown: "slideDown 1.2s ease-in-out"
      }
    }
  },
  plugins: []
};
