import type { Work, Category } from "./types";

export const categories: Category[] = [
  { id: "c1", name: "Hierro", slug: "hierro" },
  { id: "c2", name: "Acero", slug: "acero" },
  { id: "c3", name: "Bronce", slug: "bronce" },
  { id: "c4", name: "Piedra", slug: "piedra" },
];

export const works: Work[] = [
  {
    id: "w1",
    title: "Escultura de Hierro",
    coverUrl:
      "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=900&q=80&auto=format&fit=crop",
    categoryId: "c1",
    year: 2023,
    material: "Hierro corten",
    dimensions: "180 × 90 × 60 cm",
    status: "publicada",
    createdAt: "2024-02-12",
  },
  {
    id: "w2",
    title: "Equilibrio Vertical",
    coverUrl:
      "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=900&q=80&auto=format&fit=crop",
    categoryId: "c2",
    year: 2022,
    material: "Acero pulido",
    dimensions: "240 × 60 × 60 cm",
    status: "publicada",
    createdAt: "2023-11-05",
  },
  {
    id: "w3",
    title: "Círculo Infinito",
    coverUrl:
      "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=900&q=80&auto=format&fit=crop",
    categoryId: "c3",
    year: 2024,
    material: "Bronce",
    dimensions: "120 cm Ø",
    status: "publicada",
    createdAt: "2024-05-20",
  },
  {
    id: "w4",
    title: "Reflejo de Acero",
    coverUrl:
      "https://images.unsplash.com/photo-1606513542745-97629752a13b?w=900&q=80&auto=format&fit=crop",
    categoryId: "c2",
    year: 2023,
    material: "Acero inoxidable",
    dimensions: "200 × 70 × 50 cm",
    status: "publicada",
    createdAt: "2023-09-15",
  },
  {
    id: "w5",
    title: "Lazo Continuo",
    coverUrl:
      "https://images.unsplash.com/photo-1591635566278-12f2f163c1e5?w=900&q=80&auto=format&fit=crop",
    categoryId: "c1",
    year: 2021,
    material: "Hierro forjado",
    dimensions: "160 × 80 × 40 cm",
    status: "publicada",
    createdAt: "2022-10-01",
  },
  {
    id: "w6",
    title: "Fragmentos del Tiempo",
    coverUrl:
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=900&q=80&auto=format&fit=crop",
    categoryId: "c4",
    year: 2024,
    material: "Piedra y hierro",
    dimensions: "300 × 120 × 80 cm",
    status: "borrador",
    createdAt: "2025-01-08",
  },
  {
    id: "w7",
    title: "Estructura Ascendente",
    coverUrl:
      "https://images.unsplash.com/photo-1604005950576-9d893c8fe71d?w=900&q=80&auto=format&fit=crop",
    categoryId: "c2",
    year: 2023,
    material: "Acero galvanizado",
    dimensions: "250 × 80 × 80 cm",
    status: "publicada",
    createdAt: "2023-06-22",
  },
  {
    id: "w8",
    title: "Espiral del Movimiento",
    coverUrl:
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=900&q=80&auto=format&fit=crop",
    categoryId: "c3",
    year: 2022,
    material: "Bronce patinado",
    dimensions: "190 × 90 × 90 cm",
    status: "publicada",
    createdAt: "2022-12-12",
  },
];
