import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { Switch } from "@/components/ui/switch";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { PAGINAS } from "@/constants/testIds";
import { findDef, type PageSection, type SectionKind } from "@/lib/data/paginas";
import { WidgetPicker } from "@/components/paginas/WidgetPicker";
import { BackgroundPicker } from "@/components/paginas/BackgroundPicker";
import { SectionPreview } from "@/components/paginas/SectionPreview";
import { AddSectionDialog } from "@/components/paginas/AddSectionDialog";

function Band({
  pageId,
  section,
}: {
  pageId: string;
  section: PageSection;
}) {
  const navigate = useNavigate();
  const {
    setWidget,
    setBackground,
    toggleSectionVisible,
    removeSection,
  } = usePaginasStore();

  const def = findDef(section.kind);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: section.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : section.visible ? 1 : 0.6,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      data-testid={PAGINAS.band(section.id)}
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm transition-shadow",
        isDragging && "shadow-soft-lg",
      )}
    >
      {/* Encabezado */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border bg-background/40 px-3 py-2">
        <button
          {...attributes}
          {...listeners}
          aria-label="Reordenar sección"
          className="flex h-9 w-9 cursor-grab items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground active:cursor-grabbing"
        >
          <Icon name="GripVertical" className="h-4 w-4" />
        </button>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon name={def.icon} className="h-4 w-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-extrabold">{def.label}</div>
          {section.content.title && (
            <div className="truncate text-[11px] text-muted-foreground">
              {section.content.title}
            </div>
          )}
        </div>
        <WidgetPicker
          section={section}
          onSelect={(wid) => {
            setWidget(pageId, section.id, wid);
            toast.message("Layout actualizado");
          }}
          testId={PAGINAS.bandWidget(section.id)}
        />
        <BackgroundPicker
          background={section.background}
          onChange={(bg) => setBackground(pageId, section.id, bg)}
          testId={PAGINAS.bandBg(section.id)}
        />
        <Button
          variant="outline"
          size="sm"
          data-testid={PAGINAS.bandEdit(section.id)}
          onClick={() =>
            navigate(`/paginas/${pageId}/seccion/${section.id}`)
          }
          className="h-9 gap-1.5 rounded-lg font-semibold"
        >
          <Icon name="Pencil" className="h-3.5 w-3.5" />
          Editar contenido
        </Button>
        <Switch
          data-testid={PAGINAS.bandToggle(section.id)}
          checked={section.visible}
          onCheckedChange={() => toggleSectionVisible(pageId, section.id)}
        />
        <button
          type="button"
          data-testid={PAGINAS.bandRemove(section.id)}
          onClick={() => {
            removeSection(pageId, section.id);
            toast.success("Sección eliminada");
          }}
          aria-label="Eliminar sección"
          className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <Icon name="Trash2" className="h-4 w-4" />
        </button>
      </div>

      {/* Preview compacto */}
      <SectionPreview section={section} density="compact" />
    </li>
  );
}

export default function EditorPagina() {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { getPage, addSection, reorderSections } = usePaginasStore();
  const page = getPage(pageId!);
  const [catalogOpen, setCatalogOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  useEffect(() => {
    if (!page) navigate("/paginas", { replace: true });
  }, [page, navigate]);

  if (!page) return null;

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = page.sections.findIndex((s) => s.id === active.id);
    const newIdx = page.sections.findIndex((s) => s.id === over.id);
    if (oldIdx < 0 || newIdx < 0) return;
    reorderSections(
      page.id,
      arrayMove(page.sections, oldIdx, newIdx).map((s) => s.id),
    );
  };

  const handlePick = (kind: SectionKind) => {
    const sec = addSection(page.id, kind);
    if (sec) toast.success("Sección añadida");
  };

  return (
    <div data-testid={PAGINAS.editor} className="flex flex-col gap-6">
      {/* Header contextual */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <button
            onClick={() => navigate("/paginas")}
            className="mb-2 flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <Icon name="ChevronLeft" className="h-3 w-3" />
            Volver a las páginas
          </button>
          <h2 className="text-2xl font-extrabold tracking-tight">{page.name}</h2>
          <p className="text-sm text-muted-foreground">
            Arrastra para ordenar. Añade secciones de tu catálogo. Elige cómo se ven.
          </p>
        </div>
        <Button
          data-testid={PAGINAS.addSectionBtn}
          onClick={() => setCatalogOpen(true)}
          className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Plus" className="h-4 w-4" />
          Añadir sección
        </Button>
      </div>

      {page.sections.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <Icon name="Layers" className="h-6 w-6" />
          </span>
          <div>
            <h3 className="text-lg font-extrabold">Esta página aún no tiene secciones</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Empieza eligiendo una del catálogo de secciones prediseñadas.
            </p>
          </div>
          <Button
            onClick={() => setCatalogOpen(true)}
            className="gap-2 rounded-full bg-primary font-bold text-primary-foreground hover:bg-primary/90"
          >
            <Icon name="Plus" className="h-4 w-4" />
            Añadir primera sección
          </Button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={page.sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="flex flex-col gap-4">
              {page.sections.map((s) => (
                <Band key={s.id} pageId={page.id} section={s} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}

      <AddSectionDialog
        open={catalogOpen}
        onOpenChange={setCatalogOpen}
        onPick={handlePick}
      />
    </div>
  );
}
