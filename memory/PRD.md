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

## Implemented (TODA LA APP – P1–P6 + Páginas) – 2026-02-12
- [x] **P1/6**: Shell + 2 temas + Inicio (dashboard).
- [x] **P2/6**: Obras (catálogo, categorías, materiales) + editor con preview en vivo.
- [x] **P3/6**: La empresa con 7 subsecciones + preview público en cada una.
- [x] **P4/6**: Servicios + Blog con editor y formato.
- [x] **P5/6**: Consultas + Reseñas con KPIs y acciones.
- [x] **P6/6**: Ajustes (Identidad, Dominio, General) + sidebar móvil + dark mode coherente.
- [x] **Páginas** (extra): compositor con modelo Página→Secciones→Widget. Lista de páginas con drag, editor con bandas (widget picker + background picker + edit content), catálogo de 16 secciones prediseñadas en 5 categorías, editor de sección 2-paneles con preview live.
- [x] Testing E2E: P1 9/9 · P2 38/38 · P3 81/81 · P4 25/25 · P5 16/16 · P6 100% · Páginas 100% (tras 1 fix).

## Implemented (extras) – 2026-06-04
- [x] **Mantenimiento** (Ajustes): editor 2-paneles + pantalla pública "Volvemos pronto" (verificado por usuario).
- [x] **Analíticas & Métricas** (módulo activable, marketing): solo lectura, datos mock por rango (7/30/90 días).
  - Selector de rango, 4 KPIs (visitas únicas, páginas vistas +18%, tiempo medio 2m 25s, rebote 38%).
  - AreaChart "Tráfico y navegación" (visitantes vs obras vistas).
  - BarChart horizontal "Obras más populares".
  - Tabla "Páginas más vistas" (ruta + nombre + visitas + tiempo medio).
  - **Ampliación (2026-06-04):** tarjeta "Ciudades de origen" (lista con barras + %) y tarjeta "Buscadores IA / LLM Referrals" (ChatGPT, Perplexity, Gemini, Copilot, Claude con icono de marca, conteo de referidos y tendencia %). Datos por rango en `lib/data/analiticas.ts` (campos `cities`, `llm`).
- [x] **Textos Legales & Privacidad** (módulo activable, ruta `/legal`) – 2026-06-04. Generador condicional RGPD+LSSI (España), 100% mock:
  - Asistente: datos fiscales (precargados escultor) + 5 casillas de situación (cookies analíticas, formulario, citas, newsletter, vende online) + "Generar documentos".
  - Documentos en pestañas, condicionales: 3 base (Aviso Legal, Privacidad, Cookies) + 3 si vende online (Condiciones, Devoluciones, Accesibilidad EAA). Paso 0 por doc (usar los míos / generar), editor de texto plano y estado Completo/Pendiente. Texto adaptado a datos+casillas.
  - Aviso permanente "Plantilla orientativa, NO asesoramiento legal".
  - Gestor de cookies: editor + previsualización de banner (Aceptar todo/Rechazar/Configurar) + panel por categorías (Necesarias bloqueada, Analíticas, Marketing).
  - Cláusula de formularios (consentimiento) con chips de enlace a contacto/citas/newsletter.
  - Publicar: lista de páginas legales publicadas (/aviso-legal, /privacidad, /cookies, etc.).
  - Archivos: `pages/Legal.tsx`, `stores/legal-store.ts`, `lib/data/legal.ts`, `components/legal/*`, testIds `LEGAL`. Testeado por testing_agent (12/13, sin errores de consola).
