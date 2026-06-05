import { useState } from "react";
import { useSeccionesStore } from "@/stores/secciones-store";
import { useRoleStore } from "@/stores/role-store";
import {
  SECTION_CATEGORIES,
  type SectionType,
} from "@/lib/data/secciones";
import { SeccionPreview } from "./SeccionPreview";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { SECCIONES } from "@/constants/testIds";

interface Props {
  onOpen: (id: string) => void;
  onCreate: () => void;
}

export function CatalogoSecciones({ onOpen, onCreate }: Props) {
  const sections = useSeccionesStore((s) => s.sections);
  const role = useRoleStore((s) => s.role);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("todas");

  const filtered = sections.filter((s) => {
    const matchQ =
      !q ||
      s.name.toLowerCase().includes(q.toLowerCase()) ||
      s.description.toLowerCase().includes(q.toLowerCase());
    const matchCat = cat === "todas" || s.category === cat;
    return matchQ && matchCat;
  });

  return (
    <div className="flex flex-col gap-5">
      {/* Buscador + crear */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Icon
            name="Search"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            data-testid={SECCIONES.search}
            value={q}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
            placeholder="Busca una sección…"
            className="h-11 rounded-lg pl-9"
          />
        </div>
        {role === "admin" && (
          <Button
            data-testid={SECCIONES.createBtn}
            onClick={onCreate}
            className="h-11 rounded-lg text-sm font-bold"
          >
            <Icon name="Plus" className="mr-2 h-4 w-4" />
            Crear sección nueva
          </Button>
        )}
      </div>

      {/* Filtros por categoría */}
      <div className="flex flex-wrap gap-2">
        {["todas", ...SECTION_CATEGORIES].map((c) => (
          <button
            key={c}
            data-testid={SECCIONES.filterCat(c)}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
              cat === c
                ? "bg-primary text-primary-foreground"
                : "border border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            {c === "todas" ? "Todas" : c}
          </button>
        ))}
      </div>

      {/* Cuadrícula */}
      {filtered.length === 0 ? (
        <div
          data-testid={SECCIONES.empty}
          className="flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border py-16 text-center"
        >
          <Icon name="SearchX" className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-bold text-foreground">
            No hay secciones que coincidan
          </p>
          <p className="text-xs text-muted-foreground">
            Prueba con otra palabra o quita el filtro de categoría.
          </p>
        </div>
      ) : (
        <div
          data-testid={SECCIONES.grid}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((s) => (
            <SectionCard key={s.id} section={s} onOpen={onOpen} />
          ))}
        </div>
      )}
    </div>
  );
}

function SectionCard({
  section,
  onOpen,
}: {
  section: SectionType;
  onOpen: (id: string) => void;
}) {
  return (
    <button
      data-testid={SECCIONES.card(section.id)}
      onClick={() => onOpen(section.id)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft-sm transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft"
    >
      <div className="pointer-events-none h-40 overflow-hidden border-b border-border bg-muted/30">
        <div className="origin-top scale-90">
          <SeccionPreview section={section} presetId={section.presets[0].id} />
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon name={section.icon} className="h-4 w-4" />
          </span>
          <div className="font-bold text-foreground">{section.name}</div>
        </div>
        <p className="line-clamp-2 text-xs text-muted-foreground">
          {section.description}
        </p>
        <div className="mt-1 flex items-center gap-3 text-[11px] font-semibold text-muted-foreground">
          <span className="rounded-full bg-muted px-2 py-0.5">{section.category}</span>
          <span>{section.presets.length} presets</span>
          <span>{section.slots.length} campos</span>
        </div>
      </div>
    </button>
  );
}
