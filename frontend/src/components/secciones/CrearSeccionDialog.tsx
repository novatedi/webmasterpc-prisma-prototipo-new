import { useState } from "react";
import { useSeccionesStore } from "@/stores/secciones-store";
import {
  SECTION_CATEGORIES,
  SLOT_TYPE_LABELS,
  type SlotType,
  type SectionCategory,
  type Slot,
} from "@/lib/data/secciones";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@/lib/icon";
import { SECCIONES } from "@/constants/testIds";
import { toast } from "sonner";

const newSlot = (): Slot => ({
  id: `slot-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  name: "",
  type: "texto",
  required: false,
});

export function CrearSeccionDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated: (id: string) => void;
}) {
  const addSection = useSeccionesStore((s) => s.addSection);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<SectionCategory>("Contenido");
  const [presetName, setPresetName] = useState("Diseño base");
  const [slots, setSlots] = useState<Slot[]>([
    { ...newSlot(), name: "Título", required: true },
  ]);

  const reset = () => {
    setName("");
    setCategory("Contenido");
    setPresetName("Diseño base");
    setSlots([{ ...newSlot(), name: "Título", required: true }]);
  };

  const submit = () => {
    const validSlots = slots.filter((s) => s.name.trim());
    if (!name.trim() || validSlots.length === 0) {
      toast.error("Pon un nombre y al menos un campo.");
      return;
    }
    const id = `sec-${Date.now()}`;
    addSection({
      id,
      name: name.trim(),
      category,
      icon: "Box",
      description: "Sección personalizada creada por el administrador.",
      slots: validSlots,
      presets: [
        {
          id: `preset-${Date.now()}`,
          name: presetName.trim() || "Diseño base",
          description: "Diseño inicial.",
        },
      ],
      sample: { titulo: name.trim() },
    });
    toast.success(`Sección creada — contrato de ${validSlots.length} campos definido.`);
    onOpenChange(false);
    onCreated(id);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Crear sección nueva</DialogTitle>
          <DialogDescription>
            Las secciones que crees aquí estarán disponibles para todos tus
            clientes.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Nombre de la sección</Label>
            <Input
              data-testid={SECCIONES.dlgName}
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              placeholder="Ej. Testimonios"
              className="h-11 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Categoría</Label>
            <Select value={category} onValueChange={(v: string) => setCategory(v as SectionCategory)}>
              <SelectTrigger data-testid={SECCIONES.dlgCategory} className="h-11 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SECTION_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Slots */}
          <div className="flex flex-col gap-2">
            <Label>Campos (contrato de datos)</Label>
            {slots.map((sl, i) => (
              <div key={sl.id} className="flex items-center gap-2">
                <Input
                  data-testid={SECCIONES.dlgSlotName(i)}
                  value={sl.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setSlots(slots.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))
                  }
                  placeholder="Nombre del campo"
                  className="h-10 flex-1 rounded-md"
                />
                <Select
                  value={sl.type}
                  onValueChange={(v: string) =>
                    setSlots(slots.map((x, j) => (j === i ? { ...x, type: v as SlotType } : x)))
                  }
                >
                  <SelectTrigger className="h-10 w-32 rounded-md">
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
                <div className="flex shrink-0 items-center gap-1" title="Requerido">
                  <Switch
                    checked={sl.required}
                    onCheckedChange={(v: boolean) =>
                      setSlots(slots.map((x, j) => (j === i ? { ...x, required: v } : x)))
                    }
                  />
                </div>
                <button
                  onClick={() => setSlots(slots.filter((_, j) => j !== i))}
                  className="text-muted-foreground hover:text-rose-500"
                >
                  <Icon name="Trash2" className="h-4 w-4" />
                </button>
              </div>
            ))}
            <Button
              data-testid={SECCIONES.dlgAddSlot}
              variant="outline"
              onClick={() => setSlots([...slots, newSlot()])}
              className="h-9 w-fit rounded-lg text-xs font-bold"
            >
              <Icon name="Plus" className="mr-1.5 h-3.5 w-3.5" />
              Añadir campo
            </Button>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Preset inicial</Label>
            <Input
              data-testid={SECCIONES.dlgPreset}
              value={presetName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPresetName(e.target.value)}
              className="h-11 rounded-lg"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="rounded-lg">
            Cancelar
          </Button>
          <Button data-testid={SECCIONES.dlgSubmit} onClick={submit} className="rounded-lg font-bold">
            Crear sección
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
