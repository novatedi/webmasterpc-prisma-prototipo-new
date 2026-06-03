import { useEffect, useState, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWorksStore } from "@/stores/works-store";
import { useCategoriesStore } from "@/stores/categories-store";
import { useMaterialsStore } from "@/stores/materials-store";
import { useTopbarActions } from "@/stores/topbar-actions-store";
import { MaterialMultiSelect } from "@/components/obras/MaterialMultiSelect";
import { ImageUploader } from "@/components/obras/ImageUploader";
import { WorkLivePreview } from "@/components/obras/WorkLivePreview";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@/lib/icon";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { OBRAS } from "@/constants/testIds";
import type { Work, WorkImage } from "@/lib/data/types";

interface FormState {
  title: string;
  description: string;
  categoryId: string;
  materialIds: string[];
  year: string;
  dimensions: string;
  images: WorkImage[];
  status: "publicada" | "borrador";
}

const EMPTY: FormState = {
  title: "",
  description: "",
  categoryId: "",
  materialIds: [],
  year: "",
  dimensions: "",
  images: [],
  status: "borrador",
};

function fromWork(w: Work): FormState {
  return {
    title: w.title,
    description: w.description ?? "",
    categoryId: w.categoryId ?? "",
    materialIds: w.materialIds,
    year: w.year ? String(w.year) : "",
    dimensions: w.dimensions ?? "",
    images: w.images,
    status: w.status,
  };
}

