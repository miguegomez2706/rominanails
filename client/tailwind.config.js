/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pink: {
          50: '#fef1f6',
          100: '#fee5ef',
          200: '#fecce1',
          300: '#ffa2c9',
          400: '#FF69B4',
          500: '#f04da0',
          600: '#d6237a',
          700: '#b91860',
          800: '#99174f',
          900: '#7f1844',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#0a0a0f',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        body: ['Montserrat', 'sans-serif'],
        accent: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 32px -8px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 8px 48px -12px rgba(0, 0, 0, 0.12)',
        'pink': '0 8px 32px -8px rgba(255, 105, 180, 0.35)',
        'pink-lg': '0 16px 48px -12px rgba(255, 105, 180, 0.4)',
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      },
    },
  },
  plugins: [],
}
