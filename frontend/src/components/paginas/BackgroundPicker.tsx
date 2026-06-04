import { useRef } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { BG_COLOR_PRESETS, type Background } from "@/lib/data/paginas";

interface Props {
  background: Background;
  onChange: (bg: Background) => void;
  testId?: string;
}

export function BackgroundPicker({ background, onChange, testId }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const isImage = background.type === "image";

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          data-testid={testId}
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-2 py-1.5 transition-colors hover:border-primary/40"
        >
          <span
            className="h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted"
            style={
              isImage
                ? {
                    backgroundImage: `url(${background.value})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : { background: background.value }
            }
          />
          <div className="min-w-0 pr-2 text-left">
            <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Fondo
            </div>
            <div className="truncate text-xs font-extrabold">
              {isImage ? "Imagen" : background.value.toUpperCase()}
            </div>
          </div>
          <Icon name="ChevronDown" className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-72 p-3">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Color
        </div>
        <div className="flex flex-wrap gap-2">
          {BG_COLOR_PRESETS.map((c) => {
            const active = !isImage && background.value.toLowerCase() === c.value.toLowerCase();
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => onChange({ type: "color", value: c.value })}
                aria-label={c.label}
                className={cn(
                  "h-9 w-9 rounded-full border-2 transition-all",
                  active ? "border-foreground shadow-soft" : "border-transparent hover:scale-110",
                )}
                style={{ background: c.value }}
              />
            );
          })}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="color"
            value={isImage ? "#ffffff" : background.value}
            onChange={(e) =>
              onChange({ type: "color", value: e.target.value })
            }
            className="h-9 w-12 cursor-pointer rounded-md border border-border bg-card"
            aria-label="Color personalizado"
          />
          <Input
            value={isImage ? "" : background.value.toUpperCase()}
            placeholder="#FFFFFF"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onChange({ type: "color", value: e.target.value })
            }
            className="h-9 flex-1 rounded-md font-mono text-xs"
          />
        </div>

        <div className="my-3 h-px bg-border" />

        <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          Imagen
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (!f) return;
            const url = URL.createObjectURL(f);
            onChange({ type: "image", value: url });
            if (fileRef.current) fileRef.current.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-dashed border-border px-3 py-2 text-xs font-bold text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
        >
          <Icon name="ImagePlus" className="h-4 w-4" />
          Subir imagen de fondo
        </button>
      </PopoverContent>
    </Popover>
  );
}
