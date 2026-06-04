// Datos mock (solo lectura) del módulo Analíticas.
// Tres rangos temporales: 7 / 30 / 90 días.

export type RangeKey = "7d" | "30d" | "90d";

export interface RangeOption {
  key: RangeKey;
  label: string;
}

export const RANGE_OPTIONS: RangeOption[] = [
  { key: "7d", label: "Últimos 7 días" },
  { key: "30d", label: "Últimos 30 días" },
  { key: "90d", label: "Últimos 90 días" },
];

export interface Kpi {
  id: string;
  label: string;
  icon: string; // lucide-react
  tone: "primary" | "amber" | "emerald" | "muted";
  value: string;
  delta: string; // ej "+18%"
  trend: "up" | "down";
  hint: string;
}

export interface TrafficPoint {
  label: string; // eje X
  visitantes: number; // visitantes únicos
  obras: number; // páginas de obra vistas
}

export interface PopularWork {
  name: string;
  visitas: number;
}

export interface ViewedPage {
  path: string;
  name: string;
  visitas: number;
  tiempo: string; // tiempo medio
}

export interface CityOrigin {
  city: string;
  region: string; // país / comunidad
  visitas: number;
}

export interface LlmReferral {
  id: string;
  source: string; // nombre del buscador IA
  icon: string; // lucide-react
  color: string; // color de marca (hex)
  referrals: number;
  delta: string; // ej "+24%"
  trend: "up" | "down";
}

export interface RangeData {
  kpis: Kpi[];
  traffic: TrafficPoint[];
  works: PopularWork[];
  pages: ViewedPage[];
  cities: CityOrigin[];
  llm: LlmReferral[];
}

const t = (n: number) => n.toLocaleString("es-ES");

