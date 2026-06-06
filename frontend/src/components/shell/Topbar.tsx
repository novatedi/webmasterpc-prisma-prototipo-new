import { useLocation } from "react-router-dom";
import { useThemeStore } from "@/stores/theme-store";
import { useTopbarActions } from "@/stores/topbar-actions-store";
import { useMobileNavStore } from "@/stores/mobile-nav-store";
import { findZoneItem } from "@/lib/data/zones";
import { branding } from "@/lib/data/branding";
import { Icon } from "@/lib/icon";
import { SHELL } from "@/constants/testIds";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const titles: Record<string, { title: string; subtitle: string }> = {
  inicio: { title: "¡Bienvenido, Alejandro!", subtitle: "Resumen general de tu sitio web y actividad reciente." },
  empresa: { title: "La empresa", subtitle: "Gestiona la información institucional de tu empresa." },
  servicios: { title: "Servicios", subtitle: "Define los servicios que ofreces a tus clientes." },
  obras: { title: "Obras", subtitle: "Tu catálogo de esculturas y piezas." },
  blog: { title: "Blog", subtitle: "Escribe y publica artículos para tu web." },
  paginas: { title: "Páginas", subtitle: "Compón las páginas de tu sitio con secciones." },
  secciones: { title: "Secciones", subtitle: "El catálogo de secciones prediseñadas de tu web." },
  funciones: { title: "Módulos", subtitle: "Activa o desactiva funciones de tu panel." },
  biblioteca: { title: "Biblioteca", subtitle: "Tus imágenes y archivos en un solo lugar." },
  galeria: { title: "Galería", subtitle: "Agrupa tus fotos en álbumes para mostrarlas en tu web." },
  prensa: { title: "Prensa", subtitle: "Artículos, entrevistas y críticas sobre tu trabajo." },
  analiticas: { title: "Analíticas & Métricas", subtitle: "Supervisa el rendimiento de tu web: visitas, obras más populares y tráfico." },
  legal: { title: "Textos Legales & Privacidad", subtitle: "Genera los textos legales obligatorios de tu web (RGPD + LSSI, España) o usa los tuyos." },
  consultas: { title: "Consultas", subtitle: "Mensajes y solicitudes de tus visitantes." },
  resenas: { title: "Reseñas", subtitle: "Opiniones de tus clientes sobre tu trabajo." },
  preview: { title: "Vista previa", subtitle: "Así se ve tu sitio web público." },
  identidad: { title: "Identidad", subtitle: "Personaliza tu marca y tu dominio." },
  dominio: { title: "Dominio", subtitle: "Conecta y gestiona el dominio de tu web." },
  general: { title: "General y dominio", subtitle: "Ajustes generales de tu sitio." },
  mantenimiento: { title: "Mantenimiento", subtitle: "Activa el modo mantenimiento mientras trabajas en tu web." },
};

function resolveMeta(pathname: string): { title: string; subtitle: string } {
  if (pathname.startsWith("/proximamente/")) {
    const id = pathname.split("/")[2];
    const item = findZoneItem(id);
    return { title: item?.label ?? "Próximamente", subtitle: "Esta función estará disponible muy pronto." };
  }
  if (pathname.startsWith("/identidad")) return titles.identidad;
  if (pathname.startsWith("/ajustes/mantenimiento")) return titles.mantenimiento;
  if (pathname.startsWith("/ajustes")) return titles.general;
  const seg = pathname.split("/").filter(Boolean)[0] ?? "inicio";
  const key = seg === "preview-web" ? "preview" : seg;
  return titles[key] ?? titles.inicio;
}

export function Topbar() {
  const { pathname } = useLocation();
  const { mode, toggle } = useThemeStore();
  const injectedActions = useTopbarActions((s) => s.node);
  const openMobileNav = useMobileNavStore((s) => s.toggle);
  const meta = resolveMeta(pathname);

  return (
    <header
      data-testid={SHELL.topbar}
      className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-topbar-border bg-topbar/95 px-4 py-3.5 backdrop-blur sm:gap-6 sm:px-6 md:px-8"
    >
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={openMobileNav}
          aria-label="Abrir menú"
          data-testid="topbar-menu-btn"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-accent lg:hidden"
        >
          <Icon name="Menu" className="h-4 w-4" />
        </button>
        <div className="min-w-0">
          <h1
            data-testid={SHELL.topbarTitle}
            className="truncate text-xl font-extrabold tracking-tight text-foreground sm:text-2xl"
          >
            {meta.title}
          </h1>
          <p className="hidden truncate text-sm text-muted-foreground sm:block">
            {meta.subtitle}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {injectedActions}

        <button
          onClick={toggle}
          data-testid={SHELL.themeToggle}
          aria-label={mode === "dark" ? "Modo claro" : "Modo noche"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
        >
          <Icon name={mode === "dark" ? "Sun" : "Moon"} className="h-4 w-4" strokeWidth={2} />
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              data-testid={SHELL.notifications}
              aria-label="Notificaciones"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent sm:flex"
            >
              <Icon name="Bell" className="h-4 w-4" strokeWidth={2} />
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                3
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <span className="font-semibold">Nueva consulta de Marta Ruiz</span>
              <span className="text-xs text-muted-foreground">Hace 2 horas</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <span className="font-semibold">Reseña pendiente de aprobar</span>
              <span className="text-xs text-muted-foreground">Ayer</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex-col items-start gap-0.5">
              <span className="font-semibold">Visitas en aumento esta semana</span>
              <span className="text-xs text-muted-foreground">Hace 3 días</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              data-testid={SHELL.userAvatar}
              className="flex h-12 items-center gap-2.5 rounded-full border border-border bg-card pl-1.5 pr-2 transition-colors hover:bg-accent sm:pr-3"
            >
              <Avatar className="h-9 w-9">
                <AvatarImage src={branding.ownerAvatarUrl} alt={branding.ownerName} />
                <AvatarFallback className="bg-primary/15 text-primary">
                  {branding.ownerName.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-left leading-tight sm:block">
                <span className="block text-sm font-bold text-foreground">{branding.ownerName}</span>
                <span className="block text-xs text-muted-foreground">Mi cuenta</span>
              </span>
              <Icon name="ChevronDown" className="hidden h-4 w-4 text-muted-foreground sm:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>{branding.ownerName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon name="User" className="mr-2 h-4 w-4" />
              Mi perfil
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icon name="Settings" className="mr-2 h-4 w-4" />
              Ajustes
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icon name="LogOut" className="mr-2 h-4 w-4" />
              Salir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
