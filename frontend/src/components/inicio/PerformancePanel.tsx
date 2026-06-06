import { perfSeries, perfMiniStats } from "@/lib/data/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
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

export function PerformancePanel() {
  return (
    <Card
      data-testid={HOME.performanceCard}
      className="rounded-2xl border-border bg-card shadow-soft-sm"
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
        <CardTitle className="text-lg font-bold">Rendimiento de tu sitio</CardTitle>
        <span className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-muted-foreground">
          Últimos 30 días
          <Icon name="ChevronDown" className="h-3.5 w-3.5" />
        </span>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={perfSeries} margin={{ top: 10, right: 8, bottom: 0, left: -16 }}>
              <defs>
                <linearGradient id="grad-perf" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="label" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} interval={1} />
              <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} axisLine={false} tickLine={false} width={44} />
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
              <Area type="monotone" dataKey="value" name="Visitas" stroke="hsl(var(--primary))" strokeWidth={2.5} fill="url(#grad-perf)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {perfMiniStats.map((m) => (
            <div key={m.label} className="rounded-xl border border-border bg-background p-3">
              <div className="text-xs text-muted-foreground">{m.label}</div>
              <div className="mt-1 text-xl font-extrabold tracking-tight text-foreground">
                {m.value}
              </div>
              <div
                className={cn(
                  "mt-0.5 flex items-center gap-1 text-xs font-bold",
                  m.trend === "up"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400",
                )}
              >
                <Icon name={m.trend === "up" ? "ArrowUp" : "ArrowDown"} className="h-3 w-3" />
                {m.delta}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
