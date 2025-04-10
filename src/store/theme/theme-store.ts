import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  isDarkMode: boolean;
  toggleTheme: () => void;
  initialize: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: true,
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      initialize: () => {
        if (typeof window !== 'undefined') {
          const prefersDark = window.matchMedia(
            '(prefers-color-scheme: dark)',
          ).matches;
          set({ isDarkMode: prefersDark });
        }
      },
    }),
    {
      name: 'theme-storage',
    },
  ),
);
