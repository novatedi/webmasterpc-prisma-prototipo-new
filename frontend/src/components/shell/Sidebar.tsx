import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { SHELL } from "@/constants/testIds";
import { CORE_SECTIONS, MODULES } from "@/lib/data/modules";
import { useFunctionsStore } from "@/stores/functions-store";

function PrismaMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <path d="M16 2 L29 24 H3 Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M16 2 L16 24" stroke="currentColor" strokeWidth="1.2" opacity="0.6" />
    </svg>
  );
}

function ClientBrandLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="10.5" y="10.5" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

interface Entry {
  id: string;
  label: string;
  icon: string;
  to: string;
}

export function Sidebar() {
  const { pathname } = useLocation();
  const activeMap = useFunctionsStore((s) => s.active);

  const activeModules: Entry[] = MODULES.filter((m) => activeMap[m.id]).map((m) => ({
    id: m.id,
    label: m.label,
    icon: m.icon,
    to: m.to ?? `/modulos/${m.id}`,
  }));

  const all: Entry[] = [...CORE_SECTIONS, ...activeModules];

  return (
    <aside
      data-testid={SHELL.sidebar}
      className="flex h-screen w-[260px] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      <div data-testid={SHELL.sidebarLogo} className="flex items-center gap-3 px-6 pt-7 pb-6">
        <ClientBrandLogo className="h-7 w-7 text-foreground" />
        <span className="text-xl font-bold tracking-tight">ClientBrand</span>
      </div>

      <nav className="scrollbar-soft flex-1 overflow-y-auto px-3">
        <ul className="flex flex-col gap-0.5">
          {all.map((s) => {
            const isActive =
              pathname === s.to ||
              pathname.startsWith(s.to + "/") ||
              (s.id === "obras" && pathname.startsWith("/obras")) ||
              (s.id === "empresa" && pathname.startsWith("/empresa")) ||
              (s.id === "blog" && pathname.startsWith("/blog")) ||
              (s.id === "identidad" && pathname === "/ajustes/identidad");
            return (
              <li key={s.id}>
                <NavLink
                  to={s.to}
                  data-testid={SHELL.sidebarSectionItem(s.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-[14px] font-semibold transition-colors",
                    "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                    isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
                  )}
                >
                  <Icon name={s.icon} className="h-[18px] w-[18px] shrink-0" strokeWidth={2} />
                  <span className="flex-1 truncate">{s.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        data-testid={SHELL.sidebarFooterLogo}
        className="mx-3 mb-5 mt-3 border-t border-sidebar-border pt-5 px-3"
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
