import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorksStore } from "@/stores/works-store";
import { useCategoriesStore } from "@/stores/categories-store";
import { useMaterialsStore } from "@/stores/materials-store";
import { WorkCard } from "@/components/obras/WorkCard";
import { FilterBar } from "@/components/obras/FilterBar";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { OBRAS } from "@/constants/testIds";

export default function ObrasCatalogo() {
  const navigate = useNavigate();
  const works = useWorksStore((s) => s.works);
  const categories = useCategoriesStore((s) => s.items);
  const materials = useMaterialsStore((s) => s.items);

  const [search, setSearch] = useState("");
  const [selCats, setSelCats] = useState<string[]>([]);
  const [selMats, setSelMats] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return works.filter((w) => {
      const matchQ = !q || w.title.toLowerCase().includes(q);
      const matchCat =
        selCats.length === 0 || (w.categoryId && selCats.includes(w.categoryId));
      const matchMat =
        selMats.length === 0 ||
        selMats.some((id) => w.materialIds.includes(id));
      return matchQ && matchCat && matchMat;
    });
  }, [works, search, selCats, selMats]);

  const toggle = (
    arr: string[],
    setter: (v: string[]) => void,
    id: string,
  ) => {
    setter(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
  };

  const isFiltered = !!search || selCats.length > 0 || selMats.length > 0;

  return (
    <div data-testid={OBRAS.catalogo} className="flex flex-col gap-6">
      {/* Cabecera */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-extrabold tracking-tight text-foreground">
              Todas las obras
            </h2>
            <span className="text-lg font-semibold text-muted-foreground">
              ({filtered.length})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Gestiona, edita y publica las piezas de tu colección.
          </p>
        </div>
        <Button
          data-testid={OBRAS.addWorkBtn}
          onClick={() => navigate("/obras/obra/nueva")}
          className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground shadow-soft hover:bg-primary/90"
        >
          <Icon name="Plus" className="h-4 w-4" />
          Añadir obra
        </Button>
      </div>

      {/* Filtros */}
      <FilterBar
        search={search}
        onSearch={setSearch}
        categories={categories}
        selectedCategoryIds={selCats}
        onToggleCategory={(id) => toggle(selCats, setSelCats, id)}
        onClearCategories={() => setSelCats([])}
        materials={materials}
        selectedMaterialIds={selMats}
        onToggleMaterial={(id) => toggle(selMats, setSelMats, id)}
        onClearMaterials={() => setSelMats([])}
      />

      {/* Grid u Estado vacío */}
      {filtered.length === 0 ? (
        <div
          data-testid={OBRAS.emptyState}
          className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card px-8 py-20 text-center"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <Icon name="Hammer" className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold tracking-tight">
              {isFiltered
                ? "No hemos encontrado obras con esos filtros"
                : "Todavía no hay obras"}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {isFiltered
                ? "Prueba a quitar algún filtro o búsqueda."
                : "Empieza añadiendo tu primera escultura."}
            </p>
          </div>
          {isFiltered ? (
            <Button
              variant="outline"
              onClick={() => {
                setSearch("");
                setSelCats([]);
                setSelMats([]);
              }}
              className="rounded-full font-semibold"
            >
              Limpiar filtros
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/obras/obra/nueva")}
              className="gap-2 rounded-full bg-primary font-bold text-primary-foreground hover:bg-primary/90"
            >
              <Icon name="Plus" className="h-4 w-4" />
              Añadir obra
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((w) => (
            <WorkCard key={w.id} work={w} />
          ))}
        </div>
      )}
    </div>
  );
}
