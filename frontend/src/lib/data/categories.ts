import type { Category } from "./types";

/**
 * Categorías TEMÁTICAS de la obra del escultor.
 * Estado mutable mediante el store correspondiente.
 */
export const categories: Category[] = [
  {
    id: "cat-1",
    name: "Obra pública",
    slug: "obra-publica",
    active: true,
    order: 0,
    description: "Esculturas concebidas para plazas, parques y espacios urbanos.",
  },
  {
    id: "cat-2",
    name: "Escultura de interior",
    slug: "interior",
    active: true,
    order: 1,
    description: "Piezas pensadas para galerías y coleccionismo privado.",
  },
  {
    id: "cat-3",
    name: "Series",
    slug: "series",
    active: true,
    order: 2,
    description: "Conjuntos temáticos donde varias piezas dialogan entre sí.",
  },
  {
    id: "cat-4",
    name: "Bocetos",
    slug: "bocetos",
    active: false,
    order: 3,
    description: "Bocetos y maquetas preparatorias.",
  },
];
