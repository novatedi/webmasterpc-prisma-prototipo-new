import { useState } from "react";
import { useLegalStore } from "@/stores/legal-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { LEGAL } from "@/constants/testIds";

const CATS = [
  { key: "necesarias", label: "Necesarias", desc: "Imprescindibles para que la web funcione.", locked: true },
  { key: "analiticas", label: "Analíticas", desc: "Miden las visitas de forma anónima.", locked: false },
  { key: "marketing", label: "Marketing", desc: "Publicidad personalizada.", locked: false },
];

export function GestorCookies() {
  const cookieText = useLegalStore((s) => s.cookieText);
  const setCookieText = useLegalStore((s) => s.setCookieText);
  const [showConfig, setShowConfig] = useState(false);
  const [prefs, setPrefs] = useState({ analiticas: true, marketing: false });

  return (
    <Card
      data-testid={LEGAL.cookieCard}
      className="rounded-2xl border-border bg-card shadow-soft-sm"
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <Icon name="Cookie" className="h-5 w-5 text-primary" strokeWidth={2} />
          Gestor de cookies
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          No es solo un aviso: tus visitantes pueden aceptar, rechazar o elegir
          por categorías.
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6 pt-2 lg:grid-cols-2">
        {/* Editor */}
        <div className="flex flex-col gap-2">
          <Label>Texto del aviso de cookies</Label>
          <Textarea
            data-testid={LEGAL.cookieEditor}
            value={cookieText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setCookieText(e.target.value)
            }
            rows={5}
            className="rounded-lg text-sm"
          />
          <p className="text-xs text-muted-foreground">
            A la derecha ves cómo lo verán tus visitantes.
          </p>
        </div>

        {/* Previsualización */}
        <div className="flex flex-col gap-4">
          {/* Banner */}
          <div
            data-testid={LEGAL.cookieBanner}
            className="rounded-2xl border border-border bg-background p-4 shadow-soft-sm"
          >
            <p className="text-sm text-foreground/85">{cookieText}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">
                Aceptar todo
              </button>
              <button className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground">
                Rechazar
              </button>
              <button
                onClick={() => setShowConfig((v) => !v)}
                className="rounded-full border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:border-primary hover:text-primary"
              >
                Configurar
              </button>
            </div>
          </div>

          {/* Panel de configuración */}
          {showConfig && (
            <div
              data-testid={LEGAL.cookieConfig}
              className="flex flex-col gap-2 rounded-2xl border border-border bg-background p-4"
            >
              <div className="text-sm font-bold">Configurar por categorías</div>
              {CATS.map((c) => (
                <div
                  key={c.key}
                  data-testid={LEGAL.cookieCat(c.key)}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card px-3 py-2.5"
                >
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold">
                      {c.label}
                      {c.locked && (
                        <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-bold uppercase text-muted-foreground">
                          Siempre activas
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{c.desc}</div>
                  </div>
                  <Switch
                    checked={c.locked ? true : prefs[c.key as "analiticas" | "marketing"]}
                    disabled={c.locked}
                    onCheckedChange={(v: boolean) =>
                      !c.locked &&
                      setPrefs((p) => ({ ...p, [c.key]: v }))
                    }
                    className={cn(c.locked && "opacity-60")}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
