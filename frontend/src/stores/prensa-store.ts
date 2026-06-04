import { create } from "zustand";
import { pressSeed, type PressArticle } from "@/lib/data/prensa";
import type { ID } from "@/lib/data/types";

interface PrensaState {
  items: PressArticle[];
  getById: (id: ID) => PressArticle | undefined;
  add: (a: PressArticle) => void;
  update: (id: ID, patch: Partial<PressArticle>) => void;
  remove: (id: ID) => void;
  reorder: (ids: ID[]) => void;
  toggleVisible: (id: ID) => void;
}

export const usePrensaStore = create<PrensaState>((set, get) => ({
  items: [...pressSeed],
  getById: (id) => get().items.find((a) => a.id === id),
  add: (a) => set({ items: [a, ...get().items] }),
  update: (id, patch) =>
    set({ items: get().items.map((a) => (a.id === id ? { ...a, ...patch } : a)) }),
  remove: (id) => set({ items: get().items.filter((a) => a.id !== id) }),
  reorder: (ids) => {
    const map = new Map(get().items.map((a) => [a.id, a]));
    set({ items: ids.map((id) => map.get(id)).filter(Boolean) as PressArticle[] });
  },
  toggleVisible: (id) =>
    set({
      items: get().items.map((a) =>
        a.id === id ? { ...a, visible: !a.visible } : a,
      ),
    }),
}));
