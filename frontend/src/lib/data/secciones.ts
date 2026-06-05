// Catálogo mock de tipos de Sección. Vocabulario:
// Sección · Slots (campos = contrato de datos) · Presets (widgets/layouts = cómo se ve).

export type SlotType =
  | "texto"
  | "textarea"
  | "numero"
  | "email"
  | "url"
  | "imagen"
  | "booleano";

export const SLOT_TYPE_LABELS: Record<SlotType, string> = {
  texto: "Texto",
  textarea: "Texto largo",
  numero: "Número",
  email: "Email",
  url: "Enlace",
  imagen: "Imagen",
  booleano: "Sí / No",
};

export type SectionCategory =
  | "Layout"
  | "Header"
  | "Contenido"
  | "Media"
  | "Social proof"
  | "CTA"
  | "Info";

export const SECTION_CATEGORIES: SectionCategory[] = [
  "Header",
  "Contenido",
  "Media",
  "Social proof",
  "Info",
  "CTA",
  "Layout",
];

export interface Slot {
  id: string;
  name: string;
  type: SlotType;
  required: boolean;
}

export interface Preset {
  id: string;
  name: string;
  description: string;
}

export interface SectionType {
  id: string;
  name: string;
  category: SectionCategory;
  icon: string; // lucide-react
  description: string;
  slots: Slot[];
  presets: Preset[];
  sample: Record<string, string | number | boolean>;
}

const slot = (id: string, name: string, type: SlotType, required = false): Slot => ({
  id,
  name,
  type,
  required,
});

