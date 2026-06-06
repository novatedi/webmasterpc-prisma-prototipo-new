import { useState, useRef } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useGaleriaStore } from "@/stores/galeria-store";
import type { GalleryPhoto } from "@/lib/data/galeria";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
  photo: GalleryPhoto;
  active: boolean;
  onClick: () => void;
}) {
  const usedCount = photo.usages.length;
  return (
    <button
      type="button"
      data-testid={`gphoto-tile-${photo.id}`}
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
        <div className="truncate text-sm font-extrabold">{photo.name}</div>
        <span
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

function PhotoDetail({ albumId, photo }: { albumId: string; photo: GalleryPhoto }) {
  const navigate = useNavigate();
  const { updatePhoto, removePhoto } = useGaleriaStore();
  const [edit, setEdit] = useState({ name: photo.name, alt: photo.alt });

  const save = () => {
    updatePhoto(albumId, photo.id, edit);
    toast.success("Cambios guardados");
  };
  const handleRemove = () => {
    removePhoto(albumId, photo.id);
    toast.success("Foto eliminada");
  };

  const used = photo.usages.length > 0;

  return (
    <div
      data-testid="gphoto-detail"
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
                data-testid={`gphoto-usage-row-${i}`}
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
                  data-testid={`gphoto-usage-edit-${i}`}
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
            data-testid="gphoto-unused"
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
            data-testid="gphoto-edit-name"
            value={edit.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEdit({ ...edit, name: e.target.value })
            }
            className="h-10 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Texto alternativo (SEO)</Label>
          <Textarea
            data-testid="gphoto-edit-alt"
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
          data-testid="gphoto-save"
          onClick={save}
          className="h-10 flex-1 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Save" className="h-4 w-4" />
          Guardar
        </Button>
        <Button
          variant="outline"
          data-testid="gphoto-delete"
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

export default function AlbumDetallePage() {
  const { albumId = "" } = useParams();
  const navigate = useNavigate();
  const { albums, selectedPhotoId, selectPhoto, addPhoto, updateAlbum, removeAlbum } =
    useGaleriaStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [renaming, setRenaming] = useState(false);
  const [albumForm, setAlbumForm] = useState({ title: "", description: "" });

  const album = albums.find((a) => a.id === albumId);
  if (!album) return <Navigate to="/galeria" replace />;

  const selected =
    album.photos.find((p) => p.id === selectedPhotoId) ?? album.photos[0] ?? null;

  const handleUpload = (file: File | null) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    addPhoto(album.id, {
      id: `gp-${Date.now()}`,
      url,
      name: file.name.replace(/\.[^.]+$/, ""),
      alt: "",
      usages: [],
    });
    toast.success("Foto añadida al álbum");
  };

  const startRename = () => {
    setAlbumForm({ title: album.title, description: album.description });
    setRenaming(true);
  };
  const saveRename = () => {
    if (!albumForm.title.trim()) {
      toast.error("El álbum necesita un nombre");
      return;
    }
    updateAlbum(album.id, {
      title: albumForm.title.trim(),
      description: albumForm.description.trim(),
    });
    setRenaming(false);
    toast.success("Álbum actualizado");
  };

  return (
    <div data-testid="page-album-detalle" className="flex flex-col gap-6">
      <button
        type="button"
        data-testid="album-back-btn"
        onClick={() => navigate("/galeria")}
        className="flex w-fit items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        <Icon name="ChevronLeft" className="h-4 w-4" />
        Volver a álbumes
      </button>

      <div className="flex flex-wrap items-end justify-between gap-3">
        {renaming ? (
          <div className="flex w-full max-w-xl flex-col gap-2">
            <Input
              data-testid="album-rename-title"
              value={albumForm.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAlbumForm({ ...albumForm, title: e.target.value })
              }
              className="h-11 rounded-md text-lg font-extrabold"
            />
            <Textarea
              data-testid="album-rename-desc"
              value={albumForm.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setAlbumForm({ ...albumForm, description: e.target.value })
              }
              rows={2}
              className="rounded-md"
            />
            <div className="flex gap-2">
              <Button
                data-testid="album-rename-save"
                onClick={saveRename}
                className="h-9 rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90"
              >
                Guardar
              </Button>
              <Button
                variant="outline"
                onClick={() => setRenaming(false)}
                className="h-9 rounded-xl font-semibold"
              >
                Cancelar
              </Button>
            </div>
          </div>
        ) : (
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <h2 className="truncate text-xl font-extrabold tracking-tight">
                {album.title}
              </h2>
              <span className="text-lg font-semibold text-muted-foreground">
                ({album.photos.length})
              </span>
              <button
                type="button"
                data-testid="album-rename-btn"
                onClick={startRename}
                aria-label="Editar álbum"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                <Icon name="Pencil" className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{album.description}</p>
          </div>
        )}

        <div className="flex items-center gap-2">
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
            data-testid="album-add-photo"
            onClick={() => fileRef.current?.click()}
            className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
          >
            <Icon name="Upload" className="h-4 w-4" />
            Añadir foto
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                data-testid="album-delete-btn"
                className="h-11 gap-2 rounded-xl font-bold text-destructive hover:bg-destructive/10"
              >
                <Icon name="Trash2" className="h-4 w-4" />
                Eliminar
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent data-testid="album-delete-dialog">
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar este álbum?</AlertDialogTitle>
                <AlertDialogDescription>
                  Se eliminará «{album.title}» y sus {album.photos.length} fotos del álbum.
                  Esta acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  data-testid="album-delete-confirm"
                  onClick={() => {
                    removeAlbum(album.id);
                    toast.success("Álbum eliminado");
                    navigate("/galeria");
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_440px]">
        {album.photos.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center text-sm text-muted-foreground">
            Este álbum está vacío. Añade tu primera foto.
          </div>
        ) : (
          <div
            data-testid="album-photos-grid"
            className="grid h-fit grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4"
          >
            {album.photos.map((p) => (
              <PhotoTile
                key={p.id}
                photo={p}
                active={selected?.id === p.id}
                onClick={() => selectPhoto(p.id)}
              />
            ))}
          </div>
        )}

        {selected ? (
          <PhotoDetail key={selected.id} albumId={album.id} photo={selected} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-12 text-center text-sm text-muted-foreground">
            Añade una foto y selecciónala para editar sus datos.
          </div>
        )}
      </div>
    </div>
  );
}
