import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/lib/icon";

interface PlaceholderProps {
  testId: string;
  icon: string;
  title: string;
  description: string;
  hint?: string;
}

/**
 * Placeholder reutilizable para las secciones que aún no están construidas.
 * Mantiene el shell coherente sin contenido hardcodeado en JSX de cada página.
 */
export function PlaceholderPage({
  testId,
  icon,
  title,
  description,
  hint,
}: PlaceholderProps) {
  return (
    <Card
      data-testid={testId}
      className="mx-auto max-w-3xl rounded-2xl border-dashed border-border bg-card shadow-soft-sm"
    >
      <CardContent className="flex flex-col items-center gap-4 px-10 py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <Icon name={icon} className="h-6 w-6" strokeWidth={2} />
        </span>
        <h3 className="text-xl font-extrabold tracking-tight text-foreground">
          {title}
        </h3>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
        {hint && (
          <p className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
            {hint}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