export const ANALYTICS: Record<RangeKey, RangeData> = {
  "7d": {
    kpis: [
      { id: "visitas", label: "Visitas únicas", icon: "Users", tone: "primary", value: t(884), delta: "+12%", trend: "up", hint: "Personas distintas que entraron" },
      { id: "vistas", label: "Páginas vistas", icon: "Eye", tone: "emerald", value: t(1742), delta: "+18%", trend: "up", hint: "Total de páginas abiertas" },
      { id: "tiempo", label: "Tiempo medio de visita", icon: "Clock", tone: "amber", value: "2m 25s", delta: "+9%", trend: "up", hint: "Cuánto se quedan de media" },
      { id: "rebote", label: "Tasa de rebote", icon: "LogOut", tone: "muted", value: "38%", delta: "-4%", trend: "down", hint: "Se van sin tocar nada" },
    ],
    traffic: [
      { label: "Lun", visitantes: 84, obras: 132 },
      { label: "Mar", visitantes: 122, obras: 201 },
      { label: "Mié", visitantes: 98, obras: 168 },
      { label: "Jue", visitantes: 156, obras: 264 },
      { label: "Vie", visitantes: 187, obras: 318 },
      { label: "Sáb", visitantes: 142, obras: 236 },
      { label: "Dom", visitantes: 95, obras: 158 },
    ],
    works: [
      { name: "Círculo Infinito", visitas: 612 },
      { name: "Equilibrio Vertical", visitas: 487 },
      { name: "Espiral del Movimiento", visitas: 392 },
      { name: "Reflejo de Acero", visitas: 268 },
      { name: "Lazo Continuo", visitas: 201 },
    ],
    pages: [
      { path: "/inicio", name: "Portada Principal", visitas: 4120, tiempo: "1m 45s" },
      { path: "/obras", name: "Catálogo de Esculturas", visitas: 3840, tiempo: "2m 50s" },
      { path: "/sobre-mi", name: "Biografía", visitas: 1950, tiempo: "3m 12s" },
      { path: "/contacto", name: "Formulario", visitas: 1120, tiempo: "0m 58s" },
    ],
    cities: [
      { city: "Madrid", region: "España", visitas: 214 },
      { city: "Barcelona", region: "España", visitas: 168 },
      { city: "Valencia", region: "España", visitas: 96 },
      { city: "Lisboa", region: "Portugal", visitas: 74 },
      { city: "París", region: "Francia", visitas: 52 },
      { city: "Ciudad de México", region: "México", visitas: 41 },
    ],
    llm: [
      { id: "chatgpt", source: "ChatGPT", icon: "Sparkles", color: "#10a37f", referrals: 142, delta: "+34%", trend: "up" },
      { id: "perplexity", source: "Perplexity", icon: "Search", color: "#20b8cd", referrals: 86, delta: "+21%", trend: "up" },
      { id: "gemini", source: "Google Gemini", icon: "Stars", color: "#4f86f7", referrals: 64, delta: "+12%", trend: "up" },
      { id: "copilot", source: "Microsoft Copilot", icon: "Bot", color: "#7c4dff", referrals: 38, delta: "+9%", trend: "up" },
      { id: "claude", source: "Claude", icon: "MessageSquare", color: "#d97757", referrals: 27, delta: "-3%", trend: "down" },
    ],
  },
  "30d": {
    kpis: [
      { id: "visitas", label: "Visitas únicas", icon: "Users", tone: "primary", value: t(3642), delta: "+15%", trend: "up", hint: "Personas distintas que entraron" },
      { id: "vistas", label: "Páginas vistas", icon: "Eye", tone: "emerald", value: t(7218), delta: "+18%", trend: "up", hint: "Total de páginas abiertas" },
      { id: "tiempo", label: "Tiempo medio de visita", icon: "Clock", tone: "amber", value: "2m 38s", delta: "+6%", trend: "up", hint: "Cuánto se quedan de media" },
      { id: "rebote", label: "Tasa de rebote", icon: "LogOut", tone: "muted", value: "35%", delta: "-7%", trend: "down", hint: "Se van sin tocar nada" },
    ],
    traffic: [
      { label: "Sem 1", visitantes: 612, obras: 1024 },
      { label: "Sem 2", visitantes: 748, obras: 1286 },
      { label: "Sem 3", visitantes: 902, obras: 1542 },
      { label: "Sem 4", visitantes: 1024, obras: 1788 },
    ],
    works: [
      { name: "Círculo Infinito", visitas: 2410 },
      { name: "Equilibrio Vertical", visitas: 1980 },
      { name: "Espiral del Movimiento", visitas: 1654 },
      { name: "Reflejo de Acero", visitas: 1187 },
      { name: "Lazo Continuo", visitas: 842 },
    ],
    pages: [
      { path: "/inicio", name: "Portada Principal", visitas: 16840, tiempo: "1m 52s" },
      { path: "/obras", name: "Catálogo de Esculturas", visitas: 15120, tiempo: "2m 58s" },
      { path: "/sobre-mi", name: "Biografía", visitas: 7980, tiempo: "3m 20s" },
      { path: "/contacto", name: "Formulario", visitas: 4310, tiempo: "1m 04s" },
    ],
    cities: [
      { city: "Madrid", region: "España", visitas: 902 },
      { city: "Barcelona", region: "España", visitas: 712 },
      { city: "Valencia", region: "España", visitas: 418 },
      { city: "Lisboa", region: "Portugal", visitas: 326 },
      { city: "París", region: "Francia", visitas: 248 },
      { city: "Ciudad de México", region: "México", visitas: 196 },
    ],
    llm: [
      { id: "chatgpt", source: "ChatGPT", icon: "Sparkles", color: "#10a37f", referrals: 612, delta: "+41%", trend: "up" },
      { id: "perplexity", source: "Perplexity", icon: "Search", color: "#20b8cd", referrals: 358, delta: "+28%", trend: "up" },
      { id: "gemini", source: "Google Gemini", icon: "Stars", color: "#4f86f7", referrals: 274, delta: "+18%", trend: "up" },
      { id: "copilot", source: "Microsoft Copilot", icon: "Bot", color: "#7c4dff", referrals: 162, delta: "+11%", trend: "up" },
      { id: "claude", source: "Claude", icon: "MessageSquare", color: "#d97757", referrals: 118, delta: "+6%", trend: "up" },
    ],
  },
  "90d": {
    kpis: [
      { id: "visitas", label: "Visitas únicas", icon: "Users", tone: "primary", value: t(11280), delta: "+22%", trend: "up", hint: "Personas distintas que entraron" },
      { id: "vistas", label: "Páginas vistas", icon: "Eye", tone: "emerald", value: t(22640), delta: "+18%", trend: "up", hint: "Total de páginas abiertas" },
      { id: "tiempo", label: "Tiempo medio de visita", icon: "Clock", tone: "amber", value: "2m 41s", delta: "+4%", trend: "up", hint: "Cuánto se quedan de media" },
      { id: "rebote", label: "Tasa de rebote", icon: "LogOut", tone: "muted", value: "33%", delta: "-9%", trend: "down", hint: "Se van sin tocar nada" },
    ],
    traffic: [
      { label: "Ene", visitantes: 2840, obras: 4820 },
      { label: "Feb", visitantes: 3620, obras: 6140 },
      { label: "Mar", visitantes: 4820, obras: 8210 },
    ],
    works: [
      { name: "Círculo Infinito", visitas: 7280 },
      { name: "Equilibrio Vertical", visitas: 6120 },
      { name: "Espiral del Movimiento", visitas: 5040 },
      { name: "Reflejo de Acero", visitas: 3680 },
      { name: "Lazo Continuo", visitas: 2510 },
    ],
    pages: [
      { path: "/inicio", name: "Portada Principal", visitas: 52400, tiempo: "1m 58s" },
      { path: "/obras", name: "Catálogo de Esculturas", visitas: 47120, tiempo: "3m 04s" },
      { path: "/sobre-mi", name: "Biografía", visitas: 24850, tiempo: "3m 28s" },
      { path: "/contacto", name: "Formulario", visitas: 13420, tiempo: "1m 11s" },
    ],
    cities: [
      { city: "Madrid", region: "España", visitas: 2810 },
      { city: "Barcelona", region: "España", visitas: 2240 },
      { city: "Valencia", region: "España", visitas: 1320 },
      { city: "Lisboa", region: "Portugal", visitas: 1040 },
      { city: "París", region: "Francia", visitas: 812 },
      { city: "Ciudad de México", region: "México", visitas: 648 },
    ],
    llm: [
      { id: "chatgpt", source: "ChatGPT", icon: "Sparkles", color: "#10a37f", referrals: 1980, delta: "+52%", trend: "up" },
      { id: "perplexity", source: "Perplexity", icon: "Search", color: "#20b8cd", referrals: 1142, delta: "+33%", trend: "up" },
      { id: "gemini", source: "Google Gemini", icon: "Stars", color: "#4f86f7", referrals: 864, delta: "+24%", trend: "up" },
      { id: "copilot", source: "Microsoft Copilot", icon: "Bot", color: "#7c4dff", referrals: 512, delta: "+15%", trend: "up" },
      { id: "claude", source: "Claude", icon: "MessageSquare", color: "#d97757", referrals: 386, delta: "+9%", trend: "up" },
    ],
  },
};
