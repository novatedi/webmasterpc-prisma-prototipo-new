import { useAjustesStore } from "@/stores/ajustes-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { AJUSTES } from "@/constants/testIds";
import { toast } from "sonner";

const STATUS_INFO = {
  publicado: {
    label: "Publicado",
    icon: "Globe2",
    cls: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    description: "Tu web está online en este dominio.",
  },
  configurando: {
    label: "Configurando",
    icon: "Loader2",
    cls: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
    description: "Estamos conectando el dominio. Suele tardar unos minutos.",
  },
  "no-conectado": {
    label: "No conectado",
    icon: "AlertCircle",
    cls: "bg-rose-500/10 text-rose-700 dark:text-rose-400",
    description: "Aún no hemos conectado este dominio.",
  },
} as const;

export default function DominioPage() {
  const dominio = useAjustesStore((s) => s.dominio);
  const update = useAjustesStore((s) => s.updateDominio);
  const info = STATUS_INFO[dominio.status];

  return (
    <EmpresaTwoPanel
      title="Dominio y publicación"
      description="La dirección web en la que tus visitantes encontrarán tu trabajo."
      previewLabel="Tu web en internet"
      testIdPage={AJUSTES.page("dominio")}
      formNode={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Dominio</Label>
            <div className="flex h-11 items-center rounded-lg border border-input bg-card">
              <span className="border-r border-border px-3 text-sm font-semibold text-muted-foreground">
                https://
              </span>
              <Input
                data-testid={AJUSTES.domainInput}
                value={dominio.domain}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  update({ domain: e.target.value })
                }
                placeholder="midominio.com"
                className="h-full border-0 bg-transparent font-semibold"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Si aún no tienes dominio, podemos conectarte uno por ti.
            </p>
          </div>

          <div
            data-testid={AJUSTES.domainStatus}
            className="flex items-center gap-3 rounded-xl border border-border bg-background p-4"
          >
            <span
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full",
                info.cls,
              )}
            >
              <Icon name={info.icon} className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold">{info.label}</span>
                {dominio.ssl && (
                  <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    SSL activo
                  </span>
                )}
              </div>
              <div className="text-xs text-muted-foreground">
                {info.description}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
              <div>
                <div className="text-sm font-bold">SSL automático</div>
                <div className="text-xs text-muted-foreground">
                  Tu web servida con candado (https).
                </div>
              </div>
              <Switch
                data-testid={AJUSTES.domainSsl}
                checked={dominio.ssl}
                onCheckedChange={(v: boolean) => update({ ssl: v })}
              />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
              <div>
                <div className="text-sm font-bold">Redirigir www</div>
                <div className="text-xs text-muted-foreground">
                  www.midominio.com → midominio.com
                </div>
              </div>
              <Switch
                data-testid={AJUSTES.domainWww}
                checked={dominio.redirectWww}
                onCheckedChange={(v: boolean) => update({ redirectWww: v })}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border pt-5">
            <Button
              type="button"
              data-testid={AJUSTES.domainPublishBtn}
              onClick={() => {
                update({
                  status: dominio.status === "publicado" ? "no-conectado" : "publicado",
                });
                toast.success(
                  dominio.status === "publicado"
                    ? "Sitio despublicado"
                    : "Sitio publicado",
                );
              }}
              className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
            >
              <Icon
                name={dominio.status === "publicado" ? "PowerOff" : "Rocket"}
                className="h-4 w-4"
              />
              {dominio.status === "publicado"
                ? "Despublicar"
                : "Publicar ahora"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => toast.message("Verificando DNS… (mock)")}
              className="h-11 gap-2 rounded-xl font-bold"
            >
              <Icon name="RefreshCw" className="h-4 w-4" />
              Verificar conexión
            </Button>
          </div>
        </>
      }
      previewNode={
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm">
          <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-2.5">
            <div className="flex gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-muted px-3 py-1.5 text-xs">
              {dominio.ssl ? (
                <Icon name="Lock" className="h-3 w-3 text-emerald-600" />
              ) : (
                <Icon name="Unlock" className="h-3 w-3 text-muted-foreground" />
              )}
              <span className="font-semibold text-muted-foreground">
                {dominio.ssl ? "https://" : "http://"}
              </span>
              <span className="font-extrabold text-foreground">
                {dominio.domain || "tu-dominio.com"}
              </span>
            </div>
          </div>

          <div className="px-6 py-8 md:px-10 md:py-12">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
              {dominio.status === "publicado" ? "En línea" : "Sin publicar"}
            </div>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
              {dominio.domain || "Sin dominio configurado"}
            </h1>
            <p className="mt-2 max-w-prose text-sm text-foreground/70">
              {dominio.status === "publicado"
                ? "Tus visitantes pueden ver tu web en este dominio ahora mismo."
                : dominio.status === "configurando"
                  ? "Estamos terminando la configuración. Tarda unos minutos."
                  : "Aún no has publicado tu web. Pulsa 'Publicar ahora' cuando estés listo."}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-background p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Estado
                </div>
                <div
                  className={cn(
                    "mt-1 text-sm font-extrabold",
                    dominio.status === "publicado"
                      ? "text-emerald-600 dark:text-emerald-400"
                      : "text-amber-600 dark:text-amber-400",
                  )}
                >
                  {info.label}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  SSL
                </div>
                <div className="mt-1 text-sm font-extrabold">
                  {dominio.ssl ? "Activo" : "Desactivado"}
                </div>
              </div>
              <div className="rounded-xl border border-border bg-background p-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  www → root
                </div>
                <div className="mt-1 text-sm font-extrabold">
                  {dominio.redirectWww ? "Sí" : "No"}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
