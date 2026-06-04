import { create } from "zustand";
import {
  paginasSeed,
  findDef,
  type Page,
  type PageSection,
  type PageSectionContent,
  type Background,
  type SectionKind,
} from "@/lib/data/paginas";
import type { ID } from "@/lib/data/types";

interface PaginasState {
  pages: Page[];
  getPage: (id: ID) => Page | undefined;
  getSection: (pageId: ID, sectionId: ID) => PageSection | undefined;
  // Páginas
  addPage: (name: string) => Page;
  renamePage: (id: ID, name: string) => void;
  togglePageVisible: (id: ID) => void;
  removePage: (id: ID) => void;
  reorderPages: (orderedIds: ID[]) => void;
  // Secciones
  addSection: (pageId: ID, kind: SectionKind) => PageSection | undefined;
  removeSection: (pageId: ID, sectionId: ID) => void;
  toggleSectionVisible: (pageId: ID, sectionId: ID) => void;
  reorderSections: (pageId: ID, orderedIds: ID[]) => void;
  setWidget: (pageId: ID, sectionId: ID, widgetId: string) => void;
  setBackground: (pageId: ID, sectionId: ID, bg: Background) => void;
  updateContent: (
    pageId: ID,
    sectionId: ID,
    patch: Partial<PageSectionContent>,
  ) => void;
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export const usePaginasStore = create<PaginasState>((set, get) => ({
  pages: [...paginasSeed],
  getPage: (id) => get().pages.find((p) => p.id === id),
  getSection: (pageId, sectionId) =>
    get().pages
      .find((p) => p.id === pageId)
      ?.sections.find((s) => s.id === sectionId),

  addPage: (name) => {
    const slug = "/" + slugify(name);
    const page: Page = {
      id: `p-${Date.now()}`,
      name: name.trim() || "Nueva página",
      slug,
      visible: true,
      sections: [],
    };
    set({ pages: [...get().pages, page] });
    return page;
  },
  renamePage: (id, name) =>
    set({
      pages: get().pages.map((p) =>
        p.id === id
          ? { ...p, name: name.trim() || p.name, slug: "/" + slugify(name) }
          : p,
      ),
    }),
  togglePageVisible: (id) =>
    set({
      pages: get().pages.map((p) =>
        p.id === id ? { ...p, visible: !p.visible } : p,
      ),
    }),
  removePage: (id) =>
    set({ pages: get().pages.filter((p) => p.id !== id) }),
  reorderPages: (orderedIds) => {
    const map = new Map(get().pages.map((p) => [p.id, p]));
    set({
      pages: orderedIds
        .map((id) => map.get(id))
        .filter(Boolean) as Page[],
    });
  },

  addSection: (pageId, kind) => {
    const def = findDef(kind);
    const widgetId = def.widgets[0].id;
    const sec: PageSection = {
      id: `s-${Date.now()}`,
      kind,
      widgetId,
      background: { type: "color", value: "#FFFFFF" },
      content: { title: def.label },
      visible: true,
    };
    set({
      pages: get().pages.map((p) =>
        p.id === pageId ? { ...p, sections: [...p.sections, sec] } : p,
      ),
    });
    return sec;
  },
  removeSection: (pageId, sectionId) =>
    set({
      pages: get().pages.map((p) =>
        p.id === pageId
          ? { ...p, sections: p.sections.filter((s) => s.id !== sectionId) }
          : p,
      ),
    }),
  toggleSectionVisible: (pageId, sectionId) =>
    set({
      pages: get().pages.map((p) =>
        p.id === pageId
          ? {
              ...p,
              sections: p.sections.map((s) =>
                s.id === sectionId ? { ...s, visible: !s.visible } : s,
              ),
            }
          : p,
      ),
    }),
  reorderSections: (pageId, orderedIds) =>
    set({
      pages: get().pages.map((p) => {
        if (p.id !== pageId) return p;
        const map = new Map(p.sections.map((s) => [s.id, s]));
        return {
          ...p,
          sections: orderedIds.map((id) => map.get(id)!).filter(Boolean),
        };
      }),
    }),
  setWidget: (pageId, sectionId, widgetId) =>
    set({
      pages: get().pages.map((p) =>
        p.id === pageId
          ? {
              ...p,
              sections: p.sections.map((s) =>
                s.id === sectionId ? { ...s, widgetId } : s,
              ),
            }
          : p,
      ),
    }),
  setBackground: (pageId, sectionId, bg) =>
    set({
      pages: get().pages.map((p) =>
        p.id === pageId
          ? {
              ...p,
              sections: p.sections.map((s) =>
                s.id === sectionId ? { ...s, background: bg } : s,
              ),
            }
          : p,
      ),
    }),
  updateContent: (pageId, sectionId, patch) =>
    set({
      pages: get().pages.map((p) =>
        p.id === pageId
          ? {
              ...p,
              sections: p.sections.map((s) =>
                s.id === sectionId
                  ? { ...s, content: { ...s.content, ...patch } }
                  : s,
              ),
            }
          : p,
      ),
    }),
}));
