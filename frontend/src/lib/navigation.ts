// Mapa de navegación del shell.
// Cada sección puede tener subsecciones que aparecen anidadas en la sidebar
// y, sincronizadamente, como tabs encima del contenido.

export interface SubSection {
  id: string;
  label: string;
  to: string;
}

export interface Section {
  id: string;
  label: string;
  icon: string; // nombre de icono lucide-react
  to: string;
  subsections?: SubSection[];
}

export const sections: Section[] = [
  {
    id: "inicio",
    label: "Inicio",
    icon: "LayoutDashboard",
    to: "/inicio",
  },
  {
    id: "empresa",
    label: "La empresa",
    icon: "Building2",
    to: "/empresa",
    subsections: [
      { id: "historia", label: "Historia", to: "/empresa/historia" },
      { id: "biografia", label: "Biografía", to: "/empresa/biografia" },
      { id: "filosofia", label: "Filosofía", to: "/empresa/filosofia" },
      { id: "contacto", label: "Contacto", to: "/empresa/contacto" },
      { id: "redes", label: "Redes", to: "/empresa/redes" },
    ],
  },
  {
    id: "servicios",
    label: "Servicios",
    icon: "Boxes",
    to: "/servicios",
    subsections: [
      { id: "catalogo", label: "Catálogo", to: "/servicios/catalogo" },
      { id: "encargos", label: "Encargos", to: "/servicios/encargos" },
      { id: "talleres", label: "Talleres", to: "/servicios/talleres" },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    icon: "PenSquare",
    to: "/blog",
    subsections: [
      { id: "entradas", label: "Entradas", to: "/blog/entradas" },
      { id: "borradores", label: "Borradores", to: "/blog/borradores" },
      { id: "categorias", label: "Categorías", to: "/blog/categorias" },
    ],
  },
  {
    id: "obras",
    label: "Obras",
    icon: "Hammer",
    to: "/obras/catalogo",
    subsections: [
      { id: "catalogo", label: "Catálogo", to: "/obras/catalogo" },
      { id: "categorias", label: "Categorías", to: "/obras/categorias" },
      { id: "materiales", label: "Materiales", to: "/obras/materiales" },
    ],
  },
  {
    id: "consultas",
    label: "Consultas",
    icon: "MessageSquare",
    to: "/consultas",
    subsections: [
      { id: "bandeja", label: "Bandeja de entrada", to: "/consultas/bandeja" },
      { id: "respondidas", label: "Respondidas", to: "/consultas/respondidas" },
    ],
  },
  {
    id: "resenas",
    label: "Reseñas",
    icon: "Star",
    to: "/resenas",
    subsections: [
      { id: "publicadas", label: "Publicadas", to: "/resenas/publicadas" },
      { id: "pendientes", label: "Pendientes", to: "/resenas/pendientes" },
    ],
  },
  {
    id: "ajustes",
    label: "Ajustes",
    icon: "Settings",
    to: "/ajustes",
    subsections: [
      { id: "perfil", label: "Perfil", to: "/ajustes/perfil" },
      { id: "marca", label: "Marca", to: "/ajustes/marca" },
      { id: "dominio", label: "Dominio", to: "/ajustes/dominio" },
    ],
  },
];

export function findSectionByPath(pathname: string): Section | undefined {
  // Primero busca match por subseccion
  for (const s of sections) {
    if (s.subsections?.some((ss) => pathname === ss.to || pathname.startsWith(ss.to + "/")))
      return s;
  }
  // Después por path principal
  return (
    sections.find(
      (s) => pathname === s.to || pathname.startsWith(s.to + "/") || (s.to !== "/" && pathname.startsWith("/" + s.id)),
    ) ?? sections.find((s) => s.to === "/inicio")
  );
}
