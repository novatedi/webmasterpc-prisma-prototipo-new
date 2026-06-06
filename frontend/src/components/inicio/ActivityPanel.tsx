import { recentActivity } from "@/lib/data/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { HOME } from "@/constants/testIds";

const TONES: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  amber: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  emerald: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  rose: "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export function ActivityPanel() {
  return (
    <Card
      data-testid={HOME.activityCard}
      className="flex flex-col rounded-2xl border-border bg-card shadow-soft-sm"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Actividad reciente</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col pt-2">
        <ul className="flex flex-col gap-1">
          {recentActivity.map((a) => (
            <li key={a.id} className="flex items-start gap-3 py-2.5">
              <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", TONES[a.tone])}>
                <Icon name={a.icon} className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-bold text-foreground">{a.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
                </div>
                <p className="text-xs text-muted-foreground">{a.desc}</p>
              </div>
            </li>
          ))}
        </ul>
        <button className="mt-auto flex items-center gap-1.5 pt-3 text-sm font-bold text-primary hover:underline">
          Ver todas las actividades
          <Icon name="ArrowRight" className="h-4 w-4" />
        </button>
      </CardContent>
    </Card>
  );
}
