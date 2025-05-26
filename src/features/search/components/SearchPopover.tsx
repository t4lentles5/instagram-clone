import Link from 'next/link';

import { UseMutationResult } from '@tanstack/react-query';
import { useModal } from '@/core/shared/hooks/useModal';
import { useSearchStore } from '@/features/search/stores/search-store';

import { ProfilePhoto } from '@/core/shared/components/ProfilePhoto';
import { Modal } from '@/core/shared/components/Modal';
import { SearchResults } from '@/features/sidebar/components/SearchResults';
import { SearchInput } from './SearchInput';

import { XIcon } from '@/core/shared/icons';

export const SearchPopover = ({
  searchRef,
  toggleSearch,
  users,
  isLoading,
  isFetched,
  recentSearches,
  deleteAllRecentSearchesMutation,
  deleteRecentSearchMutation,
  addRecentSearchMutation,
}: {
  searchRef: React.RefObject<HTMLDivElement | null>;
  toggleSearch: () => void;
  users: {
    id: string;
    profile_photo: string | null;
    fullname: string;
    username: string;
  }[];
  isLoading: boolean;
  isFetched: boolean;
  recentSearches: {
    id: string;
    createdAt: Date;
    searchedUserId: string;
    searchedUser: {
      id: string;
      profile_photo: string | null;
      fullname: string;
      username: string;
    };
  }[];
  deleteAllRecentSearchesMutation: UseMutationResult<
    void,
    Error,
    void,
    unknown
  >;
  deleteRecentSearchMutation: UseMutationResult<void, unknown, string, unknown>;
  addRecentSearchMutation: UseMutationResult<void, Error, string, unknown>;
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  const { query } = useSearchStore();

  return (
    <>
      <div
        ref={searchRef}
        className={`border-ig-separator bg-ig-primary-background absolute bottom-0 left-[73px] flex h-screen w-[400px] flex-col justify-start overflow-hidden rounded-lg border-r py-2`}
      >
        <div className={`flex flex-col ${query.length === 0 && 'pb-6'}`}>
          <h3 className='my-2 pt-2 pr-[14px] pb-8 pl-6 text-2xl font-semibold'>
            Search
          </h3>

          <SearchInput query={query} isLoading={isLoading} />
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
                    onClick={() => {
                      openModal();
                    }}
                    className='text-ig-primary-button active:text-ig-primary-button-pressed hover:text-ig-link cursor-pointer text-sm font-semibold'
                  >
                    Clear all
                  </button>
                )}

                {isOpen && (
                  <Modal isOpen={isOpen} closeModal={closeModal}>
                    <div className='flex w-[400px] flex-col items-center text-center'>
                      <div className='px-8 py-6'>
                        <h3 className='text-ig-primary-text mb-1 text-xl'>
                          Clear search history?
                        </h3>
                        <p className='text-ig-secondary-text text-sm'>
                          You won&apos;t be able to undo this. If you clear your
                          search history, you may still see accounts you&apos;ve
                          searched for as suggested results.
                        </p>
                      </div>

                      <div className='border-ig-elevated-separator flex w-full flex-col border-t'>
                        <button
                          className='text-ig-badge h-12 w-full cursor-pointer px-2 py-1 text-sm font-bold'
                          onClick={() => {
                            deleteAllRecentSearchesMutation.mutate();
                            closeModal();
                          }}
                        >
                          Clear all
                        </button>

                        <button
                          className='text-ig-primary-text border-ig-elevated-separator h-12 w-full cursor-pointer border-t px-2 py-1 text-sm'
                          onClick={closeModal}
                        >
                          Not now
                        </button>
                      </div>
                    </div>
                  </Modal>
                )}
              </div>

              {recentSearches.map((item) => (
                <div
                  key={item.id}
                  className='hover:bg-ig-hover-overlay flex items-center justify-between px-6 py-2'
                >
                  <Link
                    className='flex w-full items-center gap-3'
                    href={`/${item.searchedUser.username}`}
                    onClick={() => {
                      toggleSearch();
                      addRecentSearchMutation.mutate(item.searchedUserId);
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
              addRecentSearchMutation={addRecentSearchMutation}
            />
          )}
        </div>
      </div>
    </>
  );
};
