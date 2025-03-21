import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        separator: 'var(--separator)',
        hover: 'var(--hover)',
        popover: 'var(--popover)',
        popoverHover: 'var(--popover-hover)',
        buttonColor: 'var(--button-color)',
        buttonHover: 'var(--button-hover)',
        buttonBorder: 'var(--button-border)',
        foregroundSecondary: 'var(--foreground-secondary)',
      },
    },
  },
  plugins: [],
} satisfies Config;
