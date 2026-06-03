import { useRef } from "react";
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
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@/lib/icon";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { OBRAS } from "@/constants/testIds";
import type { WorkImage } from "@/lib/data/types";

interface Props {
  images: WorkImage[];
  onChange: (next: WorkImage[]) => void;
}

function Thumb({
  img,
  onRemove,
  isCover,
}: {
  img: WorkImage;
  onRemove: () => void;
  isCover: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: img.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-muted",
        isCover && "ring-2 ring-primary",
      )}
    >
      <img
        src={img.url}
        alt=""
        className="h-full w-full object-cover"
        {...attributes}
        {...listeners}
        draggable={false}
      />
      {isCover && (
        <span className="absolute left-1 top-1 rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary-foreground">
          Portada
        </span>
      )}
      <button
        type="button"
        onClick={onRemove}
        aria-label="Quitar imagen"
        className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground/80 text-background opacity-0 transition-opacity group-hover:opacity-100"
      >
        <Icon name="X" className="h-3 w-3" />
      </button>
    </div>
  );
}

export function ImageUploader({ images, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const onDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;
    const oldIdx = images.findIndex((i) => i.id === active.id);
    const newIdx = images.findIndex((i) => i.id === over.id);
    if (oldIdx < 0 || newIdx < 0) return;
    onChange(arrayMove(images, oldIdx, newIdx));
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const next = [...images];
    Array.from(files).forEach((f) => {
      const url = URL.createObjectURL(f);
      next.push({ id: `img-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, url });
    });
    onChange(next);
    toast.success(`${files.length} imagen(es) añadida(s)`);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        hidden
        onChange={(e) => {
          handleFiles(e.target.files);
          if (fileRef.current) fileRef.current.value = "";
        }}
      />

      <Button
        type="button"
        variant="outline"
        data-testid={OBRAS.editUploadImage}
        onClick={() => fileRef.current?.click()}
        className="h-11 w-fit gap-2 rounded-xl font-semibold"
      >
        <Icon name="ImagePlus" className="h-4 w-4" />
        Subir imagen
      </Button>

      {images.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <SortableContext
            items={images.map((i) => i.id)}
            strategy={horizontalListSortingStrategy}
          >
            <div className="flex flex-wrap gap-2.5">
              {images.map((img, idx) => (
                <Thumb
                  key={img.id}
                  img={img}
                  isCover={idx === 0}
                  onRemove={() => onChange(images.filter((i) => i.id !== img.id))}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {images.length === 0 && (
        <div className="rounded-xl border border-dashed border-border px-4 py-6 text-center text-xs text-muted-foreground">
          Todavía no hay imágenes. La primera que subas será la portada.
        </div>
      )}
    </div>
  );
}
