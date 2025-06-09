import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { useSearchStore } from '@/features/search/stores/search-store';

import { SearchIcon } from '@/features/sidebar/icons';
import XIcon from '@/core/shared/icons/XIcon';
import styles from './search-loader.module.css';

export const SearchInput = ({
  query,
  isLoading,
}: {
  query: string;
  isLoading: boolean;
}) => {
  const { setQuery } = useSearchStore();

  const [isActive, setIsActive] = useState(true);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={inputRef} className='relative mx-4'>
      {isActive ? (
        <>
          <input
            type='text'
            placeholder='Search'
            value={query}
            autoFocus
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setQuery(e.target.value);
            }}
            className={`bg-ig-elevated-highlight-background relative flex w-full justify-between rounded-lg border-none py-2 pl-4 text-sm/6 focus:outline-none`}
          />

          {isLoading ? (
            <div className={`${styles.loader} absolute top-3 right-4`} />
          ) : (
            <span
              className={`bg-ig-secondary-text/50 text-ig-primary-background/80 absolute top-3 right-4 flex h-4 w-4 transform cursor-pointer items-center justify-center rounded-full`}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setQuery('');
                setIsActive(false);
              }}
            >
              <XIcon size={8} />
            </span>
          )}
        </>
      ) : (
        <div
          onClick={() => {
            setIsActive(true);
          }}
          className='bg-ig-elevated-highlight-background text-ig-secondary-text flex cursor-text items-center gap-2 rounded-lg py-2 pl-4'
        >
          <SearchIcon />
          <p>{query.length > 0 ? query : 'Search'}</p>
        </div>
      )}
    </div>
  );
};
