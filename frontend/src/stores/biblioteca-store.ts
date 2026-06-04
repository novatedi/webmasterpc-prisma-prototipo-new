import { create } from "zustand";
import { photosSeed, type Photo } from "@/lib/data/biblioteca";
import type { ID } from "@/lib/data/types";

interface BibliotecaState {
  photos: Photo[];
  selectedId: ID | null;
  select: (id: ID | null) => void;
  add: (p: Photo) => void;
  update: (id: ID, patch: Partial<Photo>) => void;
  remove: (id: ID) => void;
}

export const useBibliotecaStore = create<BibliotecaState>((set, get) => ({
  photos: [...photosSeed],
  selectedId: photosSeed[0]?.id ?? null,
  select: (id) => set({ selectedId: id }),
  add: (p) => set({ photos: [p, ...get().photos] }),
  update: (id, patch) =>
    set({
      photos: get().photos.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    }),
  remove: (id) =>
    set({
      photos: get().photos.filter((p) => p.id !== id),
      selectedId:
        get().selectedId === id
          ? get().photos.find((p) => p.id !== id)?.id ?? null
          : get().selectedId,
    }),
}));
