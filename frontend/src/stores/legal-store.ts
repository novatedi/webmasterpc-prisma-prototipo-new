import { create } from "zustand";
import {
  type Fiscal,
  type Situacion,
  fiscalSeed,
  situacionSeed,
  COOKIE_TEXT_SEED,
  LEGAL_DOCS,
  generateDoc,
  generateFormsClause,
} from "@/lib/data/legal";

export type DocMode = "generate" | "own";

export interface DocState {
  mode: DocMode;
  content: string; // texto generado/editado
  ownContent: string; // texto propio pegado
}

interface LegalState {
  fiscal: Fiscal;
  situacion: Situacion;
  generated: boolean;
  published: boolean;
  publishedDocs: string[]; // ids publicados
  docs: Record<string, DocState>;
  cookieText: string;
  formsClause: string;

  setFiscal: (patch: Partial<Fiscal>) => void;
  toggleSituacion: (key: keyof Situacion) => void;
  generateAll: () => void;
  setDocMode: (id: string, mode: DocMode) => void;
  setDocContent: (id: string, content: string) => void;
  setOwnContent: (id: string, content: string) => void;
  setCookieText: (text: string) => void;
  setFormsClause: (text: string) => void;
  publish: () => void;
}

function emptyDocs(): Record<string, DocState> {
  const out: Record<string, DocState> = {};
  LEGAL_DOCS.forEach((d) => {
    out[d.id] = { mode: "generate", content: "", ownContent: "" };
  });
  return out;
}

/** Documento "completo" si su modo activo tiene texto. */
export function docStatus(d: DocState): "completo" | "pendiente" {
  const text = d.mode === "own" ? d.ownContent : d.content;
  return text.trim().length > 0 ? "completo" : "pendiente";
}

export const useLegalStore = create<LegalState>((set, get) => ({
  fiscal: { ...fiscalSeed },
  situacion: { ...situacionSeed },
  generated: false,
  published: false,
  publishedDocs: [],
  docs: emptyDocs(),
  cookieText: COOKIE_TEXT_SEED,
  formsClause: "",

  setFiscal: (patch) => set((s) => ({ fiscal: { ...s.fiscal, ...patch } })),

  toggleSituacion: (key) =>
    set((s) => ({ situacion: { ...s.situacion, [key]: !s.situacion[key] } })),

  generateAll: () => {
    const { fiscal, situacion, docs } = get();
    const next: Record<string, DocState> = { ...docs };
    LEGAL_DOCS.forEach((d) => {
      const applies = d.always || situacion.ventaOnline;
      if (applies) {
        next[d.id] = {
          ...next[d.id],
          content: generateDoc(d.id, fiscal, situacion),
        };
      }
    });
    set({
      docs: next,
      generated: true,
      formsClause: generateFormsClause(fiscal),
    });
  },

  setDocMode: (id, mode) =>
    set((s) => ({ docs: { ...s.docs, [id]: { ...s.docs[id], mode } } })),

  setDocContent: (id, content) =>
    set((s) => ({ docs: { ...s.docs, [id]: { ...s.docs[id], content } } })),

  setOwnContent: (id, ownContent) =>
    set((s) => ({ docs: { ...s.docs, [id]: { ...s.docs[id], ownContent } } })),

  setCookieText: (cookieText) => set({ cookieText }),
  setFormsClause: (formsClause) => set({ formsClause }),

  publish: () => {
    const { situacion } = get();
    const ids = LEGAL_DOCS.filter(
      (d) => d.always || situacion.ventaOnline,
    ).map((d) => d.id);
    set({ published: true, publishedDocs: ids });
  },
}));
