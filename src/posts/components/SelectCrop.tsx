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
}

export const SelectCrop = ({
  isCropOptionsOpen,
  setIsCropOptionsOpen,
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
              <button className='ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold'>
                Original{' '}
                <span className='p-3'>
                  <PhotoOutlineIcon />
                </span>
              </button>
            </div>

            <div>
              <button className='ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold'>
                1:1{' '}
                <span className='p-3'>
                  <CropSquareIcon />
                </span>
              </button>
            </div>

            <div>
              <button className='ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold'>
                4:5{' '}
                <span className='p-3'>
                  <CropPortraitIcon />
                </span>
              </button>
            </div>

            <div>
              <button className='ml-3 flex cursor-pointer items-center justify-center px-1 text-sm font-semibold'>
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
