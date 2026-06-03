import { useEmpresaStore } from "@/stores/empresa-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { SortableEditList } from "@/components/empresa/SortableEditList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { EMPRESA } from "@/constants/testIds";
import { toast } from "sonner";
import type { Estadistica } from "@/lib/data/empresa";

export default function EstadisticasPage() {
  const est = useEmpresaStore((s) => s.estadisticas);
  const update = useEmpresaStore((s) => s.updateEstadisticas);

  const add = () => {
    const item: Estadistica = {
      id: `est-${Date.now()}`,
      number: "0",
      label: "Nueva cifra",
    };
    update({ items: [...est.items, item] });
    toast.success("Cifra añadida");
  };

  const upd = (id: string, patch: Partial<Estadistica>) =>
    update({
      items: est.items.map((s) => (s.id === id ? { ...s, ...patch } : s)),
    });

  return (
    <EmpresaTwoPanel
      title="Estadísticas del taller"
      description="Cifras que dan confianza: obras, años, exposiciones…"
      previewLabel="Bloque Estadísticas (web pública)"
      testIdPage={EMPRESA.page("estadisticas")}
      formNode={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Título del bloque</Label>
            <Input
              data-testid={EMPRESA.estTitle}
              value={est.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update({ title: e.target.value })
              }
              className="h-11 rounded-lg"
            />
          </div>

          <div className="mt-1 border-t border-border pt-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">Cifras</div>
                <div className="text-xs text-muted-foreground">
                  Arrastra para reordenarlas.
                </div>
              </div>
              <Button
                type="button"
                data-testid={EMPRESA.estAdd}
                onClick={add}
                className="gap-2 rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90"
              >
                <Icon name="Plus" className="h-4 w-4" />
                Añadir cifra
              </Button>
            </div>

            <SortableEditList
              items={est.items}
              onReorder={(next) => update({ items: next })}
              onRemove={(id) => {
                update({ items: est.items.filter((i) => i.id !== id) });
                toast.success("Cifra eliminada");
              }}
              itemTestId={EMPRESA.estItem}
              renderItem={(it, onRemove) => (
                <div className="flex items-center gap-2">
                  <Input
                    value={it.number}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      upd(it.id, { number: e.target.value })
                    }
                    placeholder="+170"
                    className="h-10 w-24 rounded-md text-center font-bold"
                  />
                  <Input
                    value={it.label}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      upd(it.id, { label: e.target.value })
                    }
                    placeholder="Etiqueta"
                    className="h-10 flex-1 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={onRemove}
                    data-testid={EMPRESA.estRemove(it.id)}
                    aria-label="Eliminar"
                    className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Icon name="Trash2" className="h-4 w-4" />
                  </button>
                </div>
              )}
            />
          </div>
        </>
      }
      previewNode={
        <div
          data-testid={EMPRESA.preview("estadisticas")}
          className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft-sm md:p-8"
        >
          <h1 className="text-xl font-extrabold tracking-tight">
            {est.title}
          </h1>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {est.items.map((s) => (
              <div
                key={s.id}
                className="flex flex-col items-start gap-1 rounded-xl border border-border bg-background px-5 py-6"
              >
                <div className="text-4xl font-extrabold tracking-tight text-primary">
                  {s.number}
                </div>
                <div className="text-sm font-semibold text-foreground/70">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}
