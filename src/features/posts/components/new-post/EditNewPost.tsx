import { useEditPostStore } from '@/features/posts/store/edit-post-store';
import { Filters } from './Filters';
import { Adjustments } from './Adjustments';

export const EditNewPost = () => {
  const { editState, setEditState } = useEditPostStore();

  return (
    <>
      <div className='bg-ig-elevated-background border-ig-elevated-separator flex w-[340px] flex-col overflow-auto border-l'>
        <div className='flex'>
          <button
            onClick={() => setEditState('filters')}
            className={`${editState === 'filters' ? 'text-ig-link border-ig-primary-text' : 'border-ig-primary-text/30 text-ig-link/30'} w-full cursor-pointer border-b py-[10px] text-sm font-semibold`}
          >
            Filters
          </button>
          <button
            onClick={() => setEditState('adjustments')}
            className={`${editState === 'adjustments' ? 'text-ig-link border-ig-primary-text' : 'border-ig-primary-text/30 text-ig-link/30'} w-full cursor-pointer border-b py-[10px] text-sm font-semibold`}
          >
            Adjustments
          </button>
        </div>

        {editState === 'filters' ? <Filters /> : <Adjustments />}
      </div>
    </>
  );
};
