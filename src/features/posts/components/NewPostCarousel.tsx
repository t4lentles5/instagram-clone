'use client';

import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

import { Filter } from '@/features/posts/utils/filters';
import { LeftChevron, RightChevron } from '@/features/posts/icons';

interface Props {
  selectedFiles: File[];
  selectedCrop: 'original' | 'square' | 'portrait' | 'video';
  cropZoomValue: number;
  selectedFilter: Filter;
  filterStrengths: Record<string, number>;
  currentImageIndex: number;
  setCurrentImageIndex: Dispatch<SetStateAction<number>>;
}

export function NewPostCarousel({
  selectedFiles,
  selectedCrop,
  cropZoomValue,
  selectedFilter,
  filterStrengths,
  currentImageIndex,
  setCurrentImageIndex,
}: Props) {
  const [originalAspectRatio, setOriginalAspectRatio] =
    useState<string>('1 / 1');
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [offsets, setOffsets] = useState<{ x: number; y: number }[]>([]);
  const [scales, setScales] = useState<number[]>([]);

  useEffect(() => {
    setOffsets(selectedFiles.map(() => ({ x: 0, y: 0 })));
    setScales(selectedFiles.map(() => 1));
  }, [selectedFiles]);

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const scale = 1 + cropZoomValue / 100;

  const current = currentImageIndex;
  const setCurrent = setCurrentImageIndex;

  useEffect(() => {
    setScales((prev) =>
      prev.map((s, index) => (index === current ? 1 + cropZoomValue / 100 : s)),
    );
  }, [cropZoomValue, current]);

  useEffect(() => {
    if (selectedCrop === 'original' && selectedFiles.length > 0) {
      const img = new Image();
      img.src = URL.createObjectURL(selectedFiles[0]);
      img.onload = () => {
        const ratio = img.width / img.height;
        setOriginalAspectRatio(`${ratio}`);
      };
    }
  }, [selectedCrop, selectedFiles]);

  useEffect(() => {
    setOffsets(selectedFiles.map(() => ({ x: 0, y: 0 })));
  }, [selectedFiles]);

  useEffect(() => {
    if (scale === 1) {
      setOffsets((prev) =>
        prev.map((offset, index) =>
          index === current ? { x: 0, y: 0 } : offset,
        ),
      );
    }
  }, [scale, current]);

  const currentOffset = offsets[current] ?? { x: 0, y: 0 };
  const currentScale = scales[current] ?? 1;

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? selectedFiles.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrent((prev) => (prev === selectedFiles.length - 1 ? 0 : prev + 1));
  };

  function getAspectRatio(crop: typeof selectedCrop): string {
    switch (crop) {
      case 'square':
        return '1 / 1';
      case 'portrait':
        return '4 / 5';
      case 'video':
        return '16 / 9';
      case 'original':
      default:
        return originalAspectRatio;
    }
  }

  const aspectRatio = getAspectRatio(selectedCrop);

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
      prev.map((offset, index) => (index === current ? newOffset : offset)),
    );
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const onMouseUp = () => {
    setDragStart(null);
  };
  function getAdjustedFilterStyle(baseStyle: string, strength: number): string {
    if (strength === 0 || baseStyle === 'none') return 'none';
    if (strength === 100) return baseStyle;

    const neutralValues: Record<string, number> = {
      brightness: 100,
      contrast: 100,
      saturate: 100,
      sepia: 0,
      grayscale: 0,
    };

    const scale = strength / 100;

    return baseStyle.replace(/(\w+)\(([\d.]+)%\)/g, (_, name, value) => {
      const original = parseFloat(value);
      const neutral = neutralValues[name] ?? 100;

      const adjusted = neutral + (original - neutral) * scale;

      return `${name}(${adjusted}%)`;
    });
  }

  return (
    <div
      ref={containerRef}
      className='relative flex h-full w-full items-center justify-center'
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div
        className='max-h-full max-w-full overflow-hidden'
        style={{ aspectRatio }}
      >
        <img
          ref={imageRef}
          src={URL.createObjectURL(selectedFiles[current])}
          alt='Selected Image'
          className='h-full w-full cursor-grab object-cover transition-transform duration-75 select-none active:cursor-grabbing'
          style={{
            transform: `scale(${currentScale}) translate(${currentOffset.x / currentScale}px, ${currentOffset.y / currentScale}px)`,
            filter: getAdjustedFilterStyle(
              selectedFilter.filterStyle,
              filterStrengths[selectedFilter.name] ?? 100,
            ),
          }}
          draggable={false}
        />
      </div>

      {selectedFiles.length > 1 && (
        <>
          {current !== 0 && (
            <button
              onClick={prev}
              className='bg-ig-icon-background text-web-always-white absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2'
            >
              <LeftChevron />
            </button>
          )}

          {current !== selectedFiles.length - 1 && (
            <button
              onClick={next}
              className='bg-ig-icon-background text-web-always-white absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2'
            >
              <RightChevron />
            </button>
          )}

          <div className='absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 justify-center gap-1'>
            {selectedFiles.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-1.5 w-1.5 cursor-pointer rounded-full ${
                  index === current ? 'bg-ig-primary-button' : 'bg-grey-4'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
