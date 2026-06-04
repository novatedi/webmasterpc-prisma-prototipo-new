import { useLegalStore } from "@/stores/legal-store";
import { SITUACION_LABELS, type Fiscal } from "@/lib/data/legal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { LEGAL } from "@/constants/testIds";
import { toast } from "sonner";

const FISCAL_FIELDS: { key: keyof Fiscal; label: string }[] = [
  { key: "razonSocial", label: "Nombre o razón social" },
  { key: "nif", label: "NIF / CIF" },
  { key: "domicilio", label: "Domicilio fiscal" },
  { key: "email", label: "Email" },
  { key: "telefono", label: "Teléfono" },
  { key: "actividad", label: "Actividad / descripción" },
];

export function AsistenteGeneracion() {
  const fiscal = useLegalStore((s) => s.fiscal);
  const situacion = useLegalStore((s) => s.situacion);
  const setFiscal = useLegalStore((s) => s.setFiscal);
  const toggleSituacion = useLegalStore((s) => s.toggleSituacion);
  const generateAll = useLegalStore((s) => s.generateAll);

  return (
    <Card className="rounded-2xl border-border bg-card shadow-soft-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <Icon name="Wand2" className="h-5 w-5 text-primary" strokeWidth={2} />
          Asistente de generación
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          Rellena tus datos y marca tu situación; generamos los documentos que
          te corresponden.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 pt-2">
        {/* Datos fiscales */}
        <div>
          <div className="mb-3 text-sm font-bold text-foreground">
            Datos fiscales
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FISCAL_FIELDS.map((f) => (
              <div key={f.key} className="flex flex-col gap-1.5">
                <Label>{f.label}</Label>
                <Input
                  data-testid={LEGAL.fiscalInput(f.key)}
                  value={fiscal[f.key]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFiscal({ [f.key]: e.target.value })
                  }
                  className="h-11 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Casillas de situación */}
        <div>
          <div className="mb-1 text-sm font-bold text-foreground">
            Tu situación
          </div>
          <p className="mb-3 text-xs text-muted-foreground">
            Esto decide qué documentos necesitas. Vender online añade tres más.
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {SITUACION_LABELS.map((c) => {
              const checked = situacion[c.key];
              const isVenta = c.key === "ventaOnline";
              return (
                <div
                  key={c.key}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-xl border px-4 py-3",
                    checked && isVenta
                      ? "border-primary/50 bg-primary/5"
                      : "border-border bg-background",
                  )}
                >
                  <span
                    className={cn(
                      "text-sm font-semibold",
                      isVenta && "font-bold",
                    )}
                  >
                    {c.label}
                  </span>
                  <Switch
                    data-testid={LEGAL.situacion(c.key)}
                    checked={checked}
                    onCheckedChange={() => toggleSituacion(c.key)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <Button
          data-testid={LEGAL.generateBtn}
          onClick={() => {
            generateAll();
            toast.success("Documentos generados. Revísalos abajo.");
          }}
          className="h-11 w-full rounded-lg text-sm font-bold sm:w-auto sm:self-start sm:px-8"
        >
          <Icon name="Sparkles" className="mr-2 h-4 w-4" />
          Generar documentos
        </Button>
      </CardContent>
    </Card>
  );
}
