import { dashboardKpis } from "@/lib/data/dashboard";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { HOME } from "@/constants/testIds";

const TONES: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  sky: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  violet: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
};

export function KpiCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {dashboardKpis.map((k) => (
        <div
          key={k.id}
          data-testid={HOME.kpi(k.id)}
          className="rounded-2xl border border-border bg-card p-5 shadow-soft-sm"
        >
          <div className="flex items-center gap-2.5">
            <span className={cn("flex h-9 w-9 items-center justify-center rounded-full", TONES[k.tone])}>
              <Icon name={k.icon} className="h-[18px] w-[18px]" strokeWidth={2} />
            </span>
            <span className="text-sm font-semibold text-muted-foreground">{k.label}</span>
          </div>
          <div className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">
            {k.value}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs">
            {k.delta ? (
              <span
                className={cn(
                  "flex items-center gap-1 font-bold",
                  k.trend === "up"
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-rose-600 dark:text-rose-400",
                )}
              >
                <Icon name={k.trend === "up" ? "ArrowUp" : "ArrowDown"} className="h-3 w-3" />
                {k.delta}
              </span>
            ) : null}
            <span className="text-muted-foreground">{k.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
