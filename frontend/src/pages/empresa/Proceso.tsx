import { useEmpresaStore } from "@/stores/empresa-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { SortableEditList } from "@/components/empresa/SortableEditList";
import { SinglePictureField } from "@/components/empresa/SinglePictureField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { EMPRESA } from "@/constants/testIds";
import { toast } from "sonner";
import type { ProcesoPaso } from "@/lib/data/empresa";

export default function ProcesoPage() {
  const proc = useEmpresaStore((s) => s.proceso);
  const update = useEmpresaStore((s) => s.updateProceso);

  const add = () => {
    const p: ProcesoPaso = {
      id: `paso-${Date.now()}`,
      title: "Nuevo paso",
      description: "Describe brevemente este paso del proceso.",
    };
    update({ pasos: [...proc.pasos, p] });
    toast.success("Paso añadido");
  };

  const upd = (id: string, patch: Partial<ProcesoPaso>) =>
    update({
      pasos: proc.pasos.map((p) => (p.id === id ? { ...p, ...patch } : p)),
    });

  return (
    <EmpresaTwoPanel
      title="Proceso · Cómo trabajamos"
      description="Explica al cliente el camino desde el primer boceto hasta la entrega."
      previewLabel="Bloque Proceso (web pública)"
      testIdPage={EMPRESA.page("proceso")}
      formNode={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Título</Label>
            <Input
              data-testid={EMPRESA.procTitle}
              value={proc.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update({ title: e.target.value })
              }
              className="h-11 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Subtítulo</Label>
            <Textarea
              data-testid={EMPRESA.procSubtitle}
              value={proc.subtitle}
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
                <div className="text-sm font-bold">Pasos</div>
                <div className="text-xs text-muted-foreground">
                  Arrastra para reordenarlos.
                </div>
              </div>
              <Button
                type="button"
                data-testid={EMPRESA.procAdd}
                onClick={add}
                className="gap-2 rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90"
              >
                <Icon name="Plus" className="h-4 w-4" />
                Añadir paso
              </Button>
            </div>

            <SortableEditList
              items={proc.pasos}
              onReorder={(next) => update({ pasos: next })}
              onRemove={(id) => {
                update({ pasos: proc.pasos.filter((p) => p.id !== id) });
                toast.success("Paso eliminado");
              }}
              itemTestId={EMPRESA.procItem}
              renderItem={(p, onRemove) => (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Input
                      value={p.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        upd(p.id, { title: e.target.value })
                      }
                      placeholder="Título del paso"
                      className="h-10 flex-1 rounded-md font-semibold"
                    />
                    <button
                      type="button"
                      onClick={onRemove}
                      data-testid={EMPRESA.procRemove(p.id)}
                      aria-label="Eliminar"
                      className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Icon name="Trash2" className="h-4 w-4" />
                    </button>
                  </div>
                  <Textarea
                    value={p.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      upd(p.id, { description: e.target.value })
                    }
                    rows={2}
                    placeholder="Descripción"
                    className="rounded-md text-sm"
                  />
                  <div className="mt-1">
                    <SinglePictureField
                      url={p.imageUrl ?? ""}
                      onChange={(url) => upd(p.id, { imageUrl: url })}
                      aspect="video"
                      buttonText="Cambiar imagen"
                    />
                  </div>
                </div>
              )}
            />
          </div>
        </>
      }
      previewNode={
        <div
          data-testid={EMPRESA.preview("proceso")}
          className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft-sm md:p-8"
        >
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            Proceso
          </div>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
            {proc.title}
          </h1>
          <p className="mt-2 max-w-prose text-sm text-foreground/70">
            {proc.subtitle}
          </p>

          <ol className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {proc.pasos.map((p, idx) => (
              <li
                key={p.id}
                className="overflow-hidden rounded-xl border border-border bg-background"
              >
                {p.imageUrl && (
                  <div className="aspect-[16/10] bg-muted">
                    <img
                      src={p.imageUrl}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-extrabold text-primary">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <div className="text-sm font-extrabold">{p.title}</div>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/70">
                    {p.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      }
    />
  );
}
