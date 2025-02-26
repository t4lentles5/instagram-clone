import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type SidebarState = {
  isSidebarCollapsed: boolean;
  isSearchActive: boolean;
  isNotificationsActive: boolean;
  toggleSearch: () => void;
  toggleNotifications: () => void;
  resetSidebar: () => void;
};

export const useSidebarStore = create<SidebarState>()(
  devtools(
    (set) => ({
      isSidebarCollapsed: false,
      isSearchActive: false,
      isNotificationsActive: false,
      toggleSearch: () =>
        set((state) => {
          const newSearchActive = !state.isSearchActive;
          return {
            isSearchActive: newSearchActive,
            isNotificationsActive: false,
            isSidebarCollapsed: newSearchActive,
          };
        }),
      toggleNotifications: () =>
        set((state) => {
          const newNotificationsActive = !state.isNotificationsActive;
          return {
            isNotificationsActive: newNotificationsActive,
            isSearchActive: false,
            isSidebarCollapsed: newNotificationsActive,
          };
        }),

      resetSidebar: () =>
        set(() => ({
          isSidebarCollapsed: false,
          isSearchActive: false,
          isNotificationsActive: false,
        })),
    }),
    { name: 'SidebarStore' }
  )
);
