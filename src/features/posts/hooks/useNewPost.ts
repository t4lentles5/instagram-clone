import { useEffect } from 'react';

import { useNewPostStore } from '@/features/posts/store/new-post-store';
import { useSelectedCropStore } from '@/features/posts/store/selected-crop-store';
import { useEditPostStore } from '@/features/posts/store/edit-post-store';

import { filters as defaultFilters } from '@/features/posts/utils/filters';
import { adjustments as defaultAdjustments } from '@/features/posts/utils/adjustments';

export const useNewPost = () => {
  const { selectedFiles, setSelectedFiles, setPreviewUrls } = useNewPostStore();
  const { resetSelectedCrop } = useSelectedCropStore();
  const { setSelectedFilters } = useEditPostStore();
  const { resetFilterStrengths, setShowEditPost, setAdjustmentValues } =
    useEditPostStore();

  useEffect(() => {
    if (selectedFiles.length > 0) {
      const urls = selectedFiles.map((file) => URL.createObjectURL(file));

      setPreviewUrls(urls);
      setSelectedFilters(urls.map(() => defaultFilters[8]));

      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [selectedFiles]);

  const resetStates = () => {
    const filesCount = selectedFiles.length;

    setSelectedFiles([]);
    setPreviewUrls([]);
    resetSelectedCrop();
    setShowEditPost(false);
    resetFilterStrengths();
    setSelectedFilters(Array(filesCount).fill(defaultFilters[8]));
    setAdjustmentValues(defaultAdjustments);
  };

  return { resetStates };
};
