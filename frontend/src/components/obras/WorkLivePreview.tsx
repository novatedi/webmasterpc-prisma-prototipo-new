import { Icon } from "@/lib/icon";
import { branding } from "@/lib/data/branding";
import { cn } from "@/lib/utils";
import type { Material, WorkImage } from "@/lib/data/types";
import { OBRAS } from "@/constants/testIds";

interface PreviewState {
  title: string;
  description: string;
  year: string;
  dimensions: string;
  materialIds: string[];
  images: WorkImage[];
}

interface Props {
  data: PreviewState;
  materials: Material[];
}

/**
 * Previsualización en vivo de la ficha pública de la obra.
 * Se actualiza al instante cuando el escultor edita en el formulario.
 */
export function WorkLivePreview({ data, materials }: Props) {
  const cover = data.images[0]?.url;
  const galleryThumbs = data.images.slice(1);
  const workMaterials = data.materialIds
    .map((id) => materials.find((m) => m.id === id))
    .filter(Boolean) as Material[];

  return (
    <div
      data-testid={OBRAS.preview}
      className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm"
    >
      {/* Cabecera tipo web pública */}
      <div className="flex items-center justify-between border-b border-border bg-background/60 px-5 py-3 text-xs">
        <div className="flex items-center gap-2 font-bold tracking-tight text-foreground">
          <span className="flex h-5 w-5 items-center justify-center rounded bg-foreground text-background">
            <span className="text-[9px] font-extrabold">A</span>
          </span>
          {branding.ownerName} · Escultor
        </div>
        <nav className="hidden gap-4 text-muted-foreground sm:flex">
          <span className="font-semibold">Inicio</span>
          <span className="font-semibold text-foreground">Obras</span>
          <span className="font-semibold">Sobre mí</span>
          <span className="font-semibold">Contacto</span>
        </nav>
      </div>

      <div className="px-6 py-7">
        {/* Hero */}
        <div className="overflow-hidden rounded-xl bg-muted">
          {cover ? (
            <img
              src={cover}
              alt={data.title}
              className="h-72 w-full object-cover transition-opacity"
            />
          ) : (
            <div className="flex h-72 w-full items-center justify-center text-muted-foreground">
              <Icon name="Image" className="h-10 w-10 opacity-50" />
            </div>
          )}
        </div>

        {/* Metadatos */}
        <div className="mt-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            {data.title || "Sin título"}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {data.year && (
              <span className="font-semibold text-foreground">{data.year}</span>
            )}
            {data.dimensions && (
              <>
                <span>·</span>
                <span>{data.dimensions}</span>
              </>
            )}
          </div>

          {workMaterials.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {workMaterials.map((m) => (
                <span
                  key={m.id}
                  className="rounded-full border border-border bg-background px-3 py-1 text-xs font-bold text-foreground"
                >
                  {m.name}
                </span>
              ))}
            </div>
          )}

          {data.description && (
            <p className="mt-5 max-w-prose whitespace-pre-line text-sm leading-relaxed text-foreground/85">
              {data.description}
            </p>
          )}
        </div>

        {/* Galería de miniaturas */}
        {galleryThumbs.length > 0 && (
          <div className="mt-7">
            <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Galería
            </div>
            <div className="flex flex-wrap gap-2">
              {galleryThumbs.map((img) => (
                <div
                  key={img.id}
                  className={cn(
                    "h-20 w-20 overflow-hidden rounded-lg border border-border bg-muted",
                  )}
                >
                  <img src={img.url} alt="" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
