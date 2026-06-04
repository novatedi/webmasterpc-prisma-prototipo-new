// Artículos de prensa sobre el escultor.
import type { ID } from "./types";

export interface PressArticle {
  id: ID;
  outlet: string; // medio
  year: number;
  headline: string;
  summary: string;
  imageUrl: string;
  externalUrl: string;
  visible: boolean;
}

const u = (s: string) =>
  `https://images.unsplash.com/${s}?w=1400&q=80&auto=format&fit=crop`;

export const pressSeed: PressArticle[] = [
  {
    id: "pr-1",
    outlet: "El País",
    year: 2024,
    headline:
      "Carballo: 'La escultura empieza cuando dejas de discutir con la piedra'",
    summary:
      "Entrevista en profundidad con el escultor gallego con motivo de su retrospectiva en el MARCO de Vigo. Habla de oficio, mercado y de por qué prefiere el corten al acero pulido.",
    imageUrl: u("photo-1582738411706-bfc8e691d1c2"),
    externalUrl: "https://elpais.com/cultura/maestro-carballo-entrevista",
    visible: true,
  },
  {
    id: "pr-2",
    outlet: "La Voz de Galicia",
    year: 2024,
    headline:
      "El Maestro Carballo inaugura en Vigo su mayor retrospectiva: tres décadas de oficio",
    summary:
      "Más de 35 piezas componen 'Pedra, ferro, tempo', la muestra que el MARCO dedica al escultor de Carballo hasta enero de 2025.",
    imageUrl: u("photo-1604005950576-9d893c8fe71d"),
    externalUrl: "https://lavozdegalicia.es/cultura/retrospectiva-carballo",
    visible: true,
  },
  {
    id: "pr-3",
    outlet: "ABC Cultural",
    year: 2023,
    headline:
      "Cinco escultores que están reescribiendo el lenguaje de la piedra en España",
    summary:
      "Reportaje sobre la nueva escultura monumental española donde Carballo aparece junto a nombres como Cristina Iglesias o Jaume Plensa.",
    imageUrl: u("photo-1578926375605-eaf7559b1458"),
    externalUrl: "https://abc.es/cultural/escultores-piedra-espanola",
    visible: true,
  },
  {
    id: "pr-4",
    outlet: "Faro de Vigo",
    year: 2023,
    headline:
      "Carballo entrega su pieza monumental para la plaza del Berbés",
    summary:
      "La pieza, de seis metros de altura en acero corten, fue instalada anoche tras tres meses de trabajo en el taller del escultor.",
    imageUrl: u("photo-1606513542745-97629752a13b"),
    externalUrl: "https://farodevigo.es/cultura/berbes-carballo",
    visible: true,
  },
  {
    id: "pr-5",
    outlet: "Diario de Pontevedra",
    year: 2022,
    headline:
      "Cómo se talla un encargo público: el detrás de cámaras del taller Carballo",
    summary:
      "Reportaje fotográfico desde el taller del escultor: bocetos, maqueta y los meses de trabajo de cada pieza monumental.",
    imageUrl: u("photo-1572715376701-98568319fd0b"),
    externalUrl: "https://diariodepontevedra.es/taller-carballo",
    visible: true,
  },
  {
    id: "pr-6",
    outlet: "El Cultural",
    year: 2022,
    headline:
      "Carballo, oficio antes que estilo",
    summary:
      "Crítica de la exposición 'Materia y silencio' en la galería Marlborough de Madrid.",
    imageUrl: u("photo-1554907984-15263bfd63bd"),
    externalUrl: "https://elcultural.com/critica-carballo",
    visible: false,
  },
  {
    id: "pr-7",
    outlet: "Cadena SER · Hoy por Hoy",
    year: 2021,
    headline:
      "Entrevista a Manuel Carballo: 'El bronce te enseña paciencia'",
    summary:
      "Audio de la entrevista emitida en la sección cultural del programa matinal de la Cadena SER. Dura 22 minutos.",
    imageUrl: u("photo-1544723795-3fb6469f5b39"),
    externalUrl: "https://cadenaser.com/hoyporhoy/entrevista-carballo",
    visible: true,
  },
];
