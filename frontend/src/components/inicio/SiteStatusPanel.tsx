import { siteStatus } from "@/lib/data/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { HOME } from "@/constants/testIds";

function Gauge({ score }: { score: number }) {
  const r = 52;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="hsl(160 84% 39%)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-3xl font-extrabold text-foreground">{score}%</span>
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          {siteStatus.label}
        </span>
      </div>
    </div>
  );
}

export function SiteStatusPanel() {
  return (
    <Card
      data-testid={HOME.statusCard}
      className="flex flex-col rounded-2xl border-border bg-card shadow-soft-sm"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Estado de tu sitio</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col items-center pt-2">
        <Gauge score={siteStatus.score} />
        <ul className="mt-4 flex w-full flex-col gap-2.5 rounded-xl border border-border bg-background p-4">
          {siteStatus.checks.map((c) => (
            <li key={c.label} className="flex items-center gap-2.5 text-sm">
              <Icon
                name={c.state === "ok" ? "CheckCircle2" : "AlertCircle"}
                className={cn(
                  "h-4 w-4 shrink-0",
                  c.state === "ok"
                    ? "text-emerald-500"
                    : "text-amber-500",
                )}
              />
              <span className="text-foreground/85">{c.label}</span>
            </li>
          ))}
        </ul>
        <button className="mt-4 flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
          Ver recomendaciones
          <Icon name="ArrowRight" className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}
