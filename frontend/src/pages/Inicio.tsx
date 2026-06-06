import { branding } from "@/lib/data/branding";
import { KpiCards } from "@/components/inicio/KpiCards";
import { PerformancePanel } from "@/components/inicio/PerformancePanel";
import { ActivityPanel } from "@/components/inicio/ActivityPanel";
import { SiteStatusPanel } from "@/components/inicio/SiteStatusPanel";
import { MainPagesPanel, QuickActionsPanel } from "@/components/inicio/MainPagesPanel";
import { HOME } from "@/constants/testIds";

export default function InicioPage() {
  return (
    <div data-testid={HOME.page} className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          ¡Bienvenido, {branding.ownerName}!
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Resumen general de tu sitio web y actividad reciente.
        </p>
      </div>

      <KpiCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <PerformancePanel />
        </div>
        <ActivityPanel />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MainPagesPanel />
        </div>
        <SiteStatusPanel />
      </div>

      <QuickActionsPanel />
    </div>
  );
}
