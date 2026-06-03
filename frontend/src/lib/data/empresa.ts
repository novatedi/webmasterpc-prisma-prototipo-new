// Tipos y datos para la sección "La empresa".
// Mock realista del sector escultura (Maestro Carballo).

import type { ID } from "./types";

export interface Hito {
  id: ID;
  year: string;
  title: string;
  description: string;
}

export interface Valor {
  id: ID;
  icon: string; // nombre lucide-react
  title: string;
  description: string;
}

export interface Estadistica {
  id: ID;
  number: string;
  label: string;
}

export interface ProcesoPaso {
  id: ID;
  title: string;
  description: string;
  imageUrl?: string;
}

export interface RedSocial {
  id: ID;
  platform: "instagram" | "facebook" | "whatsapp" | "youtube";
  label: string;
  icon: string;
  url: string;
  active: boolean;
}

export interface HistoriaBlock {
  title: string;
  body: string;
  imageUrl: string;
  ctaText: string;
  ctaHref: string;
  hitos: Hito[];
}

export interface BiografiaBlock {
  title: string;
  body: string;
  photoUrl: string;
}

export interface FilosofiaBlock {
  title: string;
  subtitle: string;
  valores: Valor[];
}

export interface EstadisticasBlock {
  title: string;
  items: Estadistica[];
}

export interface ProcesoBlock {
  title: string;
  subtitle: string;
  pasos: ProcesoPaso[];
}

export interface ContactoBlock {
  email: string;
  telefono: string;
  direccion: string;
  horario: string;
  mapaUrl: string;
}

export interface RedesBlock {
  items: RedSocial[];
}

export interface EmpresaData {
  historia: HistoriaBlock;
  biografia: BiografiaBlock;
  filosofia: FilosofiaBlock;
  estadisticas: EstadisticasBlock;
  proceso: ProcesoBlock;
  contacto: ContactoBlock;
  redes: RedesBlock;
}

