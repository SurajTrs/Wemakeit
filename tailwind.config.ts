import type { Config } from "tailwindcss";

// Colours are CSS variables (see app/globals.css) so light & dark mode swap automatically.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.ts"],
  theme: {
    extend: {
      colors: {
        canvas: v("canvas"), // page background
        surface: v("surface"), // cards
        raised: v("raised"), // inputs, inner tiles
        line: v("line"), // hairline borders
        fg: v("fg"), // main text
        muted: v("muted"), // secondary text
        accent: v("accent"), // lime text/borders (darker in light mode so it stays readable)
        lime: "#C6F432", // Lime Green fill — always with ink text on top
        ink: "#0B0B0C", // text on lime
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: { site: "1200px" },
    },
  },
  plugins: [],
} satisfies Config;
