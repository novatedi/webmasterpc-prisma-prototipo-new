import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { ContentTabs } from "./ContentTabs";
import { SHELL } from "@/constants/testIds";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileNavStore } from "@/stores/mobile-nav-store";

export function AppShell() {
  const { open, setOpen } = useMobileNavStore();
  const { pathname } = useLocation();

  // Cierra el drawer cuando cambia la ruta
  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div
      data-testid={SHELL.app}
      className="flex h-screen w-full overflow-hidden bg-background text-foreground"
    >
      {/* Sidebar fija en desktop */}
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {/* Sidebar como drawer en móvil */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-[280px] border-r border-sidebar-border bg-sidebar p-0"
        >
          <Sidebar />
        </SheetContent>
      </Sheet>

      <div className="flex h-full min-w-0 flex-1 flex-col">
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
