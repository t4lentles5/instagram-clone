import { create } from 'zustand';

type Crop = 'original' | 'square' | 'portrait' | 'video';

interface SelectedCropState {
  selectedCrop: Crop;
  setSelectedCrop: (crop: Crop) => void;
  resetSelectedCrop: () => void;
  isCropOptionsOpen: boolean;
  setIsCropOptionsOpen: (open: boolean) => void;
}

export const useSelectedCropStore = create<SelectedCropState>((set) => ({
  selectedCrop: 'square',
  setSelectedCrop: (crop) => set({ selectedCrop: crop }),
  resetSelectedCrop: () => set({ selectedCrop: 'square' }),
  isCropOptionsOpen: false,
  setIsCropOptionsOpen: (open) => set({ isCropOptionsOpen: open }),
}));
