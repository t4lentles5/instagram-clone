'use client';

import { useEffect, useState } from 'react';

import { useCropZoom } from '@/features/posts/hooks/useCropZoom';
import { useSelectedCropStore } from '@/features/posts/store/selected-crop-store';
import { useMediaGalleryStore } from '@/features/posts/store/media-gallery-store';
import { useNewPostStore } from '@/features/posts/store/new-post-store';
import { useEditPostStore } from '@/features/posts/store/edit-post-store';

import { LeftChevron, RightChevron } from '@/features/posts/icons';
import { generateFilterStyle } from '../../utils/generate-adjustment-style';
import { Adjustment } from '../../utils/adjustments';

export function NewPostCarousel() {
  const {
    onMouseDown,
    onMouseMove,
    onMouseUp,
    currentScale,
    currentOffset,
    containerRef,
    imageRef,
  } = useCropZoom();

  const { postState } = useNewPostStore();

  const { selectedCrop } = useSelectedCropStore();
  const { currentImageIndex, setCurrentImageIndex } = useMediaGalleryStore();
  const { previewUrls } = useNewPostStore();
  const { selectedFilters, filterStrengths, adjustmentValues } =
    useEditPostStore();

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

  const isOriginalFilter =
    selectedFilters[currentImageIndex]?.name === 'Original';

  const filterStyle =
    postState !== 'crop' && !isOriginalFilter
      ? getAdjustedFilterStyle(
          selectedFilters[currentImageIndex]?.filterStyle ?? 'none',
          filterStrengths[selectedFilters[currentImageIndex]?.name ?? ''] ??
            100,
        )
      : '';

  const adjustmentStyle =
    postState !== 'crop' && adjustmentValues[currentImageIndex]
      ? generateFilterStyle(adjustmentValues[currentImageIndex])
      : 'none';

  const combinedFilter = `${filterStyle} ${adjustmentStyle}`.trim();

  function generateVignetteStyle(adjustments: Adjustment[]): string {
    const vignetteValue =
      adjustments.find((adj) => adj.name === 'Vignette')?.value ?? 0;

    if (vignetteValue === 0) {
      return 'none';
    }

    const opacity = vignetteValue / 100;
    return `radial-gradient(circle, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, ${opacity}) 100%)`;
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
        className='relative max-h-full max-w-full overflow-hidden'
        style={{
          aspectRatio,
        }}
      >
        <img
          ref={imageRef}
          src={previewUrls[currentImageIndex]}
          alt='Selected Image'
          className='h-full w-full cursor-grab object-cover transition-transform duration-75 select-none active:cursor-grabbing'
          style={{
            transform: `scale(${currentScale}) translate(${currentOffset.x / currentScale}px, ${currentOffset.y / currentScale}px)`,
            filter: combinedFilter,
          }}
          draggable={false}
        />
        {postState !== 'crop' && adjustmentValues[currentImageIndex] && (
          <div
            className='pointer-events-none absolute inset-0'
            style={{
              background: generateVignetteStyle(
                adjustmentValues[currentImageIndex],
              ),
            }}
          />
        )}
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
