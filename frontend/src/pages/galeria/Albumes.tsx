import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGaleriaStore } from "@/stores/galeria-store";
import { albumCover } from "@/lib/data/galeria";
import type { GalleryAlbum } from "@/lib/data/galeria";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Icon } from "@/lib/icon";
import { toast } from "sonner";

function AlbumCard({
  album,
  onOpen,
}: {
  album: GalleryAlbum;
  onOpen: () => void;
}) {
  const cover = albumCover(album);
  const count = album.photos.length;
  return (
    <button
      type="button"
      data-testid={`album-card-${album.id}`}
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card text-left shadow-soft-sm transition-all hover:-translate-y-0.5 hover:border-primary hover:shadow-soft"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {cover ? (
          <img
            src={cover}
            alt={album.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Icon name="Image" className="h-10 w-10" />
          </div>
        )}
        <span className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
          <Icon name="Image" className="h-3.5 w-3.5" />
          {count}
        </span>
      </div>
      <div className="flex flex-col gap-1 p-4">
        <div className="truncate text-base font-extrabold tracking-tight">{album.title}</div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{album.description}</p>
      </div>
    </button>
  );
}

export default function GaleriaAlbumesPage() {
  const navigate = useNavigate();
  const { albums, addAlbum } = useGaleriaStore();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });

  const create = () => {
    const title = form.title.trim();
    if (!title) {
      toast.error("Ponle un nombre al álbum");
      return;
    }
    const id = `alb-${Date.now()}`;
    addAlbum({
      id,
      title,
      description: form.description.trim(),
      coverUrl: "",
      createdAt: new Date().toISOString().slice(0, 10),
      photos: [],
    });
    setOpen(false);
    setForm({ title: "", description: "" });
    toast.success("Álbum creado");
    navigate(`/galeria/album/${id}`);
  };

  return (
    <div data-testid="page-galeria" className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-extrabold tracking-tight">Álbumes</h2>
            <span className="text-lg font-semibold text-muted-foreground">
              ({albums.length})
            </span>
          </div>
        </div>
        <Button
          data-testid="album-create-btn"
          onClick={() => setOpen(true)}
          className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Plus" className="h-4 w-4" />
          Crear álbum
        </Button>
      </div>

      {albums.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center text-sm text-muted-foreground">
          Aún no tienes álbumes. Crea el primero para empezar.
        </div>
      ) : (
        <div
          data-testid="albums-grid"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {albums.map((a) => (
            <AlbumCard
              key={a.id}
              album={a}
              onOpen={() => navigate(`/galeria/album/${a.id}`)}
            />
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-testid="album-create-dialog">
          <DialogHeader>
            <DialogTitle>Crear álbum</DialogTitle>
            <DialogDescription>
              Dale un nombre a tu álbum. Después podrás añadir fotos.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1.5">
              <Label>Nombre del álbum</Label>
              <Input
                data-testid="album-title-input"
                value={form.title}
                autoFocus
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setForm({ ...form, title: e.target.value })
                }
                onKeyDown={(e) => e.key === "Enter" && create()}
                placeholder="Ej. Esculturas de hierro"
                className="h-10 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Descripción (opcional)</Label>
              <Textarea
                data-testid="album-desc-input"
                value={form.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={2}
                placeholder="Una frase corta sobre este álbum."
                className="rounded-md"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-xl font-semibold"
            >
              Cancelar
            </Button>
            <Button
              data-testid="album-create-confirm"
              onClick={create}
              className="rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90"
            >
              Crear y abrir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
