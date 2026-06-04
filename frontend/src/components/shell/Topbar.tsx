import { useLocation } from "react-router-dom";
import { findSectionByPath } from "@/lib/navigation";
import { useThemeStore } from "@/stores/theme-store";
import { useTopbarActions } from "@/stores/topbar-actions-store";
import { useMobileNavStore } from "@/stores/mobile-nav-store";
import { branding } from "@/lib/data/branding";
import { Icon } from "@/lib/icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SHELL } from "@/constants/testIds";
import { cn } from "@/lib/utils";

const titles: Record<string, { title: string; subtitle: string }> = {
  inicio: {
    title: "Inicio",
    subtitle: "Bienvenido a tu panel. Aquí tienes un resumen rápido.",
  },
  empresa: {
    title: "La empresa",
    subtitle: "Cuenta tu historia, tu biografía y cómo contactarte.",
  },
  paginas: {
    title: "Páginas",
    subtitle:
      "Compón cada página combinando secciones prediseñadas. Arrastra para ordenar.",
  },
  funciones: {
    title: "Funciones",
    subtitle:
      "Activa solo lo que necesitas; tu panel se mantiene simple.",
  },
  biblioteca: {
    title: "Biblioteca",
    subtitle: "Tus archivos compartidos entre obras, blog y páginas.",
  },
  "preview-web": {
    title: "Vista previa web",
    subtitle: "Mira tu web pública en una pestaña aparte.",
  },
  identidad: {
    title: "Identidad",
    subtitle: "Logo, color principal y tipografía de tu marca.",
  },
  modulos: {
    title: "Módulo",
    subtitle: "Este módulo se está preparando.",
  },
  prensa: {
    title: "Prensa",
    subtitle: "Artículos, entrevistas y críticas sobre tu trabajo.",
  },
  servicios: {
    title: "Servicios",
    subtitle: "Lo que ofreces a tus clientes y galerías.",
  },
  blog: {
    title: "Blog",
    subtitle: "Comparte el día a día de tu taller.",
  },
  obras: {
    title: "Obras",
    subtitle: "Gestiona y organiza las obras de tu colección.",
  },
  consultas: {
    title: "Consultas",
    subtitle: "Mensajes que llegan desde tu web.",
  },
  resenas: {
    title: "Reseñas",
    subtitle: "Opiniones de clientes y colaboradores.",
  },
  ajustes: {
    title: "Ajustes",
    subtitle: "Personaliza tu marca y tu dominio.",
  },
};

export function Topbar() {
  const { pathname } = useLocation();
  // Resolución directa por prefijo de path
  const sectionId = (() => {
    if (pathname.startsWith("/inicio")) return "inicio";
    if (pathname.startsWith("/empresa")) return "empresa";
    if (pathname.startsWith("/obras")) return "obras";
    if (pathname.startsWith("/paginas")) return "paginas";
    if (pathname.startsWith("/funciones")) return "funciones";
    if (pathname.startsWith("/biblioteca")) return "biblioteca";
    if (pathname.startsWith("/preview-web")) return "preview-web";
    if (pathname.startsWith("/ajustes/identidad")) return "identidad";
    if (pathname.startsWith("/ajustes")) return "ajustes";
    if (pathname.startsWith("/blog")) return "blog";
    if (pathname.startsWith("/servicios")) return "servicios";
    if (pathname.startsWith("/consultas")) return "consultas";
    if (pathname.startsWith("/resenas")) return "resenas";
    if (pathname.startsWith("/modulos")) return "modulos";
    if (pathname.startsWith("/prensa")) return "prensa";
    return "inicio";
  })();
  const meta = titles[sectionId] ?? titles.inicio;
  const { mode, toggle } = useThemeStore();
  const injectedActions = useTopbarActions((s) => s.node);
  const openMobileNav = useMobileNavStore((s) => s.toggle);

  return (
    <header
      data-testid={SHELL.topbar}
      className="sticky top-0 z-30 flex items-start justify-between gap-3 border-b border-topbar-border bg-topbar/95 px-4 pt-5 pb-4 backdrop-blur sm:gap-6 sm:px-6 md:px-8 md:pt-6 md:pb-5"
    >
      <div className="flex min-w-0 items-start gap-3">
        <button
          type="button"
          onClick={openMobileNav}
          aria-label="Abrir menú"
          data-testid="topbar-menu-btn"
          className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-accent lg:hidden"
        >
          <Icon name="Menu" className="h-4 w-4" />
        </button>
        <div className="min-w-0">
          <h1
            data-testid={SHELL.topbarTitle}
            className="truncate text-xl font-extrabold tracking-tight text-foreground sm:text-2xl md:text-3xl"
          >
            {meta.title}
          </h1>
          <p className="mt-1 hidden text-sm text-muted-foreground sm:block">
            {meta.subtitle}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {/* Acciones inyectadas por la página activa (ej. Vista previa + Publicar) */}
        {injectedActions}

        {/* Toggle tema */}
        <Button
          variant="outline"
          size="sm"
          onClick={toggle}
          data-testid={SHELL.themeToggle}
          aria-label={mode === "dark" ? "Cambiar a modo claro" : "Cambiar a modo noche"}
          className={cn(
            "h-10 gap-2 rounded-full border-border bg-card px-4 text-sm font-semibold",
            "hover:bg-accent hover:text-accent-foreground",
          )}
        >
          <Icon
            name={mode === "dark" ? "Sun" : "Moon"}
            className="h-4 w-4"
            strokeWidth={2}
          />
          <span className="hidden sm:inline">
            {mode === "dark" ? "Modo claro" : "Modo noche"}
          </span>
        </Button>

        {/* Notificaciones */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              data-testid={SHELL.notifications}
              aria-label="Notificaciones"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
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

        {/* Avatar usuario */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              data-testid={SHELL.userAvatar}
              className="flex h-10 items-center gap-3 rounded-full border border-border bg-card pl-1.5 pr-4 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src={branding.ownerAvatarUrl} alt={branding.ownerName} />
                <AvatarFallback className="bg-primary/15 text-primary">
                  {branding.ownerName.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline">{branding.ownerName}</span>
              <Icon name="ChevronDown" className="h-4 w-4 text-muted-foreground" />
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
