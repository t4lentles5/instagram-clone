import Link from 'next/link';
import { Dispatch, SetStateAction } from 'react';
import { SearchResult } from '@/features/sidebar/interfaces/search-result';
import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { UseMutationResult } from '@tanstack/react-query';

interface Props {
  users: SearchResult[];
  isLoading: boolean;
  isFetched: boolean;
  toggleSearch: () => void;
  setQuery: Dispatch<SetStateAction<string>>;
  addRecentSearchMutation: UseMutationResult<void, Error, string, unknown>;
}

export const SearchResults = ({
  users,
  isLoading,
  isFetched,
  toggleSearch,
  setQuery,
  addRecentSearchMutation,
}: Props) => {
  return (
    <>
      {isLoading
        ? Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className='flex w-full animate-pulse items-center gap-3 px-6 py-2'
            >
              <div className='h-10 w-10 rounded-full bg-gray-200'></div>
              <div className='flex flex-col items-center'>
                <div className='h-4 w-36 rounded bg-gray-200'></div>
                <div className='mt-1 h-3 w-24 rounded bg-gray-200'></div>
              </div>
            </div>
          ))
        : users.length > 0
          ? users.map((user) => (
              <Link
                key={user.id}
                className='hover:bg-ig-hover-overlay flex w-full items-center gap-3 px-6 py-2'
                href={`/${user.username}`}
                onClick={() => {
                  toggleSearch();
                  setQuery('');
                  addRecentSearchMutation.mutate(user.id);
                }}
              >
                <ProfilePhoto
                  profile_photo={user.profile_photo}
                  imageSize={{
                    size: 'w-10',
                  }}
                  backgroundDivSize={{
                    size: 'w-[44px]',
                  }}
                  borderDivSize={{
                    size: 'w-[48px]',
                  }}
                />

                <div className='flex flex-col items-center'>
                  <p className='text-ig-primary-text text-sm font-semibold'>
                    {user.fullname}
                  </p>
                  <p className='text-ig-secondary-text w-full truncate text-sm'>
                    @{user.username}
                  </p>
                </div>
              </Link>
            ))
          : isFetched && (
              <div className='flex h-full w-full items-center justify-center'>
                <p className='text-ig-secondary-text text-center text-sm'>
                  No results found.
                </p>
              </div>
            )}
    </>
  );
};
