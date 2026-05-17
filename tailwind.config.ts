import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "jg-navy": "#0a0a14",
        "jg-navy-2": "#0d1b3e",
        "jg-gold": "#d4af37",
        "jg-gold-light": "#f0d060",
        "jg-gold-dark": "#b8941f",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        dm: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-2": "marquee2 30s linear infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "fade-up": "fadeUp 0.6s ease forwards",
        float: "float 6s ease-in-out infinite",
        pulse_slow: "pulse 4s ease-in-out infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [],
};

export default config;
