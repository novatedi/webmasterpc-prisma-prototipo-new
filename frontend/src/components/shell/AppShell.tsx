import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { ZonesBar } from "./ZonesBar";
import { ContentTabs } from "./ContentTabs";
import { SHELL } from "@/constants/testIds";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useMobileNavStore } from "@/stores/mobile-nav-store";
import { useZoneStore } from "@/stores/zone-store";
import { findZoneByPath } from "@/lib/data/zones";

export function AppShell() {
  const { open, setOpen } = useMobileNavStore();
  const { pathname } = useLocation();
  const setActiveZone = useZoneStore((s) => s.setActiveZone);

  // Cierra el drawer y sincroniza la zona activa con la ruta
  useEffect(() => {
    setOpen(false);
    const zone = findZoneByPath(pathname);
    if (zone) setActiveZone(zone.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      data-testid={SHELL.app}
      className="flex h-screen w-full overflow-hidden bg-background text-foreground"
    >
      {/* Sidebar a toda altura (con el logo arriba del todo) — fija en desktop */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Sidebar como drawer en móvil */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-[280px] border-r border-sidebar-border bg-sidebar p-0"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>Menú de navegación</SheetTitle>
            <SheetDescription>
              Accede a las secciones de la zona activa de Prisma Studio.
            </SheetDescription>
          </SheetHeader>
          <Sidebar forceExpanded />
        </SheetContent>
      </Sheet>

      {/* Columna de contenido: barra de zonas + topbar + contenido */}
      <div className="flex h-full min-w-0 flex-1 flex-col">
        <ZonesBar />
        <Topbar />
        <ContentTabs />
        <main className="scrollbar-soft flex-1 overflow-y-auto px-4 py-6 sm:px-6 md:px-8 md:py-8">
          <div className="mx-auto w-full max-w-[1400px] animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
