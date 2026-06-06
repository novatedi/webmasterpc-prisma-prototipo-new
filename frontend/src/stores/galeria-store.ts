import { create } from "zustand";
import { albumsSeed, type GalleryAlbum, type GalleryPhoto } from "@/lib/data/galeria";
import type { ID } from "@/lib/data/types";

interface GaleriaState {
  albums: GalleryAlbum[];
  selectedPhotoId: ID | null;
  selectPhoto: (id: ID | null) => void;
  addAlbum: (a: GalleryAlbum) => void;
  updateAlbum: (id: ID, patch: Partial<GalleryAlbum>) => void;
  removeAlbum: (id: ID) => void;
  addPhoto: (albumId: ID, photo: GalleryPhoto) => void;
  updatePhoto: (albumId: ID, photoId: ID, patch: Partial<GalleryPhoto>) => void;
  removePhoto: (albumId: ID, photoId: ID) => void;
}

const mapAlbum = (
  albums: GalleryAlbum[],
  albumId: ID,
  fn: (a: GalleryAlbum) => GalleryAlbum,
) => albums.map((a) => (a.id === albumId ? fn(a) : a));

export const useGaleriaStore = create<GaleriaState>((set, get) => ({
  albums: [...albumsSeed],
  selectedPhotoId: null,
  selectPhoto: (id) => set({ selectedPhotoId: id }),
  addAlbum: (a) => set({ albums: [a, ...get().albums] }),
  updateAlbum: (id, patch) =>
    set({ albums: mapAlbum(get().albums, id, (a) => ({ ...a, ...patch })) }),
  removeAlbum: (id) => set({ albums: get().albums.filter((a) => a.id !== id) }),
  addPhoto: (albumId, photo) =>
    set({
      albums: mapAlbum(get().albums, albumId, (a) => ({
        ...a,
        photos: [photo, ...a.photos],
      })),
      selectedPhotoId: photo.id,
    }),
  updatePhoto: (albumId, photoId, patch) =>
    set({
      albums: mapAlbum(get().albums, albumId, (a) => ({
        ...a,
        photos: a.photos.map((p) => (p.id === photoId ? { ...p, ...patch } : p)),
      })),
    }),
  removePhoto: (albumId, photoId) =>
    set({
      albums: mapAlbum(get().albums, albumId, (a) => ({
        ...a,
        photos: a.photos.filter((p) => p.id !== photoId),
      })),
      selectedPhotoId: get().selectedPhotoId === photoId ? null : get().selectedPhotoId,
    }),
}));
