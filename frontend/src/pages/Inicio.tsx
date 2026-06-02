import { useNavigate } from "react-router-dom";
import { visitorStats, topPages, quickActions } from "@/lib/data/stats";
import { branding } from "@/lib/data/branding";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/lib/icon";
import { HOME } from "@/constants/testIds";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function StatPill({
  label,
  value,
  delta,
  trend,
}: {
  label: string;
  value: string;
  delta: string;
  trend: "up" | "down";
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-3xl font-extrabold tracking-tight text-foreground">
          {value}
        </div>
        <div
          className={
            trend === "up"
              ? "flex items-center gap-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400"
              : "flex items-center gap-1 text-xs font-semibold text-rose-600 dark:text-rose-400"
          }
        >
          <Icon
            name={trend === "up" ? "TrendingUp" : "TrendingDown"}
            className="h-3.5 w-3.5"
          />
          {delta}
        </div>
      </div>
    </div>
  );
}

export default function InicioPage() {
  const navigate = useNavigate();

  const totalVisitors = visitorStats.reduce((acc, d) => acc + d.visitors, 0);
  const totalViews = visitorStats.reduce((acc, d) => acc + d.pageviews, 0);

  return (
    <div data-testid={HOME.page} className="flex flex-col gap-8">
      {/* Saludo */}
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          Hola, {branding.ownerName}.
        </h2>
        <p className="text-sm text-muted-foreground">
          Esto es lo que está pasando en tu web esta semana.
        </p>
      </div>

      {/* Stats rápidas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatPill
          label="Visitantes (7d)"
          value={totalVisitors.toLocaleString("es-ES")}
          delta="+18,4%"
          trend="up"
        />
        <StatPill
          label="Páginas vistas (7d)"
          value={totalViews.toLocaleString("es-ES")}
          delta="+12,1%"
          trend="up"
        />
        <StatPill
          label="Consultas nuevas"
          value="3"
          delta="+2"
          trend="up"
        />
        <StatPill
          label="Reseñas pendientes"
          value="1"
          delta="-1"
          trend="down"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Resumen visitantes */}
        <Card
          data-testid={HOME.visitorsCard}
          className="rounded-2xl border-border bg-card shadow-soft-sm lg:col-span-2"
        >
          <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
            <div>
              <CardTitle className="text-lg font-bold">
                Resumen de visitantes
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Últimos 7 días · datos de ejemplo
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              Visitantes
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={visitorStats}
                  margin={{ top: 10, right: 12, bottom: 0, left: -12 }}
                >
                  <defs>
                    <linearGradient id="grad-visitors" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="100%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                    width={40}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 12,
                      fontSize: 12,
                      color: "hsl(var(--popover-foreground))",
                    }}
                    cursor={{ stroke: "hsl(var(--primary))", strokeOpacity: 0.2 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="visitors"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2.5}
                    fill="url(#grad-visitors)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Páginas más vistas */}
        <Card
          data-testid={HOME.topPagesCard}
          className="rounded-2xl border-border bg-card shadow-soft-sm"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">Páginas más vistas</CardTitle>
            <p className="text-xs text-muted-foreground">Top 5 esta semana</p>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col">
              {topPages.map((p, i) => (
                <li
                  key={p.path}
                  className="flex items-center justify-between gap-3 border-b border-border/70 py-3 last:border-b-0"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-foreground">
                        {p.title}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {p.path}
                      </div>
                    </div>
                  </div>
                  <div className="shrink-0 text-sm font-bold text-foreground">
                    {p.views.toLocaleString("es-ES")}
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Acciones rápidas */}
      <Card
        data-testid={HOME.quickActions}
        className="rounded-2xl border-border bg-card shadow-soft-sm"
      >
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-bold">Accesos rápidos</CardTitle>
          <p className="text-xs text-muted-foreground">
            Lo que harías ahora mismo
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((a) => (
              <button
                key={a.id}
                data-testid={HOME.quickActionItem(a.id)}
                onClick={() => navigate(a.to)}
                className="group flex flex-col items-start gap-3 rounded-xl border border-border bg-background p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon name={a.icon} className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <div className="text-sm font-bold text-foreground">
                    {a.label}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {a.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
