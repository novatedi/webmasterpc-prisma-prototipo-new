import { useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import {
  SECTION_CATALOG,
  CATEGORY_LABELS,
  type SectionCategory,
  type SectionKind,
} from "@/lib/data/paginas";
import { PAGINAS } from "@/constants/testIds";

const CATS: ("todos" | SectionCategory)[] = [
  "todos",
  "destacado",
  "contenido",
  "obras",
  "social",
  "contacto",
];

interface Props {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onPick: (kind: SectionKind) => void;
}

export function AddSectionDialog({ open, onOpenChange, onPick }: Props) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<(typeof CATS)[number]>("todos");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return SECTION_CATALOG.filter((d) => {
      const matchQ =
        !q ||
        d.label.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q);
      const matchC = cat === "todos" || d.category === cat;
      return matchQ && matchC;
    });
  }, [search, cat]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[88vh] max-w-3xl overflow-hidden p-0">
        <DialogHeader className="border-b border-border px-6 pt-6">
          <DialogTitle className="text-xl font-extrabold tracking-tight">
            Catálogo de secciones
          </DialogTitle>
          <DialogDescription>
            Elige un módulo prediseñado y lo añadiremos a tu página. Luego puedes
            cambiar el layout y el fondo.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 px-6 py-4">
          <div className="relative">
            <Icon
              name="Search"
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              data-testid={PAGINAS.catalogSearch}
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              placeholder="Buscar (ej. historia, galería, contacto)…"
              className="h-10 rounded-full pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button
                key={c}
                type="button"
                data-testid={PAGINAS.catalogFilter(c)}
                onClick={() => setCat(c)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-xs font-bold transition-colors",
                  cat === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {c === "todos" ? "Todas" : CATEGORY_LABELS[c]}
              </button>
            ))}
          </div>
        </div>

        <div className="scrollbar-soft max-h-[55vh] overflow-y-auto px-6 pb-6">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
              No hay secciones que coincidan con esa búsqueda.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {filtered.map((d) => (
                <button
                  key={d.kind}
                  type="button"
                  data-testid={PAGINAS.catalogCard(d.kind)}
                  onClick={() => {
                    onPick(d.kind);
                    onOpenChange(false);
                    setSearch("");
                    setCat("todos");
                  }}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon name={d.icon} className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-sm font-extrabold">{d.label}</div>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {CATEGORY_LABELS[d.category]}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {d.description}
                    </div>
                    <div className="mt-2 text-[11px] font-semibold text-primary">
                      {d.widgets.length} layouts disponibles →
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
