import type { VisitorStat, TopPage, QuickAction } from "./types";

export const visitorStats: VisitorStat[] = [
  { day: "Lun", visitors: 84, pageviews: 162 },
  { day: "Mar", visitors: 122, pageviews: 247 },
  { day: "Mié", visitors: 98, pageviews: 201 },
  { day: "Jue", visitors: 156, pageviews: 312 },
  { day: "Vie", visitors: 187, pageviews: 374 },
  { day: "Sáb", visitors: 142, pageviews: 268 },
  { day: "Dom", visitors: 95, pageviews: 178 },
];

export const topPages: TopPage[] = [
  { path: "/obras", title: "Obras", views: 1284 },
  { path: "/obras/circulo-infinito", title: "Obra · Círculo Infinito", views: 612 },
  { path: "/", title: "Inicio", views: 542 },
  { path: "/biografia", title: "Biografía", views: 389 },
  { path: "/contacto", title: "Contacto", views: 271 },
];

export const quickActions: QuickAction[] = [
  {
    id: "qa1",
    label: "Añadir obra",
    description: "Sube una nueva escultura a tu colección.",
    to: "/obras",
    icon: "Plus",
  },
  {
    id: "qa2",
    label: "Escribir entrada",
    description: "Comparte una nueva entrada en tu blog.",
    to: "/blog",
    icon: "PenSquare",
  },
  {
    id: "qa3",
    label: "Responder consultas",
    description: "Tienes mensajes pendientes de leer.",
    to: "/consultas",
    icon: "MessageSquare",
  },
  {
    id: "qa4",
    label: "Editar biografía",
    description: "Actualiza la sección sobre ti.",
    to: "/empresa",
    icon: "User",
  },
];
