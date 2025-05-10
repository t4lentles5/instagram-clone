import { useSelectedCropStore } from '@/features/posts/store/selected-crop-store';

import {
  CropLandscapeIcon,
  CropPortraitIcon,
  CropSquareIcon,
  PhotoOutlineIcon,
  SelectCropIcon,
} from '@/features/posts/icons';

export const SelectCrop = () => {
  const {
    selectedCrop,
    setSelectedCrop,
    isCropOptionsOpen,
    setIsCropOptionsOpen,
  } = useSelectedCropStore();

  return (
    <>
      <div>
        <button
          className={`${isCropOptionsOpen ? 'bg-web-always-white hover:bg-web-always-white/70 text-web-always-black' : 'bg-ig-icon-background hover:bg-ig-icon-background/70 text-web-always-white'} relative cursor-pointer rounded-full p-2 transition-colors duration-200`}
          onClick={() => setIsCropOptionsOpen(!isCropOptionsOpen)}
        >
          <SelectCropIcon />
        </button>
        {isCropOptionsOpen && (
          <div
            className={`${isCropOptionsOpen ? '' : ''} bg-ig-icon-background divide-ig-separator text-web-always-white absolute bottom-16 divide-y rounded-lg`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div>
              <button
                className={`${selectedCrop === 'original' ? 'text-web-always-white' : 'text-ig-secondary-text'} ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold`}
                onClick={() => {
                  setSelectedCrop('original');
                }}
              >
                Original{' '}
                <span className='p-3'>
                  <PhotoOutlineIcon />
                </span>
              </button>
            </div>

            <div>
              <button
                className={`${selectedCrop === 'square' ? 'text-web-always-white' : 'text-ig-secondary-text'} ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold`}
                onClick={() => {
                  setSelectedCrop('square');
                }}
              >
                1:1{' '}
                <span className='p-3'>
                  <CropSquareIcon />
                </span>
              </button>
            </div>

            <div>
              <button
                className={`${selectedCrop === 'portrait' ? 'text-web-always-white' : 'text-ig-secondary-text'} ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold`}
                onClick={() => {
                  setSelectedCrop('portrait');
                }}
              >
                4:5{' '}
                <span className='p-3'>
                  <CropPortraitIcon />
                </span>
              </button>
            </div>

            <div>
              <button
                className={`${selectedCrop === 'video' ? 'text-web-always-white' : 'text-ig-secondary-text'} ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold`}
                onClick={() => {
                  setSelectedCrop('video');
                }}
              >
                16:9{' '}
                <span className='p-3'>
                  <CropLandscapeIcon />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