- [x] **Secciones** (módulo activable, ruta `/secciones`) – 2026-06-04. Catálogo + autoría role-gated (cliente/admin): cuadrícula con miniaturas por preset, buscador+filtros, detalle con presets interactivos, "añadir a una página", tabla de slots (solo lectura cliente / editable admin), diálogo crear sección, tarjeta del modelo (Slots vs Presets). 8 secciones seed. Archivos: `pages/Secciones.tsx`, `components/secciones/*`, `stores/secciones-store.ts`, `stores/role-store.ts`, `lib/data/secciones.ts`. Testeado (iteration_12, 100% tras fix de reactividad Zustand).
- [x] **Separación Identidad (Marketing) vs Ajustes** – 2026-06-06. `Identidad` pasa a página propia en `/identidad` (zona Marketing, sin pestañas). La zona Ajustes tiene "General y dominio" en `/ajustes/general` con pestañas **General + Dominio**. `Mantenimiento` ya no hereda esas pestañas (sección propia en navigation.ts antes de `ajustes`). `/ajustes/identidad` redirige a `/identidad`; `/ajustes` redirige a `/ajustes/general`. Archivos: `lib/navigation.ts`, `App.js`, `lib/data/zones.ts` (marketing→/identidad), `Topbar.tsx` (resolveMeta). Verificado por capturas. Eliminada la barra de zonas superior; las zonas se eligen con un **desplegable "ZONA ACTIVA"** dentro del sidebar (DropdownMenu, 7 zonas). El **título de la página** vuelve a la top bar (resuelto por ruta), en la misma línea que tema/notificaciones/perfil, a la derecha del logo. Eliminados encabezados duplicados en Inicio/Analíticas/Secciones/Legal. Arreglado: Empresa (título desaparecía) y Servicios (aparecía muy abajo). Sidebar colapsable intacto. Archivos: `Sidebar.tsx`, `Topbar.tsx` (resolveMeta), `AppShell.tsx` (ZonesBar eliminado), páginas Inicio/Analiticas/Secciones/Legal. Testeado (iteration_15, 100%). Barra unificada (zonas con subrayado a la izquierda + tema/ajustes/notificaciones/perfil a la derecha en el mismo nivel); logo "ClientBrand" movido a la sidebar. Sidebar **colapsable** (botón «Contraer», 260↔76px) y a **toda altura** (logo arriba del todo; la barra de zonas empieza a su derecha). Eliminada la barra de título global redundante (Topbar solo muestra acciones inyectadas). Dashboard de Inicio rediseñado: 5 KPIs, "Rendimiento de tu sitio" (chart + mini-stats), "Actividad reciente", "Páginas principales" (miniaturas), "Estado de tu sitio" (medidor 92%), "Acciones rápidas". Archivos: `ZonesBar.tsx`, `Sidebar.tsx`, `Topbar.tsx`, `AppShell.tsx`, `pages/Inicio.tsx`, `components/inicio/*`, `lib/data/dashboard.ts`. Testeado (iteration_14, 100%).
  - Archivos: `pages/Analiticas.tsx`, `lib/data/analiticas.ts`, ruta `/analiticas`, módulo en `modules.ts` con `to:/analiticas`, títulos en `Topbar.tsx`, testIds `ANALITICAS`.
- [x] **Galería** (zona Web, rutas `/galeria` y `/galeria/album/:albumId`) – 2026-06-06. Gestión de álbumes de fotos, 100% mock:
  - **Nivel 1 – Cuadrícula de álbumes** (`pages/galeria/Albumes.tsx`): grid de tarjetas (portada + título + descripción + contador de fotos), botón "Crear álbum" con diálogo (nombre + descripción). Al crear se navega directamente al detalle del álbum vacío (elección del usuario).
  - **Nivel 2 – Detalle del álbum** (`pages/galeria/AlbumDetalle.tsx`): patrón 2 paneles igual que Biblioteca — cuadrícula de fotos a la izquierda + panel de edición a la derecha. El panel muestra "Dónde se usa" (lista de usos con enlace a editar, o estado "sin usar"), metadatos (nombre + alt SEO) con Guardar, y Eliminar (deshabilitado si la foto está en uso). Gestión del álbum: renombrar (lápiz inline), añadir foto (file input → blob URL), eliminar álbum (AlertDialog) y botón volver.
  - Estado: `stores/galeria-store.ts` (álbumes + selectedPhotoId; CRUD de álbum y foto). Datos seed: 3 álbumes en `lib/data/galeria.ts` (reutiliza `PhotoUsage` de biblioteca). Activado `to:/galeria` en `zones.ts` y título en `Topbar.tsx`.
  - Testeado por testing_agent (iteration_17, frontend 100%, 7/7 flujos). Pendiente menor no bloqueante: revocar `URL.createObjectURL` al borrar fotos (riesgo leve de fuga de memoria en sesiones largas).
