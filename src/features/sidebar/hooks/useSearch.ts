import { useEffect, useRef } from 'react';
import { useSidebarStore } from '../stores/sidebar-store';
import { usePathname } from 'next/navigation';

export const useSearch = () => {
  const { isSearchActive, isSidebarCollapsed, toggleSearch } =
    useSidebarStore();
  const pathname = usePathname();

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

  const isActive = pathname === '/search' || isSearchActive;

  return {
    isActive,
    isSearchActive,
    isSidebarCollapsed,
    toggleSearch,
    searchRef,
    buttonRef,
  };
};
