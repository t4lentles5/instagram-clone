import { useEditPostStore } from '../../store/edit-post-store';

export const Adjustments = () => {
  const { adjustmentValues, updateAdjustmentValue } = useEditPostStore();

  return (
    <>
      <div className='mb-4'>
        {adjustmentValues.map((adjustment) => (
          <div key={adjustment.name} className='mb-1 px-4'>
            <div className='text-ig-primary-text py-4'>{adjustment.name}</div>
            <div className='flex h-6 items-center justify-center'>
              <input
                type='range'
                min={adjustment.min}
                max={adjustment.max}
                value={adjustment.value}
                onChange={(e) =>
                  updateAdjustmentValue(adjustment.name, +e.target.value)
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
    </>
  );
};
