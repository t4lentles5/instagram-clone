import { useEditPostStore } from '@/features/posts/store/edit-post-store';
import { Filters } from './Filters';
import { Adjustments } from './Adjustments';

export const EditNewPost = () => {
  const { showFilters, setShowFilters } = useEditPostStore();

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

        {showFilters ? <Filters /> : <Adjustments />}
      </div>
    </>
  );
};
