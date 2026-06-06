import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { SHELL } from "@/constants/testIds";
import { useZoneStore } from "@/stores/zone-store";
import { useSidebarStore } from "@/stores/sidebar-store";
import { ZONES, itemMatches, type ZoneItem } from "@/lib/data/zones";

function BrandLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="10.5" y="10.5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function Sidebar({ forceExpanded = false }: { forceExpanded?: boolean }) {
  const { pathname } = useLocation();
  const activeZone = useZoneStore((s) => s.activeZone);
  const collapsedStore = useSidebarStore((s) => s.collapsed);
  const toggleCollapsed = useSidebarStore((s) => s.toggleCollapsed);
  const collapsed = forceExpanded ? false : collapsedStore;
  const zone = ZONES.find((z) => z.id === activeZone) ?? ZONES[0];

  return (
    <aside
      data-testid={SHELL.sidebar}
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200",
        collapsed ? "w-[76px]" : "w-[260px]",
      )}
    >
      {/* Marca */}
      <div
        data-testid={SHELL.sidebarLogo}
        className={cn(
          "flex items-center gap-2.5 px-5 pt-6 pb-4",
          collapsed && "justify-center px-0",
        )}
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <BrandLogo className="h-5 w-5" />
        </span>
        {!collapsed && (
          <span className="text-lg font-extrabold tracking-tight">ClientBrand</span>
        )}
      </div>

      {/* Cabecera de zona */}
      <div
        className={cn(
          "mx-3 mb-2 flex items-center gap-2.5 rounded-xl bg-sidebar-accent/40 px-3 py-2.5",
          collapsed && "mx-2 justify-center px-0",
        )}
      >
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon name={zone.icon} className="h-[18px] w-[18px]" strokeWidth={2} />
        </span>
        {!collapsed && (
          <div className="leading-tight">
            <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-sidebar-muted">
              Zona
            </div>
            <div className="text-sm font-extrabold tracking-tight">{zone.label}</div>
          </div>
        )}
      </div>

      <nav className="scrollbar-soft flex-1 overflow-y-auto px-3">
        <ul className="flex flex-col gap-0.5">
          {zone.items.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              pathname={pathname}
              collapsed={collapsed}
            />
          ))}
        </ul>
      </nav>

      {/* Botón colapsar (solo desktop) */}
      {!forceExpanded && (
        <button
          data-testid={SHELL.sidebarCollapse}
          onClick={toggleCollapsed}
          aria-label={collapsed ? "Expandir menú" : "Contraer menú"}
          className={cn(
            "mx-3 mt-2 flex items-center gap-3 rounded-xl border border-sidebar-border px-3 py-2.5 text-sm font-semibold text-sidebar-foreground/80 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
            collapsed && "justify-center px-0",
          )}
        >
          <Icon
            name={collapsed ? "ChevronsRight" : "ChevronsLeft"}
            className="h-[18px] w-[18px] shrink-0"
            strokeWidth={2}
          />
          {!collapsed && <span>Contraer</span>}
        </button>
      )}

      {/* Powered by */}
      <div
        data-testid={SHELL.sidebarFooterLogo}
        className={cn(
          "mx-3 mb-5 mt-3 flex items-center gap-3 border-t border-sidebar-border px-3 pt-4",
          collapsed && "justify-center px-0",
        )}
      >
        <Icon name="Triangle" className="h-5 w-5 shrink-0 text-foreground/70" />
        {!collapsed && (
          <div className="leading-tight">
            <div className="text-[10px] uppercase tracking-[0.14em] text-sidebar-muted">
              Powered by
            </div>
            <div className="text-sm font-bold tracking-wide">
              Prisma <span className="font-extrabold">STUDIO</span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

function SidebarItem({
  item,
  pathname,
  collapsed,
}: {
  item: ZoneItem;
  pathname: string;
  collapsed: boolean;
}) {
  const to = item.to ?? `/proximamente/${item.id}`;
  const isActive = item.to ? itemMatches(item, pathname) : pathname === to;

  return (
    <li>
      <NavLink
        to={to}
        data-testid={SHELL.zoneSidebarItem(item.id)}
        title={collapsed ? item.label : undefined}
        className={cn(
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold transition-colors",
          "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
          isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
          !item.active && "opacity-65",
          collapsed && "justify-center px-0",
        )}
      >
        <Icon name={item.icon} className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
        {!collapsed && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {!item.active && (
              <span className="shrink-0 rounded-full bg-muted px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-muted-foreground">
                Pronto
              </span>
            )}
          </>
        )}
      </NavLink>
    </li>
  );
}
