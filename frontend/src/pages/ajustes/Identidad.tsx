import { useState } from "react";
import { useAjustesStore } from "@/stores/ajustes-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { SinglePictureField } from "@/components/empresa/SinglePictureField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { AJUSTES } from "@/constants/testIds";
import {
  PRIMARY_COLOR_PRESETS,
  FONT_CHOICES,
  ajustesSeed,
} from "@/lib/data/ajustes";
import { toast } from "sonner";

export default function IdentidadPage() {
  const identidad = useAjustesStore((s) => s.identidad);
  const update = useAjustesStore((s) => s.updateIdentidad);
  const applyGlobal = useAjustesStore((s) => s.applyIdentityGlobally);

  // Estado local para tener un "live preview" sin tocar el panel todavía
  const [draft, setDraft] = useState(identidad);

  const set = <K extends keyof typeof draft>(k: K, v: (typeof draft)[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const apply = () => {
    update(draft);
    applyGlobal();
    toast.success("Identidad aplicada a todo el panel");
  };

  const reset = () => {
    setDraft(ajustesSeed.identidad);
    update(ajustesSeed.identidad);
    applyGlobal();
    toast.message("Identidad restablecida");
  };

  return (
    <EmpresaTwoPanel
      title="Identidad de tu marca"
      description="Logo, color y fuente. Lo que cambies aquí define cómo se ve tu web pública."
      previewLabel="Cómo se verá tu web"
      testIdPage={AJUSTES.page("identidad")}
      formNode={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Nombre de la marca</Label>
            <Input
              data-testid={AJUSTES.brandName}
              value={draft.brandName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                set("brandName", e.target.value)
              }
              className="h-11 rounded-lg"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <Label>Logo (alto)</Label>
              <SinglePictureField
                url={draft.logoUrl}
                onChange={(u) => set("logoUrl", u)}
                aspect="square"
                buttonText="Subir logo"
                testIdImage={AJUSTES.logoImage}
                testIdButton={AJUSTES.logoBtn}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label>Favicon (cuadrado, 32×32)</Label>
              <SinglePictureField
                url={draft.faviconUrl}
                onChange={(u) => set("faviconUrl", u)}
                aspect="square"
                buttonText="Subir favicon"
                testIdImage={AJUSTES.faviconImage}
                testIdButton={AJUSTES.faviconBtn}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Label>Color principal</Label>
            <div className="flex flex-wrap gap-2">
              {PRIMARY_COLOR_PRESETS.map((c) => {
                const active =
                  draft.primaryColor.toLowerCase() === c.hex.toLowerCase();
                return (
                  <button
                    key={c.hex}
                    type="button"
                    data-testid={AJUSTES.colorPreset(c.hex)}
                    onClick={() => set("primaryColor", c.hex)}
                    aria-label={c.label}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all",
                      active
                        ? "border-foreground shadow-soft-lg"
                        : "border-transparent hover:scale-110",
                    )}
                    style={{ background: c.hex }}
                  >
                    {active && (
                      <Icon name="Check" className="h-4 w-4 text-white" />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center gap-3">
              <input
                type="color"
                data-testid={AJUSTES.colorInput}
                value={draft.primaryColor}
                onChange={(e) => set("primaryColor", e.target.value)}
                className="h-11 w-14 cursor-pointer rounded-lg border border-border bg-card"
                aria-label="Selector de color personalizado"
              />
              <Input
                value={draft.primaryColor.toUpperCase()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  set("primaryColor", e.target.value)
                }
                className="h-11 w-32 rounded-lg font-mono"
              />
              <span className="text-xs text-muted-foreground">
                Pulsa un preset o elige uno personalizado.
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label>Tipografía</Label>
            <select
              data-testid={AJUSTES.fontSelect}
              value={draft.fontFamily}
              onChange={(e) => set("fontFamily", e.target.value)}
              className="h-11 rounded-lg border border-input bg-background px-3 text-sm"
            >
              {FONT_CHOICES.map((f) => (
                <option key={f.family} value={f.family}>
                  {f.label}
                </option>
              ))}
            </select>
            <div
              className="rounded-lg border border-border bg-background px-4 py-3"
              style={{ fontFamily: `"${draft.fontFamily}", sans-serif` }}
            >
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Muestra · {draft.fontFamily}
              </div>
              <div className="mt-1 text-2xl font-extrabold">
                Aa Bb Cc Áá Éé Íí Óó Úú
              </div>
              <div className="text-sm text-muted-foreground">
                Cada pieza nace de una conversación.
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border pt-5">
            <Button
              type="button"
              data-testid={AJUSTES.applyBtn}
              onClick={apply}
              className="h-11 gap-2 rounded-xl bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
            >
              <Icon name="Check" className="h-4 w-4" />
              Aplicar al panel
            </Button>
            <Button
              type="button"
              variant="outline"
              data-testid={AJUSTES.resetBtn}
              onClick={reset}
              className="h-11 gap-2 rounded-xl font-bold"
            >
              <Icon name="RotateCcw" className="h-4 w-4" />
              Restablecer por defecto
            </Button>
          </div>
        </>
      }
      previewNode={
        <div
          data-testid={AJUSTES.preview}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm"
          style={{ fontFamily: `"${draft.fontFamily}", sans-serif` }}
        >
          {/* Barra del navegador simulada */}
          <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-2.5">
            <div className="flex gap-1">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
            </div>
            <div className="ml-3 flex flex-1 items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-[11px] text-muted-foreground">
              {draft.faviconUrl ? (
                <img
                  src={draft.faviconUrl}
                  alt=""
                  className="h-3.5 w-3.5 rounded-sm object-cover"
                />
              ) : (
                <span
                  className="flex h-3.5 w-3.5 items-center justify-center rounded-sm text-[8px] font-extrabold text-white"
                  style={{ background: draft.primaryColor }}
                >
                  {draft.brandName.slice(0, 1).toUpperCase()}
                </span>
              )}
              www.maestrocarballo.com
            </div>
          </div>

          {/* Header del sitio */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-2.5">
              {draft.logoUrl ? (
                <img
                  src={draft.logoUrl}
                  alt={draft.brandName}
                  className="h-9 w-9 rounded-md object-cover"
                />
              ) : (
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-md text-sm font-extrabold text-white"
                  style={{ background: draft.primaryColor }}
                >
                  {draft.brandName.slice(0, 1).toUpperCase()}
                </span>
              )}
              <span className="text-lg font-extrabold">{draft.brandName}</span>
            </div>
            <nav className="hidden gap-5 text-sm font-semibold text-muted-foreground md:flex">
              <span>Inicio</span>
              <span>Obras</span>
              <span>Sobre mí</span>
              <span>Contacto</span>
            </nav>
          </div>

          {/* Hero */}
          <div className="px-6 py-10 md:px-10 md:py-14">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em]"
                 style={{ color: draft.primaryColor }}>
              Taller del Maestro
            </div>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight md:text-4xl">
              {draft.brandName}
            </h1>
            <p className="mt-3 max-w-md text-sm text-foreground/70">
              Escultor contemporáneo trabajando piedra, hierro y bronce desde
              1985.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={(e) => e.preventDefault()}
                className="rounded-full px-5 py-2.5 text-sm font-bold text-white shadow-soft transition-transform hover:-translate-y-0.5"
                style={{ background: draft.primaryColor }}
              >
                Ver obras
              </button>
              <button
                type="button"
                className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-bold text-foreground"
              >
                Contactar
              </button>
            </div>
          </div>

          {/* Tarjetas */}
          <div className="grid grid-cols-1 gap-3 border-t border-border bg-background/40 p-6 sm:grid-cols-3">
            {[
              { t: "Encargos", v: "Bronce y piedra" },
              { t: "Restauración", v: "Museos y ayto." },
              { t: "Talleres", v: "Sábados" },
            ].map((c) => (
              <div
                key={c.t}
                className="rounded-xl border border-border bg-card p-4"
              >
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: draft.primaryColor }}
                >
                  {c.t}
                </span>
                <div className="mt-1 text-sm font-extrabold">{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
}
