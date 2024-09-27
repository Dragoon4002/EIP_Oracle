import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      height:{
        '99': '500px',
      },
      backgroundImage: {
        'hero-background': "url('/images/dark-ethereum-background.webp')",  // Fixed path to 'images'
      },
      keyframes: {
        breathe: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      animation: {
        breathe: 'breathe 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
