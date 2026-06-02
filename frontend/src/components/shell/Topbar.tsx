import { useLocation } from "react-router-dom";
import { findSectionByPath } from "@/lib/navigation";
import { useThemeStore } from "@/stores/theme-store";
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
  const section = findSectionByPath(pathname);
  const meta = titles[section?.id ?? "inicio"] ?? titles.inicio;
  const { mode, toggle } = useThemeStore();

  return (
    <header
      data-testid={SHELL.topbar}
      className="sticky top-0 z-30 flex items-start justify-between gap-6 border-b border-topbar-border bg-topbar/95 px-8 pt-6 pb-5 backdrop-blur"
    >
      <div className="min-w-0">
        <h1
          data-testid={SHELL.topbarTitle}
          className="text-3xl font-extrabold tracking-tight text-foreground"
        >
          {meta.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{meta.subtitle}</p>
      </div>

      <div className="flex shrink-0 items-center gap-3">
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
