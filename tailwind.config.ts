/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        plum: {
          DEFAULT: '#784f77',
          dark: '#4a2d4a',
          light: '#e8d8e8',
        },
        cream: {
          DEFAULT: '#faf7f4',
          dark: '#f3ece6',
        },
        terra: {
          DEFAULT: '#c27b52',
          dark: '#8c4f2e',
        },
        sand: '#e8d5c4',
        ink: '#1e1014',
        muted: '#7a5a6a',
        border: '#e8d8e0',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
}
