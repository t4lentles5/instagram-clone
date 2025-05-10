import { create } from 'zustand';

interface NewPostState {
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  previewUrls: string[];
  setPreviewUrls: (urls: string[]) => void;
}

export const useNewPostStore = create<NewPostState>((set) => ({
  selectedFiles: [],
  setSelectedFiles: (files) => set({ selectedFiles: files }),
  previewUrls: [],
  setPreviewUrls: (urls) => set({ previewUrls: urls }),
}));
