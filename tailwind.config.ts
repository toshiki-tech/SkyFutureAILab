import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          '"Hiragino Kaku Gothic ProN"',
          '"Hiragino Sans"',
          '"Yu Gothic"',
          '"Meiryo"',
          '"MS PGothic"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.7', letterSpacing: '0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.6', letterSpacing: '-0.01em' }],
        '3xl': ['1.875rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1.3', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        accent: {
          50: "#fdf8ef",
          100: "#f8edda",
          200: "#f1dcaf",
          300: "#e5c47f",
          400: "#d9a855",
          500: "#b68d40", // Brand Gold
          600: "#9c7836",
          700: "#82632d",
          800: "#695028",
          900: "#554124",
          950: "#312411",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        "glow": "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-lg": "0 0 40px rgba(59, 130, 246, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;
