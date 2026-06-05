import { useState } from "react";
import { useSeccionesStore } from "@/stores/secciones-store";
import { useRoleStore } from "@/stores/role-store";
import { ModeloInfoCard } from "@/components/secciones/ModeloInfoCard";
import { CatalogoSecciones } from "@/components/secciones/CatalogoSecciones";
import { DetalleSeccion } from "@/components/secciones/DetalleSeccion";
import { CrearSeccionDialog } from "@/components/secciones/CrearSeccionDialog";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { SECCIONES } from "@/constants/testIds";

export default function SeccionesPage() {
  const role = useRoleStore((s) => s.role);
  const setRole = useRoleStore((s) => s.setRole);

  const [openId, setOpenId] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  // Suscribimos el array `sections` (no la función getSection) para que el
  // detalle se re-renderice cuando el admin edita slots/presets.
  const current = useSeccionesStore((s) =>
    openId ? s.sections.find((x) => x.id === openId) : undefined,
  );

  return (
    <div data-testid={SECCIONES.page} className="flex flex-col gap-8">
      {/* Cabecera + selector de rol */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">Secciones</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            El catálogo de secciones prediseñadas de tu web. Explora,
            previsualiza y añádelas a tus páginas.
          </p>
        </div>

        <div
          data-testid={SECCIONES.roleToggle}
          className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-border bg-card p-1"
        >
          <span className="px-2 text-xs font-semibold text-muted-foreground">
            Ver como:
          </span>
          <button
            data-testid={SECCIONES.roleCliente}
            onClick={() => setRole("cliente")}
            className={cn(
              "rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
              role === "cliente"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Cliente
          </button>
          <button
            data-testid={SECCIONES.roleAdmin}
            onClick={() => setRole("admin")}
            className={cn(
              "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
              role === "admin"
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            Admin
            <span className="rounded-full bg-amber-500 px-1.5 py-0.5 text-[9px] uppercase text-white">
              Admin
            </span>
          </button>
        </div>
      </div>

      {role === "admin" && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/5 px-4 py-3 text-sm text-foreground/80">
          <Icon name="Wrench" className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          Modo administrador: puedes crear y editar el catálogo. Las secciones
          que crees estarán disponibles para todos tus clientes.
        </div>
      )}

      <ModeloInfoCard />

      {current ? (
        <DetalleSeccion section={current} onBack={() => setOpenId(null)} />
      ) : (
        <CatalogoSecciones onOpen={setOpenId} onCreate={() => setShowCreate(true)} />
      )}

      <CrearSeccionDialog
        open={showCreate}
        onOpenChange={setShowCreate}
        onCreated={(id) => setOpenId(id)}
      />
    </div>
  );
}
