/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#c0daff',
          300: '#94bfff',
          400: '#609aff',
          500: '#3b76ff',
          600: '#0F52BA', // Main primary color
          700: '#0c42a5',
          800: '#0a3584',
          900: '#082c6d',
        },
        secondary: {
          50: '#edfcfc',
          100: '#d3f7f7',
          200: '#aaeef0',
          300: '#73e0e4',
          400: '#41c7cd',
          500: '#20B2AA', // Main secondary color
          600: '#158f90',
          700: '#117273',
          800: '#105e5f',
          900: '#0f4e50',
        },
        accent: {
          50: '#f0fbf6',
          100: '#d1f4e0',
          200: '#a6e9c4',
          300: '#6fd6a1',
          400: '#3CB371', // Main accent color
          500: '#2c9b5c',
          600: '#217a48',
          700: '#1c613b',
          800: '#184e30',
          900: '#144026',
        },
        warning: {
          50: '#fffaec',
          100: '#fff1c9',
          200: '#ffe18a',
          300: '#ffca4a',
          400: '#ffb91d',
          500: '#ff9800',
          600: '#e27000',
          700: '#bb4b05',
          800: '#983b0a',
          900: '#7c330d',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};