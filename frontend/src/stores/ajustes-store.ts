import { create } from "zustand";
import {
  ajustesSeed,
  type AjustesData,
  type AjustesIdentidad,
  type AjustesDominio,
  type AjustesGeneral,
} from "@/lib/data/ajustes";

interface AjustesState extends AjustesData {
  updateIdentidad: (patch: Partial<AjustesIdentidad>) => void;
  updateDominio: (patch: Partial<AjustesDominio>) => void;
  updateGeneral: (patch: Partial<AjustesGeneral>) => void;
  /** Aplica identidad (color + fuente) al panel entero. */
  applyIdentityGlobally: () => void;
}

function hexToHslVar(hex: string): string {
  // Convierte un #RRGGBB a "H S% L%" para usar con var(--primary)
  const cleanHex = hex.replace("#", "");
  const r = parseInt(cleanHex.slice(0, 2), 16) / 255;
  const g = parseInt(cleanHex.slice(2, 4), 16) / 255;
  const b = parseInt(cleanHex.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }
  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

function applyToDocument(identidad: AjustesIdentidad) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  // Color principal
  root.style.setProperty("--primary", hexToHslVar(identidad.primaryColor));
  // Fuente
  document.body.style.fontFamily = `"${identidad.fontFamily}", ui-rounded, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
}

export const useAjustesStore = create<AjustesState>((set, get) => ({
  ...ajustesSeed,
  updateIdentidad: (patch) =>
    set((s) => ({ identidad: { ...s.identidad, ...patch } })),
  updateDominio: (patch) =>
    set((s) => ({ dominio: { ...s.dominio, ...patch } })),
  updateGeneral: (patch) =>
    set((s) => ({ general: { ...s.general, ...patch } })),
  applyIdentityGlobally: () => applyToDocument(get().identidad),
}));

// Aplicar al cargar (por si guardamos algún día).
if (typeof window !== "undefined") {
  applyToDocument(ajustesSeed.identidad);
}
