import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { useSearch } from '@/features/search/hooks/useSearch';

import { SearchSidebarIcon } from '@/features/sidebar/icons';

import { SearchPopover } from '@/features/search/components/SearchPopover';
import { useSearchStore } from '@/features/search/stores/search-store';

import styles from '@/features/sidebar/components/toggle-sidebar.module.css';

export const SearchButton = () => {
  const pathname = usePathname();
  const [showPopover, setShowPopover] = useState(false);

  const {
    isActive,
    isSearchActive,
    isSidebarCollapsed,
    toggleSearch,
    searchRef,
    buttonRef,
    users,
    isLoading,
    isFetched,
    recentSearches,
    deleteAllRecentSearchesMutation,
    deleteRecentSearchMutation,
    addRecentSearchMutation,
  } = useSearch();

  const { setQuery } = useSearchStore();

  useEffect(() => {
    if (isSearchActive) {
      setShowPopover(true);
    } else {
      const timeout = setTimeout(() => setShowPopover(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [isSearchActive]);

  return (
    <>
      <div className='hidden h-12 items-center justify-center md:flex md:h-14 md:w-full'>
        <button
          ref={buttonRef}
          className={`${isSidebarCollapsed && isSearchActive && 'border-grey-2 border'} hover:bg-ig-hover-overlay active:bg-ig-active-overlay active:text-ig-primary-text/50 flex cursor-pointer items-center justify-start gap-4 rounded-lg p-3 active:scale-95 md:w-full`}
          onClick={() => {
            toggleSearch();
            setQuery('');
          }}
        >
          <SearchSidebarIcon isActive={isActive} />
          <span
            className={`${
              isSidebarCollapsed ? 'hidden' : 'xl:block'
            } hidden leading-5 ${pathname === `/search` && 'font-bold'}`}
          >
            Search
          </span>
        </button>
      </div>

      {showPopover && (
        <SearchPopover
          searchRef={searchRef}
          toggleSearch={toggleSearch}
          users={users}
          isLoading={isLoading}
          isFetched={isFetched}
          recentSearches={recentSearches}
          deleteAllRecentSearchesMutation={deleteAllRecentSearchesMutation}
          deleteRecentSearchMutation={deleteRecentSearchMutation}
          addRecentSearchMutation={addRecentSearchMutation}
          className={
            isSearchActive ? styles['popover-enter'] : styles['popover-exit']
          }
        />
      )}
    </>
  );
};
