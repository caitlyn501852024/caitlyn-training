import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-antaRegular)', 'var(--font-sweiNutLeg)', 'sans-serif'],
        sweiNutLeg: ['var(--font-sweiNutLeg)', 'sans-serif'],
        anta: ['var(--font-antaRegular)', 'sans-serif']
      },
      fontWeight: {
        demilight: '350'
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      }
    }
  },
  plugins: []
};
export default config;
