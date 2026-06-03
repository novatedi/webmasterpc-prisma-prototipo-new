import { useMaterialsStore } from "@/stores/materials-store";
import { EditableList } from "@/components/obras/EditableList";
import { OBRAS } from "@/constants/testIds";
import { toast } from "sonner";

export default function ObrasMateriales() {
  const { items, add, rename, toggleActive, remove, reorder } =
    useMaterialsStore();

  return (
    <div data-testid={OBRAS.materiales} className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-extrabold tracking-tight">
          Materiales con los que trabajas
        </h2>
        <p className="text-sm text-muted-foreground">
          Los materiales aparecerán como chips en cada obra y como filtros en tu
          web. Arrastra para reordenarlos.
        </p>
      </div>

      <EditableList
        items={items}
        onAdd={(name) => add(name)}
        onRename={rename}
        onToggle={(id) => {
          const it = items.find((c) => c.id === id);
          toggleActive(id);
          toast.message(it?.active ? "Material desactivado" : "Material activado");
        }}
        onRemove={(id) => {
          remove(id);
          toast.success("Material eliminado");
        }}
        onReorder={(ids) => {
          reorder(ids);
          toast.message("Orden actualizado");
        }}
        addPlaceholder="Añade un material (ej. Mármol)"
        emptyText="Aún no tienes materiales. Crea el primero arriba."
        testIds={{
          list: OBRAS.matList,
          item: OBRAS.matItem,
          add: OBRAS.matAdd,
          newInput: OBRAS.matNewInput,
          rename: OBRAS.matRenameInput,
          toggle: OBRAS.matToggle,
          remove: OBRAS.matRemove,
        }}
      />
    </div>
  );
}
