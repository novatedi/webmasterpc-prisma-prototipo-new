import { useNavigate } from "react-router-dom";
import { mainPages, dashActions } from "@/lib/data/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { HOME } from "@/constants/testIds";

export function MainPagesPanel() {
  const navigate = useNavigate();
  return (
    <Card
      data-testid={HOME.mainPagesCard}
      className="rounded-2xl border-border bg-card shadow-soft-sm"
    >
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-2">
        <div>
          <CardTitle className="text-lg font-bold">Páginas principales</CardTitle>
          <p className="text-xs text-muted-foreground">
            Gestiona las páginas más importantes de tu sitio web
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate("/paginas")}
          className="h-9 shrink-0 rounded-lg text-xs font-bold"
        >
          Gestionar páginas
        </Button>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {mainPages.map((p) => (
            <button
              key={p.id}
              data-testid={HOME.mainPage(p.id)}
              onClick={() => navigate(p.to)}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-background text-left transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft"
            >
              <div className="h-24 w-full overflow-hidden bg-muted">
                <img
                  src={p.img}
                  alt={p.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <div className="text-sm font-bold text-foreground">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.meta}</div>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function QuickActionsPanel() {
  const navigate = useNavigate();
  return (
    <Card
      data-testid={HOME.quickActions}
      className="rounded-2xl border-border bg-card shadow-soft-sm"
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Acciones rápidas</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {dashActions.map((a) => (
            <button
              key={a.id}
              data-testid={HOME.actionItem(a.id)}
              onClick={() => navigate(a.to)}
              className="group flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-left transition-all hover:border-primary/40 hover:shadow-soft"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon name={a.icon} className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <span className="text-sm font-bold text-foreground">{a.label}</span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
