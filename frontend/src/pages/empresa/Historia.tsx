import { useEmpresaStore } from "@/stores/empresa-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { SinglePictureField } from "@/components/empresa/SinglePictureField";
import { SortableEditList } from "@/components/empresa/SortableEditList";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { EMPRESA } from "@/constants/testIds";
import { toast } from "sonner";
import type { Hito } from "@/lib/data/empresa";

export default function HistoriaPage() {
  const historia = useEmpresaStore((s) => s.historia);
  const update = useEmpresaStore((s) => s.updateHistoria);

  const addHito = () => {
    const newHito: Hito = {
      id: `hito-${Date.now()}`,
      year: String(new Date().getFullYear()),
      title: "Nuevo hito",
      description: "Cuenta brevemente qué pasó este año.",
    };
    update({ hitos: [...historia.hitos, newHito] });
    toast.success("Hito añadido");
  };

  const updateHito = (id: string, patch: Partial<Hito>) =>
    update({
      hitos: historia.hitos.map((h) => (h.id === id ? { ...h, ...patch } : h)),
    });

  return (
    <EmpresaTwoPanel
      title="Historia y línea de tiempo"
      description="Cuenta de dónde viene el taller. La línea de tiempo destaca los hitos importantes."
      previewLabel="Bloque Historia (web pública)"
      testIdPage={EMPRESA.page("historia")}
      formNode={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Título</Label>
            <Input
              data-testid={EMPRESA.historiaTitle}
              value={historia.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update({ title: e.target.value })
              }
              className="h-11 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Texto principal</Label>
            <Textarea
              data-testid={EMPRESA.historiaBody}
              value={historia.body}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                update({ body: e.target.value })
              }
              rows={6}
              className="rounded-lg"
            />
            <p className="text-xs text-muted-foreground">
              Salto de línea para empezar otro párrafo.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Imagen del bloque</Label>
            <SinglePictureField
              url={historia.imageUrl}
              onChange={(url) => update({ imageUrl: url })}
              aspect="video"
              testIdButton={EMPRESA.historiaImageBtn}
              testIdImage={EMPRESA.historiaImage}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>Texto del botón</Label>
              <Input
                data-testid={EMPRESA.historiaCtaText}
                value={historia.ctaText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  update({ ctaText: e.target.value })
                }
                className="h-11 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Enlace del botón</Label>
              <Input
                data-testid={EMPRESA.historiaCtaHref}
                value={historia.ctaHref}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  update({ ctaHref: e.target.value })
                }
                placeholder="#taller o https://…"
                className="h-11 rounded-lg"
              />
            </div>
          </div>

          <div className="mt-2 border-t border-border pt-5">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <div className="text-sm font-bold">Línea de tiempo</div>
                <div className="text-xs text-muted-foreground">
                  Arrastra para reordenar.
                </div>
              </div>
              <Button
                type="button"
                onClick={addHito}
                data-testid={EMPRESA.hitoAdd}
                className="gap-2 rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90"
              >
                <Icon name="Plus" className="h-4 w-4" />
                Añadir hito
              </Button>
            </div>

            <SortableEditList
              items={historia.hitos}
              onReorder={(next) => update({ hitos: next })}
              onRemove={(id) => {
                update({ hitos: historia.hitos.filter((h) => h.id !== id) });
                toast.success("Hito eliminado");
              }}
              itemTestId={EMPRESA.hitoItem}
              renderItem={(h, onRemove) => (
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Input
                      data-testid={EMPRESA.hitoYear(h.id)}
                      value={h.year}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateHito(h.id, { year: e.target.value })
                      }
                      placeholder="Año"
                      className="h-10 w-24 rounded-md"
                    />
                    <Input
                      data-testid={EMPRESA.hitoTitle(h.id)}
                      value={h.title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateHito(h.id, { title: e.target.value })
                      }
                      placeholder="Título"
                      className="h-10 flex-1 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={onRemove}
                      data-testid={EMPRESA.hitoRemove(h.id)}
                      aria-label="Eliminar"
                      className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Icon name="Trash2" className="h-4 w-4" />
                    </button>
                  </div>
                  <Textarea
                    data-testid={EMPRESA.hitoDesc(h.id)}
                    value={h.description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      updateHito(h.id, { description: e.target.value })
                    }
                    rows={2}
                    placeholder="Descripción breve"
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
          data-testid={EMPRESA.preview("historia")}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm"
        >
          <div className="grid grid-cols-1 gap-0 md:grid-cols-2">
            <div className="aspect-[4/3] bg-muted md:aspect-auto">
              <img
                src={historia.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
              <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-foreground">
                {historia.title || "Sin título"}
              </h1>
              <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/80">
                {historia.body}
              </p>
              {historia.ctaText && (
                <a
                  href={historia.ctaHref}
                  className="mt-1 inline-flex w-fit items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground"
                  onClick={(e) => e.preventDefault()}
                >
                  {historia.ctaText}
                  <Icon name="ArrowRight" className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </div>

          {historia.hitos.length > 0 && (
            <div className="border-t border-border p-6 md:p-8">
              <div className="mb-5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Línea de tiempo
              </div>
              <ol className="relative space-y-5 border-l-2 border-primary/30 pl-6">
                {historia.hitos.map((h) => (
                  <li key={h.id} className="relative">
                    <span className="absolute -left-[31px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-primary bg-card">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                    <div className="text-xs font-bold uppercase tracking-wider text-primary">
                      {h.year}
                    </div>
                    <div className="text-base font-extrabold leading-tight">
                      {h.title}
                    </div>
                    <p className="mt-1 text-sm text-foreground/70">
                      {h.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      }
    />
  );
}
