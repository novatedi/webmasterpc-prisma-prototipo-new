import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useArticlesStore } from "@/stores/articles-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { BLOG } from "@/constants/testIds";
import { toast } from "sonner";

const STATUS_FILTERS = [
  { value: "todos", label: "Todos" },
  { value: "publicado", label: "Publicados" },
  { value: "borrador", label: "Borradores" },
] as const;

function formatDate(iso: string) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function BlogArticulos() {
  const navigate = useNavigate();
  const items = useArticlesStore((s) => s.items);
  const remove = useArticlesStore((s) => s.remove);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<(typeof STATUS_FILTERS)[number]["value"]>(
    "todos",
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((a) => {
      const matchQ = !q || a.title.toLowerCase().includes(q);
      const matchS = status === "todos" || a.status === status;
      return matchQ && matchS;
    });
  }, [items, search, status]);

  return (
    <div data-testid={BLOG.list} className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-3">
            <h2 className="text-xl font-extrabold tracking-tight">Artículos</h2>
            <span className="text-lg font-semibold text-muted-foreground">
              ({filtered.length})
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            Las entradas que cuentan el día a día del taller.
          </p>
        </div>
        <Button
          data-testid={BLOG.addBtn}
          onClick={() => navigate("/blog/articulo/nuevo")}
          className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Plus" className="h-4 w-4" />
          Nuevo artículo
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="relative min-w-[240px] flex-1">
          <Icon
            name="Search"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            data-testid={BLOG.searchInput}
            value={search}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
            placeholder="Buscar artículos…"
            className="h-10 rounded-full pl-9"
          />
        </div>
        <div
          data-testid={BLOG.filterStatus}
          className="flex items-center gap-1 rounded-full border border-border bg-card p-1"
        >
          {STATUS_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setStatus(f.value)}
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-bold transition-colors",
                status === f.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card px-8 py-16 text-center text-sm text-muted-foreground">
          No hay artículos con esos filtros.
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-background/50">
              <tr>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Artículo
                </th>
                <th className="hidden px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground sm:table-cell">
                  Fecha
                </th>
                <th className="px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Estado
                </th>
                <th className="w-44 px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr
                  key={a.id}
                  data-testid={BLOG.row(a.id)}
                  className="border-b border-border/60 transition-colors last:border-b-0 hover:bg-accent/30"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
                        {a.coverUrl && (
                          <img
                            src={a.coverUrl}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="truncate text-sm font-extrabold">
                          {a.title}
                        </div>
                        <div className="truncate text-xs text-muted-foreground">
                          {a.excerpt}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="hidden whitespace-nowrap px-5 py-4 text-sm text-muted-foreground sm:table-cell">
                    {formatDate(a.publishedAt)}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={cn(
                        "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        a.status === "publicado"
                          ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-700 dark:text-amber-400",
                      )}
                    >
                      {a.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        data-testid={BLOG.rowEdit(a.id)}
                        onClick={() => navigate(`/blog/articulo/${a.id}`)}
                        className="h-9 gap-1.5 rounded-md font-semibold"
                      >
                        <Icon name="Pencil" className="h-3.5 w-3.5" />
                        Editar
                      </Button>
                      <button
                        type="button"
                        data-testid={BLOG.rowDelete(a.id)}
                        onClick={() => {
                          remove(a.id);
                          toast.success("Artículo eliminado");
                        }}
                        aria-label="Eliminar"
                        className="flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Icon name="Trash2" className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
