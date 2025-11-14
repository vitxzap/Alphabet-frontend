import { create } from "zustand";

interface AuthStoreSchema {
  email: string;
  type: "sign-in" | "forget-password" | "email-verification";
  otp: string;
  setOTP: (otp: string) => void;
  setType: (type: string) => void;
  setEmail: (email: string) => void;
}
export const useAuthStore = create<AuthStoreSchema>()((set) => ({
  email: "",
  type: "sign-in",
  otp: "",
  setType: (type: any) => set({ type: type }),
  setOTP: (otp: string) => set({ otp: otp }),
  setEmail: (email: string) => set({ email: email }),
}));
