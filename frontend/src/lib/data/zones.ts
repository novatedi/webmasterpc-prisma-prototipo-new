// Modelo de navegación por ZONAS (shell de 2 niveles).
// Barra de zonas arriba + sidebar que muestra solo la zona activa.
// `active` = está construido/activo para el escultor; si no, placeholder "Próximamente".

export interface ZoneItem {
  id: string;
  label: string;
  icon: string; // lucide-react
  to?: string; // ruta real si existe
  active: boolean;
}

export interface Zone {
  id: string;
  label: string;
  icon: string;
  items: ZoneItem[];
}

const it = (
  id: string,
  label: string,
  icon: string,
  active: boolean,
  to?: string,
): ZoneItem => ({ id, label, icon, active, to });

export const ZONES: Zone[] = [
  {
    id: "web",
    label: "Web",
    icon: "Globe2",
    items: [
      it("inicio", "Inicio", "LayoutDashboard", true, "/inicio"),
      it("empresa", "Empresa", "Building2", true, "/empresa/historia"),
      it("servicios", "Servicios", "Boxes", true, "/servicios"),
      it("obras", "Obras", "Hammer", true, "/obras/catalogo"),
      it("galeria", "Galería", "Image", true),
      it("blog", "Blog", "PenSquare", true, "/blog/articulos"),
      it("resenas", "Reseñas", "Star", true, "/resenas"),
      it("prensa", "Prensa", "Newspaper", true, "/prensa"),
      it("biblioteca", "Biblioteca", "FolderOpen", true, "/biblioteca"),
    ],
  },
  {
    id: "diseno",
    label: "Diseño",
    icon: "Palette",
    items: [
      it("paginas", "Páginas", "Layout", true, "/paginas"),
      it("secciones", "Secciones", "LayoutGrid", true, "/secciones"),
      it("temas", "Temas", "Brush", true),
      it("modulos", "Módulos", "ToggleRight", true, "/funciones"),
      it("efectos", "Efectos de Temporada", "Snowflake", false),
    ],
  },
  {
    id: "ia",
    label: "IA",
    icon: "Sparkles",
    items: [
      it("asistente-ia", "Asistente IA", "Bot", false),
      it("chatbot-ia", "Chatbot IA", "MessageCircle", false),
      it("ai-studio", "AI Studio", "Wand2", false),
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: "Megaphone",
    items: [
      it("identidad", "Identidad", "Palette", true, "/ajustes/identidad"),
      it("redes", "Redes Sociales", "Share2", false),
      it("seo", "SEO", "Search", false),
      it("analiticas", "Analíticas", "BarChart3", false),
      it("newsletter", "Newsletter", "MailOpen", false),
      it("calendario", "Calendario", "CalendarRange", false),
    ],
  },
  {
    id: "clientes",
    label: "Clientes",
    icon: "Users",
    items: [
      it("consultas", "Consultas", "MessageSquare", true, "/consultas"),
      it("suscriptores", "Suscriptores", "Users", false),
      it("cita-previa", "Cita previa", "CalendarClock", false),
    ],
  },
  {
    id: "tienda",
    label: "Tienda Online",
    icon: "Store",
    items: [
      it("catalogo", "Catálogo", "Package", false),
      it("pedidos", "Pedidos", "ShoppingBag", false),
      it("pagos", "Formas de pago", "CreditCard", false),
      it("envios", "Envíos", "Truck", false),
      it("coa", "Certificados COA", "BadgeCheck", false),
    ],
  },
  {
    id: "ajustes",
    label: "Ajustes",
    icon: "Settings",
    items: [
      it("general", "General y dominio", "Sliders", true, "/ajustes/general"),
      it("idiomas", "Idiomas", "Languages", false),
      it("ubicaciones", "Ubicaciones", "MapPin", false),
      it("mantenimiento", "Mantenimiento", "Wrench", true, "/ajustes/mantenimiento"),
      it("equipo", "Equipo", "UsersRound", false),
      it("marketplace", "Marketplace", "Store", false),
    ],
  },
];

/** Zonas visibles en la barra superior (Ajustes va aparte, en el engranaje). */
export const TOPBAR_ZONES = ZONES.filter((z) => z.id !== "ajustes");
export const AJUSTES_ZONE = ZONES.find((z) => z.id === "ajustes")!;

/** ¿La ruta actual corresponde a este item? */
export function itemMatches(item: ZoneItem, pathname: string): boolean {
  if (!item.to) return false;
  const seg = item.to.split("/").filter(Boolean);
  if (seg[0] === "ajustes") {
    // Rutas de /ajustes son precisas (identidad, general, mantenimiento…)
    return pathname === item.to || pathname.startsWith(item.to + "/");
  }
  return pathname === item.to || pathname.startsWith("/" + seg[0]);
}

/** Devuelve la zona que contiene la ruta actual (o undefined). */
export function findZoneByPath(pathname: string): Zone | undefined {
  return ZONES.find((z) => z.items.some((i) => itemMatches(i, pathname)));
}

/** Busca un item por id en todas las zonas. */
export function findZoneItem(itemId: string): ZoneItem | undefined {
  for (const z of ZONES) {
    const found = z.items.find((i) => i.id === itemId);
    if (found) return found;
  }
  return undefined;
}
