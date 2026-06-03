import { create } from "zustand";
import type { ReactNode } from "react";

interface TopbarActionsState {
  /** Acciones (botones, etc.) inyectadas por la página actual al lado del toggle del topbar. */
  node: ReactNode | null;
  set: (n: ReactNode | null) => void;
  clear: () => void;
}

export const useTopbarActions = create<TopbarActionsState>((set) => ({
  node: null,
  set: (n) => set({ node: n }),
  clear: () => set({ node: null }),
}));
