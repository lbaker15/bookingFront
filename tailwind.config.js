/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/****/***/**/*.{html,js,tsx,scss}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['manrope', 'sans-serif'],
    },

    extend: {
      width: {
        framer: '100vw',
      },
      height: {
        framer: '100vw',
      },
      screens: {
        'xsm:': '500px',
      },
      fontSize: {
        title: ['3rem', '1.3'],
      },
      colors: {
        purple: '#323186',
        pink: '#f3b7ad',
        pinkDark: '#f3b7ad',
        red: 'red',
        test: {
          50: 'rgba(0, 0, 0, 0.5)',
        },
        white: {
          20: 'rgba(255, 255, 255, 0.2)',
          90: 'rgba(255, 255, 255, 0.9)',
          100: 'rgba(255, 255, 255, 1)',
        },
        blackR: {
          20: 'rgba(0,0,0,0.2)',
          50: 'rgba(0,0,0,0.5)',
          100: 'rgba(0,0,0,1)',
        },
      },
      spacing: {
        12: '12px',
        24: '24px',
      },
      height: {
        '24C': '24px',
      },
      width: {
        '12C': '32px',
      },
      opacity: {
        1: '1',
        0: '0',
      },
      animation: {
        burger1: 'burger1 0.4s ease-in',
        burger2: 'burger2 0.4s ease-in',
        burger3: 'burger3 0.4s ease-in',
        burger4: 'burger4 0.4s ease-in',
      },
      keyframes: {
        burger1: {
          '0%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(12px)',
          },
          '100%': {
            transform: 'translateY(12px) rotate(45deg)',
          },
        },
        burger2: {
          '0%': {
            transform: 'translateY(24px)',
          },
          '50%': {
            transform: 'translateY(12px)',
          },
          '100%': {
            transform: 'translateY(12px) rotate(-45deg)',
          },
        },
        burger3: {
          '100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(12px)',
          },
          '0%': {
            transform: 'translateY(12px) rotate(45deg)',
          },
        },
        burger4: {
          '100%': {
            transform: 'translateY(24px)',
          },
          '50%': {
            transform: 'translateY(12px)',
          },
          '0%': {
            transform: 'translateY(12px) rotate(-45deg)',
          },
        },
      },
    },
  },
  plugins: [],
};
