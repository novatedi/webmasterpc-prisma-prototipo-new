import { create } from "zustand";
import { articlesSeed } from "@/lib/data/articles";
import type { Article } from "@/lib/data/articles";
import type { ID } from "@/lib/data/types";

interface ArticlesState {
  items: Article[];
  getById: (id: ID) => Article | undefined;
  add: (a: Article) => void;
  update: (id: ID, patch: Partial<Article>) => void;
  remove: (id: ID) => void;
  reorder: (ids: ID[]) => void;
}

export const useArticlesStore = create<ArticlesState>((set, get) => ({
  items: [...articlesSeed],
  getById: (id) => get().items.find((a) => a.id === id),
  add: (a) => set({ items: [a, ...get().items] }),
  update: (id, patch) =>
    set({
      items: get().items.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    }),
  remove: (id) => set({ items: get().items.filter((a) => a.id !== id) }),
  reorder: (ids) =>
    set({
      items: ids
        .map((id) => get().items.find((a) => a.id === id))
        .filter(Boolean) as Article[],
    }),
}));
