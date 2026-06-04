import { useLegalStore } from "@/stores/legal-store";
import { LEGAL_DOCS } from "@/lib/data/legal";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { LEGAL } from "@/constants/testIds";
import { toast } from "sonner";

export function PublicarBar() {
  const published = useLegalStore((s) => s.published);
  const publishedDocs = useLegalStore((s) => s.publishedDocs);
  const publish = useLegalStore((s) => s.publish);

  const pages = LEGAL_DOCS.filter((d) => publishedDocs.includes(d.id));

  return (
    <Card className="rounded-2xl border-border bg-card shadow-soft-sm">
      <CardContent className="flex flex-col gap-4 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-base font-bold text-foreground">
              ¿Todo listo?
            </div>
            <div className="text-sm text-muted-foreground">
              Publica los documentos y aparecerán en sus páginas legales.
            </div>
          </div>
          <Button
            data-testid={LEGAL.publishBtn}
            onClick={() => {
              publish();
              toast.success("Textos legales publicados en tu web.");
            }}
            className="h-11 rounded-lg px-8 text-sm font-bold"
          >
            <Icon name="Globe2" className="mr-2 h-4 w-4" />
            Publicar en mi web
          </Button>
        </div>

        {published && (
          <div
            data-testid={LEGAL.publishedList}
            className="flex flex-col gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4"
          >
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-400">
              <Icon name="CheckCircle2" className="h-4 w-4" />
              Publicado · estas páginas ya están en tu web
            </div>
            <div className="flex flex-wrap gap-2">
              {pages.map((p) => (
                <span
                  key={p.id}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground"
                >
                  <Icon name="Link" className="h-3.5 w-3.5 text-primary" />
                  <span className="font-mono">{p.slug}</span>
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
