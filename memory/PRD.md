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

## Implemented (P1/6 + P2/6 + P3/6 + P4/6 + P5/6) – 2026-02-12
- [x] **P1/6**: Shell + 2 temas + Inicio (dashboard).
- [x] **P2/6**: Obras (catálogo, categorías, materiales) + editor con preview en vivo.
- [x] **P3/6**: La empresa con 7 subsecciones + preview público en cada una.
- [x] **P4/6**: Servicios + Blog con editor de artículos y formato.
- [x] **P5/6**: Consultas (bandeja con 4 KPIs, lista filtrable, detalle con Responder/Pendiente/Archivar/Spam/Eliminar) y Reseñas (4 KPIs, lista con estrellas, detalle con 3 acciones grandes Publicar/Destacar/Ocultar).
- [x] Testing E2E: P1 9/9 · P2 38/38 · P3 81/81 · P4 25/25 · P5 16/16 — todos al 100%.

## Backlog (P0/P1/P2 para próximos prompts)

### P0 – Prompt 6
- **P6/6** – Sección **Ajustes** (perfil, marca, dominio) + pulido final.

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
