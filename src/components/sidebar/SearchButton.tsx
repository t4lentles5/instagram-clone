import { useSidebarStore } from '@/store/ui/sidebarStore';
import { usePathname } from 'next/navigation';
import { MagnifyingGlass } from 'phosphor-react';
import { useEffect, useRef } from 'react';

export const SearchButton = () => {
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const buttonSearchRef = useRef<HTMLButtonElement>(null);
  const { isSidebarCollapsed, isSearchActive, toggleSearch, resetSidebar } =
    useSidebarStore();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonSearchRef.current &&
      !buttonSearchRef.current.contains(event.target as Node) &&
      searchRef.current &&
      !searchRef.current.contains(event.target as Node)
    ) {
      resetSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        className='flex items-center w-full justify-start gap-4 p-3 transition-all duration-400 rounded-lg hover:bg-hover'
        onClick={toggleSearch}
        ref={buttonSearchRef}
      >
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

      <div
        ref={searchRef}
        className={`${
          isSearchActive && isSidebarCollapsed
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-x-2 pointer-events-none'
        } w-[400px] border-separator border-r absolute bottom-0 z-50 flex flex-col justify-start gap-4 h-screen overflow-hidden rounded-lg left-[72px] bg-background transform origin-left transition-all duration-400 ease-in-out`}
      >
        Search
      </div>
    </>
  );
};
