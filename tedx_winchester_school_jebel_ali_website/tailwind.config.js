/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#dc2626", // red-600
        "primary-hover": "#b91c1c", // red-700
        secondary: "#374151", // gray-700
      },
      spacing: {
        section: "2rem",
        container: "1rem",
      },
      borderRadius: {
        container: "0.5rem",
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.8s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.8s ease-out forwards',
        'scale-in': 'scale-in 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'particle-float': 'particle-float 4s linear infinite',
      },
      keyframes: {
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in': {
          'from': {
            opacity: '0',
          },
          'to': {
            opacity: '1',
          },
        },
        'slide-in-left': {
          'from': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'slide-in-right': {
          'from': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'scale-in': {
          'from': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            'box-shadow': '0 0 20px rgba(220, 38, 38, 0.3)',
          },
          '50%': {
            'box-shadow': '0 0 40px rgba(220, 38, 38, 0.6)',
          },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'particle-float': {
          '0%': {
            transform: 'translateY(0px) rotate(0deg)',
            opacity: '1',
          },
          '100%': {
            transform: 'translateY(-100px) rotate(360deg)',
            opacity: '0',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(220, 38, 38, 0.3)',
        'glow-lg': '0 0 50px rgba(220, 38, 38, 0.4)',
      },
    },
  },
  plugins: [],
}
