import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePrensaStore } from "@/stores/prensa-store";
import { useTopbarActions } from "@/stores/topbar-actions-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { SinglePictureField } from "@/components/empresa/SinglePictureField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { toast } from "sonner";
import type { PressArticle } from "@/lib/data/prensa";

const EMPTY: Omit<PressArticle, "id"> = {
  outlet: "",
  year: new Date().getFullYear(),
  headline: "",
  summary: "",
  imageUrl: "",
  externalUrl: "",
  visible: true,
};

export default function EditarPrensa() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "nuevo";
  const store = usePrensaStore();
  const setActions = useTopbarActions((s) => s.set);
  const clearActions = useTopbarActions((s) => s.clear);
  const existing = !isNew ? store.getById(id!) : undefined;
  const [form, setForm] = useState<typeof EMPTY>(
    existing ? { ...existing } : EMPTY,
  );

  useEffect(() => {
    if (!isNew && !existing) navigate("/prensa", { replace: true });
  }, [isNew, existing, navigate]);

  const set = <K extends keyof typeof EMPTY>(k: K, v: (typeof EMPTY)[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const save = () => {
    if (!form.headline.trim()) {
      toast.error("El artículo necesita un titular.");
      return;
    }
    if (isNew) {
      const newId = `pr-${Date.now()}`;
      store.add({ ...form, id: newId });
      toast.success("Aparición añadida");
      navigate(`/prensa/articulo/${newId}`, { replace: true });
    } else {
      store.update(id!, form);
      toast.success("Cambios guardados");
    }
  };

  useEffect(() => {
    setActions(
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/prensa")}
          className="h-10 gap-2 rounded-full font-semibold"
        >
          <Icon name="ArrowLeft" className="h-4 w-4" />
          Volver
        </Button>
        <Button
          type="button"
          data-testid="press-save"
          onClick={save}
          className="h-10 gap-2 rounded-full bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Save" className="h-4 w-4" />
          Guardar
        </Button>
      </div>,
    );
    return () => clearActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  return (
    <EmpresaTwoPanel
      title={isNew ? "Nueva aparición en prensa" : form.headline || "Editar aparición"}
      description="Lo que rellenes aquí es lo que verán los visitantes en la sección Prensa de tu web."
      previewLabel="Cómo se verá en tu web"
      testIdPage="press-editor"
      formNode={
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_140px]">
            <div className="flex flex-col gap-1.5">
              <Label>Medio</Label>
              <Input
                data-testid="press-form-outlet"
                value={form.outlet}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  set("outlet", e.target.value)
                }
                placeholder="El País"
                className="h-11 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Año</Label>
              <Input
                type="number"
                data-testid="press-form-year"
                value={form.year}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  set("year", Number(e.target.value) || form.year)
                }
                className="h-11 rounded-lg"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Titular</Label>
            <Input
              data-testid="press-form-headline"
              value={form.headline}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                set("headline", e.target.value)
              }
              placeholder="Titular del artículo"
              className="h-11 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Resumen</Label>
            <Textarea
              data-testid="press-form-summary"
              value={form.summary}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                set("summary", e.target.value)
              }
              rows={4}
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Foto de portada</Label>
            <SinglePictureField
              url={form.imageUrl}
              onChange={(u) => set("imageUrl", u)}
              aspect="video"
              testIdImage="press-form-image"
              testIdButton="press-form-image-btn"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Enlace externo</Label>
            <Input
              data-testid="press-form-link"
              value={form.externalUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                set("externalUrl", e.target.value)
              }
              placeholder="https://elpais.com/…"
              className="h-11 rounded-lg"
            />
          </div>
        </>
      }
      previewNode={
        <article
          data-testid="press-preview"
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm"
        >
          <div className="aspect-[16/9] bg-muted">
            {form.imageUrl && (
              <img src={form.imageUrl} alt="" className="h-full w-full object-cover" />
            )}
          </div>
          <div className="px-6 py-7 md:px-10 md:py-9">
            <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
              <span>{form.outlet || "Medio"}</span>
              <span className="text-muted-foreground">·</span>
              <span className="text-muted-foreground">{form.year}</span>
            </div>
            <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight">
              {form.headline || "Titular del artículo"}
            </h1>
            {form.summary && (
              <p className="mt-3 max-w-prose text-sm leading-relaxed text-foreground/80">
                {form.summary}
              </p>
            )}
            <a
              href={form.externalUrl || "#"}
              onClick={(e) => e.preventDefault()}
              className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Leer en {form.outlet || "el medio"}
              <Icon name="ArrowUpRight" className="h-3.5 w-3.5" />
            </a>
          </div>
        </article>
      }
    />
  );
}
