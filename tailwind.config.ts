import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-linear': 'linear-gradient(135deg, var(--tw-gradient-stops))',
      }),
      colors: {
        'gray-light': '#f5f5f5',
        'gray-dark': '#2d3748',
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
} satisfies Config;
