// Modelo Página → Secciones → Widget + Fondo + Contenido

import type { ID } from "./types";

/** Tipos de sección disponibles (módulos). */
export type SectionKind =
  | "hero"
  | "historia"
  | "biografia"
  | "valores"
  | "estadisticas"
  | "proceso"
  | "galeria-obras"
  | "obras-destacadas"
  | "servicios"
  | "testimonios"
  | "blog-grid"
  | "contacto"
  | "mapa"
  | "redes"
  | "newsletter"
  | "cta";

export type SectionCategory =
  | "destacado"
  | "contenido"
  | "obras"
  | "social"
  | "contacto";

export interface WidgetVariant {
  /** id estable del layout */
  id: string;
  label: string;
  /** patrón visual representado en SVG/CSS (clave decorativa) */
  preview: "centered" | "split" | "large-photo" | "fullscreen" | "grid-3" | "grid-4" | "masonry" | "carousel" | "single" | "split-map" | "two-col" | "minimal";
}

export interface SectionDefinition {
  kind: SectionKind;
  icon: string;
  label: string;
  description: string;
  category: SectionCategory;
  /** layouts disponibles para esta sección */
  widgets: WidgetVariant[];
}

export type BackgroundType = "color" | "image";
export interface Background {
  type: BackgroundType;
  value: string; // hex o url
}

export interface PageSectionContent {
  title?: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
  ctaText?: string;
  ctaHref?: string;
}

export interface PageSection {
  id: ID;
  kind: SectionKind;
  widgetId: string;
  background: Background;
  content: PageSectionContent;
  visible: boolean;
}

export interface Page {
  id: ID;
  name: string;
  slug: string;
  visible: boolean;
  sections: PageSection[];
}

// =========================================================
// CATÁLOGO DE SECCIONES PRE-DISEÑADAS
// =========================================================

