import { NavLink, useLocation } from "react-router-dom";
import { sections, findSectionByPath } from "@/lib/navigation";
import { useSidebarStore } from "@/stores/sidebar-store";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { SHELL } from "@/constants/testIds";
import { useEffect } from "react";

function PrismaMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M16 2 L29 24 H3 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M16 2 L16 24"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity="0.6"
      />
    </svg>
  );
}

function ClientBrandLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect
        x="3.5"
        y="3.5"
        width="14"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="10.5"
        y="10.5"
        width="14"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function Sidebar() {
  const { pathname } = useLocation();
  const { expandedId, setExpanded, toggleExpanded } = useSidebarStore();

  // Auto-expandir la sección activa al navegar
  useEffect(() => {
    const active = findSectionByPath(pathname);
    if (active?.subsections && active.id !== expandedId) {
      setExpanded(active.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <aside
      data-testid={SHELL.sidebar}
      className="flex h-screen w-[260px] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      {/* Logo cliente */}
      <div
        data-testid={SHELL.sidebarLogo}
        className="flex items-center gap-3 px-6 pt-7 pb-8"
      >
        <ClientBrandLogo className="h-7 w-7 text-foreground" />
        <span className="text-xl font-bold tracking-tight">ClientBrand</span>
      </div>

      {/* Secciones */}
      <nav className="scrollbar-soft flex-1 overflow-y-auto px-3">
        <ul className="flex flex-col gap-1">
          {sections.map((s) => {
            const isActiveSection = findSectionByPath(pathname)?.id === s.id;
            const isExpanded = expandedId === s.id;
            const hasSubs = !!s.subsections?.length;

            return (
              <li key={s.id}>
                <NavLink
                  to={s.to}
                  data-testid={SHELL.sidebarSectionItem(s.id)}
                  onClick={() => hasSubs && toggleExpanded(s.id)}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-[15px] font-semibold transition-colors",
                      "text-sidebar-foreground/80 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                      (isActive || isActiveSection) &&
                        "bg-sidebar-accent text-sidebar-accent-foreground",
                    )
                  }
                >
                  <Icon
                    name={s.icon}
                    className="h-[18px] w-[18px] shrink-0"
                    strokeWidth={2}
                  />
                  <span className="flex-1 truncate">{s.label}</span>
                  {hasSubs && (
                    <Icon
                      name="ChevronDown"
                      className={cn(
                        "h-4 w-4 text-sidebar-muted transition-transform",
                        isExpanded && "rotate-180",
                      )}
                    />
                  )}
                </NavLink>

                {hasSubs && isExpanded && (
                  <ul className="my-1 ml-[34px] flex flex-col gap-0.5 border-l border-sidebar-border pl-3">
                    {s.subsections!.map((sub) => (
                      <li key={sub.id}>
                        <NavLink
                          to={sub.to}
                          data-testid={SHELL.sidebarSubItem(sub.id)}
                          className={({ isActive }) =>
                            cn(
                              "block rounded-md px-3 py-1.5 text-sm transition-colors",
                              "text-sidebar-muted hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
                              isActive &&
                                "bg-sidebar-accent/70 text-sidebar-accent-foreground",
                            )
                          }
                        >
                          {sub.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer Prisma */}
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
