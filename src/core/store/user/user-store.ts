import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  userId: string;
  setUserId: (id: string) => void;
  resetUserId: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: '',
      setUserId: (id) => set({ userId: id }),
      resetUserId: () => set({ userId: '' }),
    }),
    {
      name: 'user-id',
    },
  ),
);
