import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/lib/icon";
import { Button } from "@/components/ui/button";

export default function PreviewWebPage() {
  return (
    <Card data-testid="page-preview-web" className="mx-auto max-w-3xl rounded-2xl border-border bg-card shadow-soft-sm">
      <CardContent className="flex flex-col items-center gap-4 px-10 py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <Icon name="Eye" className="h-6 w-6" strokeWidth={2} />
        </span>
        <h3 className="text-xl font-extrabold tracking-tight">Vista previa de tu web</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          Abre tu sitio público en otra pestaña para verlo tal como lo ven tus visitantes.
        </p>
        <Button
          onClick={() => window.open("https://prisma-escultor.oudixital.com/", "_blank", "noopener")}
          className="gap-2 rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="ExternalLink" className="h-4 w-4" />
          Abrir mi web
        </Button>
      </CardContent>
    </Card>
  );
}
