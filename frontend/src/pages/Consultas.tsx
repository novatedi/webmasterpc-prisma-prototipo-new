import { useMemo, useState } from "react";
import { useConsultasStore } from "@/stores/consultas-store";
import { KpiCard } from "@/components/shared/KpiCard";
import { InitialsAvatar } from "@/components/shared/InitialsAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { CONSULTAS } from "@/constants/testIds";
import { toast } from "sonner";
import type {
  Consulta,
  ConsultaStatus,
} from "@/lib/data/consultas-resenas";

const FILTERS: { value: "todos" | ConsultaStatus; label: string }[] = [
  { value: "todos", label: "Todas" },
  { value: "nueva", label: "Nuevas" },
  { value: "pendiente", label: "Pendientes" },
  { value: "respondida", label: "Respondidas" },
  { value: "spam", label: "Spam" },
  { value: "archivada", label: "Archivadas" },
];

const STATUS_BADGE: Record<ConsultaStatus, { label: string; cls: string }> = {
  nueva: {
    label: "Nueva",
    cls: "bg-primary/10 text-primary",
  },
  pendiente: {
    label: "Pendiente",
    cls: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
  },
  respondida: {
    label: "Respondida",
    cls: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
  },
  spam: {
    label: "Spam",
    cls: "bg-muted text-muted-foreground",
  },
  archivada: {
    label: "Archivada",
    cls: "bg-muted text-muted-foreground",
  },
};

function formatWhen(iso: string) {
  const d = new Date(iso);
  const today = new Date();
  const sameDay =
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const isYesterday =
    d.getFullYear() === yesterday.getFullYear() &&
    d.getMonth() === yesterday.getMonth() &&
    d.getDate() === yesterday.getDate();

  const hh = d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
  if (sameDay) return `Hoy, ${hh}`;
  if (isYesterday) return `Ayer, ${hh}`;
  return d.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
  }) + ", " + hh;
}

function ConsultaRowItem({
  item,
  active,
  onClick,
}: {
  item: Consulta;
  active: boolean;
  onClick: () => void;
}) {
  const badge = STATUS_BADGE[item.status];
  return (
    <li>
      <button
        data-testid={CONSULTAS.row(item.id)}
        onClick={onClick}
        className={cn(
          "flex w-full items-start gap-3 border-l-2 px-4 py-4 text-left transition-colors",
          active
            ? "border-primary bg-primary/5"
            : "border-transparent hover:bg-accent/40",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full",
            !item.read ? "bg-primary" : "bg-transparent",
          )}
        />
        <InitialsAvatar name={item.name} size="md" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                "truncate text-sm",
                item.read ? "font-semibold text-foreground" : "font-extrabold text-foreground",
              )}
            >
              {item.name}
            </span>
            <span className="shrink-0 text-[11px] font-semibold text-muted-foreground">
              {formatWhen(item.receivedAt)}
            </span>
          </div>
          <div className="mt-0.5 truncate text-sm text-muted-foreground">
            {item.subject}
          </div>
          <div className="mt-2">
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                badge.cls,
              )}
            >
              {badge.label}
            </span>
          </div>
        </div>
      </button>
    </li>
  );
}

