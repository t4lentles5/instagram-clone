import { filters } from '@/features/posts/utils/filters';
import { useMediaGalleryStore } from '../../store/media-gallery-store';
import { useEditPost } from '../../hooks/useEditPost';
import { useEditPostStore } from '../../store/edit-post-store';

export const Filters = () => {
  const { currentImageIndex } = useMediaGalleryStore();
  const { setFilterAt } = useEditPost();

  const { selectedFilters, setFilterStrength, filterStrengths } =
    useEditPostStore();

  const handleStrengthChange = (filterName: string, newStrength: number) => {
    setFilterStrength(filterName, newStrength);
  };

  return (
    <>
      <div className='grid grid-cols-3 gap-4 p-4'>
        {filters.map((filter) => (
          <button
            key={filter.name}
            className='flex cursor-pointer flex-col items-center justify-center'
            onClick={() => {
              setFilterAt(currentImageIndex, filter);
              console.log(selectedFilters);
            }}
          >
            <div
              className={`${
                selectedFilters[currentImageIndex]?.name === filter.name &&
                'border-ig-primary-button'
              } border-ig-elevated-background overflow-hidden rounded-sm border-2`}
            >
              <img
                src='/filters-image.jpg'
                alt=''
                className='h-[88px] w-[84px]'
                style={{ filter: filter.filterStyle }}
              />
            </div>
            <span
              className={`${
                selectedFilters[currentImageIndex]?.name === filter.name
                  ? 'text-ig-primary-button'
                  : 'text-ig-secondary-text'
              } mt-2 text-center text-xs`}
            >
              {filter.name}
            </span>
          </button>
        ))}
      </div>

      {selectedFilters[currentImageIndex]?.name !== 'Original' && (
        <div className='flex items-center justify-center p-4'>
          <input
            type='range'
            min={0}
            max={100}
            value={filterStrengths[selectedFilters[currentImageIndex].name]}
            onChange={(e) =>
              handleStrengthChange(
                selectedFilters[currentImageIndex].name,
                Number(e.target.value),
              )
            }
            className='[&::-webkit-slider-thumb]:bg-ig-primary-text bg-ig-primary-text h-[2px] grow appearance-none rounded-lg [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none'
          />
          <span className='text-ig-primary-text ml-4 text-xs'>
            {filterStrengths[selectedFilters[currentImageIndex].name]}
          </span>
        </div>
      )}
    </>
  );
};
