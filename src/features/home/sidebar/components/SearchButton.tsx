import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useSidebarStore } from '@/store/ui/sidebar-store';
import { SearchFillIcon } from '@/assets/icons/sidebar/sidebar-nav/search/SearchFillIcon';
import { SearchIcon } from '@/assets/icons/sidebar/sidebar-nav/search/SearchIcon';

export const SearchButton = () => {
  const pathname = usePathname();
  const { isSidebarCollapsed, isSearchActive, toggleSearch } =
    useSidebarStore();
  const searchRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        buttonRef.current.contains(event.target as Node)
      ) {
        return;
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        if (isSearchActive) {
          toggleSearch();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchActive, toggleSearch]);

  return (
    <>
      <div className="hidden h-12 items-center justify-center md:flex md:h-14 md:w-full">
        <button
          ref={buttonRef}
          className="hover:bg-background-hover hidden w-full cursor-pointer items-center justify-start gap-4 rounded-lg p-3 md:flex"
          onClick={toggleSearch}
        >
          {pathname === `/search` || isSearchActive ? (
            <SearchFillIcon />
          ) : (
            <SearchIcon />
          )}
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
          className={`border-border bg-background absolute bottom-0 left-[73px] flex h-screen w-[400px] flex-col justify-start gap-4 overflow-hidden rounded-lg border-r`}
        >
          Search
        </div>
      )}
    </>
  );
};
