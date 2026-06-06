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
import { useWorksStore } from "@/stores/works-store";
import { useCategoriesStore } from "@/stores/categories-store";
import { useMaterialsStore } from "@/stores/materials-store";
import { WorkCard } from "@/components/obras/WorkCard";
import { FilterBar } from "@/components/obras/FilterBar";
import { ViewToggle, type ViewMode } from "@/components/common/ViewToggle";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { reorderWithinFiltered } from "@/lib/reorder";
import { OBRAS } from "@/constants/testIds";
import type { Work, Material } from "@/lib/data/types";

function DragHandle({ id, attributes, listeners, className }: any) {
  return (
    <button
      type="button"
      data-testid={OBRAS.dragHandle(id)}
      aria-label="Arrastrar para reordenar"
      title="Arrastra para cambiar el orden"
      className={className}
      {...attributes}
      {...listeners}
    >
      <Icon name="GripVertical" className="h-4 w-4" />
    </button>
  );
}

function SortableWorkCard({ work }: { work: Work }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: work.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 20 : undefined,
  };
  return (
    <div ref={setNodeRef} style={style} className="relative">
      <WorkCard work={work} />
      <DragHandle
        id={work.id}
        attributes={attributes}
        listeners={listeners}
        className="absolute right-3 top-3 z-10 flex h-8 w-8 cursor-grab touch-none items-center justify-center rounded-lg bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/70 active:cursor-grabbing"
      />
    </div>
  );
}

