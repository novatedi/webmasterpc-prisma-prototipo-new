import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { OBRAS } from "@/constants/testIds";
import type { Category, Material } from "@/lib/data/types";

interface Props {
  search: string;
  onSearch: (v: string) => void;
  categories: Category[];
  selectedCategoryIds: string[];
  onToggleCategory: (id: string) => void;
  onClearCategories: () => void;
  materials: Material[];
  selectedMaterialIds: string[];
  onToggleMaterial: (id: string) => void;
  onClearMaterials: () => void;
}

export function FilterBar({
  search,
  onSearch,
  categories,
  selectedCategoryIds,
  onToggleCategory,
  onClearCategories,
  materials,
  selectedMaterialIds,
  onToggleMaterial,
  onClearMaterials,
}: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-[240px] flex-1">
        <Icon
          name="Search"
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          data-testid={OBRAS.searchInput}
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearch(e.target.value)
          }
          placeholder="Buscar por título…"
          className="h-10 rounded-full pl-9"
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-testid={OBRAS.filterCategoryBtn}
            className={cn(
              "h-10 gap-2 rounded-full font-semibold",
              selectedCategoryIds.length > 0 &&
                "border-primary/50 bg-primary/5 text-primary",
            )}
          >
            <Icon name="Filter" className="h-4 w-4" />
            Categoría
            {selectedCategoryIds.length > 0 && (
              <span className="rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
                {selectedCategoryIds.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64 p-2">
          <div className="flex items-center justify-between px-2 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Categorías
            </span>
            {selectedCategoryIds.length > 0 && (
              <button
                onClick={onClearCategories}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Limpiar
              </button>
            )}
          </div>
          <ul className="flex flex-col">
            {categories.map((c) => {
              const checked = selectedCategoryIds.includes(c.id);
              return (
                <li key={c.id}>
                  <button
                    onClick={() => onToggleCategory(c.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent",
                      checked && "bg-accent text-accent-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded border border-border",
                        checked && "border-primary bg-primary text-primary-foreground",
                      )}
                    >
                      {checked && <Icon name="Check" className="h-3 w-3" />}
                    </span>
                    <span className="flex-1">{c.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            data-testid={OBRAS.filterMaterialBtn}
            className={cn(
              "h-10 gap-2 rounded-full font-semibold",
              selectedMaterialIds.length > 0 &&
                "border-primary/50 bg-primary/5 text-primary",
            )}
          >
            <Icon name="Layers" className="h-4 w-4" />
            Material
            {selectedMaterialIds.length > 0 && (
              <span className="rounded-full bg-primary px-1.5 text-[11px] font-bold text-primary-foreground">
                {selectedMaterialIds.length}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-64 p-2">
          <div className="flex items-center justify-between px-2 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Materiales
            </span>
            {selectedMaterialIds.length > 0 && (
              <button
                onClick={onClearMaterials}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Limpiar
              </button>
            )}
          </div>
          <ul className="flex flex-col">
            {materials.map((m) => {
              const checked = selectedMaterialIds.includes(m.id);
              return (
                <li key={m.id}>
                  <button
                    onClick={() => onToggleMaterial(m.id)}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-accent",
                      checked && "bg-accent text-accent-foreground",
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded border border-border",
                        checked && "border-primary bg-primary text-primary-foreground",
                      )}
                    >
                      {checked && <Icon name="Check" className="h-3 w-3" />}
                    </span>
                    <span className="flex-1">{m.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
