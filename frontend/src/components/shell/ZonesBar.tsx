import { useZoneStore } from "@/stores/zone-store";
import { TOPBAR_ZONES, AJUSTES_ZONE } from "@/lib/data/zones";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { SHELL } from "@/constants/testIds";

function BrandLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="10.5" y="10.5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ZonesBar() {
  const activeZone = useZoneStore((s) => s.activeZone);
  const setActiveZone = useZoneStore((s) => s.setActiveZone);

  return (
    <header
      data-testid={SHELL.zonesBar}
      className="z-40 flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border bg-sidebar px-3 text-sidebar-foreground sm:px-5"
    >
      {/* Marca */}
      <div className="flex shrink-0 items-center gap-2.5 pr-2 sm:pr-4">
        <BrandLogo className="h-7 w-7 text-foreground" />
        <span className="hidden text-lg font-bold tracking-tight sm:inline">
          ClientBrand
        </span>
      </div>

      {/* Zonas */}
      <nav className="scrollbar-soft flex flex-1 items-center gap-1 overflow-x-auto">
        {TOPBAR_ZONES.map((z) => {
          const isActive = activeZone === z.id;
          return (
            <button
              key={z.id}
              data-testid={SHELL.zoneTab(z.id)}
              onClick={() => setActiveZone(z.id)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground shadow-soft-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
              )}
            >
              <Icon name={z.icon} className="h-[18px] w-[18px]" strokeWidth={2} />
              <span className="hidden md:inline">{z.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Ajustes (engranaje) */}
      <button
        data-testid={SHELL.zoneSettings}
        onClick={() => setActiveZone(AJUSTES_ZONE.id)}
        aria-label="Ajustes"
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
          activeZone === "ajustes"
            ? "bg-primary text-primary-foreground"
            : "border border-sidebar-border bg-card text-sidebar-foreground/80 hover:text-sidebar-accent-foreground",
        )}
      >
        <Icon name="Settings" className="h-[18px] w-[18px]" strokeWidth={2} />
      </button>
    </header>
  );
}
