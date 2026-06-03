import { create } from "zustand";
import { serviciosSeed } from "@/lib/data/servicios";
import type { ServiceBlock } from "@/lib/data/servicios";
import type { ID } from "@/lib/data/types";

interface ServiciosState {
  items: ServiceBlock[];
  getById: (id: ID) => ServiceBlock | undefined;
  add: (b: ServiceBlock) => void;
  update: (id: ID, patch: Partial<ServiceBlock>) => void;
  remove: (id: ID) => void;
  reorder: (orderedIds: ID[]) => void;
  toggleActive: (id: ID) => void;
}

export const useServiciosStore = create<ServiciosState>((set, get) => ({
  items: [...serviciosSeed].sort((a, b) => a.order - b.order),
  getById: (id) => get().items.find((b) => b.id === id),
  add: (b) => set({ items: [...get().items, b] }),
  update: (id, patch) =>
    set({
      items: get().items.map((b) => (b.id === id ? { ...b, ...patch } : b)),
    }),
  remove: (id) => set({ items: get().items.filter((b) => b.id !== id) }),
  reorder: (ids) => {
    const map = new Map(get().items.map((i) => [i.id, i]));
    const next = ids
      .map((id, i) => {
        const it = map.get(id);
        return it ? { ...it, order: i } : null;
      })
      .filter(Boolean) as ServiceBlock[];
    set({ items: next });
  },
  toggleActive: (id) =>
    set({
      items: get().items.map((b) =>
        b.id === id ? { ...b, active: !b.active } : b,
      ),
    }),
}));
