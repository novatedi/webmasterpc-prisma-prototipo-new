import type { Review } from "./types";

export const reviews: Review[] = [
  {
    id: "r1",
    authorName: "Galería Ruiz",
    rating: 5,
    comment:
      "Una experiencia impecable. El proceso fue tan cuidado como la obra final.",
    receivedAt: "2025-01-15",
    approved: true,
  },
  {
    id: "r2",
    authorName: "Ayuntamiento de Jaca",
    rating: 5,
    comment: "Profesionalidad y sensibilidad artística. Repetiremos.",
    receivedAt: "2024-12-20",
    approved: true,
  },
  {
    id: "r3",
    authorName: "Coleccionista privado",
    rating: 4,
    comment: "Obra magnífica. La comunicación durante la entrega podría mejorar.",
    receivedAt: "2024-10-08",
    approved: false,
  },
];
