import { create } from "zustand";
import { MODULES, TIENDA_BLOCK_IDS } from "@/lib/data/modules";

interface FunctionsState {
  /** Mapa id → activo. */
  active: Record<string, boolean>;
  isActive: (id: string) => boolean;
  toggle: (id: string) => void;
  /** Activa/desactiva el bloque entero de Tienda. */
  toggleTienda: (next?: boolean) => void;
  isTiendaActive: () => boolean;
}

const initialActive = MODULES.reduce<Record<string, boolean>>((acc, m) => {
  acc[m.id] = m.defaultActive;
  return acc;
}, {});

export const useFunctionsStore = create<FunctionsState>((set, get) => ({
  active: initialActive,
  isActive: (id) => !!get().active[id],
  toggle: (id) => {
    if (TIENDA_BLOCK_IDS.includes(id)) {
      // No permitimos toggle individual dentro del bloque Tienda
      get().toggleTienda();
      return;
    }
    set({ active: { ...get().active, [id]: !get().active[id] } });
  },
  isTiendaActive: () => {
    const a = get().active;
    return TIENDA_BLOCK_IDS.every((id) => a[id]);
  },
  toggleTienda: (next) => {
    const a = get().active;
    const target =
      next ?? !TIENDA_BLOCK_IDS.every((id) => a[id]);
    const patch: Record<string, boolean> = {};
    TIENDA_BLOCK_IDS.forEach((id) => (patch[id] = target));
    set({ active: { ...a, ...patch } });
  },
}));
