// Tipos base de la app. Esquemas placeholder pensados para portar a Next.js.
// Todos los datos viven en memoria; nada persiste.

export type ID = string;

export interface Branding {
  brandName: string;
  logoUrl?: string;
  primaryColor: string;
  ownerName: string;
  ownerRole: string;
  ownerAvatarUrl?: string;
}

export interface Category {
  id: ID;
  name: string;
  slug: string;
  description?: string;
}

export type WorkStatus = "publicada" | "borrador" | "archivada";

export interface Work {
  id: ID;
  title: string;
  coverUrl: string;
  categoryId?: ID;
  year?: number;
  material?: string;
  dimensions?: string;
  description?: string;
  status: WorkStatus;
  createdAt: string;
}

export interface CompanyBlock {
  id: ID;
  key: "historia" | "biografia" | "filosofia" | "contacto" | "redes";
  title: string;
  body: string;
  updatedAt: string;
}

export interface BlogPost {
  id: ID;
  title: string;
  excerpt: string;
  coverUrl?: string;
  status: "publicado" | "borrador";
  publishedAt?: string;
  author: string;
}

export type MessageStatus = "nuevo" | "leido" | "respondido";

export interface Message {
  id: ID;
  name: string;
  email: string;
  subject: string;
  body: string;
  receivedAt: string;
  status: MessageStatus;
}

export interface Review {
  id: ID;
  authorName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  receivedAt: string;
  approved: boolean;
}

export interface VisitorStat {
  day: string; // ISO date
  visitors: number;
  pageviews: number;
}

export interface TopPage {
  path: string;
  title: string;
  views: number;
}

export interface QuickAction {
  id: ID;
  label: string;
  description: string;
  to: string;
  icon: string; // nombre lucide-react
}
