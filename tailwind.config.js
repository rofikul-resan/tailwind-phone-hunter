/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: ['./project/*'],
  content: ["./project/*"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
