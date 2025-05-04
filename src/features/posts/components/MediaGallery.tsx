import { Dispatch, SetStateAction } from 'react';

import {
  DeleteIcon,
  OpenMediaGalleryIcon,
  PlusIcon,
} from '@/features/posts/icons';

interface Props {
  isMediaGalleryOpen: boolean;
  setIsMediaGalleryOpen: Dispatch<SetStateAction<boolean>>;
  selectedFiles: File[];
}

export const MediaGallery = ({
  isMediaGalleryOpen,
  setIsMediaGalleryOpen,
  selectedFiles,
}: Props) => {
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
            className='bg-ig-icon-background absolute right-2 bottom-14 m-2 flex gap-3 rounded-lg p-3'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {selectedFiles.map((image) => (
              <div
                key={image.name}
                className='relative max-h-[94px] max-w-[94px]'
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt='Selected Image'
                  className='aspect-square object-cover'
                />
                <span className='bg-ig-icon-background text-web-always-white absolute top-1 right-1 rounded-full p-1'>
                  <DeleteIcon />
                </span>
              </div>
            ))}
            <div className='text-ig-secondary-text border-ig-separator grid h-12 w-12 place-items-center rounded-full border'>
              <PlusIcon />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