export const SECCIONES_SEED: SectionType[] = [
  {
    id: "hero",
    name: "Portada (Hero)",
    category: "Header",
    icon: "Sparkles",
    description: "La primera impresión: título grande, mensaje y llamada a la acción.",
    slots: [
      slot("titulo", "Título", "texto", true),
      slot("subtitulo", "Subtítulo", "textarea"),
      slot("imagen", "Imagen de fondo", "imagen"),
      slot("ctaTexto", "Texto del botón", "texto"),
      slot("ctaUrl", "Enlace del botón", "url"),
    ],
    presets: [
      { id: "split", name: "Dividido", description: "Texto a un lado, imagen al otro." },
      { id: "centrado", name: "Centrado", description: "Todo centrado sobre la imagen." },
      { id: "minimal", name: "Minimal", description: "Solo texto, sin imagen." },
    ],
    sample: {
      titulo: "Maestro Carballo",
      subtitulo: "Escultor en piedra, hierro y bronce desde 1985.",
      imagen: "taller",
      ctaTexto: "Ver obras",
      ctaUrl: "/obras",
    },
  },
  {
    id: "obras-destacadas",
    name: "Obras destacadas",
    category: "Contenido",
    icon: "Hammer",
    description: "Una selección de tus piezas para enganchar al visitante.",
    slots: [
      slot("titulo", "Título", "texto", true),
      slot("subtitulo", "Subtítulo", "textarea"),
      slot("numeroObras", "Nº de obras", "numero"),
      slot("mostrarPrecio", "Mostrar precio", "booleano"),
    ],
    presets: [
      { id: "grid", name: "Cuadrícula", description: "Tres obras en fila." },
      { id: "carrusel", name: "Carrusel", description: "Una obra grande con avance." },
      { id: "destacada", name: "Destacada", description: "Una grande + dos pequeñas." },
    ],
    sample: {
      titulo: "Obras destacadas",
      subtitulo: "Una selección reciente del taller.",
      numeroObras: 3,
      mostrarPrecio: false,
    },
  },
  {
    id: "galeria",
    name: "Galería",
    category: "Media",
    icon: "Image",
    description: "Muestra fotos del taller, el proceso o una colección.",
    slots: [
      slot("titulo", "Título", "texto"),
      slot("columnas", "Columnas", "numero"),
      slot("pieDeFoto", "Mostrar pie de foto", "booleano"),
    ],
    presets: [
      { id: "grid", name: "Cuadrícula", description: "Mosaico regular." },
      { id: "masonry", name: "Mosaico", description: "Alturas variadas." },
      { id: "editorial", name: "Editorial", description: "Una grande + texto." },
    ],
    sample: { titulo: "Galería del taller", columnas: 3, pieDeFoto: true },
  },
  {
    id: "prensa",
    name: "Prensa",
    category: "Social proof",
    icon: "Newspaper",
    description: "Medios y reconocimientos que dan confianza.",
    slots: [
      slot("titulo", "Título", "texto", true),
      slot("mostrarLogos", "Mostrar logos", "booleano"),
    ],
    presets: [
      { id: "logos", name: "Logos", description: "Fila de medios." },
      { id: "citas", name: "Citas", description: "Una frase destacada." },
      { id: "tarjetas", name: "Tarjetas", description: "Recortes en tarjetas." },
    ],
    sample: { titulo: "Han hablado de nosotros", mostrarLogos: true },
  },
  {
    id: "estadisticas",
    name: "Estadísticas",
    category: "Info",
    icon: "BarChart3",
    description: "Cifras que resumen tu trayectoria de un vistazo.",
    slots: [
      slot("titulo", "Título", "texto"),
      slot("dato1", "Dato 1", "texto"),
      slot("dato2", "Dato 2", "texto"),
      slot("dato3", "Dato 3", "texto"),
    ],
    presets: [
      { id: "fila", name: "En fila", description: "Tres cifras alineadas." },
      { id: "tarjetas", name: "Tarjetas", description: "Cada cifra en su tarjeta." },
      { id: "destacado", name: "Destacado", description: "Una grande + dos pequeñas." },
    ],
    sample: {
      titulo: "El taller en cifras",
      dato1: "40 años",
      dato2: "+250 obras",
      dato3: "12 países",
    },
  },
  {
    id: "contacto",
    name: "Contacto",
    category: "CTA",
    icon: "Mail",
    description: "Para que te escriban o te encuentren fácilmente.",
    slots: [
      slot("titulo", "Título", "texto", true),
      slot("email", "Email", "email", true),
      slot("telefono", "Teléfono", "texto"),
      slot("mostrarMapa", "Mostrar mapa", "booleano"),
    ],
    presets: [
      { id: "formulario", name: "Formulario", description: "Campos de contacto." },
      { id: "split", name: "Dividido", description: "Texto + formulario." },
      { id: "minimal", name: "Minimal", description: "Solo datos de contacto." },
    ],
    sample: {
      titulo: "Hablemos",
      email: "hola@maestrocarballo.com",
      telefono: "+34 600 000 000",
      mostrarMapa: true,
    },
  },
  {
    id: "faq",
    name: "Preguntas frecuentes",
    category: "Info",
    icon: "HelpCircle",
    description: "Resuelve dudas habituales antes de que te escriban.",
    slots: [
      slot("titulo", "Título", "texto"),
      slot("numeroPreguntas", "Nº de preguntas", "numero"),
    ],
    presets: [
      { id: "acordeon", name: "Acordeón", description: "Preguntas plegables." },
      { id: "dos-columnas", name: "Dos columnas", description: "Repartidas en dos." },
      { id: "lista", name: "Lista", description: "Una debajo de otra." },
    ],
    sample: { titulo: "Preguntas frecuentes", numeroPreguntas: 4 },
  },
  {
    id: "cta",
    name: "Llamada a la acción",
    category: "CTA",
    icon: "Megaphone",
    description: "Empuja al visitante a dar el siguiente paso.",
    slots: [
      slot("titulo", "Título", "texto", true),
      slot("texto", "Texto", "textarea"),
      slot("botonTexto", "Texto del botón", "texto"),
      slot("botonUrl", "Enlace del botón", "url"),
    ],
    presets: [
      { id: "banner", name: "Banner", description: "Franja de color a todo ancho." },
      { id: "centrado", name: "Centrado", description: "Mensaje centrado." },
      { id: "franja", name: "Franja", description: "Tira fina con botón al lado." },
    ],
    sample: {
      titulo: "¿Tienes un proyecto en mente?",
      texto: "Cuéntame tu idea y la convertimos en escultura.",
      botonTexto: "Empezar",
      botonUrl: "/contacto",
    },
  },
];
