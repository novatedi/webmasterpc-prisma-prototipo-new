import type { Work } from "./types";

/**
 * 8 obras reales con materiales, año y dimensiones realistas.
 * Una obra puede tener varios materiales (ej. Hierro + Madera).
 */
export const works: Work[] = [
  {
    id: "w1",
    title: "Escultura de Hierro",
    description:
      "Pieza de hierro forjado con acabado óxido. El material se trabaja en caliente para arrancar la forma de una sola placa retorcida sobre sí misma.",
    coverUrl:
      "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=1200&q=80&auto=format&fit=crop",
    images: [
      {
        id: "i1-1",
        url: "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=1200&q=80&auto=format&fit=crop",
      },
      {
        id: "i1-2",
        url: "https://images.unsplash.com/photo-1568871391790-3a92a72b56be?w=1200&q=80&auto=format&fit=crop",
      },
      {
        id: "i1-3",
        url: "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=1200&q=80&auto=format&fit=crop",
      },
    ],
    categoryId: "cat-1",
    materialIds: ["mat-hierro"],
    year: 2023,
    dimensions: "180 × 90 × 60 cm",
    status: "publicada",
    createdAt: "2024-02-12",
  },
  {
    id: "w2",
    title: "Equilibrio Vertical",
    description:
      "Estructura ascendente de tres planos de acero corten. Estudia la tensión vertical y la pátina del óxido natural.",
    coverUrl:
      "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=1200&q=80&auto=format&fit=crop",
    images: [
      {
        id: "i2-1",
        url: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=1200&q=80&auto=format&fit=crop",
      },
      {
        id: "i2-2",
        url: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=80&auto=format&fit=crop",
      },
    ],
    categoryId: "cat-1",
    materialIds: ["mat-corten"],
    year: 2022,
    dimensions: "240 × 60 × 60 cm",
    status: "publicada",
    createdAt: "2023-11-05",
  },
  {
    id: "w3",
    title: "Círculo Infinito",
    description:
      "Anillo monolítico de acero pulido. La pieza dialoga con el paisaje circundante y refleja el cielo a lo largo del día.",
    coverUrl:
      "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=1200&q=80&auto=format&fit=crop",
    images: [
      {
        id: "i3-1",
        url: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=1200&q=80&auto=format&fit=crop",
      },
    ],
    categoryId: "cat-1",
    materialIds: ["mat-corten"],
    year: 2024,
    dimensions: "Ø 120 × 30 cm",
    status: "publicada",
    createdAt: "2024-05-20",
  },
  {
    id: "w4",
    title: "Reflejo de Acero",
    description:
      "Placa angular de acero inoxidable que descompone la luz en planos triangulares.",
    coverUrl:
      "https://images.unsplash.com/photo-1606513542745-97629752a13b?w=1200&q=80&auto=format&fit=crop",
    images: [
      {
        id: "i4-1",
        url: "https://images.unsplash.com/photo-1606513542745-97629752a13b?w=1200&q=80&auto=format&fit=crop",
      },
    ],
    categoryId: "cat-2",
    materialIds: ["mat-corten"],
    year: 2023,
    dimensions: "200 × 70 × 50 cm",
    status: "publicada",
    createdAt: "2023-09-15",
  },
  {
    id: "w5",
    title: "Lazo Continuo",
    description:
      "Figura en lazo de bronce patinado. Una sola línea curva que se vuelve sobre sí misma sin principio ni fin.",
    coverUrl:
      "https://images.unsplash.com/photo-1591635566278-12f2f163c1e5?w=1200&q=80&auto=format&fit=crop",
    images: [
      {
        id: "i5-1",
        url: "https://images.unsplash.com/photo-1591635566278-12f2f163c1e5?w=1200&q=80&auto=format&fit=crop",
      },
    ],
    categoryId: "cat-3",
    materialIds: ["mat-bronce"],
    year: 2021,
    dimensions: "160 × 80 × 40 cm",
    status: "publicada",
    createdAt: "2022-10-01",
  },
  {
    id: "w6",
    title: "Fragmentos del Tiempo",
    description:
      "Conjunto de tres prismas verticales en hierro corten combinado con bases de madera maciza. Pertenece a la serie 'Tiempo'.",
    coverUrl:
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1200&q=80&auto=format&fit=crop",
    images: [
      {
        id: "i6-1",
        url: "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1200&q=80&auto=format&fit=crop",
      },
      {
        id: "i6-2",
        url: "https://images.unsplash.com/photo-1542652694-40abf526446e?w=1200&q=80&auto=format&fit=crop",
      },
    ],
    categoryId: "cat-3",
    materialIds: ["mat-hierro", "mat-madera"],
    year: 2024,
    dimensions: "300 × 120 × 80 cm",
    status: "borrador",
    createdAt: "2025-01-08",
  },
  {
    id: "w7",
    title: "Estructura Ascendente",
    description:
      "Composición de cubos apilados en acero corten. Versión monumental pensada para plaza pública.",
    coverUrl:
      "https://images.unsplash.com/photo-1604005950576-9d893c8fe71d?w=1200&q=80&auto=format&fit=crop",
    images: [
      {
        id: "i7-1",
        url: "https://images.unsplash.com/photo-1604005950576-9d893c8fe71d?w=1200&q=80&auto=format&fit=crop",
      },
    ],
    categoryId: "cat-1",
    materialIds: ["mat-corten"],
    year: 2023,
    dimensions: "250 × 80 × 80 cm",
    status: "publicada",
    createdAt: "2023-06-22",
  },
  {
    id: "w8",
    title: "Espiral del Movimiento",
    description:
      "Espiral abierta de bronce patinado. Recoge la energía del giro en una sola pieza fundida.",
    coverUrl:
      "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=80&auto=format&fit=crop",
    images: [
      {
        id: "i8-1",
        url: "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=1200&q=80&auto=format&fit=crop",
      },
    ],
    categoryId: "cat-2",
    materialIds: ["mat-bronce"],
    year: 2022,
    dimensions: "190 × 90 × 90 cm",
    status: "publicada",
    createdAt: "2022-12-12",
  },
];
