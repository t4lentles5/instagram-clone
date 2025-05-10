import { useRef, useEffect, useState } from 'react';

import { useCropZoomStore } from '@/features/posts/store/crop-zoom-store';
import { useMediaGalleryStore } from '@/features/posts/store/media-gallery-store';
import { useNewPostStore } from '@/features/posts/store/new-post-store';

export const useCropZoom = () => {
  const {
    isZoomCropOpen,
    setIsZoomCropOpen,
    cropZoomValues,
    offsets,
    scales,
    setCropZoomValue,
    resetCropZoomValue,
    setOffset,
    setScale,
    initialize,
  } = useCropZoomStore();
  const { currentImageIndex } = useMediaGalleryStore();
  const { previewUrls } = useNewPostStore();

  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null,
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const cropZoomValue = cropZoomValues[currentImageIndex] ?? 0;
  const scale = 1 + cropZoomValue / 100;
  const currentOffset = offsets[currentImageIndex] ?? { x: 0, y: 0 };
  const currentScale = scales[currentImageIndex] ?? 1;

  useEffect(() => {
    initialize(previewUrls.length);
  }, [previewUrls.length, initialize]);

  useEffect(() => {
    setScale(currentImageIndex, scale);
  }, [cropZoomValue, currentImageIndex, scale, setScale]);

  useEffect(() => {
    if (scale === 1) {
      setOffset(currentImageIndex, { x: 0, y: 0 });
    }
  }, [scale, currentImageIndex, setOffset]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragStart || scale <= 1) return;

    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const containerRect = container.getBoundingClientRect();
    const maxOffsetX = ((scale - 1) * containerRect.width) / 2;
    const maxOffsetY = ((scale - 1) * containerRect.height) / 2;

    const newOffset = {
      x: Math.max(-maxOffsetX, Math.min(currentOffset.x + dx, maxOffsetX)),
      y: Math.max(-maxOffsetY, Math.min(currentOffset.y + dy, maxOffsetY)),
    };

    setOffset(currentImageIndex, newOffset);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = () => {
    setDragStart(null);
  };

  return {
    isZoomCropOpen,
    setIsZoomCropOpen,
    cropZoomValue,
    setCropZoomValue: (value: number) =>
      setCropZoomValue(currentImageIndex, value),
    resetCropZoomValue: () => resetCropZoomValue(currentImageIndex),
    onMouseDown,
    onMouseMove,
    onMouseUp,
    currentScale,
    currentOffset,
    containerRef,
    imageRef,
  };
};
