// Tipos y mock de la sección Ajustes.

import type { ID } from "./types";

export type DomainStatus = "publicado" | "configurando" | "no-conectado";

export interface AjustesIdentidad {
  brandName: string;
  logoUrl: string;
  faviconUrl: string;
  primaryColor: string; // hex
  fontFamily: string;
}

export interface AjustesDominio {
  domain: string;
  status: DomainStatus;
  ssl: boolean;
  redirectWww: boolean;
}

export interface AjustesGeneral {
  studioName: string;
  studioTagline: string;
  language: "es" | "ca" | "gl" | "en";
  timezone: string;
  email: string;
  defaultImage: string;
}

export interface AjustesData {
  identidad: AjustesIdentidad;
  dominio: AjustesDominio;
  general: AjustesGeneral;
}

export const PRIMARY_COLOR_PRESETS: { label: string; hex: string }[] = [
  { label: "Índigo (actual)", hex: "#4F46E5" },
  { label: "Carbón", hex: "#1F2937" },
  { label: "Bronce", hex: "#9A6B3F" },
  { label: "Verde musgo", hex: "#3D7A4C" },
  { label: "Rojo veneciano", hex: "#B43A2A" },
  { label: "Azul océano", hex: "#0F6EA8" },
  { label: "Ocre", hex: "#C58A2A" },
  { label: "Pizarra", hex: "#475569" },
];

export const FONT_CHOICES: { label: string; family: string; sample: string }[] = [
  {
    label: "Nunito (redondita y legible)",
    family: "Nunito",
    sample: "Aa Áá Éé Íí",
  },
  {
    label: "Inter (sobria y moderna)",
    family: "Inter",
    sample: "Aa Áá Éé Íí",
  },
  {
    label: "Manrope (geométrica)",
    family: "Manrope",
    sample: "Aa Áá Éé Íí",
  },
  {
    label: "Plus Jakarta Sans (premium)",
    family: "Plus Jakarta Sans",
    sample: "Aa Áá Éé Íí",
  },
  {
    label: "Quicksand (amable)",
    family: "Quicksand",
    sample: "Aa Áá Éé Íí",
  },
  {
    label: "Lora (con serifa, editorial)",
    family: "Lora",
    sample: "Aa Áá Éé Íí",
  },
];

export const ajustesSeed: AjustesData = {
  identidad: {
    brandName: "Maestro Carballo",
    logoUrl: "",
    faviconUrl: "",
    primaryColor: "#4F46E5",
    fontFamily: "Nunito",
  },
  dominio: {
    domain: "maestrocarballo.com",
    status: "publicado",
    ssl: true,
    redirectWww: true,
  },
  general: {
    studioName: "Taller Carballo · Escultor",
    studioTagline:
      "Escultor contemporáneo trabajando piedra, hierro y bronce desde 1985.",
    language: "es",
    timezone: "Europe/Madrid",
    email: "info@escultorcarballo.com",
    defaultImage:
      "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=1400&q=80&auto=format&fit=crop",
  },
};
