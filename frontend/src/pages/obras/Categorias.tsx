import { useCategoriesStore } from "@/stores/categories-store";
import { EditableList } from "@/components/obras/EditableList";
import { OBRAS } from "@/constants/testIds";
import { toast } from "sonner";

export default function ObrasCategorias() {
  const { items, add, rename, toggleActive, remove, reorder } =
    useCategoriesStore();

  return (
    <div data-testid={OBRAS.categorias} className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-extrabold tracking-tight">
          Categorías temáticas
        </h2>
        <p className="text-sm text-muted-foreground">
          Organiza tu obra por temas (Obra pública, Series…). Puedes arrastrar
          para reordenarlas; el orden afecta a cómo aparecen en tu web.
        </p>
      </div>

      <EditableList
        items={items}
        onAdd={(name) => add(name)}
        onRename={rename}
        onToggle={(id) => {
          const it = items.find((c) => c.id === id);
          toggleActive(id);
          toast.message(it?.active ? "Categoría desactivada" : "Categoría activada");
        }}
        onRemove={(id) => {
          remove(id);
          toast.success("Categoría eliminada");
        }}
        onReorder={(ids) => {
          reorder(ids);
          toast.message("Orden actualizado");
        }}
        addPlaceholder="Añade una categoría (ej. Series)"
        emptyText="Aún no tienes categorías. Crea la primera arriba."
        testIds={{
          list: OBRAS.catList,
          item: OBRAS.catItem,
          add: OBRAS.catAdd,
          newInput: OBRAS.catNewInput,
          rename: OBRAS.catRenameInput,
          toggle: OBRAS.catToggle,
          remove: OBRAS.catRemove,
        }}
      />
    </div>
  );
}
