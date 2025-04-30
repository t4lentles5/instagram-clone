import { Dispatch, SetStateAction } from 'react';

import { SelectZoomIcon } from '../icons';

interface Props {
  isZoomCropOpen: boolean;
  setIsZoomCropOpen: Dispatch<SetStateAction<boolean>>;
  cropZoomValue: number;
  setCropZoomValue: Dispatch<SetStateAction<number>>;
}

export const CropZoom = ({
  isZoomCropOpen,
  setIsZoomCropOpen,
  cropZoomValue,
  setCropZoomValue,
}: Props) => {
  return (
    <>
      <div>
        <button
          className={`${isZoomCropOpen ? 'bg-white text-black hover:bg-white/80' : 'bg-background-overlay hover:bg-background-overlay/80 text-white'} relative cursor-pointer rounded-full p-2 transition-colors duration-200`}
          onClick={() => setIsZoomCropOpen(!isZoomCropOpen)}
        >
          <SelectZoomIcon />
        </button>
        {isZoomCropOpen && (
          <div
            className='absolute bottom-16 flex h-8 w-[132px] items-center rounded-lg bg-[#1A1A1ACC] px-3'
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <input
              type='range'
              min={0}
              max={100}
              value={cropZoomValue}
              onChange={(e) => {
                setCropZoomValue(+e.target?.value);
              }}
              className='h-[2px] w-full appearance-none rounded-lg bg-black [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none [&::-webkit-slider-thumb]:bg-white'
            />
          </div>
        )}
      </div>
    </>
  );
};
