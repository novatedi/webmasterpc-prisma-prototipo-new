// Artículos del blog del escultor.

import type { ID } from "./types";

export type ArticleStatus = "publicado" | "borrador";

export interface Article {
  id: ID;
  title: string;
  excerpt: string;
  content: string; // texto largo con formato sencillo
  coverUrl: string;
  status: ArticleStatus;
  author: string;
  publishedAt: string; // ISO yyyy-mm-dd
  readingMinutes: number;
}

export const articlesSeed: Article[] = [
  {
    id: "art-1",
    title: "El proceso detrás de 'Equilibrio Vertical'",
    excerpt:
      "Cuatro meses, tres bocetos y una placa de acero corten de dos metros y medio. Así nació la pieza que hoy preside la plaza de Carballo.",
    content:
      "Cuando el ayuntamiento nos llamó para hablar del nuevo encargo, lo primero que pedí fue ver el solar. **Una pieza pública no se diseña en el taller**: se diseña con la luz y el viento del lugar.\n\nEl primer boceto fue una espiral cerrada. Lo descartamos enseguida — pedía demasiado al espectador. La segunda propuesta partía de un plano único cortado en tres tramos, y ahí supimos que íbamos por buen camino.\n\nEl proceso completo, desde el primer boceto hasta la instalación, fue de cuatro meses. La pátina del corten tardará otros tres años en estabilizarse, y a partir de ahí la obra empezará a envejecer con el barrio.",
    coverUrl:
      "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=1400&q=80&auto=format&fit=crop",
    status: "publicado",
    author: "Maestro Carballo",
    publishedAt: "2025-01-18",
    readingMinutes: 6,
  },
  {
    id: "art-2",
    title: "Pietrasanta: un mes entre canteros de mármol",
    excerpt:
      "Volver a Pietrasanta veinte años después fue confirmar que el oficio se transmite con las manos, no con manuales.",
    content:
      "Pietrasanta es un pueblo pequeño al pie de los Alpes Apuanos donde lleva talándose mármol desde el siglo XV. Pasé allí un mes invitado por el estudio Massa Carrara para una residencia de talla directa.\n\nLo que más me impresionó no fue la cantera, sino los talleres familiares. _Padres e hijos trabajando codo con codo_, sin prisa, hablando en voz baja del bloque que tienen delante.",
    coverUrl:
      "https://images.unsplash.com/photo-1567861911437-538298e4232c?w=1400&q=80&auto=format&fit=crop",
    status: "publicado",
    author: "Maestro Carballo",
    publishedAt: "2024-11-22",
    readingMinutes: 8,
  },
  {
    id: "art-3",
    title: "Por qué uso acero corten",
    excerpt:
      "El óxido como acabado: cómo el tiempo se convierte en parte de la escultura.",
    content:
      "El corten es un acero que se oxida en superficie pero protege el núcleo. Esa pátina anaranjada, que para muchos parece descuido, es justamente lo que hace al material indestructible al aire libre.\n\nLo descubrí en una exposición en Bilbao, mirando una pieza de Eduardo Chillida. Desde entonces lo he usado en más de la mitad de mis obras públicas.",
    coverUrl:
      "https://images.unsplash.com/photo-1606513542745-97629752a13b?w=1400&q=80&auto=format&fit=crop",
    status: "publicado",
    author: "Maestro Carballo",
    publishedAt: "2024-09-04",
    readingMinutes: 4,
  },
  {
    id: "art-4",
    title: "Notas desde el taller — invierno 2025",
    excerpt:
      "Apuntes y bocetos de la nueva serie que estoy preparando para la retrospectiva de otoño.",
    content:
      "Estos meses el taller está más silencioso de lo habitual. Estoy preparando la serie 'Fragmentos del tiempo' para una retrospectiva en Vigo el próximo otoño, y necesito horas tranquilas con el cuaderno antes de coger el cincel.\n\nLa serie partirá de cuatro prismas verticales en hierro corten combinado con madera maciza. Aún no sé si serán cuatro o seis piezas, pero la dirección está clara.",
    coverUrl:
      "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=1400&q=80&auto=format&fit=crop",
    status: "borrador",
    author: "Maestro Carballo",
    publishedAt: "",
    readingMinutes: 3,
  },
];
