import { create } from 'zustand';

interface MediaGalleryState {
  isMediaGalleryOpen: boolean;
  setIsMediaGalleryOpen: (open: boolean) => void;
  currentImageIndex: number;
  setCurrentImageIndex: (
    indexOrUpdater: number | ((prev: number) => number),
  ) => void;
}

export const useMediaGalleryStore = create<MediaGalleryState>((set, get) => ({
  isMediaGalleryOpen: false,
  setIsMediaGalleryOpen: (open) => set({ isMediaGalleryOpen: open }),
  currentImageIndex: 0,
  setCurrentImageIndex: (indexOrUpdater) => {
    const prev = get().currentImageIndex;
    const next =
      typeof indexOrUpdater === 'function'
        ? indexOrUpdater(prev)
        : indexOrUpdater;
    set({ currentImageIndex: next });
  },
}));
