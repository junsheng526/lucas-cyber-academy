/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Your primary color
        "primary-dark": "#2779bd", // Darker shade for hover
      },
    },
  },
  plugins: [],
};
