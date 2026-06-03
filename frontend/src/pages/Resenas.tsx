import { useMemo, useState } from "react";
import { useResenasStore } from "@/stores/resenas-store";
import { KpiCard } from "@/components/shared/KpiCard";
import { StarRating } from "@/components/shared/StarRating";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { RESENAS } from "@/constants/testIds";
import { toast } from "sonner";
import type {
  ResenaCompleta,
  ResenaStatus,
} from "@/lib/data/consultas-resenas";

const FILTERS: { value: "todas" | ResenaStatus | "destacadas"; label: string }[] = [
  { value: "todas", label: "Todas" },
  { value: "publicada", label: "Publicadas" },
  { value: "pendiente", label: "Pendientes" },
  { value: "destacadas", label: "Destacadas" },
  { value: "oculta", label: "Ocultas" },
];

const BADGE: Record<ResenaStatus, { label: string; cls: string }> = {
  publicada: {
    label: "Publicada",
    cls: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  pendiente: {
    label: "Pendiente",
    cls: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  oculta: {
    label: "Oculta",
    cls: "bg-muted text-muted-foreground",
  },
};

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function ResenaRowItem({
  item,
  active,
  onClick,
}: {
  item: ResenaCompleta;
  active: boolean;
  onClick: () => void;
}) {
  const badge = BADGE[item.status];
  return (
    <li>
      <button
        data-testid={RESENAS.row(item.id)}
        onClick={onClick}
        className={cn(
          "flex w-full items-start gap-3 border-l-2 px-4 py-4 text-left transition-colors",
          active
            ? "border-primary bg-primary/5"
            : "border-transparent hover:bg-accent/40",
        )}
      >
        <img
          src={item.authorPhotoUrl}
          alt={item.authorName}
          className="h-12 w-12 shrink-0 rounded-full object-cover"
          loading="lazy"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span className="truncate text-sm font-extrabold text-foreground">
              {item.authorName}
            </span>
            <span className="shrink-0 text-[11px] font-semibold text-muted-foreground">
              {formatDate(item.receivedAt)}
            </span>
          </div>
          <div className="mt-1">
            <StarRating value={item.rating} size={14} />
          </div>
          <div className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
            {item.text}
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                badge.cls,
              )}
            >
              {badge.label}
            </span>
            {item.featured && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                Destacada
              </span>
            )}
          </div>
        </div>
      </button>
    </li>
  );
}

function ActionTile({
  testId,
  icon,
  title,
  subtitle,
  active,
  tone,
  onClick,
}: {
  testId: string;
  icon: string;
  title: string;
  subtitle: string;
  active: boolean;
  tone: "primary" | "amber" | "rose";
  onClick: () => void;
}) {
  const map = {
    primary: {
      activeCls:
        "bg-primary text-primary-foreground border-primary shadow-soft",
      idleCls:
        "border-border bg-card text-primary hover:bg-primary/5",
    },
    amber: {
      activeCls:
        "bg-amber-500 text-white border-amber-500 shadow-soft",
      idleCls:
        "border-amber-500/40 bg-card text-amber-600 dark:text-amber-400 hover:bg-amber-500/10",
    },
    rose: {
      activeCls:
        "bg-rose-500 text-white border-rose-500 shadow-soft",
      idleCls:
        "border-rose-500/40 bg-card text-rose-600 dark:text-rose-400 hover:bg-rose-500/10",
    },
  }[tone];

  return (
    <button
      type="button"
      data-testid={testId}
      onClick={onClick}
      className={cn(
        "flex flex-1 items-center gap-3 rounded-xl border px-4 py-4 text-left transition-all",
        active ? map.activeCls : map.idleCls,
      )}
    >
      <Icon name={icon} className="h-5 w-5 shrink-0" strokeWidth={2} />
      <div className="min-w-0">
        <div className="text-sm font-extrabold">{title}</div>
        <div className="text-xs opacity-80">{subtitle}</div>
      </div>
    </button>
  );
}

function ResenaDetail({ item }: { item: ResenaCompleta }) {
  const { setStatus, toggleFeatured } = useResenasStore();
  const badge = BADGE[item.status];

  return (
    <div
      data-testid={RESENAS.detail}
      className="flex h-full flex-col rounded-2xl border border-border bg-card shadow-soft-sm"
    >
      <div className="flex items-start justify-between gap-4 border-b border-border p-6">
        <div className="flex items-start gap-4">
          <img
            src={item.authorPhotoUrl}
            alt={item.authorName}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div>
            <div className="text-xl font-extrabold leading-tight">
              {item.authorName}
            </div>
            <div className="mt-0.5 text-sm text-muted-foreground">
              {item.authorRole}
            </div>
            <div className="mt-2">
              <StarRating value={item.rating} size={20} />
            </div>
          </div>
        </div>
        <div className="text-right">
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
              badge.cls,
            )}
          >
            {badge.label}
          </span>
          <div className="mt-2 text-xs font-semibold text-muted-foreground">
            {formatDate(item.receivedAt)}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Reseña completa
        </div>
        <p className="mt-3 max-w-prose text-sm leading-relaxed text-foreground/85">
          {item.text}
        </p>

        {item.imageUrl && (
          <div className="mt-6 overflow-hidden rounded-2xl border border-border">
            <img
              src={item.imageUrl}
              alt=""
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        <div className="mt-8 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Acciones
        </div>
        <div className="mt-3 flex flex-col gap-3 sm:flex-row">
          <ActionTile
            testId={RESENAS.publishBtn}
            icon="Globe"
            title="Publicar"
            subtitle="Visible en tu web"
            tone="primary"
            active={item.status === "publicada"}
            onClick={() => {
              setStatus(item.id, "publicada");
              toast.success("Reseña publicada");
            }}
          />
          <ActionTile
            testId={RESENAS.featureBtn}
            icon="Star"
            title={item.featured ? "Quitar destacada" : "Destacar"}
            subtitle={item.featured ? "Ya no en portada" : "Mostrar en portada"}
            tone="amber"
            active={item.featured}
            onClick={() => {
              toggleFeatured(item.id);
              toast.success(
                item.featured ? "Ya no está destacada" : "Reseña destacada",
              );
            }}
          />
          <ActionTile
            testId={RESENAS.hideBtn}
            icon="EyeOff"
            title="Ocultar"
            subtitle="No visible"
            tone="rose"
            active={item.status === "oculta"}
            onClick={() => {
              setStatus(item.id, "oculta");
              toast.message("Reseña oculta");
            }}
          />
        </div>

        <p className="mt-5 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Info" className="h-3.5 w-3.5" />
          {item.status === "publicada"
            ? "Esta reseña será visible públicamente en tu sitio web."
            : item.status === "oculta"
              ? "Esta reseña permanece oculta. Solo tú puedes verla aquí."
              : "Esta reseña está pendiente de publicarse."}
        </p>
      </div>
    </div>
  );
}

