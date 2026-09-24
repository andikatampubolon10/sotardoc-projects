import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        "primary-hover": "#e5e5e5",
        neutralBg: "#080808",
        surfaceCard: "#0d0d0d",
        surfaceElevated: "#18181b",
        borderSubtle: "#27272a",
        borderHover: "#3f3f46",
        textPrimary: "#ffffff",
        textMuted: "#a1a1aa",
        accentNeural: "#34d399",
        accentTelemetry: "#22d3ee",
        accentDesign: "#a78bfa",
        deepBlack: "#080808",
        surfaceBlack: "#111111",
        cardBg: "#0d0d0d",
        offWhite: "#F3F4F6",
        borderDark: "#27272A",
        borderLightDark: "#3F3F46",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
        roboto: ["var(--font-roboto)", "Roboto", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.3s ease forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
