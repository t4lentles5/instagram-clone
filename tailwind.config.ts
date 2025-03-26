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
        buttonBorder: 'var(--button-border)',
        buttonPrimary: 'var(--button-primary)',
        buttonPrimaryHover: 'var(--button-primary-hover)',
        buttonSecondary: 'var(--button-secondary)',
        buttonSecondaryHover: 'var(--button-secondary-hover)',
        foreground: 'var(--foreground)',
        foregroundSecondary: 'var(--foreground-secondary)',
        hover: 'var(--hover)',
        popover: 'var(--popover)',
        popoverHover: 'var(--popover-hover)',
        separator: 'var(--separator)',
      },
    },
  },
  plugins: [],
} satisfies Config;
