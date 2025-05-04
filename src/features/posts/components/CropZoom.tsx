import { Dispatch, SetStateAction } from 'react';

import { SelectZoomIcon } from '@/features/posts/icons';

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
          className={`${isZoomCropOpen ? 'bg-web-always-white hover:bg-web-always-white/70 text-web-always-black' : 'bg-ig-icon-background hover:bg-ig-icon-background/70 text-web-always-white'} relative cursor-pointer rounded-full p-2 transition-colors duration-200`}
          onClick={() => setIsZoomCropOpen(!isZoomCropOpen)}
        >
          <SelectZoomIcon />
        </button>
        {isZoomCropOpen && (
          <div
            className='bg-ig-icon-background absolute bottom-16 flex h-8 w-[132px] items-center rounded-lg px-3'
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
              className='bg-web-always-black [&::-webkit-slider-thumb]:bg-web-always-white h-[2px] w-full appearance-none rounded-lg [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none'
            />
          </div>
        )}
      </div>
    </>
  );
};
