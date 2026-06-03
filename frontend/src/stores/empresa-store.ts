import { create } from "zustand";
import { empresaSeed } from "@/lib/data/empresa";
import type {
  EmpresaData,
  HistoriaBlock,
  BiografiaBlock,
  FilosofiaBlock,
  EstadisticasBlock,
  ProcesoBlock,
  ContactoBlock,
  RedesBlock,
} from "@/lib/data/empresa";

interface EmpresaState extends EmpresaData {
  updateHistoria: (patch: Partial<HistoriaBlock>) => void;
  updateBiografia: (patch: Partial<BiografiaBlock>) => void;
  updateFilosofia: (patch: Partial<FilosofiaBlock>) => void;
  updateEstadisticas: (patch: Partial<EstadisticasBlock>) => void;
  updateProceso: (patch: Partial<ProcesoBlock>) => void;
  updateContacto: (patch: Partial<ContactoBlock>) => void;
  updateRedes: (patch: Partial<RedesBlock>) => void;
}

export const useEmpresaStore = create<EmpresaState>((set) => ({
  ...empresaSeed,
  updateHistoria: (patch) =>
    set((s) => ({ historia: { ...s.historia, ...patch } })),
  updateBiografia: (patch) =>
    set((s) => ({ biografia: { ...s.biografia, ...patch } })),
  updateFilosofia: (patch) =>
    set((s) => ({ filosofia: { ...s.filosofia, ...patch } })),
  updateEstadisticas: (patch) =>
    set((s) => ({ estadisticas: { ...s.estadisticas, ...patch } })),
  updateProceso: (patch) =>
    set((s) => ({ proceso: { ...s.proceso, ...patch } })),
  updateContacto: (patch) =>
    set((s) => ({ contacto: { ...s.contacto, ...patch } })),
  updateRedes: (patch) => set((s) => ({ redes: { ...s.redes, ...patch } })),
}));
