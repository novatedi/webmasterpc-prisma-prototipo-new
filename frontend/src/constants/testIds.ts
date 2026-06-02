// data-testid centralizados para tests E2E.
export const SHELL = {
  app: "prisma-studio-app",
  sidebar: "sidebar",
  sidebarLogo: "sidebar-client-brand",
  sidebarFooterLogo: "sidebar-prisma-logo",
  sidebarSectionItem: (id: string) => `sidebar-section-${id}`,
  sidebarSubItem: (id: string) => `sidebar-subsection-${id}`,
  topbar: "topbar",
  topbarTitle: "topbar-title",
  themeToggle: "theme-toggle",
  notifications: "topbar-notifications",
  userAvatar: "topbar-user-avatar",
  contentTabs: "content-tabs",
};

export const HOME = {
  page: "page-inicio",
  visitorsCard: "card-visitantes",
  topPagesCard: "card-top-pages",
  quickActions: "card-quick-actions",
  quickActionItem: (id: string) => `quick-action-${id}`,
};

export const PAGES = {
  empresa: "page-empresa",
  servicios: "page-servicios",
  blog: "page-blog",
  obras: "page-obras",
  consultas: "page-consultas",
  resenas: "page-resenas",
  ajustes: "page-ajustes",
};
