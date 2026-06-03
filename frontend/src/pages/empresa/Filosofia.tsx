import { useEmpresaStore } from "@/stores/empresa-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { SortableEditList } from "@/components/empresa/SortableEditList";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { EMPRESA } from "@/constants/testIds";
import { toast } from "sonner";
import type { Valor } from "@/lib/data/empresa";

const ICON_CHOICES = [
  "Hammer",
  "Mountain",
  "Sparkles",
  "Compass",
  "Heart",
  "Leaf",
  "Anchor",
  "Award",
  "Flame",
  "Eye",
];

export default function FilosofiaPage() {
  const fil = useEmpresaStore((s) => s.filosofia);
  const update = useEmpresaStore((s) => s.updateFilosofia);

  const addValor = () => {
    const v: Valor = {
      id: `val-${Date.now()}`,
      icon: "Sparkles",
      title: "Nuevo valor",
      description: "Describe brevemente este principio.",
    };
    update({ valores: [...fil.valores, v] });
    toast.success("Valor añadido");
  };
  const updateValor = (id: string, patch: Partial<Valor>) =>
    update({
      valores: fil.valores.map((v) => (v.id === id ? { ...v, ...patch } : v)),
    });

  return (
    <EmpresaTwoPanel
      title="Filosofía y valores"
      description="Los principios que guían el trabajo del taller."
      previewLabel="Bloque Filosofía (web pública)"
      testIdPage={EMPRESA.page("filosofia")}
      formNode={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Título</Label>
            <Input
              data-testid={EMPRESA.filTitle}
              value={fil.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update({ title: e.target.value })
              }
              className="h-11 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Subtítulo</Label>
            <Textarea
              data-testid={EMPRESA.filSubtitle}
              value={fil.subtitle}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                update({ subtitle: e.target.value })
              }
              rows={2}
              className="rounded-lg"
            />
          </div>

          <div className="mt-1 border-t border-border pt-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">Valores</div>
                <div className="text-xs text-muted-foreground">
                  Arrastra para reordenarlos.
                </div>
              </div>
              <Button
                type="button"
                data-testid={EMPRESA.valorAdd}
                onClick={addValor}
                className="gap-2 rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90"
              >
                <Icon name="Plus" className="h-4 w-4" />
                Añadir valor
              </Button>
            </div>

            <SortableEditList
              items={fil.valores}
              onReorder={(next) => update({ valores: next })}
              onRemove={(id) => {
                update({ valores: fil.valores.filter((v) => v.id !== id) });
                toast.success("Valor eliminado");
              }}
              itemTestId={EMPRESA.valorItem}
              renderItem={(v, onRemove) => (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <select
                      value={v.icon}
                      onChange={(e) => updateValor(v.id, { icon: e.target.value })}
                      className="h-10 w-32 rounded-md border border-input bg-background px-2 text-sm"
                    >
                      {ICON_CHOICES.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <Input
                      value={v.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateValor(v.id, { title: e.target.value })
                      }
                      placeholder="Título del valor"
                      className="h-10 flex-1 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={onRemove}
                      data-testid={EMPRESA.valorRemove(v.id)}
                      aria-label="Eliminar"
                      className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Icon name="Trash2" className="h-4 w-4" />
                    </button>
                  </div>
                  <Textarea
                    value={v.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      updateValor(v.id, { description: e.target.value })
                    }
                    rows={2}
                    placeholder="Descripción"
                    className="rounded-md text-sm"
                  />
                </div>
              )}
            />
          </div>
        </>
      }
      previewNode={
        <div
          data-testid={EMPRESA.preview("filosofia")}
          className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft-sm md:p-8"
        >
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            Filosofía
          </div>
          <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight">
            {fil.title}
          </h1>
          <p className="mt-2 max-w-prose text-sm text-foreground/70">
            {fil.subtitle}
          </p>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fil.valores.map((v) => (
              <div
                key={v.id}
                className="flex gap-3 rounded-xl border border-border bg-background p-4"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon name={v.icon} className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-extrabold">{v.title}</div>
                  <p className="mt-1 text-xs leading-relaxed text-foreground/70">
                    {v.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}
