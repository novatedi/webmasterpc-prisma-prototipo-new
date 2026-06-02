import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  {
    id: "b1",
    title: "El proceso detrás de Círculo Infinito",
    excerpt:
      "Tres meses de trabajo, cuatro fundiciones y una pieza que cambió la forma de mirar el bronce.",
    status: "publicado",
    publishedAt: "2025-01-18",
    author: "Alejandro",
  },
  {
    id: "b2",
    title: "Por qué el corten envejece con la obra",
    excerpt:
      "El óxido como acabado: cómo el tiempo se convierte en parte de la escultura.",
    status: "publicado",
    publishedAt: "2024-11-22",
    author: "Alejandro",
  },
  {
    id: "b3",
    title: "Notas desde el taller — invierno",
    excerpt: "Apuntes y bocetos de la nueva serie que estoy preparando.",
    status: "borrador",
    author: "Alejandro",
  },
];