export const empresaSeed: EmpresaData = {
  historia: {
    title: "Tradición familiar en piedra gallega",
    body:
      "El taller del Maestro Carballo nace en una pequeña aldea del interior de Galicia, donde la piedra y la madera marcan el ritmo de tres generaciones de artesanos. Aquí cada pieza se trabaja a mano, con el respeto que merece un material que ya tiene vida cuando llega al taller.\n\nNuestra mirada es contemporánea pero el oficio sigue siendo el de siempre: cincel, paciencia y oficio.",
    imageUrl:
      "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=1400&q=80&auto=format&fit=crop",
    ctaText: "Descubre el taller",
    ctaHref: "#taller",
    hitos: [
      {
        id: "h-1",
        year: "1985",
        title: "Primer taller",
        description:
          "Manuel Carballo abre el primer taller familiar en la aldea, todavía centrado en encargos religiosos y funerarios.",
      },
      {
        id: "h-2",
        year: "1998",
        title: "Primera exposición",
        description:
          "Exposición individual en Santiago de Compostela. Primer reconocimiento del trabajo del taller fuera de Galicia.",
      },
      {
        id: "h-3",
        year: "2010",
        title: "Primera obra pública",
        description:
          "Encargo del Concello de Carballo para una pieza monumental en piedra y acero corten, instalada en la plaza mayor.",
      },
      {
        id: "h-4",
        year: "2021",
        title: "Retrospectiva",
        description:
          "Retrospectiva 'Pedra, ferro, tempo' en el MARCO de Vigo: 35 obras revisando tres décadas de oficio.",
      },
    ],
  },
  biografia: {
    title: "Sobre el Maestro Carballo",
    body:
      "Manuel Carballo (Carballo, 1958) creció rodeado de canteros y carpinteros de ribera. Estudió Bellas Artes en Pontevedra y se especializó en talla directa en piedra durante una estancia en Pietrasanta, Italia.\n\nDesde 1985 dirige el taller familiar, donde combina la talla tradicional con el trabajo del hierro forjado y la fundición de bronce. Su obra está presente en colecciones públicas de Galicia, Asturias y el norte de Portugal, y en colecciones privadas en España, Francia y Reino Unido.",
    photoUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=600&q=80&auto=format&fit=crop",
  },
  filosofia: {
    title: "Cómo entendemos el oficio",
    subtitle:
      "Cuatro principios que guían cada pieza que sale del taller, sin excepción.",
    valores: [
      {
        id: "v-1",
        icon: "Hammer",
        title: "Artesanía",
        description:
          "Cada pieza se trabaja a mano. El cincel y la lima dejan una huella que ninguna máquina sabe imitar.",
      },
      {
        id: "v-2",
        icon: "Mountain",
        title: "Materiales nobles",
        description:
          "Piedra gallega, mármol de Carrara, hierro forjado, bronce y madera. Materiales que envejecen bien.",
      },
      {
        id: "v-3",
        icon: "Sparkles",
        title: "Pieza única",
        description:
          "No producimos en serie. Cada escultura es un encargo o un proyecto del taller, irrepetible.",
      },
      {
        id: "v-4",
        icon: "Compass",
        title: "Tradición y vanguardia",
        description:
          "El oficio de siempre puesto al servicio de un lenguaje contemporáneo, sin folclorismo.",
      },
    ],
  },
  estadisticas: {
    title: "El taller en cifras",
    items: [
      { id: "s-1", number: "+170", label: "Obras realizadas" },
      { id: "s-2", number: "30", label: "Años de trayectoria" },
      { id: "s-3", number: "15", label: "Exposiciones individuales" },
    ],
  },
  proceso: {
    title: "Cómo trabajamos",
    subtitle:
      "Desde la primera conversación hasta la entrega de la pieza, todo pasa por el taller.",
    pasos: [
      {
        id: "p-1",
        title: "Boceto",
        description:
          "Conversamos contigo, visitamos el emplazamiento si es necesario y proponemos varios bocetos a mano y maquetas a escala.",
        imageUrl:
          "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=900&q=80&auto=format&fit=crop",
      },
      {
        id: "p-2",
        title: "Modelado",
        description:
          "Sobre el boceto aprobado preparamos un modelo a tamaño real en barro o yeso, listo para llevar a piedra, madera o molde.",
        imageUrl:
          "https://images.unsplash.com/photo-1572715376701-98568319fd0b?w=900&q=80&auto=format&fit=crop",
      },
      {
        id: "p-3",
        title: "Fundición / Talla",
        description:
          "La pieza se talla en piedra o madera, se funde en bronce o se forja en hierro según el material elegido.",
        imageUrl:
          "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=900&q=80&auto=format&fit=crop",
      },
      {
        id: "p-4",
        title: "Acabado",
        description:
          "Pátina, pulido, soldaduras finales e instalación en su emplazamiento. Te acompañamos hasta la entrega.",
        imageUrl:
          "https://images.unsplash.com/photo-1606513542745-97629752a13b?w=900&q=80&auto=format&fit=crop",
      },
    ],
  },
  contacto: {
    email: "info@escultorcarballo.com",
    telefono: "+34 600 000 000",
    direccion: "Rúa do Taller 12, 15100 Carballo, A Coruña, Galicia",
    horario: "Lun–Vie 8:00–18:00 · Sáb 9:00–13:00",
    mapaUrl: "https://maps.google.com/?q=Carballo+A+Coru%C3%B1a",
  },
  redes: {
    items: [
      {
        id: "r-ig",
        platform: "instagram",
        label: "Instagram",
        icon: "Instagram",
        url: "https://instagram.com/maestrocarballo",
        active: true,
      },
      {
        id: "r-fb",
        platform: "facebook",
        label: "Facebook",
        icon: "Facebook",
        url: "https://facebook.com/maestrocarballo",
        active: true,
      },
      {
        id: "r-wa",
        platform: "whatsapp",
        label: "WhatsApp",
        icon: "MessageCircle",
        url: "https://wa.me/34600000000",
        active: true,
      },
      {
        id: "r-yt",
        platform: "youtube",
        label: "YouTube",
        icon: "Youtube",
        url: "https://youtube.com/@maestrocarballo",
        active: false,
      },
    ],
  },
};