export const SECTION_CATALOG: SectionDefinition[] = [
  {
    kind: "hero",
    icon: "Sparkles",
    label: "Cabecera (hero)",
    description: "La primera impresión: título grande, imagen y un botón claro.",
    category: "destacado",
    widgets: [
      { id: "centered", label: "Centrado", preview: "centered" },
      { id: "split", label: "Texto + foto", preview: "split" },
      { id: "fullscreen", label: "Foto a pantalla completa", preview: "fullscreen" },
    ],
  },
  {
    kind: "historia",
    icon: "BookOpen",
    label: "Historia",
    description: "Cuenta de dónde viene el taller, con o sin línea de tiempo.",
    category: "contenido",
    widgets: [
      { id: "split", label: "Texto + foto", preview: "split" },
      { id: "centered", label: "Centrado", preview: "centered" },
      { id: "large-photo", label: "Foto grande arriba", preview: "large-photo" },
    ],
  },
  {
    kind: "biografia",
    icon: "User",
    label: "Biografía",
    description: "Quién está detrás del taller. Foto del artista y texto largo.",
    category: "contenido",
    widgets: [
      { id: "split", label: "Foto + texto", preview: "split" },
      { id: "centered", label: "Centrado", preview: "centered" },
    ],
  },
  {
    kind: "valores",
    icon: "Compass",
    label: "Valores",
    description: "Los principios que guían el oficio del taller, en tarjetas.",
    category: "contenido",
    widgets: [
      { id: "grid-4", label: "Cuadrícula 4", preview: "grid-4" },
      { id: "grid-3", label: "Cuadrícula 3", preview: "grid-3" },
    ],
  },
  {
    kind: "estadisticas",
    icon: "BarChart3",
    label: "Estadísticas",
    description: "Cifras del taller con números grandes (+170 obras, 30 años…).",
    category: "contenido",
    widgets: [
      { id: "grid-3", label: "Cuadrícula 3", preview: "grid-3" },
      { id: "minimal", label: "Banda fina", preview: "minimal" },
    ],
  },
  {
    kind: "proceso",
    icon: "ListChecks",
    label: "Proceso · Cómo trabajamos",
    description: "Pasos del taller, del boceto al acabado.",
    category: "contenido",
    widgets: [
      { id: "two-col", label: "Dos columnas", preview: "two-col" },
      { id: "grid-4", label: "Cuadrícula 4", preview: "grid-4" },
    ],
  },
  {
    kind: "galeria-obras",
    icon: "Grid3X3",
    label: "Galería de obras",
    description: "Grid con las esculturas. Tira de tu catálogo de Obras.",
    category: "obras",
    widgets: [
      { id: "grid-3", label: "3 columnas", preview: "grid-3" },
      { id: "grid-4", label: "4 columnas", preview: "grid-4" },
      { id: "masonry", label: "Mosaico", preview: "masonry" },
    ],
  },
  {
    kind: "obras-destacadas",
    icon: "Star",
    label: "Obras destacadas",
    description: "Selección de 3-4 piezas que quieres destacar.",
    category: "obras",
    widgets: [
      { id: "grid-3", label: "3 destacadas", preview: "grid-3" },
      { id: "single", label: "Una grande + 2", preview: "single" },
    ],
  },
  {
    kind: "servicios",
    icon: "Boxes",
    label: "Servicios",
    description: "Bloques con los servicios del taller (encargos, restauración…).",
    category: "contenido",
    widgets: [
      { id: "grid-3", label: "3 columnas", preview: "grid-3" },
      { id: "two-col", label: "Lista detallada", preview: "two-col" },
    ],
  },
  {
    kind: "testimonios",
    icon: "Quote",
    label: "Reseñas de clientes",
    description: "Lo que dicen las personas con las que has trabajado.",
    category: "social",
    widgets: [
      { id: "carousel", label: "Carrusel", preview: "carousel" },
      { id: "grid-3", label: "Cuadrícula 3", preview: "grid-3" },
      { id: "single", label: "Una grande", preview: "single" },
    ],
  },
  {
    kind: "blog-grid",
    icon: "PenSquare",
    label: "Artículos del blog",
    description: "Últimos artículos del taller.",
    category: "contenido",
    widgets: [
      { id: "grid-3", label: "3 columnas", preview: "grid-3" },
      { id: "single", label: "Uno destacado + 2", preview: "single" },
    ],
  },
  {
    kind: "contacto",
    icon: "MessageSquare",
    label: "Formulario de contacto",
    description: "Permite a tus visitantes escribirte desde la web.",
    category: "contacto",
    widgets: [
      { id: "split-map", label: "Mapa + formulario", preview: "split-map" },
      { id: "centered", label: "Solo formulario", preview: "centered" },
    ],
  },
  {
    kind: "mapa",
    icon: "MapPin",
    label: "Mapa del taller",
    description: "Muestra dónde estás físicamente.",
    category: "contacto",
    widgets: [
      { id: "fullscreen", label: "Mapa ancho", preview: "fullscreen" },
      { id: "split", label: "Mapa + dirección", preview: "split" },
    ],
  },
  {
    kind: "redes",
    icon: "Share2",
    label: "Redes sociales",
    description: "Botones a Instagram, WhatsApp, Facebook…",
    category: "social",
    widgets: [
      { id: "centered", label: "Centrado", preview: "centered" },
      { id: "minimal", label: "Banda fina", preview: "minimal" },
    ],
  },
  {
    kind: "newsletter",
    icon: "Mail",
    label: "Newsletter",
    description: "Captura emails de personas interesadas en tu obra.",
    category: "contacto",
    widgets: [
      { id: "centered", label: "Centrado", preview: "centered" },
      { id: "minimal", label: "Banda fina", preview: "minimal" },
    ],
  },
  {
    kind: "cta",
    icon: "Megaphone",
    label: "Llamada a la acción",
    description: "Un bloque que invita al visitante a dar el siguiente paso.",
    category: "destacado",
    widgets: [
      { id: "centered", label: "Centrado", preview: "centered" },
      { id: "split", label: "Texto + botón", preview: "split" },
    ],
  },
];

export const CATEGORY_LABELS: Record<SectionCategory, string> = {
  destacado: "Destacados",
  contenido: "Contenido",
  obras: "Obras",
  social: "Social",
  contacto: "Contacto",
};

export const BG_COLOR_PRESETS = [
  { label: "Crema", value: "#F7F3EC" },
  { label: "Blanco", value: "#FFFFFF" },
  { label: "Niebla", value: "#E9EBF0" },
  { label: "Carbón", value: "#1F2937" },
  { label: "Pizarra", value: "#475569" },
  { label: "Bronce", value: "#9A6B3F" },
  { label: "Musgo", value: "#3D7A4C" },
  { label: "Veneciano", value: "#B43A2A" },
];

// Util: encuentra definición por kind
export function findDef(kind: SectionKind): SectionDefinition {
  return SECTION_CATALOG.find((d) => d.kind === kind)!;
}

// =========================================================
// MOCK – páginas del escultor
// =========================================================

const ID_GEN = (() => {
  let n = 1;
  return () => `s-${n++}`;
})();

const mkSection = (
  kind: SectionKind,
  widgetId: string,
  bg: Background,
  content: PageSectionContent,
  visible = true,
): PageSection => ({
  id: ID_GEN(),
  kind,
  widgetId,
  background: bg,
  content,
  visible,
});

