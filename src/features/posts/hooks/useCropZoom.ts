import { useEffect, useRef, useState } from 'react';

export const useCropZoom = (
  previewUrls: string[],
  currentImageIndex: number,
) => {
  const [isZoomCropOpen, setIsZoomCropOpen] = useState(false);
  const [cropZoomValues, setCropZoomValues] = useState<number[]>([]);

  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>([]);
  const [scales, setScales] = useState<number[]>([]);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setCropZoomValues(previewUrls.map(() => 0));
    setOffsets(previewUrls.map(() => ({ x: 0, y: 0 })));
    setScales(previewUrls.map(() => 1));
  }, [previewUrls]);

  const scale = 1 + (cropZoomValues[currentImageIndex] ?? 0) / 100;

  useEffect(() => {
    setScales((prev) =>
      prev.map((s, index) => (index === currentImageIndex ? scale : s)),
    );
  }, [cropZoomValues, currentImageIndex]);

  useEffect(() => {
    if (scale === 1) {
      setOffsets((prev) =>
        prev.map((offset, index) =>
          index === currentImageIndex ? { x: 0, y: 0 } : offset,
        ),
      );
    }
  }, [scale, currentImageIndex]);

  const resetCropZoomValue = () => {
    setCropZoomValues((prev) =>
      prev.map((val, index) => (index === currentImageIndex ? 0 : val)),
    );
  };

  const setCropZoomValue = (value: number) => {
    setCropZoomValues((prev) =>
      prev.map((val, index) => (index === currentImageIndex ? value : val)),
    );
  };

  const currentOffset = offsets[currentImageIndex] ?? { x: 0, y: 0 };
  const currentScale = scales[currentImageIndex] ?? 1;

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

    setOffsets((prev) =>
      prev.map((offset, index) =>
        index === currentImageIndex ? newOffset : offset,
      ),
    );
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = () => {
    setDragStart(null);
  };

  return {
    isZoomCropOpen,
    setIsZoomCropOpen,
    cropZoomValue: cropZoomValues[currentImageIndex] ?? 0,
    setCropZoomValue,
    resetCropZoomValue,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    currentScale,
    currentOffset,
    containerRef,
    imageRef,
  };
};
