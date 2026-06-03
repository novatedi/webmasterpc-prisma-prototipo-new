import { create } from "zustand";
import { resenasSeed } from "@/lib/data/consultas-resenas";
import type {
  ResenaCompleta,
  ResenaStatus,
} from "@/lib/data/consultas-resenas";

interface ResenasState {
  items: ResenaCompleta[];
  selectedId: string | null;
  select: (id: string | null) => void;
  setStatus: (id: string, status: ResenaStatus) => void;
  toggleFeatured: (id: string) => void;
  update: (id: string, patch: Partial<ResenaCompleta>) => void;
  remove: (id: string) => void;
}

export const useResenasStore = create<ResenasState>((set, get) => ({
  items: [...resenasSeed],
  selectedId: resenasSeed[0]?.id ?? null,
  select: (id) => set({ selectedId: id }),
  setStatus: (id, status) =>
    set({
      items: get().items.map((r) => (r.id === id ? { ...r, status } : r)),
    }),
  toggleFeatured: (id) =>
    set({
      items: get().items.map((r) =>
        r.id === id ? { ...r, featured: !r.featured } : r,
      ),
    }),
  update: (id, patch) =>
    set({
      items: get().items.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }),
  remove: (id) =>
    set({
      items: get().items.filter((r) => r.id !== id),
      selectedId:
        get().selectedId === id
          ? get().items.find((r) => r.id !== id)?.id ?? null
          : get().selectedId,
    }),
}));
