import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { SearchResult } from '../interfaces/search-result';

interface RecentSearchStore {
  recentSearches: SearchResult[];
  addSearch: (user: SearchResult) => void;
  removeSearch: (userId: string) => void;
  clearSearches: () => void;
}

export const useRecentSearchStore = create<RecentSearchStore>()(
  persist(
    (set, get) => ({
      recentSearches: [],
      addSearch: (user) => {
        const filtered = get().recentSearches.filter((u) => u.id !== user.id);
        const updated = [user, ...filtered].slice(0, 10);
        set({ recentSearches: updated });
      },
      removeSearch: (userId) => {
        const updated = get().recentSearches.filter((u) => u.id !== userId);
        set({ recentSearches: updated });
      },
      clearSearches: () => set({ recentSearches: [] }),
    }),
    {
      name: 'recent-searches',
    },
  ),
);
