// Datos mock del dashboard de Inicio (zona Web). Solo lectura.

export interface DashKpi {
  id: string;
  label: string;
  value: string;
  delta?: string;
  trend: "up" | "down";
  sub: string;
  icon: string;
  tone: "primary" | "emerald" | "amber" | "sky" | "violet";
}

export const dashboardKpis: DashKpi[] = [
  { id: "visitas", label: "Visitas totales", value: "12.458", delta: "+18,6%", trend: "up", sub: "vs mes anterior", icon: "TrendingUp", tone: "primary" },
  { id: "contactos", label: "Contactos", value: "156", delta: "+12,3%", trend: "up", sub: "vs mes anterior", icon: "Users", tone: "emerald" },
  { id: "citas", label: "Citas agendadas", value: "28", delta: "+7,1%", trend: "up", sub: "vs mes anterior", icon: "CalendarClock", tone: "amber" },
  { id: "pedidos", label: "Pedidos", value: "14", delta: "+25,0%", trend: "up", sub: "vs mes anterior", icon: "ShoppingBag", tone: "sky" },
  { id: "creditos", label: "Créditos IA", value: "838", trend: "up", sub: "Disponibles", icon: "Sparkles", tone: "violet" },
];

export interface PerfPoint {
  label: string;
  value: number;
}

export const perfSeries: PerfPoint[] = [
  { label: "21 Abr", value: 312 },
  { label: "24 Abr", value: 468 },
  { label: "28 Abr", value: 214 },
  { label: "1 May", value: 392 },
  { label: "5 May", value: 528 },
  { label: "8 May", value: 446 },
  { label: "12 May", value: 372 },
  { label: "15 May", value: 512 },
  { label: "18 May", value: 486 },
  { label: "19 May", value: 624 },
  { label: "20 May", value: 712 },
  { label: "21 May", value: 838 },
];

export interface MiniStat {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
}

export const perfMiniStats: MiniStat[] = [
  { label: "Visitantes únicos", value: "9.842", delta: "+15,4%", trend: "up" },
  { label: "Páginas vistas", value: "23.456", delta: "+21,3%", trend: "up" },
  { label: "Tiempo medio", value: "2m 34s", delta: "+8,7%", trend: "up" },
  { label: "Tasa de rebote", value: "38%", delta: "-5,2%", trend: "down" },
];

export interface ActivityItem {
  id: string;
  icon: string;
  tone: "primary" | "amber" | "emerald" | "rose";
  title: string;
  desc: string;
  time: string;
}

export const recentActivity: ActivityItem[] = [
  { id: "a1", icon: "Hammer", tone: "primary", title: "Nueva obra publicada", desc: '"Equilibrio Vertical" se ha publicado', time: "Hace 1 hora" },
  { id: "a2", icon: "Star", tone: "amber", title: "Nueva reseña recibida", desc: "María López te ha dejado una reseña de 5 estrellas", time: "Hace 3 horas" },
  { id: "a3", icon: "CalendarClock", tone: "emerald", title: "Cita agendada", desc: "Nueva cita para mañana a las 16:00", time: "Hace 5 horas" },
  { id: "a4", icon: "PenSquare", tone: "primary", title: "Blog publicado", desc: '"El arte contemporáneo en piedra" publicado', time: "Hace 1 día" },
  { id: "a5", icon: "Mail", tone: "rose", title: "Formulario de contacto", desc: "Nuevo mensaje de contacto recibido", time: "Hace 2 días" },
];

export interface StatusCheck {
  label: string;
  state: "ok" | "warn";
}

export const siteStatus = {
  score: 92,
  label: "Excelente",
  checks: [
    { label: "Sitio web publicado", state: "ok" },
    { label: "SSL activo", state: "ok" },
    { label: "SEO básico configurado", state: "ok" },
    { label: "Sitio rápido y optimizado", state: "ok" },
    { label: "Conectar redes sociales", state: "warn" },
  ] as StatusCheck[],
};

export interface MainPage {
  id: string;
  name: string;
  meta: string;
  img: string;
  to: string;
}

export const mainPages: MainPage[] = [
  { id: "inicio", name: "Inicio", meta: "Página principal", to: "/inicio", img: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=500&q=80&auto=format&fit=crop" },
  { id: "obras", name: "Obras", meta: "8 obras publicadas", to: "/obras/catalogo", img: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?w=500&q=80&auto=format&fit=crop" },
  { id: "galeria", name: "Galería", meta: "42 imágenes", to: "/biblioteca", img: "https://images.unsplash.com/photo-1545989253-02cc26577f88?w=500&q=80&auto=format&fit=crop" },
  { id: "sobre-mi", name: "Sobre mí", meta: "Biografía y filosofía", to: "/empresa/historia", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80&auto=format&fit=crop" },
  { id: "contacto", name: "Contacto", meta: "Información y formulario", to: "/consultas", img: "https://images.unsplash.com/photo-1518176258769-f227c798150e?w=500&q=80&auto=format&fit=crop" },
];

export interface DashAction {
  id: string;
  label: string;
  icon: string;
  to: string;
}

export const dashActions: DashAction[] = [
  { id: "add-obra", label: "Añadir nueva obra", icon: "Plus", to: "/obras/catalogo" },
  { id: "edit-design", label: "Editar diseño", icon: "Palette", to: "/paginas" },
  { id: "write-post", label: "Escribir nueva entrada", icon: "PenSquare", to: "/blog/articulos" },
  { id: "view-analytics", label: "Ver analíticas", icon: "BarChart3", to: "/analiticas" },
  { id: "manage-citas", label: "Gestionar citas", icon: "CalendarClock", to: "/proximamente/cita-previa" },
  { id: "send-newsletter", label: "Enviar newsletter", icon: "Send", to: "/proximamente/newsletter" },
];
