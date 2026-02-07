import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        freshkeep: {
          bg: "#E2F2D8",
          primary: "#CDE26D",
          text: "#333333",
          accent: "#CCB1F6",
        },
      },
      fontFamily: {
        playpen: ["var(--font-playpen)", "cursive"],
      },
    },
  },
  plugins: [],
};

export default config;
