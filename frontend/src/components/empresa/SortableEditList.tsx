import type { ReactNode } from "react";
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
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";

interface SortableRowProps {
  id: string;
  children: ReactNode;
  testId?: string;
}

function SortableRow({ id, children, testId }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };
  return (
    <li
      ref={setNodeRef}
      style={style}
      data-testid={testId}
      className={cn(
        "rounded-xl border border-border bg-background p-4 transition-shadow",
        isDragging && "shadow-soft-lg",
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <button
          {...attributes}
          {...listeners}
          aria-label="Reordenar"
          className="flex h-7 w-7 cursor-grab items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground active:cursor-grabbing"
        >
          <Icon name="GripVertical" className="h-4 w-4" />
        </button>
        <div className="flex-1" />
      </div>
      {children}
    </li>
  );
}

interface Props<T extends { id: string }> {
  items: T[];
  onReorder: (next: T[]) => void;
  renderItem: (item: T, onRemove: () => void) => ReactNode;
  onRemove: (id: string) => void;
  itemTestId?: (id: string) => string;
}

/** Lista vertical con drag-and-drop y eliminación, parametrizada. */
export function SortableEditList<T extends { id: string }>({
  items,
  onReorder,
  renderItem,
  onRemove,
  itemTestId,
}: Props<T>) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = items.findIndex((i) => i.id === active.id);
    const newIdx = items.findIndex((i) => i.id === over.id);
    if (oldIdx < 0 || newIdx < 0) return;
    onReorder(arrayMove(items, oldIdx, newIdx));
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="flex flex-col gap-3">
          {items.map((it) => (
            <SortableRow
              key={it.id}
              id={it.id}
              testId={itemTestId?.(it.id)}
            >
              {renderItem(it, () => onRemove(it.id))}
            </SortableRow>
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}
