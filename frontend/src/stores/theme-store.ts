import { create } from "zustand";

type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  toggle: () => void;
  set: (m: ThemeMode) => void;
}

const STORAGE_KEY = "prisma-studio.theme";

function readInitial(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const saved = window.localStorage.getItem(STORAGE_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return "light";
}

function applyTheme(mode: ThemeMode) {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  // suavizar el cambio
  root.classList.add("theme-transition");
  if (mode === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  window.localStorage.setItem(STORAGE_KEY, mode);
  window.setTimeout(() => root.classList.remove("theme-transition"), 260);
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: readInitial(),
  toggle: () => {
    const next: ThemeMode = get().mode === "light" ? "dark" : "light";
    applyTheme(next);
    set({ mode: next });
  },
  set: (m) => {
    applyTheme(m);
    set({ mode: m });
  },
}));

// Aplica el tema en el primer import del store (antes del render)
if (typeof window !== "undefined") {
  applyTheme(readInitial());
}
