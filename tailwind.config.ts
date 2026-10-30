import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: "#060911",
          900: "#0b0f19",
          850: "#0f1624",
          800: "#131d31",
        },
        champagne: {
          50: "#fdfbf7",
          100: "#f9f4ec",
          200: "#f3e8cb",
          300: "#e9d5a1",
          400: "#ddbe75",
          500: "#cfab54",
        },
        velvet: {
          rose: "#e08d98",
          amber: "#dca54c",
          gold: "#f5d082",
        },
      },
      fontFamily: {
        serif: [
          "'Playfair Display'",
          "'Cormorant Garamond'",
          "Georgia",
          "Cambria",
          "'Times New Roman'",
          "serif",
        ],
        sans: [
          "'Plus Jakarta Sans'",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
      },
      keyframes: {
        "float-gentle": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "breathing-glow": {
          "0%, 100%": {
            opacity: "0.35",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.65",
            transform: "scale(1.04)",
          },
        },
        "seal-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(245, 208, 130, 0.3), inset 0 2px 4px rgba(255, 255, 255, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(245, 208, 130, 0.65), 0 0 45px rgba(220, 165, 76, 0.3), inset 0 2px 6px rgba(255, 255, 255, 0.6)",
          },
        },
      },
      animation: {
        "float-gentle": "float-gentle 6s ease-in-out infinite",
        "breathing-glow": "breathing-glow 4s ease-in-out infinite",
        "seal-pulse": "seal-pulse 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
