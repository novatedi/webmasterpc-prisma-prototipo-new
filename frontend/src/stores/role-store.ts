import { create } from "zustand";

export type Role = "cliente" | "admin";

interface RoleState {
  role: Role;
  setRole: (role: Role) => void;
}

/** Rol simulado para demostrar funciones gated (cliente vs admin). */
export const useRoleStore = create<RoleState>((set) => ({
  role: "cliente",
  setRole: (role) => set({ role }),
}));
