import type { Config } from 'tailwindcss';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
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
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['var(--font-antaRegular)', 'Microsoft JhengHei', 'sans-serif'],
        sweiNutLeg: ['var(--font-sweiNutLeg)', 'sans-serif'],
        anta: ['var(--font-antaRegular)', 'sans-serif'],
      },
      fontWeight: {
        demilight: '350',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: '#C3423F',
          500: '#A62522',
          700: '#760B08',
          900: '#590401',
        },
        secondary: {
          DEFAULT: '#1C6E8C',
          500: '#0F556E',
          700: '#043E52',
          900: '#023345',
        },
        black: {
          DEFAULT: '#100B00',
        },
        gray: {
          DEFAULT: '#BFC0C0',
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ['my-theme', 'light', 'dark'],
  },
} as any;

export default config;
