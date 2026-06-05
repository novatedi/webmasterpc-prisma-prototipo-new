import { create } from "zustand";
import {
  SECCIONES_SEED,
  type SectionType,
  type Slot,
  type Preset,
} from "@/lib/data/secciones";

interface SeccionesState {
  sections: SectionType[];
  getSection: (id: string) => SectionType | undefined;
  addSection: (section: SectionType) => void;
  updateSlots: (sectionId: string, slots: Slot[]) => void;
  addPreset: (sectionId: string, preset: Preset) => void;
}

export const useSeccionesStore = create<SeccionesState>((set, get) => ({
  sections: SECCIONES_SEED.map((s) => ({ ...s })),

  getSection: (id) => get().sections.find((s) => s.id === id),

  addSection: (section) =>
    set((s) => ({ sections: [section, ...s.sections] })),

  updateSlots: (sectionId, slots) =>
    set((s) => ({
      sections: s.sections.map((sec) =>
        sec.id === sectionId ? { ...sec, slots } : sec,
      ),
    })),

  addPreset: (sectionId, preset) =>
    set((s) => ({
      sections: s.sections.map((sec) =>
        sec.id === sectionId
          ? { ...sec, presets: [...sec.presets, preset] }
          : sec,
      ),
    })),
}));
