import { useState } from "react";
import { useSeccionesStore } from "@/stores/secciones-store";
import { useRoleStore } from "@/stores/role-store";
import { usePaginasStore } from "@/stores/paginas-store";
import {
  SLOT_TYPE_LABELS,
  type SlotType,
  type SectionType,
} from "@/lib/data/secciones";
import { SeccionPreview } from "./SeccionPreview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { SECCIONES } from "@/constants/testIds";
import { toast } from "sonner";

export function DetalleSeccion({
  section,
  onBack,
}: {
  section: SectionType;
  onBack: () => void;
}) {
  const role = useRoleStore((s) => s.role);
  const isAdmin = role === "admin";
  const pages = usePaginasStore((s) => s.pages);
  const updateSlots = useSeccionesStore((s) => s.updateSlots);
  const addPreset = useSeccionesStore((s) => s.addPreset);

  const [preset, setPreset] = useState(section.presets[0]?.id ?? "");
  const [targetPage, setTargetPage] = useState("");

  const setSlots = (slots: typeof section.slots) =>
    updateSlots(section.id, slots);

  return (
    <div data-testid={SECCIONES.detail} className="flex flex-col gap-6">
      <button
        data-testid={SECCIONES.backBtn}
        onClick={onBack}
        className="flex w-fit items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <Icon name="ArrowLeft" className="h-4 w-4" />
        Volver al catálogo
      </button>

      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon name={section.icon} className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-extrabold tracking-tight">{section.name}</h2>
          <div className="text-xs text-muted-foreground">
            {section.category} · {section.presets.length} presets ·{" "}
            {section.slots.length} campos
          </div>
        </div>
      </div>

      {/* Presets + preview interactivo */}
      <Card className="rounded-2xl border-border bg-card shadow-soft-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <Icon name="LayoutGrid" className="h-5 w-5 text-primary" strokeWidth={2} />
            Presets (cómo se ve)
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Elige un diseño y mira la previsualización con contenido de ejemplo.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pt-2">
          <div className="flex flex-wrap gap-2">
            {section.presets.map((p) => (
              <button
                key={p.id}
                data-testid={SECCIONES.presetChip(p.id)}
                onClick={() => setPreset(p.id)}
                className={cn(
                  "rounded-lg border px-3 py-2 text-left transition-colors",
                  preset === p.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/40",
                )}
              >
                <div className="text-sm font-bold text-foreground">{p.name}</div>
                <div className="text-[11px] text-muted-foreground">{p.description}</div>
              </button>
            ))}
            {isAdmin && (
              <button
                data-testid={SECCIONES.addPresetBtn}
                onClick={() => {
                  const n = section.presets.length + 1;
                  addPreset(section.id, {
                    id: `preset-${Date.now()}`,
                    name: `Diseño ${n}`,
                    description: "Variante personalizada.",
                  });
                  toast.success("Preset añadido.");
                }}
                className="flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-2 text-xs font-bold text-muted-foreground hover:text-foreground"
              >
                <Icon name="Plus" className="h-3.5 w-3.5" />
                Añadir preset
              </button>
            )}
          </div>

          <div
            data-testid={SECCIONES.preview}
            className="rounded-2xl border border-border bg-muted/20 p-3"
          >
            <SeccionPreview section={section} presetId={preset} />
          </div>

          {/* Añadir a una página */}
          <div className="flex flex-col gap-2 rounded-xl border border-border bg-background p-4 sm:flex-row sm:items-end">
            <div className="flex-1">
              <div className="mb-1.5 text-sm font-bold text-foreground">
                Añadir a una página
              </div>
              <Select value={targetPage} onValueChange={setTargetPage}>
                <SelectTrigger
                  data-testid={SECCIONES.pageSelect}
                  className="h-11 rounded-lg"
                >
                  <SelectValue placeholder="Elige una página…" />
                </SelectTrigger>
                <SelectContent>
                  {pages.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              data-testid={SECCIONES.addToPageBtn}
              disabled={!targetPage}
              onClick={() => {
                const pg = pages.find((p) => p.id === targetPage);
                toast.success(
                  `"${section.name}" añadida a la página ${pg?.name ?? ""}.`,
                );
              }}
              className="h-11 rounded-lg text-sm font-bold"
            >
              Añadir
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Slots (contrato) */}
      <Card
        data-testid={SECCIONES.slotsTable}
        className="rounded-2xl border-border bg-card shadow-soft-sm"
      >
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-bold">
            <Icon name="ListChecks" className="h-5 w-5 text-primary" strokeWidth={2} />
            Campos (qué datos lleva)
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            {isAdmin
              ? "Edita el contrato de datos de esta sección."
              : "El contrato de datos de esta sección (solo lectura)."}
          </p>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-bold">Campo</th>
                  <th className="px-4 py-3 font-bold">Tipo</th>
                  <th className="px-4 py-3 font-bold">Requerido</th>
                  {isAdmin && <th className="px-4 py-3" />}
                </tr>
              </thead>
              <tbody>
                {section.slots.map((sl, i) => (
                  <tr key={sl.id} className="border-t border-border/70">
                    <td className="px-4 py-2.5">
                      {isAdmin ? (
                        <Input
                          value={sl.name}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSlots(
                              section.slots.map((x, j) =>
                                j === i ? { ...x, name: e.target.value } : x,
                              ),
                            )
                          }
                          className="h-9 rounded-md"
                        />
                      ) : (
                        <span className="font-semibold text-foreground">{sl.name}</span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {isAdmin ? (
                        <Select
                          value={sl.type}
                          onValueChange={(v: string) =>
                            setSlots(
                              section.slots.map((x, j) =>
                                j === i ? { ...x, type: v as SlotType } : x,
                              ),
                            )
                          }
                        >
                          <SelectTrigger className="h-9 w-36 rounded-md">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {(Object.keys(SLOT_TYPE_LABELS) as SlotType[]).map((tp) => (
                              <SelectItem key={tp} value={tp}>
                                {SLOT_TYPE_LABELS[tp]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <span className="text-muted-foreground">
                          {SLOT_TYPE_LABELS[sl.type]}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2.5">
                      {isAdmin ? (
                        <Switch
                          checked={sl.required}
                          onCheckedChange={(v: boolean) =>
                            setSlots(
                              section.slots.map((x, j) =>
                                j === i ? { ...x, required: v } : x,
                              ),
                            )
                          }
                        />
                      ) : sl.required ? (
                        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-bold text-primary">
                          Sí
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">No</span>
                      )}
                    </td>
                    {isAdmin && (
                      <td className="px-4 py-2.5 text-right">
                        <button
                          onClick={() =>
                            setSlots(section.slots.filter((_, j) => j !== i))
                          }
                          className="text-muted-foreground hover:text-rose-500"
                        >
                          <Icon name="Trash2" className="h-4 w-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {isAdmin && (
            <Button
              data-testid={SECCIONES.addSlotBtn}
              variant="outline"
              onClick={() =>
                setSlots([
                  ...section.slots,
                  {
                    id: `slot-${Date.now()}`,
                    name: "Nuevo campo",
                    type: "texto",
                    required: false,
                  },
                ])
              }
              className="mt-3 h-10 rounded-lg text-sm font-bold"
            >
              <Icon name="Plus" className="mr-2 h-4 w-4" />
              Añadir campo
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
