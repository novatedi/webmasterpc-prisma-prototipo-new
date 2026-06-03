import type { ReactNode } from "react";
import { Icon } from "@/lib/icon";

interface Props {
  /** Header arriba con título de la subsección y descripción corta. */
  title: string;
  description: string;
  /** Pista visual de cómo se llama el bloque en la web pública. */
  previewLabel?: string;
  formNode: ReactNode;
  previewNode: ReactNode;
  testIdPage: string;
}

/**
 * Layout de dos paneles para todas las subsecciones de "La empresa".
 * Izquierda: formulario. Derecha: previsualización en vivo.
 */
export function EmpresaTwoPanel({
  title,
  description,
  previewLabel = "Cómo se ve en la web",
  formNode,
  previewNode,
  testIdPage,
}: Props) {
  return (
    <div data-testid={testIdPage} className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft-sm">
          <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            Edición
          </h3>
          <div className="flex flex-col gap-5">{formNode}</div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            <Icon name="Eye" className="h-3.5 w-3.5" />
            {previewLabel}
          </div>
          <div className="sticky top-4">{previewNode}</div>
        </div>
      </div>
    </div>
  );
}
