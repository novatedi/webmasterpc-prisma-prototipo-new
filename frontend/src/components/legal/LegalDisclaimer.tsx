import { Icon } from "@/lib/icon";
import { LEGAL } from "@/constants/testIds";

export function LegalDisclaimer() {
  return (
    <div
      data-testid={LEGAL.disclaimer}
      className="flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-500/5 px-4 py-3"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-white">
        <Icon name="ShieldAlert" className="h-4 w-4" />
      </span>
      <div className="text-sm">
        <span className="font-extrabold text-amber-700 dark:text-amber-400">
          Plantilla orientativa, NO asesoramiento legal.
        </span>{" "}
        <span className="text-foreground/75">
          Revísala con un profesional antes de publicar en tu web.
        </span>
      </div>
    </div>
  );
}
