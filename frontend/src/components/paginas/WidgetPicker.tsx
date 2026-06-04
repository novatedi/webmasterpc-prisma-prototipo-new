import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { WidgetThumb } from "./WidgetThumb";
import { findDef, type PageSection } from "@/lib/data/paginas";

interface Props {
  section: PageSection;
  onSelect: (widgetId: string) => void;
  testId?: string;
}

export function WidgetPicker({ section, onSelect, testId }: Props) {
  const def = findDef(section.kind);
  const current = def.widgets.find((w) => w.id === section.widgetId) ?? def.widgets[0];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-testid={testId}
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5 text-left transition-colors hover:border-primary/40"
        >
          <WidgetThumb variant={current.preview} className="h-10 w-14" />
          <div className="min-w-0 pr-2">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Layout
            </div>
            <div className="truncate text-xs font-extrabold">{current.label}</div>
          </div>
          <Icon name="ChevronDown" className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-3">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Elige cómo se ve
        </div>
        <ul className="flex flex-col gap-1">
          {def.widgets.map((w) => {
            const active = w.id === section.widgetId;
            return (
              <li key={w.id}>
                <button
                  type="button"
                  onClick={() => onSelect(w.id)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md p-2 text-left transition-colors",
                    active ? "bg-accent text-accent-foreground" : "hover:bg-accent/60",
                  )}
                >
                  <WidgetThumb variant={w.preview} active={active} />
                  <span className="flex-1 text-sm font-bold">{w.label}</span>
                  {active && <Icon name="Check" className="h-4 w-4 text-primary" />}
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
