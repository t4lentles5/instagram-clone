import { useMediaGalleryStore } from '@/features/posts/store/media-gallery-store';
import { useNewPostStore } from '@/features/posts/store/new-post-store';
import { useEditPostStore } from '@/features/posts/store/edit-post-store';

export const useMediaGallery = () => {
  const { setIsMediaGalleryOpen, currentImageIndex, setCurrentImageIndex } =
    useMediaGalleryStore();

  const { selectedFiles, setSelectedFiles, previewUrls, setPreviewUrls } =
    useNewPostStore();
  const {
    selectedFilters,
    setSelectedFilters,
    adjustmentValues,
    setAdjustmentValues,
  } = useEditPostStore();

  const handleDeleteImage = (image: string) => {
    const indexToDelete = previewUrls.indexOf(image);
    if (indexToDelete === -1) return;

    const newPreviewUrls = previewUrls.filter((_, i) => i !== indexToDelete);
    const newSelectedFiles = selectedFiles.filter(
      (_, i) => i !== indexToDelete,
    );
    const newSelectedFilters = selectedFilters.filter(
      (_, i) => i !== indexToDelete,
    );
    const newAdjustmentValues = adjustmentValues.filter(
      (_, i) => i !== indexToDelete,
    );

    setPreviewUrls(newPreviewUrls);
    setSelectedFiles(newSelectedFiles);
    setSelectedFilters(newSelectedFilters);
    setAdjustmentValues(newAdjustmentValues);

    if (newPreviewUrls.length === 0) {
      setIsMediaGalleryOpen(false);
    }

    setCurrentImageIndex((prevIndex) => {
      if (prevIndex > indexToDelete) return prevIndex - 1;
      if (prevIndex === indexToDelete) {
        return Math.max(0, newPreviewUrls.length - 1);
      }
      return prevIndex;
    });
  };

  return {
    handleDeleteImage,
    currentImageIndex,
    setCurrentImageIndex,
  };
};
