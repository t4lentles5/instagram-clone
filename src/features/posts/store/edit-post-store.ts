import { create } from 'zustand';

import {
  Filter,
  filters as defaultFilters,
} from '@/features/posts/utils/filters';

import {
  Adjustment,
  adjustments as defaultAdjustments,
} from '@/features/posts/utils/adjustments';

interface FilterState {
  showEditPost: boolean;
  setShowEditPost: (open: boolean) => void;

  showFilters: boolean;
  setShowFilters: (open: boolean) => void;

  selectedFilters: Filter[];
  setSelectedFilters: (filters: Filter[]) => void;

  filterStrengths: Record<string, number>;
  setFilterStrength: (name: string, value: number) => void;
  resetFilterStrengths: () => void;

  adjustmentValues: Adjustment[][];
  setAdjustmentValues: (adjustments: Adjustment[][]) => void;
  setAdjustmentValuesForAll: (count: number) => void;
  updateAdjustmentValue: (
    imageIndex: number,
    name: string,
    value: number,
  ) => void;
}

export const useEditPostStore = create<FilterState>((set) => ({
  showEditPost: false,
  setShowEditPost: (open) => set({ showEditPost: open }),

  showFilters: true,
  setShowFilters: (open) => set({ showFilters: open }),

  selectedFilters: [],
  setSelectedFilters: (filters) => set({ selectedFilters: filters }),

  filterStrengths: defaultFilters.reduce(
    (acc, filter) => {
      acc[filter.name] = 100;
      return acc;
    },
    {} as Record<string, number>,
  ),

  setFilterStrength: (name, value) =>
    set((state) => ({
      filterStrengths: { ...state.filterStrengths, [name]: value },
    })),

  resetFilterStrengths: () =>
    set(() => ({
      filterStrengths: defaultFilters.reduce(
        (acc, filter) => {
          acc[filter.name] = 100;
          return acc;
        },
        {} as Record<string, number>,
      ),
    })),

  adjustmentValues: [],

  setAdjustmentValues: (adjustments) =>
    set(() => ({
      adjustmentValues: adjustments,
    })),

  setAdjustmentValuesForAll: (count) =>
    set(() => ({
      adjustmentValues: Array.from({ length: count }, () =>
        defaultAdjustments.map((adj) => ({ ...adj })),
      ),
    })),

  updateAdjustmentValue: (imageIndex, name, value) =>
    set((state) => {
      const updated = [...state.adjustmentValues];
      const imageAdjustments = updated[imageIndex] || [];

      updated[imageIndex] = imageAdjustments.map((adj) =>
        adj.name === name ? { ...adj, value } : adj,
      );

      return { adjustmentValues: updated };
    }),
}));
