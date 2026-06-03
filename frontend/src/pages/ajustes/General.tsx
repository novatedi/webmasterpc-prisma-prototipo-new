import { useAjustesStore } from "@/stores/ajustes-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { AJUSTES } from "@/constants/testIds";
import { toast } from "sonner";
import type { AjustesGeneral } from "@/lib/data/ajustes";

const LANGS: { value: AjustesGeneral["language"]; label: string }[] = [
  { value: "es", label: "Español" },
  { value: "ca", label: "Català" },
  { value: "gl", label: "Galego" },
  { value: "en", label: "English" },
];

const TIMEZONES = [
  "Europe/Madrid",
  "Europe/Lisbon",
  "Europe/London",
  "Europe/Paris",
  "Atlantic/Canary",
  "America/Mexico_City",
  "America/Buenos_Aires",
];

export default function GeneralPage() {
  const general = useAjustesStore((s) => s.general);
  const update = useAjustesStore((s) => s.updateGeneral);

  return (
    <EmpresaTwoPanel
      title="Ajustes generales"
      description="Pequeños detalles del estudio: nombre, idioma, zona horaria…"
      previewLabel="Resumen del estudio"
      testIdPage={AJUSTES.page("general")}
      formNode={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Nombre del estudio</Label>
            <Input
              data-testid={AJUSTES.generalStudio}
              value={general.studioName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update({ studioName: e.target.value })
              }
              className="h-11 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Frase breve del estudio</Label>
            <Textarea
              data-testid={AJUSTES.generalTagline}
              value={general.studioTagline}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                update({ studioTagline: e.target.value })
              }
              rows={2}
              className="rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>Idioma del panel</Label>
              <select
                data-testid={AJUSTES.generalLang}
                value={general.language}
                onChange={(e) =>
                  update({
                    language: e.target.value as AjustesGeneral["language"],
                  })
                }
                className="h-11 rounded-lg border border-input bg-background px-3 text-sm font-semibold"
              >
                {LANGS.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Zona horaria</Label>
              <select
                data-testid={AJUSTES.generalTz}
                value={general.timezone}
                onChange={(e) => update({ timezone: e.target.value })}
                className="h-11 rounded-lg border border-input bg-background px-3 text-sm font-semibold"
              >
                {TIMEZONES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Email principal del taller</Label>
            <Input
              data-testid={AJUSTES.generalEmail}
              type="email"
              value={general.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update({ email: e.target.value })
              }
              className="h-11 rounded-lg"
            />
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border pt-5">
            <Button
              type="button"
              data-testid={AJUSTES.generalSave}
              onClick={() => toast.success("Ajustes guardados")}
              className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
            >
              <Icon name="Save" className="h-4 w-4" />
              Guardar cambios
            </Button>
          </div>
        </>
      }
      previewNode={
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft-sm md:p-8">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            Tu estudio
          </div>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
            {general.studioName}
          </h1>
          <p className="mt-2 max-w-prose text-sm text-foreground/70">
            {general.studioTagline}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name="Languages" className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Idioma
                </div>
                <div className="text-sm font-extrabold">
                  {
                    LANGS.find((l) => l.value === general.language)?.label ??
                    general.language
                  }
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name="Clock" className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Zona horaria
                </div>
                <div className="text-sm font-extrabold">{general.timezone}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3 sm:col-span-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name="Mail" className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  Email
                </div>
                <div className="truncate text-sm font-extrabold">
                  {general.email}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
