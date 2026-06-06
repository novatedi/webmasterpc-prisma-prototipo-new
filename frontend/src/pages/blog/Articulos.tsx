import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useArticlesStore } from "@/stores/articles-store";
import { ViewToggle, type ViewMode } from "@/components/common/ViewToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { reorderWithinFiltered } from "@/lib/reorder";
import { BLOG } from "@/constants/testIds";
import type { Article } from "@/lib/data/articles";
import { toast } from "sonner";

const STATUS_FILTERS = [
  { value: "todos", label: "Todos" },
  { value: "publicado", label: "Publicados" },
  { value: "borrador", label: "Borradores" },
] as const;

function formatDate(iso?: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
        status === "publicado"
          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
          : "bg-amber-500/10 text-amber-700 dark:text-amber-400",
      )}
    >
      {status}
    </span>
  );
}

/** Fila de tabla (vista lista) reordenable. */
function ArticleRow({
  a,
  onEdit,
  onRemove,
}: {
  a: Article;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: a.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    position: "relative",
    zIndex: isDragging ? 20 : undefined,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      data-testid={BLOG.row(a.id)}
      className="border-b border-border/60 bg-card transition-colors last:border-b-0 hover:bg-accent/30"
    >
      <td className="w-10 pl-3">
        <button
          type="button"
          data-testid={BLOG.dragHandle(a.id)}
          aria-label="Arrastrar para reordenar"
          title="Arrastra para cambiar el orden"
          className="flex h-9 w-7 cursor-grab touch-none items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <Icon name="GripVertical" className="h-4 w-4" />
        </button>
      </td>
      <td className="px-3 py-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
            {a.coverUrl && (
              <img src={a.coverUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
            )}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-extrabold">{a.title}</div>
            <div className="truncate text-xs text-muted-foreground">{a.excerpt}</div>
          </div>
        </div>
      </td>
      <td className="hidden whitespace-nowrap px-5 py-4 text-sm text-muted-foreground sm:table-cell">
        {formatDate(a.publishedAt)}
      </td>
      <td className="px-5 py-4">
        <StatusBadge status={a.status} />
      </td>
      <td className="px-5 py-4">
        <div className="flex items-center justify-end gap-1.5">
          <Button
            variant="outline"
            size="sm"
            data-testid={BLOG.rowEdit(a.id)}
            onClick={onEdit}
            className="h-9 gap-1.5 rounded-md font-semibold"
          >
            <Icon name="Pencil" className="h-3.5 w-3.5" />
            Editar
          </Button>
          <button
            type="button"
            data-testid={BLOG.rowDelete(a.id)}
            onClick={onRemove}
            aria-label="Eliminar"
            className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <Icon name="Trash2" className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

/** Tarjeta (vista cuadrícula) reordenable. */
function ArticleCard({
  a,
  onEdit,
  onRemove,
}: {
  a: Article;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: a.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 20 : undefined,
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      data-testid={BLOG.card(a.id)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm transition-shadow hover:shadow-soft"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {a.coverUrl && (
          <img
            src={a.coverUrl}
            alt={a.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        <span className="absolute left-3 top-3">
          <StatusBadge status={a.status} />
        </span>
        <button
          type="button"
          data-testid={BLOG.dragHandle(a.id)}
          aria-label="Arrastrar para reordenar"
          title="Arrastra para cambiar el orden"
          className="absolute right-3 top-3 flex h-8 w-8 cursor-grab touch-none items-center justify-center rounded-lg bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/70 active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <Icon name="GripVertical" className="h-4 w-4" />
        </button>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="text-[11px] font-semibold text-muted-foreground">
          {formatDate(a.publishedAt)}
        </div>
        <h3 className="line-clamp-2 text-base font-extrabold tracking-tight">{a.title}</h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{a.excerpt}</p>
        <div className="mt-auto flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            data-testid={BLOG.cardEdit(a.id)}
            onClick={onEdit}
            className="h-9 flex-1 gap-1.5 rounded-lg font-semibold"
          >
            <Icon name="Pencil" className="h-3.5 w-3.5" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            data-testid={BLOG.cardDelete(a.id)}
            onClick={onRemove}
            aria-label="Eliminar"
            className="h-9 w-9 rounded-lg p-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
          >
            <Icon name="Trash2" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function BlogArticulos() {
  const navigate = useNavigate();
  const items = useArticlesStore((s) => s.items);
  const remove = useArticlesStore((s) => s.remove);
  const reorder = useArticlesStore((s) => s.reorder);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]["value"]>("todos");
  const [view, setView] = useState<ViewMode>("list");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((a) => {
      const matchQ = !q || a.title.toLowerCase().includes(q);
      const matchS = status === "todos" || a.status === status;
      return matchQ && matchS;
    });
  }, [items, search, status]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    reorder(reorderWithinFiltered(items, filtered, String(active.id), String(over.id)));
  };

  const handleRemove = (id: string) => {
    remove(id);
    toast.success("Artículo eliminado");
  };

  return (
    <div data-testid={BLOG.list} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-extrabold tracking-tight">Artículos</h2>
            <span className="text-lg font-semibold text-muted-foreground">
              ({filtered.length})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Las entradas que cuentan el día a día del taller. Arrastra
            <Icon name="GripVertical" className="-mt-0.5 mx-0.5 inline h-3.5 w-3.5" />
            para cambiar el orden.
          </p>
        </div>
        <Button
          data-testid={BLOG.addBtn}
          onClick={() => navigate("/blog/articulo/nuevo")}
          className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Plus" className="h-4 w-4" />
          Nuevo artículo
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[240px] flex-1">
          <Icon
            name="Search"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            data-testid={BLOG.searchInput}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            placeholder="Buscar artículos…"
            className="h-10 rounded-full pl-9"
          />
        </div>
        <div
          data-testid={BLOG.filterStatus}
          className="flex items-center gap-1 rounded-full border border-border bg-card p-1"
        >
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                status === f.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <ViewToggle value={view} onChange={setView} testId={BLOG.viewToggle} />
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center text-sm text-muted-foreground">
          No hay artículos con esos filtros.
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
          <SortableContext
            items={filtered.map((a) => a.id)}
            strategy={view === "grid" ? rectSortingStrategy : verticalListSortingStrategy}
          >
            {view === "grid" ? (
              <div
                data-testid="blog-grid"
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filtered.map((a) => (
                  <ArticleCard
                    key={a.id}
                    a={a}
                    onEdit={() => navigate(`/blog/articulo/${a.id}`)}
                    onRemove={() => handleRemove(a.id)}
                  />
                ))}
              </div>
            ) : (
              <div
                data-testid="blog-table"
                className="overflow-hidden rounded-2xl border border-border bg-card"
              >
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-border bg-background/50">
                    <tr>
                      <th className="w-10" />
                      <th className="px-3 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Artículo
                      </th>
                      <th className="hidden px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground sm:table-cell">
                        Fecha
                      </th>
                      <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Estado
                      </th>
                      <th className="w-44 px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((a) => (
                      <ArticleRow
                        key={a.id}
                        a={a}
                        onEdit={() => navigate(`/blog/articulo/${a.id}`)}
                        onRemove={() => handleRemove(a.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
