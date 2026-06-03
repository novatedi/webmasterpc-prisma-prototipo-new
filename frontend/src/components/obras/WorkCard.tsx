import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { useMaterialsStore } from "@/stores/materials-store";
import { useNavigate } from "react-router-dom";
import type { Work } from "@/lib/data/types";
import { OBRAS } from "@/constants/testIds";

interface Props {
  work: Work;
}

export function WorkCard({ work }: Props) {
  const materials = useMaterialsStore((s) => s.items);
  const navigate = useNavigate();

  const workMaterials = work.materialIds
    .map((mid) => materials.find((m) => m.id === mid))
    .filter(Boolean) as { name: string; id: string }[];

  return (
    <Card
      data-testid={OBRAS.workCard(work.id)}
      className="group flex flex-col overflow-hidden rounded-2xl border-border bg-card shadow-soft-sm transition-all hover:-translate-y-0.5 hover:shadow-soft"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <img
          src={work.coverUrl}
          alt={work.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
        />
        {work.status === "borrador" && (
          <span className="absolute left-3 top-3 rounded-full bg-foreground/85 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-background backdrop-blur-sm">
            Borrador
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-extrabold tracking-tight text-foreground">
            {work.title}
          </h3>
          <div className="mt-0.5 text-xs text-muted-foreground">
            {work.year ? `${work.year} · ` : ""}
            {work.dimensions ?? ""}
          </div>
        </div>

        {workMaterials.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {workMaterials.map((m) => (
              <span
                key={m.id}
                className={cn(
                  "rounded-full border border-border bg-background px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground",
                )}
              >
                {m.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            data-testid={OBRAS.workEditBtn(work.id)}
            onClick={() => navigate(`/obras/obra/${work.id}`)}
            className="h-9 flex-1 gap-1.5 rounded-lg font-semibold"
          >
            <Icon name="Pencil" className="h-3.5 w-3.5" />
            Editar
          </Button>
          <Button
            variant="outline"
            size="sm"
            data-testid={OBRAS.workViewBtn(work.id)}
            className="h-9 flex-1 gap-1.5 rounded-lg font-semibold"
          >
            <Icon name="Eye" className="h-3.5 w-3.5" />
            Ver
          </Button>
        </div>
      </div>
    </Card>
  );
}
