import { Dispatch, SetStateAction } from 'react';

import {
  CropLandscapeIcon,
  CropPortraitIcon,
  CropSquareIcon,
  PhotoOutlineIcon,
  SelectCropIcon,
} from '../icons';

interface Props {
  isCropOptionsOpen: boolean;
  setIsCropOptionsOpen: Dispatch<SetStateAction<boolean>>;
  selectedCrop: string;
  setSelectedCrop: Dispatch<
    SetStateAction<'video' | 'original' | 'square' | 'portrait'>
  >;
}

export const SelectCrop = ({
  isCropOptionsOpen,
  setIsCropOptionsOpen,
  selectedCrop,
  setSelectedCrop,
}: Props) => {
  return (
    <>
      <div>
        <button
          className={`${isCropOptionsOpen ? 'bg-white text-black hover:bg-white/80' : 'bg-background-overlay hover:bg-background-overlay/80 text-white'} relative cursor-pointer rounded-full p-2 transition-colors duration-200`}
          onClick={() => setIsCropOptionsOpen(!isCropOptionsOpen)}
        >
          <SelectCropIcon />
        </button>
        {isCropOptionsOpen && (
          <div
            className={`${isCropOptionsOpen ? '' : ''} bg-background-overlay divide-border absolute bottom-16 divide-y rounded-lg text-white`}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div>
              <button
                className={`${selectedCrop === 'original' ? 'text-white' : 'text-secondary'} ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold`}
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
                className={`${selectedCrop === 'square' ? 'text-white' : 'text-secondary'} ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold`}
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
                className={`${selectedCrop === 'portrait' ? 'text-white' : 'text-secondary'} ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold`}
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
                className={`${selectedCrop === 'video' ? 'text-white' : 'text-secondary'} ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold`}
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
