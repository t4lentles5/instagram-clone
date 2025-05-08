'use client';

import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { Filter } from '@/features/posts/utils/filters';
import { LeftChevron, RightChevron } from '@/features/posts/icons';
import { useCropZoom } from '../../hooks/useCropZoom';

interface Props {
  previewUrls: string[];
  selectedCrop: 'original' | 'square' | 'portrait' | 'video';
  showEditPost: boolean;
  selectedFilters: Filter[];
  filterStrengths: Record<string, number>;
  currentImageIndex: number;
  setCurrentImageIndex: Dispatch<SetStateAction<number>>;
}

export function NewPostCarousel({
  previewUrls,
  selectedCrop,
  selectedFilters,
  showEditPost,
  filterStrengths,
  currentImageIndex,
  setCurrentImageIndex,
}: Props) {
  const {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    currentScale,
    currentOffset,
    containerRef,
    imageRef,
  } = useCropZoom(previewUrls, currentImageIndex);

  const [originalAspectRatio, setOriginalAspectRatio] =
    useState<string>('1 / 1');

  useEffect(() => {
    if (selectedCrop === 'original' && previewUrls.length > 0) {
      const img = new Image();
      img.src = previewUrls[0];
      img.onload = () => {
        const ratio = img.width / img.height;
        setOriginalAspectRatio(`${ratio}`);
      };
    }
  }, [selectedCrop, previewUrls]);

  const prev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? previewUrls.length - 1 : prev - 1,
    );
  };

  const next = () => {
    setCurrentImageIndex((prev) =>
      prev === previewUrls.length - 1 ? 0 : prev + 1,
    );
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

  const filterStyle = showEditPost
    ? getAdjustedFilterStyle(
        selectedFilters[currentImageIndex]?.filterStyle ?? 'none',
        filterStrengths[selectedFilters[currentImageIndex]?.name ?? ''] ?? 100,
      )
    : 'none';

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
          src={previewUrls[currentImageIndex]}
          alt='Selected Image'
          className='h-full w-full cursor-grab object-cover transition-transform duration-75 select-none active:cursor-grabbing'
          style={{
            transform: `scale(${currentScale}) translate(${currentOffset.x / currentScale}px, ${currentOffset.y / currentScale}px)`,
            filter: filterStyle,
          }}
          draggable={false}
        />
      </div>

      {previewUrls.length > 1 && (
        <>
          {currentImageIndex !== 0 && (
            <button
              onClick={prev}
              className='bg-ig-icon-background text-web-always-white absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2'
            >
              <LeftChevron />
            </button>
          )}

          {currentImageIndex !== previewUrls.length - 1 && (
            <button
              onClick={next}
              className='bg-ig-icon-background text-web-always-white absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-2'
            >
              <RightChevron />
            </button>
          )}

          <div className='absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 justify-center gap-1'>
            {previewUrls.map((_, index) => (
              <div
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-1.5 w-1.5 cursor-pointer rounded-full ${
                  index === currentImageIndex
                    ? 'bg-ig-primary-button'
                    : 'bg-grey-4'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
