/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      backgroundImage: {
        'avengers-img': "url('/src/assets/avengers.jpg')",
      },
      colors: {
        'primary-color': '#4a5a6a',
        'Light-Beige': '#dcdcdc',
        'hover-Soft':'#c0c0c0',
      },

      fontFamily:{
        cursive:'cursive;'
      }

      
      
    },
  },
   plugins: [
   
  ],
}

