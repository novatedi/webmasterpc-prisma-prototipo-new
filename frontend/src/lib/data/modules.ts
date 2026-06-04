// Catálogo de módulos del editor. Núcleo + módulos toggleables organizados
// por categoría. Algunos módulos llevan badge (IA / Tienda / Pro).

export type ModuleCategory =
  | "contenido"
  | "tienda"
  | "comunicacion"
  | "marketing"
  | "diseno"
  | "ajustes-mod";

export interface ModuleDef {
  id: string; // sluggable
  label: string;
  icon: string; // lucide-react
  description: string;
  category: ModuleCategory;
  /** estado activo por defecto */
  defaultActive: boolean;
  /** ruta a la que se navega; si undefined → /modulos/:id placeholder */
  to?: string;
  /** badge visual en la tarjeta */
  badge?: "IA" | "Tienda" | "Pro";
}

export interface CoreSection {
  id: string;
  label: string;
  icon: string;
  to: string;
}

export const CATEGORY_LABELS: Record<ModuleCategory, string> = {
  contenido: "Contenido",
  tienda: "Tienda",
  comunicacion: "Comunicación",
  marketing: "Marketing & IA",
  diseno: "Diseño",
  "ajustes-mod": "Ajustes",
};

export const CATEGORY_ICONS: Record<ModuleCategory, string> = {
  contenido: "Layers",
  tienda: "Store",
  comunicacion: "MessageSquare",
  marketing: "Megaphone",
  diseno: "Palette",
  "ajustes-mod": "Sliders",
};

export const CATEGORY_DESCRIPTIONS: Record<ModuleCategory, string> = {
  contenido: "Lo que llena tu web: páginas y bloques de contenido.",
  tienda: "Vende online. Se activa todo el grupo a la vez.",
  comunicacion: "Cómo te encuentran y te escriben tus clientes.",
  marketing: "Posicionamiento y herramientas con IA.",
  diseno: "Cómo se ve tu web: temas, efectos y secciones.",
  "ajustes-mod": "Preferencias avanzadas del estudio.",
};

/** Núcleo: siempre visible en la sidebar, no toggleable. */
export const CORE_SECTIONS: CoreSection[] = [
  { id: "inicio", label: "Inicio", icon: "LayoutDashboard", to: "/inicio" },
  { id: "empresa", label: "La empresa", icon: "Building2", to: "/empresa/historia" },
  { id: "obras", label: "Obras", icon: "Hammer", to: "/obras/catalogo" },
  { id: "paginas", label: "Páginas", icon: "Layout", to: "/paginas" },
  { id: "biblioteca", label: "Biblioteca", icon: "FolderOpen", to: "/biblioteca" },
  { id: "consultas", label: "Consultas", icon: "MessageSquare", to: "/consultas" },
  { id: "identidad", label: "Identidad", icon: "Palette", to: "/ajustes/identidad" },
  { id: "preview-web", label: "Vista previa web", icon: "Eye", to: "/preview-web" },
  { id: "funciones", label: "Funciones", icon: "ToggleRight", to: "/funciones" },
];

