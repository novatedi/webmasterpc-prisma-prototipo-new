import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useServiciosStore } from "@/stores/servicios-store";
import { useTopbarActions } from "@/stores/topbar-actions-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { SinglePictureField } from "@/components/empresa/SinglePictureField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@/lib/icon";
import { toast } from "sonner";
import { SERVICIOS } from "@/constants/testIds";
import type { ServiceBlock } from "@/lib/data/servicios";

const ICON_CHOICES = [
  "Compass",
  "Wrench",
  "GraduationCap",
  "Hammer",
  "Sparkles",
  "Heart",
  "Award",
  "Mountain",
  "Brush",
  "Package",
];

const EMPTY: Omit<ServiceBlock, "id" | "order"> = {
  title: "",
  short: "",
  description: "",
  imageUrl: "",
  icon: "Sparkles",
  active: true,
};

export default function EditarServicio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "nuevo";
  const store = useServiciosStore();
  const setActions = useTopbarActions((s) => s.set);
  const clearActions = useTopbarActions((s) => s.clear);
  const existing = !isNew ? store.getById(id!) : undefined;

  const [form, setForm] = useState<typeof EMPTY>(
    existing ? { ...existing } : EMPTY,
  );

  useEffect(() => {
    if (!isNew && !existing) navigate("/servicios", { replace: true });
  }, [isNew, existing, navigate]);

  const set = <K extends keyof typeof EMPTY>(k: K, v: (typeof EMPTY)[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const save = () => {
    if (!form.title.trim()) {
      toast.error("Pon un título al servicio.");
      return;
    }
    if (isNew) {
      const newId = `srv-${Date.now()}`;
      store.add({
        ...form,
        id: newId,
        order: store.items.length,
      });
      toast.success("Servicio creado");
      navigate(`/servicios/bloque/${newId}`, { replace: true });
    } else {
      store.update(id!, form);
      toast.success("Cambios guardados");
    }
  };

  const remove = () => {
    if (isNew) return;
    store.remove(id!);
    toast.success("Servicio eliminado");
    navigate("/servicios", { replace: true });
  };

  useEffect(() => {
    setActions(
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/servicios")}
          className="h-10 gap-2 rounded-full font-semibold"
        >
          <Icon name="ArrowLeft" className="h-4 w-4" />
          Volver
        </Button>
        <Button
          type="button"
          data-testid={SERVICIOS.formSave}
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
      title={isNew ? "Nuevo bloque de servicio" : form.title || "Editar bloque"}
      description="Lo que escribes aquí es exactamente lo que verán los visitantes de tu web."
      previewLabel="Bloque de servicio (web pública)"
      testIdPage={SERVICIOS.editor}
      formNode={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Título</Label>
            <Input
              data-testid={SERVICIOS.formTitle}
              value={form.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                set("title", e.target.value)
              }
              placeholder="Ej. Encargos personalizados"
              className="h-11 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Bajada corta</Label>
            <Textarea
              data-testid={SERVICIOS.formShort}
              value={form.short}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                set("short", e.target.value)
              }
              placeholder="Una frase breve que resume el servicio."
              rows={2}
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Descripción</Label>
            <Textarea
              data-testid={SERVICIOS.formDescription}
              value={form.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                set("description", e.target.value)
              }
              placeholder="Cuenta con detalle cómo funciona este servicio."
              rows={6}
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Imagen del bloque</Label>
            <SinglePictureField
              url={form.imageUrl}
              onChange={(u) => set("imageUrl", u)}
              aspect="video"
              testIdButton={SERVICIOS.formImageBtn}
              testIdImage={SERVICIOS.formImage}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>Icono</Label>
              <select
                data-testid={SERVICIOS.formIcon}
                value={form.icon}
                onChange={(e) => set("icon", e.target.value)}
                className="h-11 rounded-lg border border-input bg-background px-3 text-sm"
              >
                {ICON_CHOICES.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Visible en la web</Label>
              <div className="flex h-11 items-center justify-between rounded-lg border border-input bg-background px-3">
                <span className="text-sm text-muted-foreground">
                  {form.active ? "Sí, aparece" : "Oculto"}
                </span>
                <Switch
                  data-testid={SERVICIOS.formActive}
                  checked={form.active}
                  onCheckedChange={(v: boolean) => set("active", v)}
                />
              </div>
            </div>
          </div>

          {!isNew && (
            <Button
              type="button"
              variant="outline"
              data-testid={SERVICIOS.formDelete}
              onClick={remove}
              className="h-10 w-fit gap-2 rounded-xl text-destructive hover:bg-destructive/10"
            >
              <Icon name="Trash2" className="h-4 w-4" />
              Eliminar bloque
            </Button>
          )}
        </>
      }
      previewNode={
        <div
          data-testid={SERVICIOS.preview}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm"
        >
          <div className="aspect-[16/9] w-full bg-muted">
            {form.imageUrl ? (
              <img
                src={form.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Icon name="Image" className="h-10 w-10 opacity-50" />
              </div>
            )}
          </div>
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name={form.icon} className="h-5 w-5" />
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight">
                {form.title || "Sin título"}
              </h1>
            </div>
            {form.short && (
              <p className="mt-3 max-w-prose text-base font-semibold text-foreground/80">
                {form.short}
              </p>
            )}
            {form.description && (
              <p className="mt-4 max-w-prose whitespace-pre-line text-sm leading-relaxed text-foreground/75">
                {form.description}
              </p>
            )}
          </div>
        </div>
      }
    />
  );
}
