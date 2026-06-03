import { create } from "zustand";
import { works as seed } from "@/lib/data/works";
import type { Work, WorkImage, ID } from "@/lib/data/types";

interface WorksState {
  works: Work[];
  getById: (id: ID) => Work | undefined;
  add: (w: Work) => void;
  update: (id: ID, patch: Partial<Work>) => void;
  remove: (id: ID) => void;
  reorderImages: (id: ID, images: WorkImage[]) => void;
}

export const useWorksStore = create<WorksState>((set, get) => ({
  works: [...seed],
  getById: (id) => get().works.find((w) => w.id === id),
  add: (w) => set({ works: [w, ...get().works] }),
  update: (id, patch) =>
    set({
      works: get().works.map((w) => (w.id === id ? { ...w, ...patch } : w)),
    }),
  remove: (id) => set({ works: get().works.filter((w) => w.id !== id) }),
  reorderImages: (id, images) =>
    set({
      works: get().works.map((w) =>
        w.id === id ? { ...w, images, coverUrl: images[0]?.url ?? w.coverUrl } : w,
      ),
    }),
}));
