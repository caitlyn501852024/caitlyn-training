import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        body: ['var(--font-antaRegular)', 'Microsoft JhengHei', 'sans-serif'],
        sweiNutLeg: ['var(--font-sweiNutLeg)', 'sans-serif'],
        anta: ['var(--font-antaRegular)', 'sans-serif']
      },
      fontWeight: {
        demilight: '350'
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#C3423F'
        },
        secondary: {
          DEFAULT: '#1C6E8C'
        },
        black: {
          DEFAULT: '#100B00'
        },
        gray: {
          DEFAULT: '#BFC0C0'
        }
      }

    }


  },
  plugins: [
    daisyui
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#C3423F',
          secondary: '#1C6E8C'
        }
      }
    ]
  }

};
export default config;
