import { useParams, useNavigate } from "react-router-dom";
import { findZoneItem } from "@/lib/data/zones";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";

export default function ProximamentePage() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const item = itemId ? findZoneItem(itemId) : undefined;
  const label = item?.label ?? "Esta función";
  const icon = item?.icon ?? "Sparkles";

  return (
    <div
      data-testid="page-proximamente"
      className="flex min-h-[60vh] flex-col items-center justify-center gap-5 text-center"
    >
      <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
        <Icon name={icon} className="h-9 w-9" strokeWidth={1.6} />
      </span>
      <div>
        <div className="mb-2 inline-flex rounded-full bg-amber-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400">
          Próximamente
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight">{label}</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Estamos preparando esta sección. La activaremos en tu panel cuando
          esté lista; no tendrás que configurar nada.
        </p>
      </div>
      <Button onClick={() => navigate("/inicio")} className="rounded-lg font-bold">
        <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
        Volver al inicio
      </Button>
    </div>
  );
}
