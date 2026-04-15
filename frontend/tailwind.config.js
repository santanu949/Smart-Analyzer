/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // We will manage dark mode manually per view
  theme: {
    extend: {
      colors: {
        brand: {
          cyan: '#00cbe6',
          cyanDim: '#00bcd5',
          emerald: '#45dfa4',
          amber: '#f9bd22',
          red: '#ffb4ab',
        },
        tactical: {
          base: '#0e0e10',
          container: '#131316',
          containerHigh: '#1f1f24',
          border: '#47474e',
          text: '#e7e4ec',
          textDim: '#acaab1',
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"Space Grotesk"', 'monospace'], // Space Grotesk used for coding/tactical mono look
      },
      letterSpacing: {
        tactical: '0.15em',
      }
    },
  },
  plugins: [],
}