function WorkRow({ work, materials }: { work: Work; materials: Material[] }) {
  const navigate = useNavigate();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: work.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };
  const workMaterials = work.materialIds
    .map((mid) => materials.find((m) => m.id === mid))
    .filter(Boolean) as Material[];

  return (
    <li
      ref={setNodeRef}
      style={style}
      data-testid={OBRAS.listRow(work.id)}
      className={cn(
        "flex items-stretch gap-0 overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm transition-shadow",
        isDragging && "shadow-soft-lg",
      )}
    >
      <DragHandle
        id={work.id}
        attributes={attributes}
        listeners={listeners}
        className="flex w-10 shrink-0 cursor-grab touch-none items-center justify-center border-r border-border bg-background text-muted-foreground transition-colors hover:bg-accent active:cursor-grabbing"
      />

      <div className="h-24 w-24 shrink-0 bg-muted sm:h-28 sm:w-36">
        <img
          src={work.coverUrl}
          alt={work.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 items-center gap-4 px-4 py-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-extrabold tracking-tight text-foreground">
              {work.title}
            </h3>
            <span
              className={cn(
                "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                work.status === "publicada"
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "bg-amber-500/10 text-amber-700 dark:text-amber-400",
              )}
            >
              {work.status}
            </span>
          </div>
          <div className="mt-0.5 truncate text-xs text-muted-foreground">
            {work.year ? `${work.year}` : ""}
            {work.year && work.dimensions ? " · " : ""}
            {work.dimensions ?? ""}
          </div>
          {workMaterials.length > 0 && (
            <div className="mt-1.5 hidden flex-wrap gap-1.5 sm:flex">
              {workMaterials.map((m) => (
                <span
                  key={m.id}
                  className="rounded-full border border-border bg-background px-2 py-0.5 text-[10px] font-semibold text-muted-foreground"
                >
                  {m.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            data-testid={OBRAS.listEdit(work.id)}
            onClick={() => navigate(`/obras/obra/${work.id}`)}
            className="h-9 gap-1.5 rounded-lg font-semibold"
          >
            <Icon name="Pencil" className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Editar</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            data-testid={OBRAS.listView(work.id)}
            className="h-9 w-9 rounded-lg p-0"
            aria-label="Ver"
            title="Ver"
          >
            <Icon name="Eye" className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </li>
  );
}

export default function ObrasCatalogo() {
  const navigate = useNavigate();
  const works = useWorksStore((s) => s.works);
  const reorder = useWorksStore((s) => s.reorder);
  const categories = useCategoriesStore((s) => s.items);
  const materials = useMaterialsStore((s) => s.items);

  const [search, setSearch] = useState("");
  const [selCats, setSelCats] = useState<string[]>([]);
  const [selMats, setSelMats] = useState<string[]>([]);
  const [view, setView] = useState<ViewMode>("grid");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return works.filter((w) => {
      const matchQ = !q || w.title.toLowerCase().includes(q);
      const matchCat =
        selCats.length === 0 || (w.categoryId && selCats.includes(w.categoryId));
      const matchMat =
        selMats.length === 0 || selMats.some((id) => w.materialIds.includes(id));
      return matchQ && matchCat && matchMat;
    });
  }, [works, search, selCats, selMats]);

  const toggle = (arr: string[], setter: (v: string[]) => void, id: string) => {
    setter(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
  };

  const isFiltered = !!search || selCats.length > 0 || selMats.length > 0;

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    reorder(reorderWithinFiltered(works, filtered, String(active.id), String(over.id)));
  };

  return (
    <div data-testid={OBRAS.catalogo} className="flex flex-col gap-6">
      {/* Cabecera */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-extrabold tracking-tight text-foreground">
              Todas las obras
            </h2>
            <span className="text-lg font-semibold text-muted-foreground">
              ({filtered.length})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Gestiona, edita y publica las piezas de tu colección. Arrastra
            <Icon name="GripVertical" className="-mt-0.5 mx-0.5 inline h-3.5 w-3.5" />
            para cambiar el orden.
          </p>
        </div>
        <Button
          data-testid={OBRAS.addWorkBtn}
          onClick={() => navigate("/obras/obra/nueva")}
          className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
        >
          <Icon name="Plus" className="h-4 w-4" />
          Añadir obra
        </Button>
      </div>

      {/* Filtros + conmutador de vista */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex-1">
          <FilterBar
            search={search}
            onSearch={setSearch}
            categories={categories}
            selectedCategoryIds={selCats}
            onToggleCategory={(id) => toggle(selCats, setSelCats, id)}
            onClearCategories={() => setSelCats([])}
            materials={materials}
            selectedMaterialIds={selMats}
            onToggleMaterial={(id) => toggle(selMats, setSelMats, id)}
            onClearMaterials={() => setSelMats([])}
          />
        </div>
        <ViewToggle value={view} onChange={setView} testId={OBRAS.viewToggle} />
      </div>

      {/* Contenido */}
      {filtered.length === 0 ? (
        <div
          data-testid={OBRAS.emptyState}
          className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card px-8 py-20 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <Icon name="Hammer" className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold tracking-tight">
              {isFiltered
                ? "No hemos encontrado obras con esos filtros"
                : "Todavía no hay obras"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {isFiltered
                ? "Prueba a quitar algún filtro o búsqueda."
                : "Empieza añadiendo tu primera escultura."}
            </p>
          </div>
          {isFiltered ? (
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setSelCats([]);
                setSelMats([]);
              }}
              className="rounded-full font-semibold"
            >
              Limpiar filtros
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/obras/obra/nueva")}
              className="gap-2 rounded-full bg-primary font-bold text-primary-foreground hover:bg-primary/90"
            >
              <Icon name="Plus" className="h-4 w-4" />
              Añadir obra
            </Button>
          )}
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={filtered.map((w) => w.id)}
            strategy={view === "grid" ? rectSortingStrategy : verticalListSortingStrategy}
          >
            {view === "grid" ? (
              <div
                data-testid="obras-grid"
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                {filtered.map((w) => (
                  <SortableWorkCard key={w.id} work={w} />
                ))}
              </div>
            ) : (
              <ul data-testid="obras-list" className="flex flex-col gap-3">
                {filtered.map((w) => (
                  <WorkRow key={w.id} work={w} materials={materials} />
                ))}
              </ul>
            )}
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
