import { create } from 'zustand';

type Offset = { x: number; y: number };

interface CropZoomState {
  isZoomCropOpen: boolean;
  cropZoomValues: number[];
  offsets: Offset[];
  scales: number[];
  setIsZoomCropOpen: (open: boolean) => void;
  setCropZoomValue: (index: number, value: number) => void;
  resetCropZoomValue: (index: number) => void;
  setOffset: (index: number, offset: Offset) => void;
  setScale: (index: number, scale: number) => void;
  initialize: (length: number) => void;
}

export const useCropZoomStore = create<CropZoomState>((set) => ({
  isZoomCropOpen: false,
  cropZoomValues: [],
  offsets: [],
  scales: [],
  setIsZoomCropOpen: (open) => set({ isZoomCropOpen: open }),
  setCropZoomValue: (index, value) =>
    set((state) => {
      const updated = [...state.cropZoomValues];
      updated[index] = value;
      return { cropZoomValues: updated };
    }),
  resetCropZoomValue: (index) =>
    set((state) => {
      const updated = [...state.cropZoomValues];
      updated[index] = 0;
      return { cropZoomValues: updated };
    }),
  setOffset: (index, offset) =>
    set((state) => {
      const updated = [...state.offsets];
      updated[index] = offset;
      return { offsets: updated };
    }),
  setScale: (index, scale) =>
    set((state) => {
      const updated = [...state.scales];
      updated[index] = scale;
      return { scales: updated };
    }),
  initialize: (length) =>
    set(() => ({
      cropZoomValues: Array(length).fill(0),
      offsets: Array(length).fill({ x: 0, y: 0 }),
      scales: Array(length).fill(1),
    })),
}));
