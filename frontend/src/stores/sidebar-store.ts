import { create } from "zustand";

interface SidebarState {
  /** Sección con subsecciones abierta (acordeón). Solo una a la vez. */
  expandedId: string | null;
  /** Colapso de la sidebar entera (icon-only) – futuro. Mantenido por extensibilidad. */
  collapsed: boolean;
  toggleExpanded: (id: string) => void;
  setExpanded: (id: string | null) => void;
  toggleCollapsed: () => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  expandedId: null,
  collapsed: false,
  toggleExpanded: (id) =>
    set({ expandedId: get().expandedId === id ? null : id }),
  setExpanded: (id) => set({ expandedId: id }),
  toggleCollapsed: () => set({ collapsed: !get().collapsed }),
}));
