/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'anthro-cream': '#F5F3F0',
        'anthro-blue': '#A8C5E8',
        'anthro-teal': '#8FD4C1',
        'anthro-orange': '#F4A582',
        'anthro-purple': '#C7B8E8',
        'anthro-gray': '#E5E5E5',
        'anthro-text': '#2C2C2C',
      },
    },
  },
  plugins: [],
}
