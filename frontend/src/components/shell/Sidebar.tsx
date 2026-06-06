import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { SHELL } from "@/constants/testIds";
import { useZoneStore } from "@/stores/zone-store";
import { ZONES, itemMatches, type ZoneItem } from "@/lib/data/zones";

function PrismaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <path d="M16 2 L29 24 H3 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 2 L16 24" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}

export function Sidebar() {
  const { pathname } = useLocation();
  const activeZone = useZoneStore((s) => s.activeZone);
  const zone = ZONES.find((z) => z.id === activeZone) ?? ZONES[0];

  return (
    <aside
      data-testid={SHELL.sidebar}
      className="flex h-full w-[260px] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      {/* Cabecera de zona */}
      <div
        data-testid={SHELL.sidebarLogo}
        className="flex items-center gap-2.5 px-6 pt-6 pb-5"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon name={zone.icon} className="h-[18px] w-[18px]" strokeWidth={2} />
        </span>
        <div className="leading-tight">
          <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-sidebar-muted">
            Zona
          </div>
          <div className="text-base font-extrabold tracking-tight">{zone.label}</div>
        </div>
      </div>

      <nav className="scrollbar-soft flex-1 overflow-y-auto px-3">
        <ul className="flex flex-col gap-0.5">
          {zone.items.map((item) => (
            <SidebarItem key={item.id} item={item} pathname={pathname} />
          ))}
        </ul>
      </nav>

      <div
        data-testid={SHELL.sidebarFooterLogo}
        className="mx-3 mb-5 mt-3 border-t border-sidebar-border px-3 pt-5"
      >
        <div className="flex items-center gap-3">
          <PrismaMark className="h-7 w-7 text-foreground/80" />
          <div className="leading-tight">
            <div className="text-[11px] uppercase tracking-[0.14em] text-sidebar-muted">
              Powered by
            </div>
            <div className="text-sm font-bold tracking-wide">
              Prisma <span className="font-extrabold">STUDIO</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarItem({ item, pathname }: { item: ZoneItem; pathname: string }) {
  const to = item.to ?? `/proximamente/${item.id}`;
  const isActive = item.to
    ? itemMatches(item, pathname)
    : pathname === to;

  return (
    <li>
      <NavLink
        to={to}
        data-testid={SHELL.zoneSidebarItem(item.id)}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold transition-colors",
          "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
          isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
          !item.active && "opacity-65",
        )}
      >
        <Icon name={item.icon} className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
        <span className="flex-1 truncate">{item.label}</span>
        {!item.active && (
          <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-muted-foreground">
            Pronto
          </span>
        )}
      </NavLink>
    </li>
  );
}
