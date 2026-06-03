import { create } from "zustand";
import { categories as seed } from "@/lib/data/categories";
import type { Category, ID } from "@/lib/data/types";

interface CategoriesState {
  items: Category[];
  add: (name: string) => Category;
  rename: (id: ID, name: string) => void;
  toggleActive: (id: ID) => void;
  remove: (id: ID) => void;
  reorder: (orderedIds: ID[]) => void;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const useCategoriesStore = create<CategoriesState>((set, get) => ({
  items: [...seed].sort((a, b) => a.order - b.order),
  add: (name) => {
    const items = get().items;
    const nc: Category = {
      id: `cat-${Date.now()}`,
      name: name.trim() || "Sin nombre",
      slug: slugify(name) || `cat-${Date.now()}`,
      active: true,
      order: items.length,
    };
    set({ items: [...items, nc] });
    return nc;
  },
  rename: (id, name) =>
    set({
      items: get().items.map((c) =>
        c.id === id ? { ...c, name: name.trim() || c.name, slug: slugify(name) || c.slug } : c,
      ),
    }),
  toggleActive: (id) =>
    set({
      items: get().items.map((c) =>
        c.id === id ? { ...c, active: !c.active } : c,
      ),
    }),
  remove: (id) =>
    set({ items: get().items.filter((c) => c.id !== id) }),
  reorder: (orderedIds) => {
    const map = new Map(get().items.map((c) => [c.id, c]));
    const next = orderedIds
      .map((id, i) => {
        const it = map.get(id);
        return it ? { ...it, order: i } : null;
      })
      .filter(Boolean) as Category[];
    set({ items: next });
  },
}));
