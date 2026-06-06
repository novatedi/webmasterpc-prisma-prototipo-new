// Galería: álbumes de fotos para mostrar en la web pública.
// Cada álbum agrupa varias fotos con metadatos y referencias de uso.
import type { ID } from "./types";
import type { PhotoUsage } from "./biblioteca";

export interface GalleryPhoto {
  id: ID;
  url: string;
  name: string;
  alt: string;
  usages: PhotoUsage[];
}

export interface GalleryAlbum {
  id: ID;
  title: string;
  description: string;
  /** Portada del álbum; si está vacía se usa la primera foto. */
  coverUrl: string;
  /** Foto elegida como portada (tiene prioridad sobre coverUrl). */
  coverPhotoId?: ID;
  createdAt: string;
  photos: GalleryPhoto[];
}

const u = (s: string) =>
  `https://images.unsplash.com/${s}?w=1400&q=80&auto=format&fit=crop`;

export const albumsSeed: GalleryAlbum[] = [
  {
    id: "alb-1",
    title: "Esculturas de hierro",
    description: "Serie de piezas en acero corten y hierro forjado.",
    coverUrl: u("photo-1554907984-15263bfd63bd"),
    createdAt: "2024-02-15",
    photos: [
      {
        id: "gp-1",
        url: u("photo-1554907984-15263bfd63bd"),
        name: "Escultura de hierro frontal",
        alt: "Escultura de hierro corten retorcido sobre base de cemento",
        usages: [
          {
            kind: "obra",
            refId: "w1",
            label: "Escultura de Hierro",
            page: "Obras",
            editTo: "/obras/obra/w1",
          },
        ],
      },
      {
        id: "gp-2",
        url: u("photo-1582738411706-bfc8e691d1c2"),
        name: "Equilibrio Vertical · vista lateral",
        alt: "Tres planos verticales de acero corten",
        usages: [
          {
            kind: "obra",
            refId: "w2",
            label: "Equilibrio Vertical",
            page: "Obras",
            editTo: "/obras/obra/w2",
          },
        ],
      },
      {
        id: "gp-3",
        url: u("photo-1606513542745-97629752a13b"),
        name: "Reflejo de Acero",
        alt: "Placa angular de acero inoxidable",
        usages: [],
      },
    ],
  },
  {
    id: "alb-2",
    title: "El taller",
    description: "El espacio de trabajo, herramientas y rincones del estudio.",
    coverUrl: u("photo-1572715376701-98568319fd0b"),
    createdAt: "2024-01-12",
    photos: [
      {
        id: "gp-4",
        url: u("photo-1572715376701-98568319fd0b"),
        name: "Taller · vista general",
        alt: "Vista panorámica del taller con piezas en proceso",
        usages: [
          {
            kind: "pagina",
            refId: "p-artista",
            label: "Historia",
            page: "Sobre el artista",
            editTo: "/empresa/historia",
          },
        ],
      },
      {
        id: "gp-5",
        url: u("photo-1513475382585-d06e58bcb0e0"),
        name: "Bocetos sobre la mesa",
        alt: "Bocetos y herramientas de dibujo del taller",
        usages: [],
      },
    ],
  },
  {
    id: "alb-3",
    title: "Exposiciones",
    description: "Montajes y piezas instaladas en espacios públicos.",
    coverUrl: u("photo-1518998053901-5348d3961a04"),
    createdAt: "2023-09-30",
    photos: [
      {
        id: "gp-6",
        url: u("photo-1518998053901-5348d3961a04"),
        name: "Estructura Ascendente · plaza",
        alt: "Composición de cubos de acero corten en plaza pública",
        usages: [],
      },
      {
        id: "gp-7",
        url: u("photo-1578926375605-eaf7559b1458"),
        name: "Círculo Infinito · jardín",
        alt: "Anillo monolítico de acero en un jardín",
        usages: [
          {
            kind: "obra",
            refId: "w3",
            label: "Círculo Infinito",
            page: "Obras",
            editTo: "/obras/obra/w3",
          },
        ],
      },
    ],
  },
];

/** Portada efectiva de un álbum: la foto elegida, su coverUrl, o la primera foto. */
export function albumCover(album: GalleryAlbum): string {
  if (album.coverPhotoId) {
    const chosen = album.photos.find((p) => p.id === album.coverPhotoId);
    if (chosen) return chosen.url;
  }
  return album.coverUrl || album.photos[0]?.url || "";
}
