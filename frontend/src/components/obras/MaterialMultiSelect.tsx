import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@/lib/icon";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { OBRAS } from "@/constants/testIds";
import type { Material } from "@/lib/data/types";

interface Props {
  allMaterials: Material[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export function MaterialMultiSelect({
  allMaterials,
  selectedIds,
  onChange,
}: Props) {
  const [query, setQuery] = useState("");

  const selected = selectedIds
    .map((id) => allMaterials.find((m) => m.id === id))
    .filter(Boolean) as Material[];

  const filteredOptions = allMaterials
    .filter((m) => m.active)
    .filter((m) => m.name.toLowerCase().includes(query.trim().toLowerCase()));

  const toggle = (id: string) => {
    onChange(
      selectedIds.includes(id)
        ? selectedIds.filter((x) => x !== id)
        : [...selectedIds, id],
    );
  };

  return (
    <div data-testid={OBRAS.editMaterials} className="flex flex-col gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="flex min-h-[44px] w-full flex-wrap items-center gap-1.5 rounded-md border border-input bg-card px-3 py-2 text-left text-sm transition-colors hover:border-primary/40 focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {selected.length === 0 ? (
              <span className="text-muted-foreground">Selecciona uno o varios…</span>
            ) : (
              selected.map((m) => (
                <span
                  key={m.id}
                  className="flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary"
                  onClick={(e) => e.stopPropagation()}
                >
                  {m.name}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(m.id);
                    }}
                    aria-label={`Quitar ${m.name}`}
                    className="rounded-full p-0.5 hover:bg-primary/20"
                  >
                    <Icon name="X" className="h-3 w-3" />
                  </button>
                </span>
              ))
            )}
            <Icon
              name="ChevronDown"
              className="ml-auto h-4 w-4 text-muted-foreground"
            />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-72 p-2">
          <div className="relative mb-2">
            <Icon
              name="Search"
              className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              placeholder="Buscar material…"
              className="h-9 rounded-md pl-8"
            />
          </div>
          <ul className="max-h-64 overflow-y-auto">
            {filteredOptions.map((m) => {
              const checked = selectedIds.includes(m.id);
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    onClick={() => toggle(m.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent",
                      checked && "bg-accent text-accent-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded border border-border",
                        checked &&
                          "border-primary bg-primary text-primary-foreground",
                      )}
                    >
                      {checked && <Icon name="Check" className="h-3 w-3" />}
                    </span>
                    {m.name}
                  </button>
                </li>
              );
            })}
            {filteredOptions.length === 0 && (
              <li className="px-2 py-3 text-center text-xs text-muted-foreground">
                Sin coincidencias.
              </li>
            )}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
