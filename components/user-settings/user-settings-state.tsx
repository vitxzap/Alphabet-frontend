import { create } from "zustand";

interface UserSettingsSchema {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const useUserSettingsStore = create<UserSettingsSchema>()((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open: open }),
}));
