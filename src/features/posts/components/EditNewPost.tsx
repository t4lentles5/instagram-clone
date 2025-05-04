import { Dispatch, SetStateAction } from 'react';

import { Adjustment, Filter } from '@/features/posts/components/NewPostModal';

interface Props {
  showFilters: boolean;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  filters: Filter[];
  selectedFilter: Filter;
  setSelectedFilter: Dispatch<SetStateAction<Filter>>;
  filterStrengths: Record<string, number>;
  setFilterStrengths: Dispatch<SetStateAction<Record<string, number>>>;
  adjustmentValues: Adjustment[];
  setAdjustmentValues: Dispatch<SetStateAction<Adjustment[]>>;
}

export const EditNewPost = ({
  showFilters,
  setShowFilters,
  filters,
  selectedFilter,
  setSelectedFilter,
  filterStrengths,
  setFilterStrengths,
  adjustmentValues,
  setAdjustmentValues,
}: Props) => {
  const updateAdjustmentValue = (name: string, newValue: number) => {
    setAdjustmentValues((prev) =>
      prev.map((adj) =>
        adj.name === name ? { ...adj, value: newValue } : adj,
      ),
    );
  };

  const handleStrengthChange = (filterName: string, newStrength: number) => {
    setFilterStrengths((prev) => ({
      ...prev,
      [filterName]: newStrength,
    }));
  };

  return (
    <>
      <div className='bg-ig-elevated-background border-ig-elevated-separator flex h-[516px] w-[340px] flex-col overflow-auto border-l'>
        <div className='flex'>
          <button
            onClick={() => setShowFilters(true)}
            className={`${showFilters ? 'text-ig-link border-ig-primary-text' : 'border-ig-primary-text/30 text-ig-link/30'} w-full cursor-pointer border-b py-[10px] text-sm font-semibold`}
          >
            Filters
          </button>
          <button
            onClick={() => setShowFilters(false)}
            className={`${!showFilters ? 'text-ig-link border-ig-primary-text' : 'border-ig-primary-text/30 text-ig-link/30'} w-full cursor-pointer border-b py-[10px] text-sm font-semibold`}
          >
            Adjustments
          </button>
        </div>

        {showFilters ? (
          <>
            <div className='grid grid-cols-3 gap-4 p-4'>
              {filters.map((filter) => (
                <button
                  key={filter.name}
                  className='flex cursor-pointer flex-col items-center justify-center'
                  onClick={() => setSelectedFilter(filter)}
                >
                  <div
                    className={`${selectedFilter.name === filter.name && 'border-ig-primary-button'} border-ig-elevated-background overflow-hidden rounded-sm border-2`}
                  >
                    <img
                      src='/filters-image.jpg'
                      alt=''
                      className={`h-[88px] w-[84px]`}
                      style={{ filter: filter.filterStyle }}
                    />
                  </div>
                  <span
                    className={`${selectedFilter.name === filter.name ? 'text-ig-primary-button' : 'text-ig-secondary-text'} mt-2 text-center text-xs`}
                  >
                    {filter.name}
                  </span>
                </button>
              ))}
            </div>

            {selectedFilter.name !== 'Original' && (
              <div className='flex items-center justify-center p-4'>
                <input
                  type='range'
                  min={0}
                  max={100}
                  value={filterStrengths[selectedFilter.name]}
                  onChange={(e) =>
                    handleStrengthChange(
                      selectedFilter.name,
                      Number(e.target.value),
                    )
                  }
                  className='[&::-webkit-slider-thumb]:bg-ig-primary-text bg-ig-primary-text h-[2px] grow appearance-none rounded-lg [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-none'
                />
                <span className='text-ig-primary-text ml-4 text-xs'>
                  {filterStrengths[selectedFilter.name]}
                </span>
              </div>
            )}
          </>
        ) : (
          <div className='mb-4'>
            {adjustmentValues.map((adjustment) => (
              <div key={adjustment.name} className='mb-1 px-4'>
                <div className='text-ig-primary-text py-4'>
                  {adjustment.name}
                </div>
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
        )}
      </div>
    </>
  );
};
