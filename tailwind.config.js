/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: '#2563eb', // A strong blue, often associated with finance or primary actions
        accent: '#facc15', // A vibrant yellow for highlights, warnings, or secondary actions
        danger: '#ef4444', // A standard red for errors, critical exceptions
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}