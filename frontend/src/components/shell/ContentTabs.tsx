import { NavLink, useLocation } from "react-router-dom";
import { findSectionByPath } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { SHELL } from "@/constants/testIds";

/**
 * Tabs sincronizados con las subsecciones de la sección actual.
 * Aparecen entre el Topbar y el contenido cuando la sección tiene subsecciones.
 */
export function ContentTabs() {
  const { pathname } = useLocation();
  const section = findSectionByPath(pathname);
  if (!section?.subsections?.length) return null;

  return (
    <div
      data-testid={SHELL.contentTabs}
      className="border-b border-border bg-background/60 px-8"
    >
      <nav className="-mb-px flex flex-wrap gap-1">
        {section.subsections.map((sub) => (
          <NavLink
            key={sub.id}
            to={sub.to}
            className={({ isActive }) =>
              cn(
                "relative px-4 py-3 text-sm font-semibold transition-colors",
                "text-muted-foreground hover:text-foreground",
                isActive && "text-foreground",
              )
            }
          >
            {({ isActive }) => (
              <>
                <span>{sub.label}</span>
                <span
                  className={cn(
                    "absolute inset-x-2 -bottom-px h-0.5 rounded-full transition-colors",
                    isActive ? "bg-primary" : "bg-transparent",
                  )}
                />
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
