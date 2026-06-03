import { useState, useRef, useEffect } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface EditableItem {
  id: string;
  name: string;
  active: boolean;
}

interface RowProps {
  item: EditableItem;
  onRename: (id: string, name: string) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  testIdItem: (id: string) => string;
  testIdRename: (id: string) => string;
  testIdToggle: (id: string) => string;
  testIdRemove: (id: string) => string;
}

function Row({
  item,
  onRename,
  onToggle,
  onRemove,
  testIdItem,
  testIdRename,
  testIdToggle,
  testIdRemove,
}: RowProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: item.id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(item.name);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  useEffect(() => {
    setValue(item.name);
  }, [item.name]);

  const commit = () => {
    const v = value.trim();
    if (v && v !== item.name) {
      onRename(item.id, v);
      toast.success(`Renombrado a "${v}"`);
    } else {
      setValue(item.name);
    }
    setEditing(false);
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      data-testid={testIdItem(item.id)}
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border bg-card px-3 py-2.5 transition-shadow",
        isDragging && "shadow-soft-lg",
      )}
    >
      <button
        {...attributes}
        {...listeners}
        aria-label="Arrastrar para reordenar"
        className="flex h-8 w-8 cursor-grab items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground active:cursor-grabbing"
      >
        <Icon name="GripVertical" className="h-4 w-4" />
      </button>

      <div className="min-w-0 flex-1">
        {editing ? (
          <Input
            ref={inputRef}
            data-testid={testIdRename(item.id)}
            value={value}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValue(e.target.value)
            }
            onBlur={commit}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") {
                setValue(item.name);
                setEditing(false);
              }
            }}
            className="h-9 rounded-md"
          />
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex w-full items-center gap-2 text-left text-sm font-bold text-foreground hover:text-primary"
          >
            <span className="truncate">{item.name}</span>
            <Icon
              name="Pencil"
              className="h-3 w-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 font-semibold",
            item.active
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : "bg-muted text-muted-foreground",
          )}
        >
          {item.active ? "Activo" : "Inactivo"}
        </span>
        <Switch
          data-testid={testIdToggle(item.id)}
          checked={item.active}
          onCheckedChange={() => onToggle(item.id)}
        />
        <button
          data-testid={testIdRemove(item.id)}
          onClick={() => onRemove(item.id)}
          aria-label="Eliminar"
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
        >
          <Icon name="Trash2" className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}

interface EditableListProps {
  items: EditableItem[];
  onAdd: (name: string) => void;
  onRename: (id: string, name: string) => void;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
  onReorder: (orderedIds: string[]) => void;
  addPlaceholder: string;
  emptyText: string;
  testIds: {
    list: string;
    item: (id: string) => string;
    add: string;
    newInput: string;
    rename: (id: string) => string;
    toggle: (id: string) => string;
    remove: (id: string) => string;
  };
}

export function EditableList({
  items,
  onAdd,
  onRename,
  onToggle,
  onRemove,
  onReorder,
  addPlaceholder,
  emptyText,
  testIds,
}: EditableListProps) {
  const [newName, setNewName] = useState("");
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleAdd = () => {
    const v = newName.trim();
    if (!v) return;
    onAdd(v);
    setNewName("");
    toast.success(`"${v}" añadido`);
  };

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = items.findIndex((i) => i.id === active.id);
    const newIdx = items.findIndex((i) => i.id === over.id);
    if (oldIdx < 0 || newIdx < 0) return;
    const next = arrayMove(items, oldIdx, newIdx);
    onReorder(next.map((i) => i.id));
  };

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-5">
      <div className="flex gap-2">
        <Input
          data-testid={testIds.newInput}
          value={newName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNewName(e.target.value)
          }
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") handleAdd();
          }}
          placeholder={addPlaceholder}
          className="h-11 rounded-xl"
        />
        <Button
          data-testid={testIds.add}
          onClick={handleAdd}
          disabled={!newName.trim()}
          className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Plus" className="h-4 w-4" />
          Añadir
        </Button>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
          {emptyText}
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
            <ul data-testid={testIds.list} className="flex flex-col gap-2">
              {items.map((it) => (
                <Row
                  key={it.id}
                  item={it}
                  onRename={onRename}
                  onToggle={onToggle}
                  onRemove={onRemove}
                  testIdItem={testIds.item}
                  testIdRename={testIds.rename}
                  testIdToggle={testIds.toggle}
                  testIdRemove={testIds.remove}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
