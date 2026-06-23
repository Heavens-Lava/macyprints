/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFF6E9",
        ink: "#18130F",
        coral: { DEFAULT: "#FF5436", light: "#FF7A5C" },
        electric: "#2D5BFF",
        sunny: "#FFC93C",
        lime: "#8CE563",
        candy: "#FF7DB0",
      },
      fontFamily: {
        display: ["Fredoka", "system-ui", "sans-serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
        mono: ['"Space Mono"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        hard: "6px 6px 0 #18130F",
        "hard-lg": "10px 10px 0 #18130F",
        "hard-sm": "4px 4px 0 #18130F",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};
