import defaultTheme from "tailwindcss/defaultTheme"
import forms from "@tailwindcss/forms"
import typography from "@tailwindcss/typography"

/** @type {import("tailwindcss").Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./src/contexts/**/*.{vue,js,ts,jsx,tsx}",
    "./src/presentation/**/*.{vue,js,ts,jsx,tsx}",
    "./src/shared/**/*.{vue,js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        mono: ["Fira Code", ...defaultTheme.fontFamily.mono],
      },
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
          950: "#082f49",
        },
        // Ajoutez d autres couleurs personnalisées ici
      },
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      maxWidth: {
        "8xl": "96rem",
      },
      screens: {
        "3xl": "1920px",
      },
    },
  },
  plugins: [
    forms,
    typography,
    // Plugins spécifiques à Clean Architecture
    function({ addUtilities }) {
      const newUtilities = {
        ".domain-border": {
          borderColor: "var(--domain-color)",
        },
        ".application-border": {
          borderColor: "var(--application-color)",
        },
        ".infrastructure-border": {
          borderColor: "var(--infrastructure-color)",
        },
        ".presentation-border": {
          borderColor: "var(--presentation-color)",
        },
      }
      addUtilities(newUtilities)
    },
  ],
  // Configuration spécifique pour les différentes couches
  safelist: [
    {
      pattern: /^(bg|text|border)-(primary|secondary|success|danger|warning|info)/,
      variants: ["hover", "focus", "dark"],
    },
    {
      pattern: /^(domain|application|infrastructure|presentation)-border/,
    },
  ],
}
