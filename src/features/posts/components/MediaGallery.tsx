import { Dispatch, RefObject, SetStateAction, useState } from 'react';

import {
  DeleteIcon,
  LeftChevron,
  OpenMediaGalleryIcon,
  PlusIcon,
  RightChevron,
} from '@/features/posts/icons';

interface Props {
  isMediaGalleryOpen: boolean;
  setIsMediaGalleryOpen: Dispatch<SetStateAction<boolean>>;
  previewUrls: string[];
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleDeleteImage: (image: string) => void;
  currentImageIndex: number;
  setCurrentImageIndex: Dispatch<SetStateAction<number>>;
}

export const MediaGallery = ({
  isMediaGalleryOpen,
  setIsMediaGalleryOpen,
  previewUrls,
  fileInputRef,
  handleDeleteImage,
  currentImageIndex,
  setCurrentImageIndex,
}: Props) => {
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  return (
    <>
      <div>
        <button
          className={`${isMediaGalleryOpen ? 'bg-web-always-white hover:bg-web-always-white/70 text-web-always-black' : 'bg-ig-icon-background hover:bg-ig-icon-background/70 text-web-always-white'} relative cursor-pointer rounded-full p-2 transition-colors duration-200`}
          onClick={() => setIsMediaGalleryOpen(!isMediaGalleryOpen)}
        >
          <OpenMediaGalleryIcon />
        </button>

        {isMediaGalleryOpen && (
          <div
            className='bg-ig-icon-background absolute right-2 bottom-14 m-2 flex max-w-full gap-3 overflow-y-hidden rounded-lg p-3'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className='relative max-w-[400px] overflow-hidden'>
              {galleryStartIndex > 0 && (
                <button
                  className='bg-web-always-white text-web-always-black absolute top-1/2 left-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-1'
                  onClick={() => {
                    setGalleryStartIndex((prev) => Math.max(0, prev - 3));
                  }}
                >
                  <LeftChevron />
                </button>
              )}

              {galleryStartIndex + 4 < previewUrls.length && (
                <button
                  className='bg-web-always-white text-web-always-black absolute top-1/2 right-2 z-10 -translate-y-1/2 cursor-pointer rounded-full p-1'
                  onClick={() => {
                    setGalleryStartIndex((prev) =>
                      Math.min(previewUrls.length - 4, prev + 3),
                    );
                  }}
                >
                  <RightChevron />
                </button>
              )}

              <div
                className='flex gap-3 transition-transform duration-500 ease-in-out'
                style={{
                  transform: `translateX(-${galleryStartIndex * 102}px)`,
                }}
              >
                {previewUrls.map((image, index) => (
                  <div
                    key={index}
                    className='relative aspect-square h-[90px] w-[90px] flex-shrink-0 cursor-pointer transition-transform duration-200 active:scale-110'
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt='Selected Image'
                      className='aspect-square object-cover'
                    />

                    {currentImageIndex === index && (
                      <button
                        className='bg-ig-icon-background text-web-always-white absolute top-1 right-1 cursor-pointer rounded-full p-1'
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image);

                          if (
                            galleryStartIndex > 0 &&
                            previewUrls.length - 1 <= galleryStartIndex + 3
                          ) {
                            setGalleryStartIndex((prev) =>
                              Math.max(0, prev - 1),
                            );
                          }
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    )}

                    {currentImageIndex !== index && (
                      <div className='bg-ig-image-selected-overlay absolute top-0 left-0 h-full w-full'></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              className='text-ig-secondary-text active:bg-ig-highlight-background border-ig-separator grid aspect-square h-12 w-12 cursor-pointer place-items-center rounded-full border'
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <PlusIcon />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
