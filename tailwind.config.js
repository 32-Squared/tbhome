/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Ocean blues
        ocean: {
          50: '#eaf6fb',
          100: '#c8e9f3',
          200: '#9dd3e6',
          300: '#6cb8d4',
          400: '#3f9bbf',
          500: '#1f7ea3',
          600: '#0d6285',
          700: '#084d6a',
          800: '#063a51',
          900: '#04293a',
        },
        // Turquoise / teal accent
        lagoon: {
          50: '#e0fbf5',
          100: '#b8f2e6',
          200: '#8ce6d4',
          300: '#5fd5bf',
          400: '#3ac0a7',
          500: '#22a58d',
          600: '#178573',
          700: '#126660',
          800: '#0e4f4d',
          900: '#0a3a39',
        },
        // Warm coral
        coral: {
          50: '#fff0ed',
          100: '#ffd9d0',
          200: '#ffb8a6',
          300: '#ff9479',
          400: '#ff6f4f',
          500: '#f54e2c',
          600: '#d63a1a',
          700: '#b02d12',
          800: '#8a240f',
          900: '#6b1d0d',
        },
        // Sunny gold
        sun: {
          50: '#fffbe8',
          100: '#fff3bf',
          200: '#ffe888',
          300: '#ffd94a',
          400: '#ffc91f',
          500: '#f5b400',
          600: '#d09500',
          700: '#a87600',
          800: '#825b00',
          900: '#5c4000',
        },
        // Warm sand neutrals
        sand: {
          50: '#fdf9f0',
          100: '#f7eedd',
          200: '#efdcc0',
          300: '#e4c79d',
          400: '#d6ae7a',
          500: '#c8975c',
          600: '#b07d48',
          700: '#8e6238',
          800: '#6d4d2c',
          900: '#4d361f',
        },
      },
      fontFamily: {
        display: ['"Fredoka"', '"Baloo 2"', 'system-ui', 'sans-serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
        'float-soft': 'floatSoft 8s ease-in-out infinite',
      },
      keyframes: {
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-12px) rotate(-1.5deg)' },
        },
        floatSoft: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
};
