/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        line: "var(--line)",
        fg: "var(--fg)",
        mute: "var(--mute)",
        accent: "var(--accent)",
        "accent-ink": "var(--accent-ink)",
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
        display: ['"Instrument Serif"', "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
