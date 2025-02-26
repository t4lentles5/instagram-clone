import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type SidebarState = {
  isSidebarCollapsed: boolean;
  isSearchActive: boolean;
  isNotificationsActive: boolean;
  toggleSearch: () => void;
  toggleNotifications: () => void;
};

export const useSidebarStore = create<SidebarState>()(
  devtools(
    (set) => ({
      isSidebarCollapsed: false,
      isSearchActive: false,
      isNotificationsActive: false,
      toggleSearch: () =>
        set((state) => ({
          isSidebarCollapsed: !state.isSidebarCollapsed,
          isSearchActive: !state.isSearchActive,
          isNotificationsActive: false,
        })),
      toggleNotifications: () =>
        set((state) => ({
          isSidebarCollapsed: !state.isSidebarCollapsed,
          isSearchActive: false,
          isNotificationsActive: !state.isNotificationsActive,
        })),
    }),
    { name: 'SidebarStore' }
  )
);
