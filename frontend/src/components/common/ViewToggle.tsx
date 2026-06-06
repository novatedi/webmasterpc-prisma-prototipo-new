import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";

export type ViewMode = "grid" | "list";

/** Conmutador de vista Cuadrícula / Lista (segmentado). */
export function ViewToggle({
  value,
  onChange,
  testId = "view-toggle",
}: {
  value: ViewMode;
  onChange: (v: ViewMode) => void;
  testId?: string;
}) {
  return (
    <div
      data-testid={testId}
      className="flex shrink-0 items-center gap-1 rounded-full border border-border bg-card p-1"
    >
      <button
        type="button"
        data-testid={`${testId}-grid`}
        onClick={() => onChange("grid")}
        aria-label="Vista de cuadrícula"
        title="Cuadrícula"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          value === "grid"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Icon name="LayoutGrid" className="h-4 w-4" />
      </button>
      <button
        type="button"
        data-testid={`${testId}-list`}
        onClick={() => onChange("list")}
        aria-label="Vista de lista"
        title="Lista"
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
          value === "list"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Icon name="List" className="h-4 w-4" />
      </button>
    </div>
  );
}
