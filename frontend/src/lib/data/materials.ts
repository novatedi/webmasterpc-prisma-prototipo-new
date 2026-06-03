import type { Material } from "./types";

/** Materiales con los que trabaja el escultor. */
export const materials: Material[] = [
  { id: "mat-bronce", name: "Bronce", slug: "bronce", active: true, order: 0 },
  {
    id: "mat-marmol",
    name: "Mármol de Carrara",
    slug: "marmol-de-carrara",
    active: true,
    order: 1,
  },
  { id: "mat-hierro", name: "Hierro", slug: "hierro", active: true, order: 2 },
  {
    id: "mat-corten",
    name: "Acero corten",
    slug: "acero-corten",
    active: true,
    order: 3,
  },
  { id: "mat-madera", name: "Madera", slug: "madera", active: true, order: 4 },
  { id: "mat-piedra", name: "Piedra", slug: "piedra", active: true, order: 5 },
  { id: "mat-resina", name: "Resina", slug: "resina", active: false, order: 6 },
];
