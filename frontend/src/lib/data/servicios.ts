// Servicios del escultor: bloques de la página de servicios.

import type { ID } from "./types";

export interface ServiceBlock {
  id: ID;
  title: string;
  short: string; // bajada / lead corto
  description: string; // texto largo, admite saltos de línea
  imageUrl: string;
  icon: string; // lucide-react
  active: boolean;
  order: number;
}

export const serviciosSeed: ServiceBlock[] = [
  {
    id: "srv-encargos",
    title: "Encargos personalizados",
    short:
      "Una pieza diseñada para tu espacio, desde el primer boceto hasta la instalación.",
    description:
      "Cada encargo empieza con una visita al emplazamiento o una larga conversación si es para interior. A partir de ahí preparamos bocetos a mano y maquetas a escala que revisamos contigo antes de pasar a tallar o fundir la pieza.\n\nEl plazo habitual va de tres a seis meses, según material y tamaño. Incluimos transporte e instalación dentro de la península.",
    imageUrl:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1400&q=80&auto=format&fit=crop",
    icon: "Compass",
    active: true,
    order: 0,
  },
  {
    id: "srv-restauracion",
    title: "Restauración",
    short:
      "Recuperamos esculturas dañadas en piedra, bronce, hierro y madera respetando el original.",
    description:
      "Trabajamos con museos, ayuntamientos y particulares. Antes de tocar la pieza realizamos un informe del estado y proponemos un plan de actuación reversible.\n\nLa intervención se documenta paso a paso y entregamos un dosier final con fotografías de antes, durante y después.",
    imageUrl:
      "https://images.unsplash.com/photo-1572715376701-98568319fd0b?w=1400&q=80&auto=format&fit=crop",
    icon: "Wrench",
    active: true,
    order: 1,
  },
  {
    id: "srv-talleres",
    title: "Talleres",
    short:
      "Iniciación al modelado y a la talla en pequeños grupos, en el propio taller.",
    description:
      "Talleres de fin de semana y cursos intensivos de una semana. Aforo máximo de seis personas por grupo para garantizar atención individual.\n\nIncluyen material, herramientas y comida del mediodía. No hace falta experiencia previa: lo importante es tener ganas de ensuciarse las manos.",
    imageUrl:
      "https://images.unsplash.com/photo-1542652694-40abf526446e?w=1400&q=80&auto=format&fit=crop",
    icon: "GraduationCap",
    active: true,
    order: 2,
  },
];