/** Pequeña barra de formato para la descripción. */
function FormatToolbar({
  onWrap,
  onPrefixLine,
}: {
  onWrap: (a: string, b: string) => void;
  onPrefixLine: (p: string) => void;
}) {
  const btn =
    "flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
  return (
    <div className="flex items-center gap-1 rounded-t-md border border-b-0 border-input bg-muted/30 px-2 py-1">
      <button type="button" onClick={() => onWrap("**", "**")} className={btn} aria-label="Negrita">
        <Icon name="Bold" className="h-4 w-4" />
      </button>
      <button type="button" onClick={() => onWrap("_", "_")} className={btn} aria-label="Cursiva">
        <Icon name="Italic" className="h-4 w-4" />
      </button>
      <span className="mx-1 h-5 w-px bg-border" />
      <button type="button" onClick={() => onPrefixLine("• ")} className={btn} aria-label="Lista">
        <Icon name="List" className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function EditarObra() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "nueva";

  const works = useWorksStore();
  const categories = useCategoriesStore((s) => s.items);
  const materials = useMaterialsStore((s) => s.items);
  const setActions = useTopbarActions((s) => s.set);
  const clearActions = useTopbarActions((s) => s.clear);

  const existing = !isNew ? works.getById(id!) : undefined;

  const [form, setForm] = useState<FormState>(
    existing ? fromWork(existing) : EMPTY,
  );
  const taRef = useRef<HTMLTextAreaElement>(null);

  // Si entramos por URL y el id no existe, redirige al catálogo
  useEffect(() => {
    if (!isNew && !existing) navigate("/obras/catalogo", { replace: true });
  }, [isNew, existing, navigate]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const previewData = useMemo(
    () => ({
      title: form.title,
      description: form.description,
      year: form.year,
      dimensions: form.dimensions,
      materialIds: form.materialIds,
      images: form.images,
    }),
    [form],
  );

  const save = (status: FormState["status"]) => {
    if (!form.title.trim()) {
      toast.error("La obra necesita un título.");
      return;
    }
    const cover = form.images[0]?.url ?? "";
    if (isNew) {
      const newId = `w-${Date.now()}`;
      works.add({
        id: newId,
        title: form.title.trim(),
        description: form.description,
        coverUrl: cover,
        images: form.images,
        categoryId: form.categoryId || undefined,
        materialIds: form.materialIds,
        year: form.year ? Number(form.year) : undefined,
        dimensions: form.dimensions || undefined,
        status,
        createdAt: new Date().toISOString().slice(0, 10),
      });
      toast.success(
        status === "publicada" ? "Obra publicada" : "Obra guardada como borrador",
      );
      navigate(`/obras/obra/${newId}`, { replace: true });
    } else {
      works.update(id!, {
        title: form.title.trim(),
        description: form.description,
        coverUrl: cover || existing?.coverUrl || "",
        images: form.images,
        categoryId: form.categoryId || undefined,
        materialIds: form.materialIds,
        year: form.year ? Number(form.year) : undefined,
        dimensions: form.dimensions || undefined,
        status,
      });
      toast.success(
        status === "publicada"
          ? "Cambios publicados"
          : "Guardado como borrador",
      );
    }
    set("status", status);
  };

  // Inyecta los botones del topbar
  useEffect(() => {
    setActions(
      <div
        data-testid="topbar-actions"
        className="flex items-center gap-2"
      >
        <Button
          type="button"
          variant="outline"
          data-testid={OBRAS.editPreviewBtn}
          onClick={() => {
            const el = document.getElementById("preview-pane");
            el?.scrollIntoView({ behavior: "smooth", block: "start" });
            toast.message("Mostrando vista previa");
          }}
          className="h-10 gap-2 rounded-full font-semibold"
        >
          <Icon name="Eye" className="h-4 w-4" />
          Vista previa
        </Button>
        <Button
          type="button"
          data-testid={OBRAS.editPublishBtn}
          onClick={() => save("publicada")}
          className="h-10 gap-2 rounded-full bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Rocket" className="h-4 w-4" />
          Publicar
        </Button>
      </div>,
    );
    return () => clearActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const wrap = (left: string, right: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const before = form.description.slice(0, start);
    const sel = form.description.slice(start, end) || "texto";
    const after = form.description.slice(end);
    const next = before + left + sel + right + after;
    set("description", next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(start + left.length, start + left.length + sel.length);
    });
  };

  const prefixLine = (prefix: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    const before = form.description.slice(0, pos);
    const after = form.description.slice(pos);
    const startOfLine = before.lastIndexOf("\n") + 1;
    const next =
      before.slice(0, startOfLine) + prefix + before.slice(startOfLine) + after;
    set("description", next);
  };

  return (
    <div data-testid={OBRAS.editor} className="flex flex-col gap-6">
      {/* Header contextual */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <button
            onClick={() => navigate("/obras/catalogo")}
            className="mb-2 flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <Icon name="ChevronLeft" className="h-3 w-3" />
            Volver al catálogo
          </button>
          <h2 className="text-2xl font-extrabold tracking-tight">
            {isNew ? "Nueva obra" : form.title || "Editar obra"}
          </h2>
          <p className="text-sm text-muted-foreground">
            Cambia lo que quieras: la vista previa de la derecha se actualiza al
            instante.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold">
          <span
            className={cn(
              "h-2 w-2 rounded-full",
              form.status === "publicada" ? "bg-emerald-500" : "bg-amber-500",
            )}
          />
          {form.status === "publicada" ? "Publicada" : "Borrador"}
        </div>
      </div>

      {/* Cuerpo: form + preview */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* IZQUIERDA – Formulario */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Edición
          </h3>

          <div className="mt-5 flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                data-testid={OBRAS.editTitle}
                value={form.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  set("title", e.target.value)
                }
                placeholder="Ej. Equilibrio Vertical"
                className="h-11 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="description">Descripción</Label>
              <FormatToolbar onWrap={wrap} onPrefixLine={prefixLine} />
              <Textarea
                id="description"
                ref={taRef}
                data-testid={OBRAS.editDescription}
                value={form.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  set("description", e.target.value)
                }
                placeholder="Cuenta brevemente qué representa la obra y cómo la has hecho…"
                rows={6}
                className="rounded-b-md rounded-t-none border-t-0"
              />
              <p className="text-xs text-muted-foreground">
                Puedes usar **negrita**, _cursiva_ y listas con •.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label>Categoría</Label>
                <Select
                  value={form.categoryId}
                  onValueChange={(v: string) => set("categoryId", v)}
                >
                  <SelectTrigger
                    data-testid={OBRAS.editCategory}
                    className="h-11 rounded-lg"
                  >
                    <SelectValue placeholder="Selecciona una…" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((c) => c.active)
                      .map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label>Año</Label>
                <Input
                  data-testid={OBRAS.editYear}
                  type="number"
                  inputMode="numeric"
                  value={form.year}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    set("year", e.target.value)
                  }
                  placeholder="2024"
                  className="h-11 rounded-lg"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Materiales</Label>
              <MaterialMultiSelect
                allMaterials={materials}
                selectedIds={form.materialIds}
                onChange={(ids) => set("materialIds", ids)}
              />
              <p className="text-xs text-muted-foreground">
                Puedes elegir varios (ej. Hierro + Madera).
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Dimensiones</Label>
              <Input
                data-testid={OBRAS.editDimensions}
                value={form.dimensions}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  set("dimensions", e.target.value)
                }
                placeholder="180 × 60 × 40 cm"
                className="h-11 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label>Imagen principal y galería</Label>
              <ImageUploader
                images={form.images}
                onChange={(imgs) => set("images", imgs)}
              />
            </div>

            <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
              <div>
                <div className="text-sm font-bold">Publicar en la web</div>
                <div className="text-xs text-muted-foreground">
                  Si está apagado, la obra queda como borrador y no se ve.
                </div>
              </div>
              <Switch
                data-testid={OBRAS.editStatus}
                checked={form.status === "publicada"}
                onCheckedChange={(v: boolean) =>
                  save(v ? "publicada" : "borrador")
                }
              />
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => save("borrador")}
                className="h-11 flex-1 gap-2 rounded-xl font-bold"
              >
                <Icon name="Save" className="h-4 w-4" />
                Guardar borrador
              </Button>
              <Button
                type="button"
                onClick={() => save("publicada")}
                className="h-11 flex-1 gap-2 rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90"
              >
                <Icon name="Rocket" className="h-4 w-4" />
                Publicar
              </Button>
            </div>
          </div>
        </div>

        {/* DERECHA – Preview en vivo */}
        <div id="preview-pane" className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            <Icon name="Eye" className="h-4 w-4" />
            Vista previa en vivo
          </div>
          <div className="sticky top-4">
            <WorkLivePreview data={previewData} materials={materials} />
          </div>
        </div>
      </div>
    </div>
  );
}