- [x] **Galería · Reordenar fotos + elegir portada** – 2026-06-06. Dentro del detalle del álbum: las fotos se reordenan por **arrastrar y soltar** (@dnd-kit, igual patrón que `ImageUploader` de Obras; asa `GripVertical` por tarjeta, `rectSortingStrategy`) y se puede **elegir la portada** del álbum (botón estrella en cada tarjeta + botón "Usar como portada" en el panel de detalle; badge "PORTADA"). Modelo: `GalleryAlbum.coverPhotoId` (prioridad sobre `coverUrl`), helper `albumCover` actualizado; store con `reorderPhotos` y `setCover`, y `removePhoto` limpia `coverPhotoId` si se borra la portada. Asa y estrella siempre visibles (descubribilidad táctil/edad). Testeado por testing_agent (iteration_18, frontend 100%, sin bugs).
- [x] **Obras y Blog · Doble vista (cuadrícula/lista) + reordenar arrastrando** – 2026-06-06. Ambas páginas (`/obras/catalogo` y `/blog/articulos`) tienen un **conmutador de vista** (componente `components/common/ViewToggle.tsx`, cuadrícula/lista) y permiten **reordenar por arrastrar y soltar** con asa (@dnd-kit; solo el asa arrastra, el clic sigue navegando). Obras: por defecto cuadrícula (`SortableWorkCard`) + lista nueva (`WorkRow`, estilo tarjeta-fila con miniatura/estado/materiales). Blog: lista por defecto (tabla con `<tr>` ordenable) + cuadrícula nueva de tarjetas (`ArticleCard`). El reordenado respeta filtros/búsqueda mediante `lib/reorder.ts` (`reorderWithinFiltered`: reordena el subconjunto visible y reconstruye el orden completo dejando en su sitio los ocultos). Stores `works-store`/`articles-store` con método `reorder(ids)`. Testeado por testing_agent (iteration_19, frontend 100%, 16/16 escenarios, incl. reordenar con filtro activo sin perder elementos ocultos).
- [x] **Login (solo visual / mock, sin auth real)** – 2026-06-06. Pantalla de inicio de sesión a pantalla completa (fuera del `AppShell`) en `/pages/Login.tsx`. Layout 2 columnas: izquierda foto de escultura (Pexels) con veladura y **logo Prisma centrado abajo** + tagline; derecha formulario **estrecho `max-w-sm`** con bloque de identidad (Alejandro Martínez · Escultor), "Bienvenido de nuevo", email (icono Mail), contraseña (icono Lock + ojo mostrar/ocultar), Recordarme + ¿Olvidaste tu contraseña?, botón "Iniciar sesión", divisor, "Contacta con tu administrador" y footer "Desarrollado por Novatedi". Modo claro/oscuro vía tokens. **Sin autenticación real**: al enviar navega a `/inicio`. Enrutado: la app **arranca en `/login`** (`/` redirige a `/login`); se eliminó el `index` del layout. Blueprint en `/app/design_guidelines.json`. Auto-testeado (submit→/inicio, `/`→/login, toggle de contraseña).

## Backlog (P0/P1/P2 para próximos prompts)

### Mejoras futuras (post-P6)
- Wizard de onboarding la primera vez que el escultor entra ("vamos juntos paso a paso, en 5 minutos").
- Búsqueda global (Cmd/Ctrl+K) que cruce obras, artículos, consultas y reseñas.
- Internacionalización ES/CA/GL/EN — la base ya está en el ajuste de idioma.
- Versión móvil de los editores con preview en cajón inferior (sheet) en lugar de columna lateral.

### P1
- Persistencia de operaciones en memoria coherente (Zustand stores por dominio).
- Animaciones de entrada y micro-interacciones en CTAs.
- Versión móvil (sidebar drawer).

### P2
- Internacionalización (ES/EN/CA).
- Modo "Vista previa de la web pública" desde dentro del editor.

## Next Tasks (immediate)
- Construir las páginas/homepages "Próximamente" de las zonas pendientes cuando el usuario lo pida:
  - IA: Asistente IA, Chatbot IA, AI Studio
  - Tienda Online: Catálogo, Pedidos, Formas de pago, Envíos, Certificados COA
  - Marketing: Redes Sociales, SEO, Newsletter, Calendario
  - Clientes: Suscriptores, Cita previa
  - Diseño: Temas, Efectos de Temporada
- Mejora opcional pendiente en Galería: revocar blob URLs al borrar fotos.
