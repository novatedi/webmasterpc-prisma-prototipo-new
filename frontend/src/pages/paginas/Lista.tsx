import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePaginasStore } from "@/stores/paginas-store";
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PAGINAS } from "@/constants/testIds";
import type { Page } from "@/lib/data/paginas";

function PageRow({ page }: { page: Page }) {
  const navigate = useNavigate();
  const { togglePageVisible, removePage, renamePage } = usePaginasStore();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(page.name);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: page.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      data-testid={PAGINAS.row(page.id)}
      className={cn(
        "flex items-center gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft-sm transition-shadow",
        isDragging && "shadow-soft-lg",
      )}
    >
      <button
        {...attributes}
        {...listeners}
        aria-label="Reordenar"
        className="flex h-9 w-9 cursor-grab items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground active:cursor-grabbing"
      >
        <Icon name="GripVertical" className="h-4 w-4" />
      </button>

      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon name="FileText" className="h-5 w-5" />
      </span>

      <div className="min-w-0 flex-1">
        {editing ? (
          <Input
            autoFocus
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            onBlur={() => {
              renamePage(page.id, name);
              setEditing(false);
              toast.success("Página renombrada");
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") (e.target as HTMLInputElement).blur();
              if (e.key === "Escape") {
                setName(page.name);
                setEditing(false);
              }
            }}
            className="h-9 rounded-md"
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="text-left text-base font-extrabold leading-tight hover:text-primary"
          >
            {page.name}
          </button>
        )}
        <div className="mt-0.5 truncate text-xs text-muted-foreground">
          {page.slug} · {page.sections.length === 1 ? "1 sección" : `${page.sections.length} secciones`}
        </div>
      </div>

      <span
        className={cn(
          "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
          page.visible
            ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
            : "bg-muted text-muted-foreground",
        )}
      >
        {page.visible ? "Visible" : "Oculta"}
      </span>

      <Switch
        data-testid={PAGINAS.toggleVisible(page.id)}
        checked={page.visible}
        onCheckedChange={() => togglePageVisible(page.id)}
      />

      <Button
        variant="outline"
        size="sm"
        onClick={() => navigate(`/paginas/${page.id}`)}
        className="h-9 gap-1.5 rounded-lg font-semibold"
      >
        <Icon name="Pencil" className="h-3.5 w-3.5" />
        Editar
      </Button>

      <button
        type="button"
        data-testid={PAGINAS.remove(page.id)}
        onClick={() => {
          removePage(page.id);
          toast.success("Página eliminada");
        }}
        aria-label="Eliminar página"
        className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
      >
        <Icon name="Trash2" className="h-4 w-4" />
      </button>
    </li>
  );
}

export default function PaginasLista() {
  const { pages, addPage, reorderPages } = usePaginasStore();
  const navigate = useNavigate();
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = pages.findIndex((p) => p.id === active.id);
    const newIdx = pages.findIndex((p) => p.id === over.id);
    if (oldIdx < 0 || newIdx < 0) return;
    reorderPages(arrayMove(pages, oldIdx, newIdx).map((p) => p.id));
  };

  const newPage = () => {
    const p = addPage("Nueva página");
    toast.success("Página creada");
    navigate(`/paginas/${p.id}`);
  };

  return (
    <div data-testid={PAGINAS.list} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-extrabold tracking-tight">
              Páginas de tu web
            </h2>
            <span className="text-lg font-semibold text-muted-foreground">
              ({pages.length})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Arrastra para ordenarlas. Añade nuevas y elige qué se ve o se esconde.
          </p>
        </div>
        <Button
          data-testid={PAGINAS.addBtn}
          onClick={newPage}
          className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Plus" className="h-4 w-4" />
          Nueva página
        </Button>
      </div>

      {pages.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center text-sm text-muted-foreground">
          Aún no tienes páginas. Crea la primera arriba.
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={pages.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex flex-col gap-3">
              {pages.map((p) => (
                <PageRow key={p.id} page={p} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
