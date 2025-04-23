import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type UserState = {
  userId: string;
  setUserId: (id: string) => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      userId: '',
      setUserId: (id) => set({ userId: id }),
    }),
    {
      name: 'user-id',
    },
  ),
);
