import { useState } from "react";
import { useAjustesStore } from "@/stores/ajustes-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface MantState {
  enabled: boolean;
  title: string;
  message: string;
  showEmail: boolean;
  showWhatsapp: boolean;
  backDate: string;
}

const INITIAL: MantState = {
  enabled: false,
  title: "Volvemos pronto",
  message:
    "Estamos renovando la web del taller. Si necesitas contactar con nosotros, escríbenos o llámanos directamente.",
  showEmail: true,
  showWhatsapp: true,
  backDate: "",
};

export default function MantenimientoPage() {
  const identidad = useAjustesStore((s) => s.identidad);
  const general = useAjustesStore((s) => s.general);
  const [m, setM] = useState<MantState>(INITIAL);

  const set = <K extends keyof MantState>(k: K, v: MantState[K]) =>
    setM((s) => ({ ...s, [k]: v }));

  const backFmt = m.backDate
    ? new Date(m.backDate).toLocaleDateString("es-ES", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <EmpresaTwoPanel
      title="Web en mantenimiento"
      description="Activa esto mientras renuevas tu web; tus visitantes verán un aviso amable."
      previewLabel="Pantalla pública 'Volvemos pronto'"
      testIdPage="page-mantenimiento"
      formNode={
        <>
          <div
            className={cn(
              "flex items-center justify-between gap-4 rounded-xl border p-4",
              m.enabled
                ? "border-amber-500/40 bg-amber-500/5"
                : "border-border bg-background",
            )}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-xl",
                  m.enabled
                    ? "bg-amber-500 text-white"
                    : "bg-muted text-muted-foreground",
                )}
              >
                <Icon name="Construction" className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-extrabold">
                  {m.enabled ? "Mantenimiento activo" : "Mantenimiento desactivado"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {m.enabled
                    ? "Tu web pública muestra el aviso de la derecha."
                    : "Tu web pública funciona con normalidad."}
                </div>
              </div>
            </div>
            <Switch
              data-testid="mant-enabled"
              checked={m.enabled}
              onCheckedChange={(v: boolean) => {
                set("enabled", v);
                toast.message(
                  v ? "Mantenimiento activado" : "Mantenimiento desactivado",
                );
              }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Título del aviso</Label>
            <Input
              data-testid="mant-title"
              value={m.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                set("title", e.target.value)
              }
              className="h-11 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Mensaje</Label>
            <Textarea
              data-testid="mant-message"
              value={m.message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                set("message", e.target.value)
              }
              rows={4}
              className="rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
              <div>
                <div className="text-sm font-bold">Mostrar email</div>
                <div className="truncate text-xs text-muted-foreground">
                  {general.email}
                </div>
              </div>
              <Switch
                data-testid="mant-show-email"
                checked={m.showEmail}
                onCheckedChange={(v: boolean) => set("showEmail", v)}
              />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border bg-background px-4 py-3">
              <div>
                <div className="text-sm font-bold">Mostrar WhatsApp</div>
                <div className="truncate text-xs text-muted-foreground">
                  +34 600 000 000
                </div>
              </div>
              <Switch
                data-testid="mant-show-whatsapp"
                checked={m.showWhatsapp}
                onCheckedChange={(v: boolean) => set("showWhatsapp", v)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Fecha estimada de vuelta (opcional)</Label>
            <Input
              type="date"
              data-testid="mant-back-date"
              value={m.backDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                set("backDate", e.target.value)
              }
              className="h-11 rounded-lg"
            />
            <p className="text-xs text-muted-foreground">
              Si la añades, se muestra en la pantalla pública.
            </p>
          </div>
        </>
      }
      previewNode={
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm">
          {/* Barra navegador */}
          <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-2.5">
            <div className="flex gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="ml-3 flex flex-1 items-center gap-2 rounded-md bg-muted px-3 py-1 text-[11px] text-muted-foreground">
              <Icon name="Lock" className="h-3 w-3 text-emerald-600" />
              www.maestrocarballo.com
            </div>
          </div>

          {/* Pantalla "Volvemos pronto" */}
          <div
            data-testid="mant-preview"
            className="flex min-h-[480px] flex-col items-center justify-center gap-5 px-8 py-12 text-center"
            style={{
              fontFamily: `"${identidad.fontFamily}", sans-serif`,
              background:
                "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted)) 100%)",
            }}
          >
            <span
              className="flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-extrabold text-white shadow-soft"
              style={{ background: identidad.primaryColor }}
            >
              {identidad.brandName.slice(0, 1).toUpperCase()}
            </span>

            <div
              className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white"
              style={{ background: identidad.primaryColor }}
            >
              {m.enabled ? "En mantenimiento" : "Vista previa"}
            </div>

            <h1 className="max-w-md text-3xl font-extrabold leading-tight tracking-tight text-foreground md:text-4xl">
              {m.title || "Volvemos pronto"}
            </h1>

            <p className="max-w-md whitespace-pre-line text-sm leading-relaxed text-foreground/75">
              {m.message}
            </p>

            {backFmt && (
              <div className="rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold text-foreground">
                <Icon name="CalendarClock" className="mr-1.5 inline h-3.5 w-3.5" />
                Volvemos el {backFmt}
              </div>
            )}

            {(m.showEmail || m.showWhatsapp) && (
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                {m.showEmail && (
                  <a
                    href={`mailto:${general.email}`}
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
                  >
                    <Icon name="Mail" className="h-3.5 w-3.5" />
                    {general.email}
                  </a>
                )}
                {m.showWhatsapp && (
                  <a
                    href="https://wa.me/34600000000"
                    onClick={(e) => e.preventDefault()}
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white"
                    style={{ background: identidad.primaryColor }}
                  >
                    <Icon name="MessageCircle" className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                )}
              </div>
            )}

            <div className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {identidad.brandName}
            </div>
          </div>
        </div>
      }
    />
  );
}