export default function ResenasPage() {
  const { items, selectedId, select } = useResenasStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>("todas");

  const kpis = useMemo(() => {
    return {
      publicadas: items.filter((r) => r.status === "publicada").length,
      pendientes: items.filter((r) => r.status === "pendiente").length,
      destacadas: items.filter((r) => r.featured).length,
      ocultas: items.filter((r) => r.status === "oculta").length,
    };
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((r) => {
      const matchQ =
        !q ||
        r.authorName.toLowerCase().includes(q) ||
        r.text.toLowerCase().includes(q);
      const matchF =
        filter === "todas"
          ? true
          : filter === "destacadas"
            ? r.featured
            : r.status === filter;
      return matchQ && matchF;
    });
  }, [items, search, filter]);

  const selected = items.find((r) => r.id === selectedId) ?? filtered[0];

  return (
    <div data-testid={RESENAS.page} className="flex flex-col gap-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label="Publicadas"
          value={kpis.publicadas}
          icon="Star"
          tone="primary"
          hint="Visibles en tu web"
          testId={RESENAS.kpi("publicadas")}
        />
        <KpiCard
          label="Pendientes"
          value={kpis.pendientes}
          icon="Clock"
          tone="amber"
          hint="Esperando aprobación"
          testId={RESENAS.kpi("pendientes")}
        />
        <KpiCard
          label="Destacadas"
          value={kpis.destacadas}
          icon="Sparkles"
          tone="emerald"
          hint="En portada"
          testId={RESENAS.kpi("destacadas")}
        />
        <KpiCard
          label="Ocultas"
          value={kpis.ocultas}
          icon="EyeOff"
          tone="muted"
          hint="No visibles"
          testId={RESENAS.kpi("ocultas")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[440px_1fr]">
        {/* Lista */}
        <div
          data-testid={RESENAS.list}
          className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm"
        >
          <div className="flex items-center gap-2 border-b border-border p-3">
            <div className="relative flex-1">
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                data-testid={RESENAS.searchInput}
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                placeholder="Buscar reseñas…"
                className="h-10 rounded-full border-transparent bg-background pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  data-testid={RESENAS.filterBtn}
                  className={cn(
                    "h-10 gap-2 rounded-full font-semibold",
                    filter !== "todas" && "border-primary/40 bg-primary/5 text-primary",
                  )}
                >
                  <Icon name="Filter" className="h-4 w-4" />
                  Filtrar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                {FILTERS.map((f) => (
                  <DropdownMenuItem
                    key={f.value}
                    onClick={() => setFilter(f.value)}
                    className={cn(
                      filter === f.value && "bg-accent font-bold text-accent-foreground",
                    )}
                  >
                    {f.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-1 items-center justify-center px-6 py-16 text-center text-sm text-muted-foreground">
              No hay reseñas con esos filtros.
            </div>
          ) : (
            <ul className="scrollbar-soft max-h-[760px] flex-1 divide-y divide-border/60 overflow-y-auto">
              {filtered.map((r) => (
                <ResenaRowItem
                  key={r.id}
                  item={r}
                  active={selected?.id === r.id}
                  onClick={() => select(r.id)}
                />
              ))}
            </ul>
          )}

          <div className="flex items-center justify-between border-t border-border bg-background/40 px-4 py-3 text-xs text-muted-foreground">
            <span>
              Mostrando 1 a {filtered.length} de {items.length} reseñas
            </span>
            <div className="flex items-center gap-1">
              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-accent">
                <Icon name="ChevronLeft" className="h-3.5 w-3.5" />
              </button>
              <span className="rounded-md bg-primary px-2.5 py-0.5 text-[11px] font-bold text-primary-foreground">
                1
              </span>
              <button className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground hover:bg-accent">
                <Icon name="ChevronRight" className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Detalle */}
        {selected ? (
          <ResenaDetail item={selected} />
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center text-sm text-muted-foreground">
            Selecciona una reseña para verla en detalle.
          </div>
        )}
      </div>
    </div>
  );
}
