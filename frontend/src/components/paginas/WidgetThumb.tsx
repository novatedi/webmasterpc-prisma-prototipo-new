import { cn } from "@/lib/utils";
import type { WidgetVariant } from "@/lib/data/paginas";

/**
 * Mini-representación SVG/CSS del layout del widget para preview en miniatura.
 */
export function WidgetThumb({
  variant,
  className,
  active = false,
}: {
  variant: WidgetVariant["preview"];
  className?: string;
  active?: boolean;
}) {
  const wrap = cn(
    "flex h-12 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-muted/40 p-1.5",
    active ? "border-primary ring-2 ring-primary/20" : "border-border",
    className,
  );

  switch (variant) {
    case "centered":
      return (
        <div className={wrap}>
          <div className="flex w-full flex-col items-center gap-1">
            <span className="h-1.5 w-6 rounded bg-foreground/60" />
            <span className="h-1 w-8 rounded bg-foreground/30" />
            <span className="mt-0.5 h-1.5 w-4 rounded bg-primary" />
          </div>
        </div>
      );
    case "split":
      return (
        <div className={wrap}>
          <div className="grid h-full w-full grid-cols-2 gap-1">
            <div className="flex flex-col justify-center gap-1">
              <span className="h-1 w-full rounded bg-foreground/50" />
              <span className="h-1 w-3/4 rounded bg-foreground/30" />
              <span className="h-1.5 w-3 rounded bg-primary" />
            </div>
            <div className="rounded bg-foreground/15" />
          </div>
        </div>
      );
    case "large-photo":
      return (
        <div className={wrap}>
          <div className="flex h-full w-full flex-col gap-1">
            <div className="h-4 w-full rounded bg-foreground/15" />
            <span className="h-1 w-4/5 rounded bg-foreground/50" />
            <span className="h-1 w-3/5 rounded bg-foreground/30" />
          </div>
        </div>
      );
    case "fullscreen":
      return (
        <div className={wrap}>
          <div className="relative h-full w-full overflow-hidden rounded bg-foreground/20">
            <span className="absolute inset-x-1.5 bottom-1.5 h-1 rounded bg-white/80" />
          </div>
        </div>
      );
    case "grid-3":
      return (
        <div className={wrap}>
          <div className="grid h-full w-full grid-cols-3 gap-1">
            <div className="rounded bg-foreground/30" />
            <div className="rounded bg-foreground/30" />
            <div className="rounded bg-foreground/30" />
          </div>
        </div>
      );
    case "grid-4":
      return (
        <div className={wrap}>
          <div className="grid h-full w-full grid-cols-4 gap-0.5">
            <div className="rounded bg-foreground/30" />
            <div className="rounded bg-foreground/30" />
            <div className="rounded bg-foreground/30" />
            <div className="rounded bg-foreground/30" />
          </div>
        </div>
      );
    case "masonry":
      return (
        <div className={wrap}>
          <div className="grid h-full w-full grid-cols-3 gap-0.5">
            <div className="row-span-2 rounded bg-foreground/30" />
            <div className="rounded bg-foreground/30" />
            <div className="rounded bg-foreground/30" />
            <div className="rounded bg-foreground/30" />
            <div className="rounded bg-foreground/30" />
          </div>
        </div>
      );
    case "carousel":
      return (
        <div className={wrap}>
          <div className="flex h-full w-full items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-foreground/40" />
            <div className="h-full flex-1 rounded bg-foreground/25" />
            <span className="h-1 w-1 rounded-full bg-foreground/40" />
          </div>
        </div>
      );
    case "single":
      return (
        <div className={wrap}>
          <div className="grid h-full w-full grid-cols-3 gap-1">
            <div className="col-span-2 rounded bg-foreground/35" />
            <div className="flex flex-col gap-1">
              <div className="flex-1 rounded bg-foreground/25" />
              <div className="flex-1 rounded bg-foreground/25" />
            </div>
          </div>
        </div>
      );
    case "split-map":
      return (
        <div className={wrap}>
          <div className="grid h-full w-full grid-cols-2 gap-1">
            <div className="rounded bg-emerald-500/30" />
            <div className="flex flex-col gap-1">
              <span className="h-1 w-full rounded bg-foreground/30" />
              <span className="h-1 w-3/4 rounded bg-foreground/30" />
              <span className="h-1.5 w-3 rounded bg-primary" />
            </div>
          </div>
        </div>
      );
    case "two-col":
      return (
        <div className={wrap}>
          <div className="flex h-full w-full flex-col gap-1">
            <div className="grid grid-cols-2 gap-1">
              <div className="h-3 rounded bg-foreground/25" />
              <div className="h-3 rounded bg-foreground/25" />
            </div>
            <div className="grid grid-cols-2 gap-1">
              <div className="h-3 rounded bg-foreground/25" />
              <div className="h-3 rounded bg-foreground/25" />
            </div>
          </div>
        </div>
      );
    case "minimal":
      return (
        <div className={wrap}>
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-1.5 w-full rounded bg-foreground/40" />
          </div>
        </div>
      );
    default:
      return <div className={wrap} />;
  }
}