function ConsultaDetail({ item }: { item: Consulta }) {
  const { setStatus, remove, select } = useConsultasStore();

  return (
    <div
      data-testid={CONSULTAS.detail}
      className="flex h-full flex-col rounded-2xl border border-border bg-card shadow-soft-sm"
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-6 py-4">
        <button
          data-testid={CONSULTAS.backBtn}
          onClick={() => select(null)}
          className="flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary/80"
        >
          <Icon name="ArrowLeft" className="h-4 w-4" />
          Volver a la lista
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              data-testid={CONSULTAS.moreActions}
              className="h-9 gap-1.5 rounded-full font-semibold"
            >
              <Icon name="MoreVertical" className="h-4 w-4" />
              Más acciones
              <Icon name="ChevronDown" className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setStatus(item.id, "respondida");
                toast.success("Marcada como respondida");
              }}
            >
              <Icon name="CheckCircle2" className="mr-2 h-4 w-4" />
              Marcar como respondida
            </DropdownMenuItem>
            <DropdownMenuItem
              data-testid={CONSULTAS.spamBtn}
              onClick={() => {
                setStatus(item.id, "spam");
                toast.success("Marcada como spam");
              }}
            >
              <Icon name="Ban" className="mr-2 h-4 w-4" />
              Marcar como spam
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              data-testid={CONSULTAS.removeBtn}
              onClick={() => {
                remove(item.id);
                toast.success("Consulta eliminada");
              }}
              className="text-destructive focus:bg-destructive/10 focus:text-destructive"
            >
              <Icon name="Trash2" className="mr-2 h-4 w-4" />
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="flex items-start gap-4">
          <InitialsAvatar name={item.name} size="lg" />
          <div className="min-w-0">
            <div className="text-xl font-extrabold leading-tight">{item.name}</div>
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Icon name="Mail" className="h-3.5 w-3.5" />
                {item.email}
              </span>
              {item.phone && (
                <span className="flex items-center gap-1.5">
                  <Icon name="Phone" className="h-3.5 w-3.5" />
                  {item.phone}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="my-6 h-px bg-border" />

        <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Asunto
        </div>
        <h2 className="mt-1 text-lg font-extrabold tracking-tight">
          {item.subject}
        </h2>

        <div className="mt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Mensaje
        </div>
        <p className="mt-2 max-w-prose whitespace-pre-line text-sm leading-relaxed text-foreground/85">
          {item.body}
        </p>

        <div className="mt-8 flex items-center gap-2 text-xs text-muted-foreground">
          <Icon name="Calendar" className="h-3.5 w-3.5" />
          Recibido el{" "}
          {new Date(item.receivedAt).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          ,{" "}
          {new Date(item.receivedAt).toLocaleTimeString("es-ES", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-border bg-background/60 px-6 py-4">
        <Button
          data-testid={CONSULTAS.replyBtn}
          onClick={() => {
            setStatus(item.id, "respondida");
            toast.success("Marcada como respondida");
          }}
          className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="CornerUpLeft" className="h-4 w-4" />
          Responder
        </Button>
        <Button
          variant="outline"
          data-testid={CONSULTAS.pendingBtn}
          onClick={() => {
            setStatus(item.id, "pendiente");
            toast.message("Marcada como pendiente");
          }}
          className="h-11 gap-2 rounded-xl border-amber-500/40 px-5 font-bold text-amber-600 hover:bg-amber-500/10 dark:text-amber-400"
        >
          <Icon name="Clock" className="h-4 w-4" />
          Marcar como pendiente
        </Button>
        <Button
          variant="outline"
          data-testid={CONSULTAS.archiveBtn}
          onClick={() => {
            setStatus(item.id, "archivada");
            toast.success("Consulta archivada");
          }}
          className="h-11 gap-2 rounded-xl px-5 font-bold"
        >
          <Icon name="Archive" className="h-4 w-4" />
          Archivar
        </Button>
      </div>
    </div>
  );
}

export default function ConsultasPage() {
  const { items, selectedId, select } = useConsultasStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["value"]>(
    "todos",
  );

  const kpis = useMemo(() => {
    return {
      nuevas: items.filter((i) => i.status === "nueva").length,
      pendientes: items.filter((i) => i.status === "pendiente").length,
      respondidas: items.filter((i) => i.status === "respondida").length,
      spam: items.filter((i) => i.status === "spam").length,
    };
  }, [items]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((c) => {
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.subject.toLowerCase().includes(q) ||
        c.body.toLowerCase().includes(q);
      const matchF = filter === "todos" || c.status === filter;
      return matchQ && matchF;
    });
  }, [items, search, filter]);

  const selected = items.find((c) => c.id === selectedId) ?? filtered[0];

  return (
    <div data-testid={CONSULTAS.page} className="flex flex-col gap-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label="Nuevas"
          value={kpis.nuevas}
          icon="MessageCircle"
          tone="primary"
          testId={CONSULTAS.kpi("nuevas")}
        />
        <KpiCard
          label="Pendientes"
          value={kpis.pendientes}
          icon="Clock"
          tone="amber"
          testId={CONSULTAS.kpi("pendientes")}
        />
        <KpiCard
          label="Respondidas"
          value={kpis.respondidas}
          icon="CheckCircle2"
          tone="emerald"
          testId={CONSULTAS.kpi("respondidas")}
        />
        <KpiCard
          label="Spam"
          value={kpis.spam}
          icon="Ban"
          tone="muted"
          testId={CONSULTAS.kpi("spam")}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[440px_1fr]">
        {/* Lista */}
        <div
          data-testid={CONSULTAS.list}
          className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm"
        >
          <div className="flex items-center gap-2 border-b border-border p-3">
            <div className="relative flex-1">
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                data-testid={CONSULTAS.searchInput}
                value={search}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearch(e.target.value)
                }
                placeholder="Buscar consultas…"
                className="h-10 rounded-full border-transparent bg-background pl-9"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  data-testid={CONSULTAS.filterBtn}
                  className={cn(
                    "h-10 gap-2 rounded-full font-semibold",
                    filter !== "todos" && "border-primary/40 bg-primary/5 text-primary",
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
              No hay consultas con esos filtros.
            </div>
          ) : (
            <ul className="scrollbar-soft max-h-[700px] flex-1 divide-y divide-border/60 overflow-y-auto">
              {filtered.map((c) => (
                <ConsultaRowItem
                  key={c.id}
                  item={c}
                  active={selected?.id === c.id}
                  onClick={() => select(c.id)}
                />
              ))}
            </ul>
          )}

          <div className="flex items-center justify-between border-t border-border bg-background/40 px-4 py-3 text-xs text-muted-foreground">
            <span>
              Mostrando 1 a {filtered.length} de {items.length} consultas
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
          <ConsultaDetail item={selected} />
        ) : (
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center text-sm text-muted-foreground">
            Selecciona una consulta de la lista para verla en detalle.
          </div>
        )}
      </div>
    </div>
  );
}
