import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand gold ramp, ported verbatim from aeromine-siteview.
        // CONTRAST RULE: gold is a FILL colour on light backgrounds (chips,
        // buttons, rules). Gold TEXT is only allowed on ink/dark surfaces.
        // Accent text on light surfaces is teal. See WEBSITE_CONTEXT.md §8.
        aeromine: {
          50: "#fefce8",
          100: "#fdf6c0",
          200: "#fbec82",
          300: "#f7da3e",
          400: "#f0c835",
          500: "#e8b84b",
          600: "#d4a017",
          700: "#b08010",
          800: "#8c640c",
          900: "#6b4c0a",
          950: "#3d2b05",
        },
        ink: "#1C2120",
        teal: "#233F48",
        paper: "#F5F7F9",
        muted: "#5B666B",
        "muted-on-ink": "#A8B2B6",
        hairline: "#DDE3E7",
        "hairline-dark": "#353C3B",
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        site: "75rem",
      },
    },
  },
  plugins: [],
};

export default config;
