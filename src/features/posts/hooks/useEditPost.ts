import { useEffect, useState } from 'react';

import {
  Filter,
  filters as defaultFilters,
} from '@/features/posts/utils/filters';
import {
  Adjustment,
  adjustments as defaultAdjustments,
} from '@/features/posts/utils/adjustments';

export const useEditPost = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isCropOptionsOpen, setIsCropOptionsOpen] = useState(false);
  const [isZoomCropOpen, setIsZoomCropOpen] = useState(false);
  const [isMediaGalleryOpen, setIsMediaGalleryOpen] = useState(false);

  const [showEditPost, setShowEditPost] = useState(false);
  const [showFilters, setShowFilters] = useState(true);

  const [selectedCrop, setSelectedCrop] = useState<
    'original' | 'square' | 'portrait' | 'video'
  >('square');
  const [cropZoomValue, setCropZoomValue] = useState(0);

  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const [filterStrengths, setFilterStrengths] = useState<
    Record<string, number>
  >(() =>
    defaultFilters.reduce(
      (acc, filter) => {
        acc[filter.name] = 100;
        return acc;
      },
      {} as Record<string, number>,
    ),
  );

  const [adjustmentValues, setAdjustmentValues] =
    useState<Adjustment[]>(defaultAdjustments);

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

  const setFilterAt = (index: number, filter: Filter) => {
    setSelectedFilters((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const updated = [...prev];
      updated[index] = filter;
      return updated;
    });
  };

  const resetStates = () => {
    const filesCount = selectedFiles.length;

    setShowEditPost(false);
    setCropZoomValue(0);
    setSelectedCrop('square');
    setSelectedFiles([]);
    setPreviewUrls([]);
    setSelectedFilters(Array(filesCount).fill(defaultFilters[8]));
    setFilterStrengths(
      defaultFilters.reduce(
        (acc, filter) => {
          acc[filter.name] = 100;
          return acc;
        },
        {} as Record<string, number>,
      ),
    );
    setAdjustmentValues(defaultAdjustments);
  };

  return {
    setSelectedFiles,
    previewUrls,
    showEditPost,
    currentImageIndex,
    setCurrentImageIndex,
    setShowEditPost,
    showFilters,
    setShowFilters,
    isCropOptionsOpen,
    setIsCropOptionsOpen,
    isZoomCropOpen,
    setIsZoomCropOpen,
    isMediaGalleryOpen,
    setIsMediaGalleryOpen,
    selectedCrop,
    setSelectedCrop,
    cropZoomValue,
    setCropZoomValue,
    selectedFilters,
    setFilterAt,
    filterStrengths,
    setFilterStrengths,
    adjustmentValues,
    setAdjustmentValues,
    handleDeleteImage,
    resetStates,
  };
};
