import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: number | string;
  icon: string;
  /** color del círculo de fondo del icono y del punto */
  tone: "primary" | "amber" | "emerald" | "muted";
  hint?: string;
  testId?: string;
}

const TONES: Record<
  Props["tone"],
  { bg: string; fg: string; dot: string }
> = {
  primary: {
    bg: "bg-primary/10",
    fg: "text-primary",
    dot: "bg-primary",
  },
  amber: {
    bg: "bg-amber-500/10",
    fg: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    fg: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
  },
  muted: {
    bg: "bg-muted",
    fg: "text-muted-foreground",
    dot: "bg-muted-foreground",
  },
};

/**
 * Tarjeta de KPI tipo dashboard, con icono circular + número grande + punto de color.
 */
export function KpiCard({ label, value, icon, tone, hint, testId }: Props) {
  const t = TONES[tone];
  return (
    <div
      data-testid={testId}
      className="flex items-center gap-5 rounded-2xl border border-border bg-card px-5 py-5 shadow-soft-sm"
    >
      <span
        className={cn(
          "flex h-14 w-14 shrink-0 items-center justify-center rounded-full",
          t.bg,
          t.fg,
        )}
      >
        <Icon name={icon} className="h-6 w-6" strokeWidth={1.8} />
      </span>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-semibold text-muted-foreground">
          {label}
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-3xl font-extrabold tracking-tight text-foreground">
            {value}
          </span>
          <span className={cn("h-1.5 w-1.5 rounded-full", t.dot)} />
        </div>
        {hint && (
          <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div>
        )}
      </div>
    </div>
  );
}
