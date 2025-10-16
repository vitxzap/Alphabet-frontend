import { create } from "zustand";

interface UserStoreSchema {
  user: {
    id?: string;
    createdAt?: Date;
    updatedAt?: Date;
    email?: string;
    emailVerified?: boolean;
    name?: string;
    image?: string | null | undefined;
},
  setUser: (user: any) => void;
}

export const useUserStore = create<UserStoreSchema>()((set) => ({
  user: {},
  setUser: (user: any) => set({ user: user }),
}));
