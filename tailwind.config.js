import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"
import defaultTheme from "tailwindcss/defaultTheme"

/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter Tight", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: {
          50: 'rgb(var(--color-primary) / 0.05)',
          100: 'rgb(var(--color-primary) / 0.1)',
          200: 'rgb(var(--color-primary) / 0.2)',
          300: 'rgb(var(--color-primary) / 0.3)',
          400: 'rgb(var(--color-primary) / 0.4)',
          500: 'rgb(var(--color-primary) / 1)',
          600: 'rgb(var(--color-primary) / 0.6)',
          700: 'rgb(var(--color-primary) / 0.7)',
          800: 'rgb(var(--color-primary) / 0.8)',
          900: 'rgb(var(--color-primary) / 0.9)',
          950: 'rgb(var(--color-primary) / 0.95)',
        },
        secondary: {
          50: 'rgb(var(--color-secondary) / 0.05)',
          100: 'rgb(var(--color-secondary) / 0.1)',
          200: 'rgb(var(--color-secondary) / 0.2)',
          300: 'rgb(var(--color-secondary) / 0.3)',
          400: 'rgb(var(--color-secondary) / 0.4)',
          500: 'rgb(var(--color-secondary) / 1)',
          600: 'rgb(var(--color-secondary) / 0.6)',
          700: 'rgb(var(--color-secondary) / 0.7)',
          800: 'rgb(var(--color-secondary) / 0.8)',
          900: 'rgb(var(--color-secondary) / 0.9)',
          950: 'rgb(var(--color-secondary) / 0.95)',
        },
        success: {
          50: 'rgb(var(--color-success) / 0.05)',
          100: 'rgb(var(--color-success) / 0.1)',
          200: 'rgb(var(--color-success) / 0.2)',
          300: 'rgb(var(--color-success) / 0.3)',
          400: 'rgb(var(--color-success) / 0.4)',
          500: 'rgb(var(--color-success) / 1)',
          600: 'rgb(var(--color-success) / 0.6)',
          700: 'rgb(var(--color-success) / 0.7)',
          800: 'rgb(var(--color-success) / 0.8)',
          900: 'rgb(var(--color-success) / 0.9)',
          950: 'rgb(var(--color-success) / 0.95)',
        },
        danger: {
          50: 'rgb(var(--color-danger) / 0.05)',
          100: 'rgb(var(--color-danger) / 0.1)',
          200: 'rgb(var(--color-danger) / 0.2)',
          300: 'rgb(var(--color-danger) / 0.3)',
          400: 'rgb(var(--color-danger) / 0.4)',
          500: 'rgb(var(--color-danger) / 1)',
          600: 'rgb(var(--color-danger) / 0.6)',
          700: 'rgb(var(--color-danger) / 0.7)',
          800: 'rgb(var(--color-danger) / 0.8)',
          900: 'rgb(var(--color-danger) / 0.9)',
          950: 'rgb(var(--color-danger) / 0.95)',
        },
        warning: {
          50: 'rgb(var(--color-warning) / 0.05)',
          100: 'rgb(var(--color-warning) / 0.1)',
          200: 'rgb(var(--color-warning) / 0.2)',
          300: 'rgb(var(--color-warning) / 0.3)',
          400: 'rgb(var(--color-warning) / 0.4)',
          500: 'rgb(var(--color-warning) / 1)',
          600: 'rgb(var(--color-warning) / 0.6)',
          700: 'rgb(var(--color-warning) / 0.7)',
          800: 'rgb(var(--color-warning) / 0.8)',
          900: 'rgb(var(--color-warning) / 0.9)',
          950: 'rgb(var(--color-warning) / 0.95)',
        },
        info: {
          50: 'rgb(var(--color-info) / 0.05)',
          100: 'rgb(var(--color-info) / 0.1)',
          200: 'rgb(var(--color-info) / 0.2)',
          300: 'rgb(var(--color-info) / 0.3)',
          400: 'rgb(var(--color-info) / 0.4)',
          500: 'rgb(var(--color-info) / 1)',
          600: 'rgb(var(--color-info) / 0.6)',
          700: 'rgb(var(--color-info) / 0.7)',
          800: 'rgb(var(--color-info) / 0.8)',
          900: 'rgb(var(--color-info) / 0.9)',
          950: 'rgb(var(--color-info) / 0.95)',
        },
      }
    },
  },
  plugins: [forms, typography],
  safelist: [
    {
      pattern: /^(bg|text|border)-(primary|secondary|success|danger|warning|info)(-[1-9]00|50)?$/,
      variants: ['hover', 'focus', 'dark'],
    }
  ],
}
