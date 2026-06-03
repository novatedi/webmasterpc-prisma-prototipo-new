import { create } from "zustand";
import { consultasSeed } from "@/lib/data/consultas-resenas";
import type { Consulta, ConsultaStatus } from "@/lib/data/consultas-resenas";

interface ConsultasState {
  items: Consulta[];
  selectedId: string | null;
  select: (id: string | null) => void;
  markRead: (id: string) => void;
  setStatus: (id: string, status: ConsultaStatus) => void;
  remove: (id: string) => void;
}

export const useConsultasStore = create<ConsultasState>((set, get) => ({
  items: [...consultasSeed],
  selectedId: consultasSeed[0]?.id ?? null,
  select: (id) => {
    set({ selectedId: id });
    if (id) get().markRead(id);
  },
  markRead: (id) =>
    set({
      items: get().items.map((c) => (c.id === id ? { ...c, read: true } : c)),
    }),
  setStatus: (id, status) =>
    set({
      items: get().items.map((c) =>
        c.id === id ? { ...c, status, read: true } : c,
      ),
    }),
  remove: (id) =>
    set({
      items: get().items.filter((c) => c.id !== id),
      selectedId:
        get().selectedId === id
          ? get().items.find((c) => c.id !== id)?.id ?? null
          : get().selectedId,
    }),
}));
