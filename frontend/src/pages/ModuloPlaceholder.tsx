import { useParams, useNavigate } from "react-router-dom";
import { findModule } from "@/lib/data/modules";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";

/** Placeholder genérico para módulos activados pero no implementados aún. */
export default function ModuloPlaceholder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const mod = findModule(id ?? "");

  return (
    <Card
      data-testid={`modulo-${id}`}
      className="mx-auto max-w-3xl rounded-2xl border-dashed border-border bg-card shadow-soft-sm"
    >
      <CardContent className="flex flex-col items-center gap-4 px-10 py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <Icon name={mod?.icon ?? "Square"} className="h-6 w-6" strokeWidth={2} />
        </span>
        <h3 className="text-xl font-extrabold tracking-tight text-foreground">
          {mod?.label ?? "Módulo"}
        </h3>
        <p className="max-w-md text-sm text-muted-foreground">
          {mod?.description ?? "Este módulo se está preparando."}
        </p>
        <p className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
          Próximamente — el módulo está activo en tu panel.
        </p>
        <Button
          variant="outline"
          onClick={() => navigate("/funciones")}
          className="mt-2 gap-2 rounded-xl font-bold"
        >
          <Icon name="ToggleRight" className="h-4 w-4" />
          Volver a Funciones
        </Button>
      </CardContent>
    </Card>
  );
}
