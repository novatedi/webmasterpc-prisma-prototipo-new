import { create } from "zustand";

interface ZoneState {
  activeZone: string;
  setActiveZone: (id: string) => void;
}

/** Zona activa del shell de 2 niveles. Por defecto "Web". */
export const useZoneStore = create<ZoneState>((set) => ({
  activeZone: "web",
  setActiveZone: (id) => set({ activeZone: id }),
}));
