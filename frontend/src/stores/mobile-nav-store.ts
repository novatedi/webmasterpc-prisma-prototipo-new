import { create } from "zustand";

interface MobileNavState {
  open: boolean;
  setOpen: (o: boolean) => void;
  toggle: () => void;
}

/** Estado del cajón lateral (sheet) en móvil. */
export const useMobileNavStore = create<MobileNavState>((set, get) => ({
  open: false,
  setOpen: (o) => set({ open: o }),
  toggle: () => set({ open: !get().open }),
}));
