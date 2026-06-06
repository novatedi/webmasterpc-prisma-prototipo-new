import { useZoneStore } from "@/stores/zone-store";
import { useThemeStore } from "@/stores/theme-store";
import { useMobileNavStore } from "@/stores/mobile-nav-store";
import { TOPBAR_ZONES, AJUSTES_ZONE } from "@/lib/data/zones";
import { branding } from "@/lib/data/branding";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
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

export function ZonesBar() {
  const activeZone = useZoneStore((s) => s.activeZone);
  const setActiveZone = useZoneStore((s) => s.setActiveZone);
  const { mode, toggle } = useThemeStore();
  const openMobileNav = useMobileNavStore((s) => s.toggle);

  return (
    <header
      data-testid={SHELL.zonesBar}
      className="z-40 flex h-16 shrink-0 items-center gap-2 border-b border-topbar-border bg-topbar px-3 text-foreground sm:px-5"
    >
      {/* Menú móvil */}
      <button
        type="button"
        onClick={openMobileNav}
        aria-label="Abrir menú"
        data-testid="topbar-menu-btn"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-accent lg:hidden"
      >
        <Icon name="Menu" className="h-4 w-4" />
      </button>

      {/* Zonas (subrayado) */}
      <nav className="scrollbar-soft flex h-full flex-1 items-stretch gap-1 overflow-x-auto sm:gap-2">
        {TOPBAR_ZONES.map((z) => {
          const isActive = activeZone === z.id;
          return (
            <button
              key={z.id}
              data-testid={SHELL.zoneTab(z.id)}
              onClick={() => setActiveZone(z.id)}
              className={cn(
                "relative flex shrink-0 items-center gap-2 px-3 text-sm font-bold transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon name={z.icon} className="h-[18px] w-[18px]" strokeWidth={2} />
              <span className="hidden md:inline">{z.label}</span>
              <span
                className={cn(
                  "absolute inset-x-2 bottom-0 h-[3px] rounded-full transition-colors",
                  isActive ? "bg-primary" : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </nav>

      {/* Lado derecho: tema · ajustes · notificaciones · perfil */}
      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={toggle}
          data-testid={SHELL.themeToggle}
          aria-label={mode === "dark" ? "Modo claro" : "Modo noche"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
        >
          <Icon name={mode === "dark" ? "Sun" : "Moon"} className="h-4 w-4" strokeWidth={2} />
        </button>

        <button
          data-testid={SHELL.zoneSettings}
          onClick={() => setActiveZone(AJUSTES_ZONE.id)}
          aria-label="Ajustes"
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-accent",
            activeZone === "ajustes" && "border-primary text-primary",
          )}
        >
          <Icon name="Settings" className="h-4 w-4" strokeWidth={2} />
        </button>

        {/* Notificaciones */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              data-testid={SHELL.notifications}
              aria-label="Notificaciones"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent"
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

        {/* Perfil */}
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
                <span className="block text-sm font-bold text-foreground">
                  {branding.ownerName}
                </span>
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
            <DropdownMenuItem onClick={() => setActiveZone("ajustes")}>
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
