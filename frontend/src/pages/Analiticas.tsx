import { useState } from "react";
import {
  ANALYTICS,
  RANGE_OPTIONS,
  type RangeKey,
} from "@/lib/data/analiticas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { ANALITICAS } from "@/constants/testIds";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const TONES: Record<
  string,
  { bg: string; fg: string }
> = {
  primary: { bg: "bg-primary/10", fg: "text-primary" },
  emerald: { bg: "bg-emerald-500/10", fg: "text-emerald-600 dark:text-emerald-400" },
  amber: { bg: "bg-amber-500/10", fg: "text-amber-600 dark:text-amber-400" },
  muted: { bg: "bg-muted", fg: "text-muted-foreground" },
};

const BAR_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--primary) / 0.78)",
  "hsl(var(--primary) / 0.6)",
  "hsl(var(--primary) / 0.45)",
  "hsl(var(--primary) / 0.32)",
];

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 12,
  fontSize: 12,
  color: "hsl(var(--popover-foreground))",
};

export default function AnaliticasPage() {
  const [range, setRange] = useState<RangeKey>("7d");
  const data = ANALYTICS[range];

  return (
    <div data-testid={ANALITICAS.page} className="flex flex-col gap-8">
      {/* Cabecera */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight">
            Analíticas &amp; Métricas
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Supervisa el rendimiento de tu web: visitas, obras más populares y
            tráfico.
          </p>
        </div>

        {/* Selector de rango */}
        <div
          data-testid={ANALITICAS.rangeSelector}
          className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-border bg-card p-1"
        >
          {RANGE_OPTIONS.map((r) => (
            <button
              key={r.key}
              data-testid={ANALITICAS.rangeOption(r.key)}
              onClick={() => setRange(r.key)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-xs font-bold transition-colors",
                range === r.key
                  ? "bg-primary text-primary-foreground shadow-soft-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPIs */}
      <div
        data-testid={ANALITICAS.kpis}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {data.kpis.map((k) => {
          const tone = TONES[k.tone];
          return (
            <div
              key={k.id}
              data-testid={ANALITICAS.kpi(k.id)}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft-sm"
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-full",
                    tone.bg,
                    tone.fg,
                  )}
                >
                  <Icon name={k.icon} className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <span
                  className={cn(
                    "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold",
                    k.trend === "up"
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      : "bg-rose-500/10 text-rose-600 dark:text-rose-400",
                  )}
                >
                  <Icon
                    name={k.trend === "up" ? "TrendingUp" : "TrendingDown"}
                    className="h-3.5 w-3.5"
                  />
                  {k.delta}
                </span>
              </div>
              <div className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">
                {k.value}
              </div>
              <div className="mt-1 text-sm font-semibold text-muted-foreground">
                {k.label}
              </div>
              <div className="mt-0.5 text-xs text-muted-foreground/80">
                {k.hint}
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráfico de área */}
      <Card
        data-testid={ANALITICAS.trafficChart}
        className="rounded-2xl border-border bg-card shadow-soft-sm"
      >
        <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
          <div>
            <CardTitle className="text-lg font-bold">
              Tráfico y navegación
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Visitantes únicos frente a páginas de obra vistas · datos de
              ejemplo
            </p>
          </div>
          <div className="flex flex-col gap-1 text-xs font-semibold text-muted-foreground sm:flex-row sm:gap-4">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-primary" />
              Visitantes
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" />
              Obras vistas
            </span>
          </div>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.traffic}
                margin={{ top: 10, right: 12, bottom: 0, left: -12 }}
              >
                <defs>
                  <linearGradient id="grad-visit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="grad-obras" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(160 84% 39%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(160 84% 39%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                  width={44}
                />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "hsl(var(--primary))", strokeOpacity: 0.2 }} />
                <Area
                  type="monotone"
                  dataKey="visitantes"
                  name="Visitantes"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2.5}
                  fill="url(#grad-visit)"
                />
                <Area
                  type="monotone"
                  dataKey="obras"
                  name="Obras vistas"
                  stroke="hsl(160 84% 39%)"
                  strokeWidth={2.5}
                  fill="url(#grad-obras)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        {/* Obras más populares */}
        <Card
          data-testid={ANALITICAS.worksChart}
          className="rounded-2xl border-border bg-card shadow-soft-sm lg:col-span-2"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">
              Obras más populares
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Visitas por obra en el periodo
            </p>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.works}
                  layout="vertical"
                  margin={{ top: 4, right: 16, bottom: 4, left: 8 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={140}
                    tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    cursor={{ fill: "hsl(var(--muted))", fillOpacity: 0.4 }}
                  />
                  <Bar dataKey="visitas" name="Visitas" radius={[0, 6, 6, 0]} barSize={22}>
                    {data.works.map((_, i) => (
                      <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Páginas más vistas */}
        <Card
          data-testid={ANALITICAS.pagesTable}
          className="rounded-2xl border-border bg-card shadow-soft-sm lg:col-span-3"
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">
              Páginas más vistas
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Las páginas que más miran tus visitantes
            </p>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3 font-bold">Página</th>
                    <th className="px-4 py-3 text-right font-bold">Visitas</th>
                    <th className="px-4 py-3 text-right font-bold">Tiempo medio</th>
                  </tr>
                </thead>
                <tbody>
                  {data.pages.map((p) => (
                    <tr
                      key={p.path}
                      data-testid={ANALITICAS.pageRow(p.path)}
                      className="border-t border-border/70"
                    >
                      <td className="px-4 py-3">
                        <div className="font-semibold text-foreground">
                          {p.name}
                        </div>
                        <div className="font-mono text-xs text-muted-foreground">
                          {p.path}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-bold text-foreground">
                        {p.visitas.toLocaleString("es-ES")}
                      </td>
                      <td className="px-4 py-3 text-right text-muted-foreground">
                        {p.tiempo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