export const paginasSeed: Page[] = [
  {
    id: "p-inicio",
    name: "Inicio",
    slug: "/",
    visible: true,
    sections: [
      mkSection(
        "hero",
        "split",
        { type: "color", value: "#F7F3EC" },
        {
          title: "Maestro Carballo",
          subtitle: "Escultor en piedra, hierro y bronce desde 1985.",
          imageUrl:
            "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=1600&q=80&auto=format&fit=crop",
          ctaText: "Ver obras",
          ctaHref: "/obras",
        },
      ),
      mkSection(
        "obras-destacadas",
        "grid-3",
        { type: "color", value: "#FFFFFF" },
        {
          title: "Obras destacadas",
          subtitle: "Una selección de piezas recientes del taller.",
        },
      ),
      mkSection(
        "servicios",
        "grid-3",
        { type: "color", value: "#F7F3EC" },
        {
          title: "Qué hacemos",
          subtitle: "Encargos personalizados, restauración y talleres.",
        },
      ),
      mkSection(
        "testimonios",
        "carousel",
        { type: "color", value: "#FFFFFF" },
        {
          title: "Lo que dicen quienes han trabajado con el taller",
        },
      ),
      mkSection(
        "cta",
        "centered",
        { type: "color", value: "#1F2937" },
        {
          title: "¿Tienes un proyecto en mente?",
          subtitle:
            "Cuéntanos qué imaginas. Te respondemos en menos de 48 horas.",
          ctaText: "Escríbenos",
          ctaHref: "/contacto",
        },
      ),
    ],
  },
  {
    id: "p-artista",
    name: "Sobre el artista",
    slug: "/sobre-el-artista",
    visible: true,
    sections: [
      mkSection(
        "biografia",
        "split",
        { type: "color", value: "#FFFFFF" },
        {
          title: "Sobre el Maestro Carballo",
          body:
            "Manuel Carballo (Carballo, 1958) creció rodeado de canteros y carpinteros de ribera. Estudió Bellas Artes en Pontevedra y se especializó en talla directa en piedra durante una estancia en Pietrasanta, Italia.",
          imageUrl:
            "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=900&q=80&auto=format&fit=crop",
        },
      ),
      mkSection(
        "historia",
        "large-photo",
        { type: "color", value: "#F7F3EC" },
        {
          title: "Tradición familiar en piedra gallega",
          body:
            "El taller del Maestro Carballo nace en una pequeña aldea del interior de Galicia, donde la piedra y la madera marcan el ritmo de tres generaciones de artesanos.",
          imageUrl:
            "https://images.unsplash.com/photo-1572715376701-98568319fd0b?w=1600&q=80&auto=format&fit=crop",
        },
      ),
      mkSection(
        "valores",
        "grid-4",
        { type: "color", value: "#FFFFFF" },
        {
          title: "Cómo entendemos el oficio",
        },
      ),
      mkSection(
        "estadisticas",
        "grid-3",
        { type: "color", value: "#1F2937" },
        {
          title: "El taller en cifras",
        },
      ),
    ],
  },
  {
    id: "p-obras",
    name: "Obras",
    slug: "/obras",
    visible: true,
    sections: [
      mkSection(
        "hero",
        "centered",
        { type: "color", value: "#F7F3EC" },
        {
          title: "Obras",
          subtitle: "El catálogo completo del taller.",
        },
      ),
      mkSection(
        "galeria-obras",
        "grid-3",
        { type: "color", value: "#FFFFFF" },
        {
          title: "Catálogo",
        },
      ),
    ],
  },
  {
    id: "p-contacto",
    name: "Contacto",
    slug: "/contacto",
    visible: true,
    sections: [
      mkSection(
        "hero",
        "centered",
        { type: "color", value: "#F7F3EC" },
        {
          title: "Hablemos",
          subtitle:
            "Cuéntanos qué imaginas. Te respondemos en menos de 48 horas.",
        },
      ),
      mkSection(
        "contacto",
        "split-map",
        { type: "color", value: "#FFFFFF" },
        {
          title: "Escríbenos",
        },
      ),
      mkSection(
        "redes",
        "minimal",
        { type: "color", value: "#F7F3EC" },
        {
          title: "Día a día del taller",
        },
      ),
    ],
  },
  {
    id: "p-galeria",
    name: "Galería",
    slug: "/galeria",
    visible: false,
    sections: [
      mkSection(
        "hero",
        "centered",
        { type: "color", value: "#1F2937" },
        {
          title: "Galería",
          subtitle: "Fotografías del taller y del proceso.",
        },
      ),
      mkSection(
        "galeria-obras",
        "masonry",
        { type: "color", value: "#FFFFFF" },
        {},
      ),
    ],
  },
];
