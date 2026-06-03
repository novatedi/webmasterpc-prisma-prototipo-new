import { useNavigate } from "react-router-dom";
import { useServiciosStore } from "@/stores/servicios-store";
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
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { SERVICIOS } from "@/constants/testIds";
import type { ServiceBlock } from "@/lib/data/servicios";
import { toast } from "sonner";

function ServiceRow({ block }: { block: ServiceBlock }) {
  const navigate = useNavigate();
  const toggleActive = useServiciosStore((s) => s.toggleActive);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: block.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      data-testid={SERVICIOS.card(block.id)}
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

      <div className="h-32 w-44 shrink-0 bg-muted">
        <img
          src={block.imageUrl}
          alt={block.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 items-center gap-4 px-5 py-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon name={block.icon} className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-extrabold tracking-tight text-foreground">
              {block.title}
            </h3>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                block.active
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {block.active ? "Activo" : "Inactivo"}
            </span>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {block.short}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => {
              toggleActive(block.id);
              toast.message(block.active ? "Servicio oculto" : "Servicio visible");
            }}
            aria-label="Activar / desactivar"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Icon name={block.active ? "Eye" : "EyeOff"} className="h-4 w-4" />
          </button>
          <Button
            variant="outline"
            data-testid={SERVICIOS.cardEdit(block.id)}
            onClick={() => navigate(`/servicios/bloque/${block.id}`)}
            className="h-9 gap-1.5 rounded-lg font-semibold"
          >
            <Icon name="Pencil" className="h-3.5 w-3.5" />
            Editar
          </Button>
        </div>
      </div>
    </li>
  );
}

export default function ServiciosLista() {
  const navigate = useNavigate();
  const items = useServiciosStore((s) => s.items);
  const reorder = useServiciosStore((s) => s.reorder);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = items.findIndex((i) => i.id === active.id);
    const newIdx = items.findIndex((i) => i.id === over.id);
    if (oldIdx < 0 || newIdx < 0) return;
    reorder(arrayMove(items, oldIdx, newIdx).map((i) => i.id));
  };

  return (
    <div data-testid={SERVICIOS.list} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-extrabold tracking-tight">
              Bloques de servicios
            </h2>
            <span className="text-lg font-semibold text-muted-foreground">
              ({items.length})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Cada bloque se muestra como una tarjeta en la página de servicios de
            tu web. Arrastra para reordenarlos.
          </p>
        </div>
        <Button
          data-testid={SERVICIOS.addBtn}
          onClick={() => navigate("/servicios/bloque/nuevo")}
          className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Plus" className="h-4 w-4" />
          Añadir bloque
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center text-sm text-muted-foreground">
          Todavía no tienes bloques. Crea el primero para que aparezca en la
          web.
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={items.map((i) => i.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex flex-col gap-3">
              {items.map((b) => (
                <ServiceRow key={b.id} block={b} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
