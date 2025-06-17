/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    gridTemplateColumns:{
      'auto-fit-fr':"repeat(auto-fill,minmax(240px,1fr))"
    },
    extend: {
      fontSize:{
        'vw-12':'clamp(12vw,12px)',
      },
      screens:{
        'max-xs':{max:'375px'},
      },
      // screens:{
      //   'max-mob':{max:'375px'}
      // },
      gap:{
        'vw-12':'clamp(12vw,20px)'
      },
      width:{
        'max-15vw-200px':'max(15vw,200px)'
      },
      width:{
        'max-10vw-150px':'max(10vw,150px)',
      },
      maxWidth:{
        '30%':'30%',
        '500px':'500px'
      },
      maxWidth:{
        '40%':'40%',
        '500px':'500px'
      }
    },
  },
  plugins: [],
}