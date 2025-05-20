import { usePathname } from 'next/navigation';

import { SearchSidebarIcon } from '@/features/sidebar/icons';
import { useSearch } from '../hooks/useSearch';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import {
  getRecentSearches,
  deleteAllRecentSearches,
  deleteRecentSearch,
} from '../actions/recent-searches';
import { SearchInput } from './SearchInput';
import { SearchResults } from './SearchResults';
import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import Link from 'next/link';
import { XIcon } from '@/core/shared/icons';
import { searchUsers } from '../actions/search-users';
import { addRecentSearch } from '../actions/recent-searches';
import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';

export const SearchButton = () => {
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const {
    isActive,
    isSearchActive,
    isSidebarCollapsed,
    toggleSearch,
    searchRef,
    buttonRef,
  } = useSearch();

  const { data: user } = useQuery({
    queryKey: ['authenticated-user'],
    queryFn: () => getAuthenticatedUser(),
  });

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  const {
    data: users = [],
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ['search-users', debouncedQuery],
    queryFn: () => searchUsers(debouncedQuery),
    enabled: !!debouncedQuery,
    staleTime: 1000 * 60,
  });

  const { data: recentSearches = [] } = useQuery({
    queryKey: ['recent-searches'],
    queryFn: () => getRecentSearches(),
    enabled: !!user,
    staleTime: 1000 * 60,
  });

  const deleteAllRecentSearchesMutation = useMutation({
    mutationFn: () => deleteAllRecentSearches(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recent-searches'] });
    },
  });

  const deleteRecentSearchMutation = useMutation({
    mutationFn: (searchedUserId: string) => deleteRecentSearch(searchedUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recent-searches'] });
    },
  });

  const addRecentSearchMutation = useMutation({
    mutationFn: (userId: string) => addRecentSearch(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recent-searches'] });
    },
  });

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ['recent-searches'] });
  }, [user?.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

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
        <div
          ref={searchRef}
          className={`border-ig-separator bg-ig-primary-background absolute bottom-0 left-[73px] flex h-screen w-[400px] flex-col justify-start overflow-hidden rounded-lg border-r py-2`}
        >
          <div className={`flex flex-col ${query.length === 0 && 'pb-6'}`}>
            <h3 className='my-2 pt-2 pr-[14px] pb-8 pl-6 text-2xl font-semibold'>
              Search
            </h3>

            <SearchInput
              query={query}
              handleChange={handleChange}
              setQuery={setQuery}
              isLoading={isLoading}
            />
          </div>

          <div
            className={`${query.length === 0 && 'border-ig-separator border-t'} flex h-full w-full flex-col overflow-y-auto pt-3`}
          >
            {query.length === 0 && (
              <>
                <div className='mx-6 mt-2 mb-2 flex items-center justify-between'>
                  <h4 className='font-semibold'>Recent</h4>

                  {recentSearches.length > 0 && (
                    <button
                      onClick={() => deleteAllRecentSearchesMutation.mutate()}
                      className='text-ig-primary-button active:text-ig-primary-button-pressed hover:text-ig-link cursor-pointer text-sm font-semibold'
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {recentSearches.map((item) => (
                  <div
                    key={item.id}
                    className='hover:bg-ig-hover-overlay my-2 flex items-center justify-between px-6 py-2'
                  >
                    <Link
                      className='flex w-full items-center gap-3'
                      href={`/${item.searchedUser.username}`}
                      onClick={() => {
                        toggleSearch();
                      }}
                    >
                      <ProfilePhoto
                        profile_photo={item.searchedUser.profile_photo}
                        imageSize={{ size: 'w-10' }}
                        backgroundDivSize={{ size: 'w-[44px]' }}
                        borderDivSize={{ size: 'w-[48px]' }}
                      />
                      <div className='flex flex-col items-start'>
                        {' '}
                        <p className='text-ig-primary-text text-sm font-semibold'>
                          {item.searchedUser.username}
                        </p>
                        <p className='text-ig-secondary-text w-full truncate text-sm'>
                          {item.searchedUser.fullname}
                        </p>
                      </div>
                    </Link>
                    <button
                      className='text-ig-secondary-text cursor-pointer'
                      onClick={() =>
                        deleteRecentSearchMutation.mutate(item.searchedUserId)
                      }
                    >
                      <XIcon size={16} />
                    </button>
                  </div>
                ))}
              </>
            )}

            {query.length === 0 && recentSearches.length === 0 && (
              <div className='flex h-full w-full items-center justify-center'>
                <p className='text-ig-secondary-text text-center text-sm font-semibold'>
                  No recent searches.
                </p>
              </div>
            )}

            {query.length > 0 && (
              <SearchResults
                users={users}
                isLoading={isLoading}
                isFetched={isFetched}
                toggleSearch={toggleSearch}
                setQuery={setQuery}
                addRecentSearchMutation={addRecentSearchMutation}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
