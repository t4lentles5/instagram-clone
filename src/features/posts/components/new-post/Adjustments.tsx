import { useEditPostStore } from '../../store/edit-post-store';
import { useMediaGalleryStore } from '../../store/media-gallery-store';

export const Adjustments = () => {
  const { adjustmentValues, updateAdjustmentValue, resetAdjustmentValue } =
    useEditPostStore();
  const { currentImageIndex } = useMediaGalleryStore();

  const adjustments = adjustmentValues[currentImageIndex];

  return (
    <div className='mb-4'>
      {adjustments.map((adjustment) => (
        <div key={adjustment.name} className='group mb-1 px-4'>
          <div className='text-ig-primary-text flex justify-between py-4'>
            <span>{adjustment.name}</span>
            {adjustment.value !== 0 && (
              <button
                className='text-ig-primary-button hover:text-ig-link active:text-ig-link-pressed invisible cursor-pointer text-sm font-bold group-hover:visible'
                onClick={() => {
                  resetAdjustmentValue(currentImageIndex, adjustment.name);
                }}
              >
                Reset
              </button>
            )}
          </div>
          <div className='flex h-6 items-center justify-center'>
            <input
              type='range'
              min={adjustment.min}
              max={adjustment.max}
              value={adjustment.value}
              onChange={(e) =>
                updateAdjustmentValue(
                  currentImageIndex,
                  adjustment.name,
                  +e.target.value,
                )
              }
              className='bg-ig-stroke-adjustments [&::-webkit-slider-thumb]:bg-ig-primary-text h-[2px] w-full cursor-pointer appearance-none rounded-lg [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none'
            />
            <span className='text-ig-secondary-text pl-4 text-xs'>
              {adjustment.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};
