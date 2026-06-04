// Biblioteca de fotos del taller con metadatos y referencias de uso.
import type { ID } from "./types";

export type PhotoCategory = "obras" | "taller" | "exposiciones" | "retratos" | "proceso";

export interface PhotoUsage {
  /** Tipo de elemento que la usa */
  kind: "obra" | "articulo" | "seccion" | "servicio" | "pagina";
  refId: string;
  /** Etiqueta legible (ej. "Equilibrio Vertical") */
  label: string;
  /** Página donde aparece (ej. "Obras", "Sobre el artista") */
  page: string;
  /** Ruta del panel para ir a editar ese elemento */
  editTo: string;
}

export interface Photo {
  id: ID;
  url: string;
  name: string;
  category: PhotoCategory;
  alt: string;
  uploadedAt: string;
  usages: PhotoUsage[];
}

export const PHOTO_CATEGORY_LABELS: Record<PhotoCategory, string> = {
  obras: "Obras",
  taller: "Taller",
  exposiciones: "Exposiciones",
  retratos: "Retratos",
  proceso: "Proceso",
};

const u = (s: string) =>
  `https://images.unsplash.com/${s}?w=1400&q=80&auto=format&fit=crop`;

export const photosSeed: Photo[] = [
  {
    id: "ph-1",
    url: u("photo-1561839561-b13bcfe95249"),
    name: "Escultura de hierro frontal",
    category: "obras",
    alt: "Escultura de hierro corten retorcido sobre base de cemento",
    uploadedAt: "2024-02-12",
    usages: [
      {
        kind: "obra",
        refId: "w1",
        label: "Escultura de Hierro",
        page: "Obras",
        editTo: "/obras/obra/w1",
      },
      {
        kind: "pagina",
        refId: "p-inicio",
        label: "Obras destacadas",
        page: "Inicio",
        editTo: "/paginas/p-inicio",
      },
    ],
  },
  {
    id: "ph-2",
    url: u("photo-1582738411706-bfc8e691d1c2"),
    name: "Equilibrio Vertical · vista lateral",
    category: "obras",
    alt: "Tres planos verticales de acero corten",
    uploadedAt: "2023-11-05",
    usages: [
      {
        kind: "obra",
        refId: "w2",
        label: "Equilibrio Vertical",
        page: "Obras",
        editTo: "/obras/obra/w2",
      },
      {
        kind: "articulo",
        refId: "art-1",
        label: "El proceso detrás de 'Equilibrio Vertical'",
        page: "Blog",
        editTo: "/blog/articulo/art-1",
      },
      {
        kind: "pagina",
        refId: "p-inicio",
        label: "Cabecera",
        page: "Inicio",
        editTo: "/paginas/p-inicio",
      },
    ],
  },
  {
    id: "ph-3",
    url: u("photo-1578926375605-eaf7559b1458"),
    name: "Círculo Infinito · jardín",
    category: "obras",
    alt: "Anillo monolítico de acero en un jardín",
    uploadedAt: "2024-05-20",
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
  {
    id: "ph-4",
    url: u("photo-1606513542745-97629752a13b"),
    name: "Reflejo de Acero",
    category: "obras",
    alt: "Placa angular de acero inoxidable",
    uploadedAt: "2023-09-15",
    usages: [],
  },
  {
    id: "ph-5",
    url: u("photo-1572715376701-98568319fd0b"),
    name: "Taller · vista general",
    category: "taller",
    alt: "Vista panorámica del taller con piezas en proceso",
    uploadedAt: "2024-01-10",
    usages: [
      {
        kind: "pagina",
        refId: "p-artista",
        label: "Historia",
        page: "Sobre el artista",
        editTo: "/paginas/p-artista",
      },
      {
        kind: "servicio",
        refId: "srv-restauracion",
        label: "Restauración",
        page: "Servicios",
        editTo: "/servicios/bloque/srv-restauracion",
      },
    ],
  },
  {
    id: "ph-6",
    url: u("photo-1513475382585-d06e58bcb0e0"),
    name: "Bocetos sobre la mesa",
    category: "proceso",
    alt: "Bocetos y herramientas de dibujo del taller",
    uploadedAt: "2024-03-08",
    usages: [
      {
        kind: "servicio",
        refId: "srv-encargos",
        label: "Encargos personalizados",
        page: "Servicios",
        editTo: "/servicios/bloque/srv-encargos",
      },
    ],
  },
  {
    id: "ph-7",
    url: u("photo-1544723795-3fb6469f5b39"),
    name: "Retrato del Maestro Carballo",
    category: "retratos",
    alt: "Retrato del escultor en su taller",
    uploadedAt: "2024-04-02",
    usages: [
      {
        kind: "pagina",
        refId: "p-artista",
        label: "Biografía",
        page: "Sobre el artista",
        editTo: "/paginas/p-artista",
      },
    ],
  },
  {
    id: "ph-8",
    url: u("photo-1554907984-15263bfd63bd"),
    name: "Fragmentos del Tiempo · serie",
    category: "obras",
    alt: "Tres prismas verticales de hierro con bases de madera",
    uploadedAt: "2025-01-08",
    usages: [
      {
        kind: "obra",
        refId: "w6",
        label: "Fragmentos del Tiempo",
        page: "Obras",
        editTo: "/obras/obra/w6",
      },
      {
        kind: "articulo",
        refId: "art-4",
        label: "Notas desde el taller — invierno 2025",
        page: "Blog",
        editTo: "/blog/articulo/art-4",
      },
    ],
  },
  {
    id: "ph-9",
    url: u("photo-1604005950576-9d893c8fe71d"),
    name: "Estructura Ascendente · plaza",
    category: "exposiciones",
    alt: "Composición de cubos de acero corten en plaza pública",
    uploadedAt: "2023-06-22",
    usages: [],
  },
  {
    id: "ph-10",
    url: u("photo-1591635566278-12f2f163c1e5"),
    name: "Lazo Continuo · estudio",
    category: "obras",
    alt: "Figura en lazo de bronce patinado",
    uploadedAt: "2022-10-01",
    usages: [
      {
        kind: "obra",
        refId: "w5",
        label: "Lazo Continuo",
        page: "Obras",
        editTo: "/obras/obra/w5",
      },
    ],
  },
  {
    id: "ph-11",
    url: u("photo-1567861911437-538298e4232c"),
    name: "Pietrasanta · cantera de mármol",
    category: "proceso",
    alt: "Bloques de mármol en cantera italiana",
    uploadedAt: "2024-08-18",
    usages: [
      {
        kind: "articulo",
        refId: "art-2",
        label: "Pietrasanta: un mes entre canteros",
        page: "Blog",
        editTo: "/blog/articulo/art-2",
      },
    ],
  },
  {
    id: "ph-12",
    url: u("photo-1542652694-40abf526446e"),
    name: "Detalle de pátina · bronce",
    category: "proceso",
    alt: "Detalle macro de pátina sobre bronce patinado",
    uploadedAt: "2024-09-30",
    usages: [],
  },
];
