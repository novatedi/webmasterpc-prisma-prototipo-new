import { useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useBibliotecaStore } from "@/stores/biblioteca-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  PHOTO_CATEGORY_LABELS,
  type Photo,
  type PhotoCategory,
} from "@/lib/data/biblioteca";

const CATS: { value: "todas" | PhotoCategory; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "obras", label: "Obras" },
  { value: "taller", label: "Taller" },
  { value: "exposiciones", label: "Exposiciones" },
  { value: "retratos", label: "Retratos" },
  { value: "proceso", label: "Proceso" },
];

const USAGE_ICONS: Record<string, string> = {
  obra: "Hammer",
  articulo: "PenSquare",
  seccion: "Layers",
  servicio: "Boxes",
  pagina: "Layout",
};

function PhotoTile({
  photo,
  active,
  onClick,
}: {
  photo: Photo;
  active: boolean;
  onClick: () => void;
}) {
  const usedCount = photo.usages.length;
  return (
    <button
      type="button"
      data-testid={`photo-tile-${photo.id}`}
      onClick={onClick}
      className={cn(
        "group flex flex-col overflow-hidden rounded-2xl border bg-card text-left shadow-soft-sm transition-all hover:-translate-y-0.5 hover:shadow-soft",
        active ? "border-primary ring-2 ring-primary/30" : "border-border",
      )}
    >
      <div className="aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={photo.url}
          alt={photo.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-col gap-2 p-3">
        <div className="min-w-0">
          <div className="truncate text-sm font-extrabold">{photo.name}</div>
          <div className="text-[11px] text-muted-foreground">
            {PHOTO_CATEGORY_LABELS[photo.category]}
          </div>
        </div>
        <span
          data-testid={`photo-usage-${photo.id}`}
          className={cn(
            "w-fit rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
            usedCount === 0
              ? "bg-muted text-muted-foreground"
              : "bg-primary/10 text-primary",
          )}
        >
          {usedCount === 0
            ? "Sin usar"
            : `Se usa ${usedCount} ${usedCount === 1 ? "vez" : "veces"}`}
        </span>
      </div>
    </button>
  );
}

function PhotoDetail({ photo }: { photo: Photo }) {
  const navigate = useNavigate();
  const { update, remove } = useBibliotecaStore();
  const [edit, setEdit] = useState({
    name: photo.name,
    category: photo.category,
    alt: photo.alt,
  });

  // Sincroniza cuando cambia la foto seleccionada
  if (edit.name !== photo.name && edit.category === photo.category && edit.alt === photo.alt) {
    // no-op: si parte del estado coincide pero name no, asumimos cambio de foto
  }
  // simple reset via key prop manejado en padre

  const save = () => {
    update(photo.id, edit);
    toast.success("Metadatos guardados");
  };

  const handleRemove = () => {
    remove(photo.id);
    toast.success("Foto eliminada");
  };

  const used = photo.usages.length > 0;

  return (
    <div
      data-testid="photo-detail"
      className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-card p-5 shadow-soft-sm"
    >
      <div className="overflow-hidden rounded-xl bg-muted">
        <img src={photo.url} alt={photo.alt} className="aspect-[16/10] w-full object-cover" />
      </div>

      <div>
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
          Dónde se usa
        </div>
        {used ? (
          <ul className="mt-3 flex flex-col gap-2">
            {photo.usages.map((usage, i) => (
              <li
                key={`${usage.kind}-${usage.refId}-${i}`}
                data-testid={`photo-usage-row-${i}`}
                className="flex items-center gap-3 rounded-xl border border-border bg-background px-3 py-2.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon name={USAGE_ICONS[usage.kind] ?? "Layers"} className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-extrabold">{usage.label}</div>
                  <div className="text-[11px] text-muted-foreground">
                    {usage.kind} · en página {usage.page}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  data-testid={`photo-usage-edit-${i}`}
                  onClick={() => navigate(usage.editTo)}
                  className="h-9 gap-1.5 rounded-md font-semibold"
                >
                  <Icon name="Pencil" className="h-3.5 w-3.5" />
                  Editar
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <div
            data-testid="photo-unused"
            className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-border bg-background px-4 py-4"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Icon name="Check" className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-extrabold">Esta foto no se usa en ninguna parte</div>
              <div className="text-xs text-muted-foreground">
                Puedes borrarla sin afectar a tu web.
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-4">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Metadatos
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Nombre</Label>
          <Input
            data-testid="photo-edit-name"
            value={edit.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEdit({ ...edit, name: e.target.value })
            }
            className="h-10 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Categoría</Label>
          <select
            data-testid="photo-edit-category"
            value={edit.category}
            onChange={(e) =>
              setEdit({ ...edit, category: e.target.value as PhotoCategory })
            }
            className="h-10 rounded-md border border-input bg-background px-3 text-sm font-semibold"
          >
            {(Object.keys(PHOTO_CATEGORY_LABELS) as PhotoCategory[]).map((c) => (
              <option key={c} value={c}>
                {PHOTO_CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Texto alternativo (SEO)</Label>
          <Textarea
            data-testid="photo-edit-alt"
            value={edit.alt}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setEdit({ ...edit, alt: e.target.value })
            }
            rows={2}
            className="rounded-md"
          />
          <p className="text-[11px] text-muted-foreground">
            Describe la foto en una frase corta. Ayuda al SEO y a la accesibilidad.
          </p>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2 border-t border-border pt-4">
        <Button
          data-testid="photo-save"
          onClick={save}
          className="h-10 flex-1 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Save" className="h-4 w-4" />
          Guardar
        </Button>
        <Button
          variant="outline"
          data-testid="photo-delete"
          onClick={handleRemove}
          disabled={used}
          className={cn(
            "h-10 gap-2 rounded-xl font-bold",
            !used && "text-destructive hover:bg-destructive/10",
          )}
          title={used ? "No puedes borrar una foto que está en uso." : "Eliminar"}
        >
          <Icon name="Trash2" className="h-4 w-4" />
          Eliminar
        </Button>
      </div>
    </div>
  );
}

export default function BibliotecaPage() {
  const { photos, selectedId, select, add } = useBibliotecaStore();
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState<(typeof CATS)[number]["value"]>("todas");
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return photos.filter((p) => {
      const matchQ = !q || p.name.toLowerCase().includes(q) || p.alt.toLowerCase().includes(q);
      const matchC = cat === "todas" || p.category === cat;
      return matchQ && matchC;
    });
  }, [photos, search, cat]);

  const selected = photos.find((p) => p.id === selectedId) ?? filtered[0] ?? null;

  const handleUpload = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    add({
      id: `ph-${Date.now()}`,
      url,
      name: file.name.replace(/\.[^.]+$/, ""),
      category: "obras",
      alt: "",
      uploadedAt: new Date().toISOString().slice(0, 10),
      usages: [],
    });
    toast.success("Foto subida");
  };

  return (
    <div data-testid="page-biblioteca" className="flex flex-col gap-6">
      {/* Cabecera */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-extrabold tracking-tight">
              Biblioteca de fotos
            </h2>
            <span className="text-lg font-semibold text-muted-foreground">
              ({filtered.length})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Todas tus imágenes en un único sitio. Sabrás siempre dónde se usa cada una.
          </p>
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            handleUpload(e.target.files?.[0] ?? null);
            if (fileRef.current) fileRef.current.value = "";
          }}
        />
        <Button
          data-testid="bib-upload"
          onClick={() => fileRef.current?.click()}
          className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Upload" className="h-4 w-4" />
          Subir foto
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[240px] flex-1">
          <Icon
            name="Search"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            data-testid="bib-search"
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Buscar fotos…"
            className="h-10 rounded-full pl-9"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              data-testid="bib-filter"
              className={cn(
                "h-10 gap-2 rounded-full font-semibold",
                cat !== "todas" && "border-primary/40 bg-primary/5 text-primary",
              )}
            >
              <Icon name="Filter" className="h-4 w-4" />
              {CATS.find((c) => c.value === cat)?.label ?? "Categoría"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            {CATS.map((c) => (
              <DropdownMenuItem
                key={c.value}
                onClick={() => setCat(c.value)}
                className={cn(
                  cat === c.value && "bg-accent font-bold text-accent-foreground",
                )}
              >
                {c.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Layout 2 col: grid + detalle */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_440px]">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center text-sm text-muted-foreground">
            No hay fotos con esos filtros.
          </div>
        ) : (
          <div
            data-testid="bib-grid"
            className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((p) => (
              <PhotoTile
                key={p.id}
                photo={p}
                active={selected?.id === p.id}
                onClick={() => select(p.id)}
              />
            ))}
          </div>
        )}

        {selected ? (
          <PhotoDetail key={selected.id} photo={selected} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
            Selecciona una foto para ver dónde se usa y editar sus datos.
          </div>
        )}
      </div>
    </div>
  );
}
