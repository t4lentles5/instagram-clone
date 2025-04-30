import { Dispatch, SetStateAction } from 'react';
import { DeleteIcon, OpenMediaGalleryIcon, PlusIcon } from '../icons';

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
          className={`${isMediaGalleryOpen ? 'bg-white text-black hover:bg-white/80' : 'bg-background-overlay hover:bg-background-overlay/80 text-white'} relative cursor-pointer rounded-full p-2 transition-colors duration-200`}
          onClick={() => setIsMediaGalleryOpen(!isMediaGalleryOpen)}
        >
          <OpenMediaGalleryIcon />
        </button>
        {isMediaGalleryOpen && (
          <div
            className='bg-background-overlay absolute right-2 bottom-16 m-2 flex gap-3 rounded-lg p-2'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {selectedFiles.map((image) => (
              <div
                key={image.name}
                className='relative max-h-[100px] max-w-[100px]'
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt='Selected Image'
                  className='aspect-square object-cover'
                />
                <span className='bg-background-overlay absolute top-1 right-1 rounded-full p-1 text-white'>
                  <DeleteIcon />
                </span>
              </div>
            ))}
            <div className='text-secondary border-border grid h-12 w-12 place-items-center rounded-full border'>
              <PlusIcon />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
