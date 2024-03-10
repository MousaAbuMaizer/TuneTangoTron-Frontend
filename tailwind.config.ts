import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        primary: ['Tinos', 'serif'], // Define your custom font here
      },
      placeholderOpacity: {
        '50': '0.3',
      },
      colors: {
        primary: '#2d2d2d',
        secondary: '#d04a02',
        tertiary: '#eb8c00',
        quaternary: '#eb8d00',
        accent: '#a32020',
      },
    }
  },
  plugins: [],
};

export default config;
