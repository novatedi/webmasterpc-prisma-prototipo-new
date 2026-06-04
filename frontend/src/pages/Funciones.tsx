import { useMemo, useState } from "react";
import { Icon } from "@/lib/icon";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useFunctionsStore } from "@/stores/functions-store";
import {
  MODULES,
  CATEGORY_LABELS,
  CATEGORY_DESCRIPTIONS,
  CATEGORY_ICONS,
  TIENDA_BLOCK_IDS,
  type ModuleCategory,
  type ModuleDef,
} from "@/lib/data/modules";

const BADGE_CLS: Record<NonNullable<ModuleDef["badge"]>, string> = {
  IA: "bg-violet-500/10 text-violet-700 dark:text-violet-300",
  Tienda: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  Pro: "bg-primary/10 text-primary",
};

function ModuleCard({ mod }: { mod: ModuleDef }) {
  const { isActive, toggle } = useFunctionsStore();
  const active = isActive(mod.id);

  return (
    <div
      data-testid={`module-card-${mod.id}`}
      className={cn(
        "flex flex-col gap-3 rounded-2xl border bg-card p-4 shadow-soft-sm transition-all",
        active ? "border-primary/40" : "border-border",
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors",
            active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
          )}
        >
          <Icon name={mod.icon} className="h-5 w-5" strokeWidth={2} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-extrabold">{mod.label}</span>
            {mod.badge && (
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  BADGE_CLS[mod.badge],
                )}
              >
                {mod.badge}
              </span>
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {mod.description}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-3">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            active
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : "bg-muted text-muted-foreground",
          )}
        >
          {active ? "Activo" : "Inactivo"}
        </span>
        <Switch
          data-testid={`module-toggle-${mod.id}`}
          checked={active}
          onCheckedChange={() => {
            toggle(mod.id);
            toast.message(
              active ? `${mod.label} desactivado` : `${mod.label} activado`,
            );
          }}
        />
      </div>
    </div>
  );
}

function TiendaBlockCard() {
  const tiendaActive = useFunctionsStore((s) => s.isTiendaActive());
  const toggleTienda = useFunctionsStore((s) => s.toggleTienda);
  const tiendaMods = MODULES.filter((m) => m.category === "tienda");

  return (
    <div
      data-testid="module-card-tienda-bloque"
      className={cn(
        "rounded-2xl border bg-card p-5 shadow-soft-sm transition-colors",
        tiendaActive ? "border-amber-500/40" : "border-border",
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-xl transition-colors",
              tiendaActive ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground",
            )}
          >
            <Icon name="Store" className="h-6 w-6" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold">Tienda online</h3>
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                  BADGE_CLS.Tienda,
                )}
              >
                Tienda
              </span>
            </div>
            <p className="mt-1 max-w-md text-xs text-muted-foreground">
              Vende online. Se activa el grupo completo: catálogo, pedidos,
              pagos, envíos, variantes y certificados.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              tiendaActive
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : "bg-muted text-muted-foreground",
            )}
          >
            {tiendaActive ? "Activo" : "Inactivo"}
          </span>
          <Switch
            data-testid="module-toggle-tienda"
            checked={tiendaActive}
            onCheckedChange={() => {
              toggleTienda();
              toast.message(
                tiendaActive ? "Tienda desactivada" : "Tienda activada",
              );
            }}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {tiendaMods.map((m) => (
          <div
            key={m.id}
            className={cn(
              "flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs",
              tiendaActive
                ? "bg-background text-foreground"
                : "bg-muted/30 text-muted-foreground",
            )}
          >
            <Icon name={m.icon} className="h-4 w-4" />
            <span className="truncate font-semibold">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FuncionesPage() {
  const [search, setSearch] = useState("");

  const grouped = useMemo(() => {
    const q = search.trim().toLowerCase();
    const cats: ModuleCategory[] = [
      "contenido",
      "tienda",
      "comunicacion",
      "marketing",
      "diseno",
      "ajustes-mod",
    ];
    return cats.map((cat) => ({
      cat,
      items: MODULES.filter((m) => m.category === cat).filter(
        (m) =>
          !q ||
          m.label.toLowerCase().includes(q) ||
          m.description.toLowerCase().includes(q),
      ),
    }));
  }, [search]);

  return (
    <div data-testid="page-funciones" className="flex flex-col gap-7">
      <div className="rounded-2xl border border-border bg-card p-5 shadow-soft-sm">
        <div className="flex flex-wrap items-start gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon name="ToggleRight" className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-extrabold tracking-tight">
              Activa solo lo que necesitas
            </h2>
            <p className="mt-1 max-w-prose text-sm text-muted-foreground">
              Tu panel se mantiene simple. Cuando enciendes un módulo aparece en
              la sidebar; cuando lo apagas desaparece. El núcleo siempre está.
            </p>
          </div>
          <div className="relative w-full max-w-xs">
            <Icon
              name="Search"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              data-testid="funciones-search"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Buscar módulo…"
              className="h-10 rounded-full pl-9"
            />
          </div>
        </div>
      </div>

      {grouped.map((g) =>
        g.items.length === 0 ? null : (
          <div key={g.cat} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                <Icon name={CATEGORY_ICONS[g.cat]} className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-base font-extrabold tracking-tight">
                  {CATEGORY_LABELS[g.cat]}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {CATEGORY_DESCRIPTIONS[g.cat]}
                </p>
              </div>
            </div>

            {g.cat === "tienda" ? (
              <TiendaBlockCard />
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {g.items.map((m) => (
                  <ModuleCard key={m.id} mod={m} />
                ))}
              </div>
            )}
          </div>
        ),
      )}
    </div>
  );
}
