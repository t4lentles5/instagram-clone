import { usePathname } from 'next/navigation';

import { useSearch } from '@/features/search/hooks/useSearch';

import { SearchSidebarIcon } from '@/features/sidebar/icons';

import { SearchPopover } from '@/features/search/components/SearchPopover';

export const SearchButton = () => {
  const pathname = usePathname();

  const {
    isActive,
    isSearchActive,
    isSidebarCollapsed,
    toggleSearch,
    searchRef,
    buttonRef,
    query,
    setQuery,
    handleChange,
    users,
    isLoading,
    isFetched,
    recentSearches,
    deleteAllRecentSearchesMutation,
    deleteRecentSearchMutation,
    addRecentSearchMutation,
  } = useSearch();

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

      {isSearchActive && (
        <SearchPopover
          query={query}
          setQuery={setQuery}
          searchRef={searchRef}
          toggleSearch={toggleSearch}
          handleChange={handleChange}
          users={users}
          isLoading={isLoading}
          isFetched={isFetched}
          recentSearches={recentSearches}
          deleteAllRecentSearchesMutation={deleteAllRecentSearchesMutation}
          deleteRecentSearchMutation={deleteRecentSearchMutation}
          addRecentSearchMutation={addRecentSearchMutation}
        />
      )}
    </>
  );
};
