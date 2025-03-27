import { useEffect, useRef } from 'react';
import { useSidebarStore } from '@/store/ui/sidebar-store';
import { usePathname } from 'next/navigation';
import { MagnifyingGlass } from 'phosphor-react';

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
      <button ref={buttonRef} className='nav-item' onClick={toggleSearch}>
        <MagnifyingGlass
          size={29}
          weight={isSearchActive || pathname === '/search' ? 'bold' : 'regular'}
        />
        <span
          className={`${isSidebarCollapsed ? 'hidden ' : 'xl:block'} hidden ${
            pathname === `/search` && 'font-bold'
          }`}
        >
          Search
        </span>
      </button>

      {isSearchActive && (
        <div
          ref={searchRef}
          className={`${
            isSearchActive && isSidebarCollapsed
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-x-2 pointer-events-none'
          } w-[400px] border-separator border-r absolute bottom-0 z-50 flex flex-col justify-start gap-4 h-screen overflow-hidden rounded-lg left-[72px] bg-background transform origin-left   ease-in-out`}
        >
          Search
        </div>
      )}
    </>
  );
};
