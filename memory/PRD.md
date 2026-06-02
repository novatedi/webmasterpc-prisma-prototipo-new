# Prisma Studio – PRD

## Original Problem Statement
Construir **Prisma Studio**, panel admin frontend-only (sin backend, sin DB, sin login real)
para que un escultor (45-70 años, poca soltura digital) gestione su web profesional.
Estética sobria/premium, lenguaje natural, "publica tu web" no "deploy".

Lote dividido en 6 prompts. **Prompt 1/6 – Fundaciones: shell navegable + 2 temas**.

## Architecture (Prompt 1/6)
- **Stack**: React 19 + TypeScript + Tailwind + shadcn/ui + lucide-react + Zustand + react-router-dom.
- Solo frontend. Datos mock en `/app/frontend/src/lib/data/*.ts` con tipos.
- Estado global: tema (`stores/theme-store.ts`), sidebar acordeón (`stores/sidebar-store.ts`).
- Routing: `BrowserRouter` con shell en layout `AppShell` (Sidebar 260px + Topbar sticky + área de contenido con tabs).
- Persistencia: solo `localStorage` para preferencia de tema (key `prisma-studio.theme`).
- **Sin backend, sin Mongo, sin Pydantic, sin Stripe, sin auth real.**

## User Personas
- **Alejandro** (45-70 años, escultor) – usuario principal del panel. Quiere gestionar su web sin tener que aprender tecnología.

## Core Requirements (Static)
- Layout 3 zonas: Sidebar izquierda · Topbar · Contenido.
- Sidebar: logo cliente arriba, secciones en el centro (Inicio, La empresa, Servicios, Blog, Obras, Consultas, Reseñas, Ajustes), "Powered by Prisma STUDIO" abajo fijo.
- Subsecciones expuestas de forma sincronizada: acordeón en sidebar + tabs encima del contenido.
- Topbar: título dinámico + toggle tema + notificaciones + avatar usuario.
- Dos temas (claro/oscuro) con paleta exacta del prompt y acento índigo #4F46E5.
- Fuente Nunito (redondita, fácil lectura) por elección del usuario.
- Cero textos hardcodeados en JSX – todo desde data files (preparado para portar a Next.js).

## Implemented (P1/6) – 2026-02-12
- [x] Setup TypeScript (tsconfig + types) sobre la plantilla CRA.
- [x] Tokens de tema (light + dark) en `src/index.css` + Tailwind extendido.
- [x] Tipografía Nunito vía Google Fonts.
- [x] Tipos mock: `Work`, `Category`, `CompanyBlock`, `BlogPost`, `Message`, `Review`, `Branding`, `VisitorStat`, `TopPage`, `QuickAction`.
- [x] Mock data poblada con contenido realista para escultor (8 obras, 5 bloques de empresa, 3 posts, 3 consultas, 3 reseñas, 7 días de visitas).
- [x] Sidebar con secciones + subsecciones (acordeón + tabs sincronizados).
- [x] Topbar con título dinámico, toggle tema accesible, notificaciones (3) y avatar dropdown.
- [x] Página **Inicio** (dashboard): 4 KPIs, gráfico de visitantes (Recharts), top 5 páginas, 4 accesos rápidos.
- [x] Placeholder de secciones aún no construidas (componente reutilizable).
- [x] Toaster (sonner) integrado y temáticamente coherente.
- [x] `data-testid` en todos los elementos críticos (centralizados en `constants/testIds.ts`).
- [x] Testing E2E pasado al 100% (9/9 escenarios).

## Backlog (P0/P1/P2 para próximos prompts)

### P0 – Prompts 2-6
- **P2/6** – Sección **Obras** funcional: grid de cards, ficha/edición, categorías, subida de imágenes (mock).
- **P3/6** – Sección **La empresa** + **Ajustes**: edición de bloques (historia, biografía, etc.), branding (logo, colores).
- **P4/6** – Sección **Blog** + **Servicios**: editor de entradas, categorías, catálogo de servicios.
- **P5/6** – Sección **Consultas** + **Reseñas**: bandeja de mensajes, responder, moderación de reseñas.
- **P6/6** – Pulido final: notificaciones reales (sin backend, en memoria), onboarding, búsqueda global, accesibilidad y tour guiado.

### P1
- Persistencia de operaciones en memoria coherente (Zustand stores por dominio).
- Animaciones de entrada y micro-interacciones en CTAs.
- Versión móvil (sidebar drawer).

### P2
- Internacionalización (ES/EN/CA).
- Modo "Vista previa de la web pública" desde dentro del editor.

## Next Tasks (immediate)
- Esperar feedback del usuario sobre el shell.
- Cuando confirme, arrancar el **Prompt 2/6: Sección Obras**.
