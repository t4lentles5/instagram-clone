import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSidebarStore } from '@/features/sidebar/stores/sidebar-store';
import { useSearchStore } from '../stores/search-store';
import { useDebounce } from './useDebounce';

import { getAuthenticatedUser } from '@/features/auth/actions/get-authenticated-user';
import { searchUsers } from '../actions/search-users';
import { getRecentSearches } from '../actions/get-recent-searches';
import { deleteAllRecentSearches } from '../actions/delete-all-recent-searches';
import { deleteRecentSearch } from '../actions/delete-recent-search';
import { addRecentSearch } from '../actions/add-recent-search';

export const useSearch = () => {
  const { isSearchActive, isSidebarCollapsed, toggleSearch } =
    useSidebarStore();
  const { query } = useSearchStore();
  const pathname = usePathname();
  const queryClient = useQueryClient();

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

  const { data: user } = useQuery({
    queryKey: ['authenticated-user'],
    queryFn: () => getAuthenticatedUser(),
  });

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

  return {
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
  };
};
