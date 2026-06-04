import { Card, CardContent } from "@/components/ui/card";
import { Icon } from "@/lib/icon";

export default function BibliotecaPage() {
  return (
    <Card data-testid="page-biblioteca" className="mx-auto max-w-3xl rounded-2xl border-dashed border-border bg-card shadow-soft-sm">
      <CardContent className="flex flex-col items-center gap-4 px-10 py-14 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
          <Icon name="FolderOpen" className="h-6 w-6" strokeWidth={2} />
        </span>
        <h3 className="text-xl font-extrabold tracking-tight">Biblioteca de archivos</h3>
        <p className="max-w-md text-sm text-muted-foreground">
          Aquí aparecerán todas las imágenes y vídeos que subas. Compartidos entre obras, blog y páginas.
        </p>
        <p className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
          En construcción
        </p>
      </CardContent>
    </Card>
  );
}