/** Catálogo completo de módulos opcionales. */
export const MODULES: ModuleDef[] = [
  // ============ Contenido ============
  {
    id: "servicios",
    label: "Servicios",
    icon: "Boxes",
    description: "Bloques de los servicios que ofreces.",
    category: "contenido",
    defaultActive: true,
    to: "/servicios",
  },
  {
    id: "galeria",
    label: "Galería",
    icon: "Image",
    description: "Galería de fotos del taller y proceso.",
    category: "contenido",
    defaultActive: true,
  },
  {
    id: "prensa",
    label: "Prensa",
    icon: "Newspaper",
    description: "Reseñas en prensa y enlaces a artículos.",
    category: "contenido",
    defaultActive: true,
    to: "/prensa",
  },
  {
    id: "exposiciones",
    label: "Exposiciones",
    icon: "CalendarDays",
    description: "Pasadas y próximas: galerías, ferias y muestras.",
    category: "contenido",
    defaultActive: true,
  },
  {
    id: "blog",
    label: "Blog",
    icon: "PenSquare",
    description: "Artículos sobre tu trabajo y el taller.",
    category: "contenido",
    defaultActive: true,
    to: "/blog/articulos",
  },
  {
    id: "resenas",
    label: "Reseñas",
    icon: "Star",
    description: "Opiniones de clientes y galerías.",
    category: "contenido",
    defaultActive: true,
    to: "/resenas",
  },
  {
    id: "albumes",
    label: "Álbumes",
    icon: "GalleryHorizontal",
    description: "Colecciones de fotos agrupadas por proyecto.",
    category: "contenido",
    defaultActive: false,
  },
  {
    id: "galeria-inmersiva",
    label: "Galería Inmersiva",
    icon: "Aperture",
    description: "Recorrido 3D del taller.",
    category: "contenido",
    defaultActive: false,
    badge: "Pro",
  },

  // ============ Tienda (block-toggle) ============
  {
    id: "tienda-catalogo",
    label: "Catálogo",
    icon: "Package",
    description: "Productos a la venta con precio y stock.",
    category: "tienda",
    defaultActive: false,
    badge: "Tienda",
  },
  {
    id: "tienda-pedidos",
    label: "Pedidos",
    icon: "ShoppingBag",
    description: "Pedidos entrantes y su gestión.",
    category: "tienda",
    defaultActive: false,
    badge: "Tienda",
  },
  {
    id: "tienda-pagos",
    label: "Formas de pago",
    icon: "CreditCard",
    description: "Stripe, transferencia y otros.",
    category: "tienda",
    defaultActive: false,
    badge: "Tienda",
  },
  {
    id: "tienda-envios",
    label: "Envíos / Transportistas",
    icon: "Truck",
    description: "Tarifas, zonas y proveedores.",
    category: "tienda",
    defaultActive: false,
    badge: "Tienda",
  },
  {
    id: "tienda-variantes",
    label: "Atributos de variante",
    icon: "Layers3",
    description: "Tamaño, material, acabado…",
    category: "tienda",
    defaultActive: false,
    badge: "Tienda",
  },
  {
    id: "tienda-coa",
    label: "Certificados (COA)",
    icon: "BadgeCheck",
    description: "Certificados de autenticidad de cada pieza.",
    category: "tienda",
    defaultActive: false,
    badge: "Tienda",
  },

  // ============ Comunicación ============
  {
    id: "cita-previa",
    label: "Cita previa",
    icon: "CalendarClock",
    description: "Reserva de visita al taller.",
    category: "comunicacion",
    defaultActive: false,
  },
  {
    id: "agente-ia",
    label: "Agente IA web",
    icon: "Bot",
    description: "Chatbot que responde dudas a tus visitantes.",
    category: "comunicacion",
    defaultActive: false,
    badge: "IA",
  },
  {
    id: "suscriptores",
    label: "Suscriptores",
    icon: "Users",
    description: "Personas suscritas a tus novedades.",
    category: "comunicacion",
    defaultActive: false,
  },
  {
    id: "boletin",
    label: "Boletín",
    icon: "MailOpen",
    description: "Envíos periódicos de novedades del taller.",
    category: "comunicacion",
    defaultActive: false,
  },
  {
    id: "redes-sociales",
    label: "Redes sociales",
    icon: "Share2",
    description: "Cuentas conectadas y publicaciones.",
    category: "comunicacion",
    defaultActive: false,
  },
  {
    id: "calendario-editorial",
    label: "Calendario editorial",
    icon: "CalendarRange",
    description: "Planifica artículos y publicaciones.",
    category: "comunicacion",
    defaultActive: false,
  },

  // ============ Marketing & IA ============
  {
    id: "seo",
    label: "SEO",
    icon: "Search",
    description: "Posicionamiento en buscadores.",
    category: "marketing",
    defaultActive: false,
  },
  {
    id: "analiticas",
    label: "Analíticas",
    icon: "BarChart3",
    description: "Visitas, fuentes y conversión.",
    category: "marketing",
    defaultActive: false,
    to: "/analiticas",
  },
  {
    id: "copiloto-ia",
    label: "Copiloto IA",
    icon: "Sparkles",
    description: "Asistente que te ayuda a editar tu web.",
    category: "marketing",
    defaultActive: false,
    badge: "IA",
  },
  {
    id: "ai-studio",
    label: "AI Studio",
    icon: "Wand2",
    description: "Crea textos, imágenes y descripciones con IA.",
    category: "marketing",
    defaultActive: false,
    badge: "IA",
  },
  {
    id: "estrategia-ia",
    label: "Estrategia IA",
    icon: "Brain",
    description: "Propuestas para crecer tu presencia.",
    category: "marketing",
    defaultActive: false,
    badge: "IA",
  },

  // ============ Diseño ============
  {
    id: "themes",
    label: "Themes",
    icon: "Brush",
    description: "Plantillas de aspecto general.",
    category: "diseno",
    defaultActive: false,
  },
  {
    id: "efectos-temporada",
    label: "Efectos de temporada",
    icon: "Snowflake",
    description: "Decoración estacional automática.",
    category: "diseno",
    defaultActive: false,
  },
  {
    id: "secciones",
    label: "Secciones",
    icon: "LayoutGrid",
    description: "Más secciones prediseñadas para tus páginas.",
    category: "diseno",
    defaultActive: false,
  },
  {
    id: "propuestas-ia",
    label: "Propuestas IA",
    icon: "Lightbulb",
    description: "Ideas visuales generadas por IA.",
    category: "diseno",
    defaultActive: false,
    badge: "IA",
  },

  // ============ Ajustes (extras) ============
  {
    id: "idiomas",
    label: "Idiomas",
    icon: "Languages",
    description: "Traduce tu web a otros idiomas.",
    category: "ajustes-mod",
    defaultActive: false,
  },
  {
    id: "ubicaciones",
    label: "Ubicaciones",
    icon: "MapPin",
    description: "Más de un taller o punto de venta.",
    category: "ajustes-mod",
    defaultActive: false,
  },
  {
    id: "equipo",
    label: "Equipo",
    icon: "UsersRound",
    description: "Otras personas con acceso al panel.",
    category: "ajustes-mod",
    defaultActive: false,
  },
  {
    id: "mantenimiento",
    label: "Mantenimiento",
    icon: "Wrench",
    description: "Pon tu web en pausa temporalmente.",
    category: "ajustes-mod",
    defaultActive: false,
    to: "/ajustes/mantenimiento",
  },
  {
    id: "dominio",
    label: "Dominio",
    icon: "Globe2",
    description: "Tu dirección web y SSL.",
    category: "ajustes-mod",
    defaultActive: false,
    to: "/ajustes/dominio",
  },
  {
    id: "erp",
    label: "ERP",
    icon: "Database",
    description: "Conecta con tu sistema de facturación.",
    category: "ajustes-mod",
    defaultActive: false,
    badge: "Pro",
  },
  {
    id: "legal",
    label: "Textos legales",
    icon: "Scale",
    description: "Aviso legal, privacidad y cookies (RGPD + LSSI).",
    category: "ajustes-mod",
    defaultActive: false,
    to: "/legal",
  },
  {
    id: "seguridad",
    label: "Seguridad",
    icon: "Shield",
    description: "Backups, 2FA y registro de accesos.",
    category: "ajustes-mod",
    defaultActive: false,
  },
];

/** ids de módulos que forman el bloque Tienda (toggle conjunto). */
export const TIENDA_BLOCK_IDS = MODULES
  .filter((m) => m.category === "tienda")
  .map((m) => m.id);

export function findModule(id: string): ModuleDef | undefined {
  return MODULES.find((m) => m.id === id);
}
