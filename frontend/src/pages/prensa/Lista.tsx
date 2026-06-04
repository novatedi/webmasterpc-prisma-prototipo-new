import { useNavigate } from "react-router-dom";
import { usePrensaStore } from "@/stores/prensa-store";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import type { PressArticle } from "@/lib/data/prensa";

function Row({ a }: { a: PressArticle }) {
  const navigate = useNavigate();
  const { toggleVisible, remove } = usePrensaStore();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: a.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : a.visible ? 1 : 0.6,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      data-testid={`press-row-${a.id}`}
      className={cn(
        "flex items-stretch gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm transition-shadow",
        isDragging && "shadow-soft-lg",
      )}
    >
      <button
        {...attributes}
        {...listeners}
        aria-label="Reordenar"
        className="flex w-10 cursor-grab items-center justify-center border-r border-border bg-background text-muted-foreground hover:bg-accent active:cursor-grabbing"
      >
        <Icon name="GripVertical" className="h-4 w-4" />
      </button>
      <div className="h-28 w-40 shrink-0 bg-muted">
        <img src={a.imageUrl} alt={a.headline} className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          <span className="text-primary">{a.outlet}</span>
          <span>·</span>
          <span>{a.year}</span>
          <span
            className={cn(
              "ml-auto rounded-full px-2 py-0.5",
              a.visible
                ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : "bg-muted",
            )}
          >
            {a.visible ? "Visible" : "Oculto"}
          </span>
        </div>
        <h3 className="line-clamp-2 text-base font-extrabold leading-tight">
          {a.headline}
        </h3>
        <p className="line-clamp-1 text-xs text-muted-foreground">{a.summary}</p>
        <div className="mt-auto flex items-center gap-2 pt-1">
          <a
            href={a.externalUrl}
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-1 text-xs font-bold text-primary hover:underline"
          >
            Abrir enlace
            <Icon name="ExternalLink" className="h-3 w-3" />
          </a>
          <div className="ml-auto flex items-center gap-1.5">
            <Switch
              data-testid={`press-visible-${a.id}`}
              checked={a.visible}
              onCheckedChange={() => toggleVisible(a.id)}
            />
            <Button
              size="sm"
              variant="outline"
              data-testid={`press-edit-${a.id}`}
              onClick={() => navigate(`/prensa/articulo/${a.id}`)}
              className="h-9 gap-1.5 rounded-md font-semibold"
            >
              <Icon name="Pencil" className="h-3.5 w-3.5" />
              Editar
            </Button>
            <button
              type="button"
              data-testid={`press-remove-${a.id}`}
              onClick={() => {
                remove(a.id);
                toast.success("Artículo eliminado");
              }}
              aria-label="Eliminar"
              className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <Icon name="Trash2" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function PrensaLista() {
  const navigate = useNavigate();
  const { items, reorder } = usePrensaStore();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = items.findIndex((a) => a.id === active.id);
    const newIdx = items.findIndex((a) => a.id === over.id);
    if (oldIdx < 0 || newIdx < 0) return;
    reorder(arrayMove(items, oldIdx, newIdx).map((a) => a.id));
  };

  return (
    <div data-testid="page-prensa" className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-extrabold tracking-tight">
              Apariciones en prensa
            </h2>
            <span className="text-lg font-semibold text-muted-foreground">
              ({items.length})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Artículos, entrevistas y críticas. Arrastra para ordenar la lista
            como aparecerá en tu web.
          </p>
        </div>
        <Button
          data-testid="press-add"
          onClick={() => navigate("/prensa/articulo/nuevo")}
          className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Plus" className="h-4 w-4" />
          Añadir aparición
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center text-sm text-muted-foreground">
          Aún no tienes apariciones en prensa. Añade la primera arriba.
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={items.map((a) => a.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex flex-col gap-3">
              {items.map((a) => (
                <Row key={a.id} a={a} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
