import { useTopbarActions } from "@/stores/topbar-actions-store";
import { SHELL } from "@/constants/testIds";

/**
 * Barra de acciones de la página activa (p. ej. "Vista previa" + "Publicar").
 * El título de cada pantalla lo renderiza su propia página, por lo que esta
 * barra solo aparece cuando hay acciones inyectadas.
 */
export function Topbar() {
  const injectedActions = useTopbarActions((s) => s.node);
  if (!injectedActions) return null;

  return (
    <header
      data-testid={SHELL.topbar}
      className="sticky top-0 z-30 flex items-center justify-end gap-3 border-b border-topbar-border bg-topbar/95 px-4 py-3 backdrop-blur sm:px-6 md:px-8"
    >
      <div className="flex shrink-0 items-center gap-3">{injectedActions}</div>
    </header>
  );
}
