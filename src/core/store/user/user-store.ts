import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  email: string;
  password: string;
  id: string;
  fullname: string;
  username: string;
  profile_photo: string | null;
  profile_photo_id: string | null;
  bio: string | null;
}

type AuthenticatedUserState = {
  authenticatedUser: User;
  setAuthenticatedUser: (user: User) => void;
  resetAuthenticatedUser: () => void;
};

export const useUserStore = create<AuthenticatedUserState>()(
  persist(
    (set) => ({
      authenticatedUser: {
        email: '',
        password: '',
        id: '',
        fullname: '',
        username: '',
        profile_photo: null,
        profile_photo_id: null,
        bio: null,
      },
      setAuthenticatedUser: (user) => set({ authenticatedUser: user }),
      resetAuthenticatedUser: () =>
        set({
          authenticatedUser: {
            email: '',
            password: '',
            id: '',
            fullname: '',
            username: '',
            profile_photo: null,
            profile_photo_id: null,
            bio: null,
          },
        }),
    }),
    {
      name: 'authenticatedUser-storage',
    },
  ),
);
