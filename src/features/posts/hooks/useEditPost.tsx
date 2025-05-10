import { useEditPostStore } from '@/features/posts/store/edit-post-store';
import { Filter } from '@/features/posts/utils/filters';

export const useEditPost = () => {
  const { selectedFilters, setSelectedFilters } = useEditPostStore();

  const setFilterAt = (index: number, filter: Filter) => {
    if (index < 0 || index >= selectedFilters.length) return;

    const updated = [...selectedFilters];
    updated[index] = filter;

    setSelectedFilters(updated);
  };

  return { setFilterAt };
};
