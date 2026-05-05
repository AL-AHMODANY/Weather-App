/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      colors: {
        sky: {
          electric: "#38bdf8",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "slide-up-delay": "slideUp 0.5s ease-out 0.15s forwards",
        "slide-up-delay2": "slideUp 0.5s ease-out 0.3s forwards",
        "spin-slow": "spin 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 8s ease-in-out 2s infinite",
        "float-delay2": "float 10s ease-in-out 4s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
