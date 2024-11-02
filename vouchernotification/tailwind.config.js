import daisyui from "daisyui"

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      // Your themes here, if any
    ],
    themes: ["light", "dark"],
    darkTheme: false,
  },
}
