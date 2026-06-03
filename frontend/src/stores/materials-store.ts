import { create } from "zustand";
import { materials as seed } from "@/lib/data/materials";
import type { Material, ID } from "@/lib/data/types";

interface MaterialsState {
  items: Material[];
  add: (name: string) => Material;
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

export const useMaterialsStore = create<MaterialsState>((set, get) => ({
  items: [...seed].sort((a, b) => a.order - b.order),
  add: (name) => {
    const items = get().items;
    const m: Material = {
      id: `mat-${Date.now()}`,
      name: name.trim() || "Sin nombre",
      slug: slugify(name) || `mat-${Date.now()}`,
      active: true,
      order: items.length,
    };
    set({ items: [...items, m] });
    return m;
  },
  rename: (id, name) =>
    set({
      items: get().items.map((m) =>
        m.id === id
          ? { ...m, name: name.trim() || m.name, slug: slugify(name) || m.slug }
          : m,
      ),
    }),
  toggleActive: (id) =>
    set({
      items: get().items.map((m) =>
        m.id === id ? { ...m, active: !m.active } : m,
      ),
    }),
  remove: (id) =>
    set({ items: get().items.filter((m) => m.id !== id) }),
  reorder: (orderedIds) => {
    const map = new Map(get().items.map((m) => [m.id, m]));
    const next = orderedIds
      .map((id, i) => {
        const it = map.get(id);
        return it ? { ...it, order: i } : null;
      })
      .filter(Boolean) as Material[];
    set({ items: next });
  },
}));
