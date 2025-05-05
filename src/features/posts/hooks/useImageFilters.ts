import { useEffect, useState } from 'react';

import {
  Filter,
  filters as defaultFilters,
} from '@/features/posts/utils/filters';

export const useImageFilters = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);

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

  const setFilterAt = (index: number, filter: Filter) => {
    setSelectedFilters((prev) => {
      if (index < 0 || index >= prev.length) return prev;
      const updated = [...prev];
      updated[index] = filter;
      return updated;
    });
  };

  const clearAll = () => {
    setSelectedFiles([]);
    setPreviewUrls([]);
    setSelectedFilters((prev) => prev.map(() => defaultFilters[8]));
  };

  return {
    selectedFiles,
    setSelectedFiles,
    previewUrls,
    setPreviewUrls,
    selectedFilters,
    setFilterAt,
    clearAll,
  };
};
