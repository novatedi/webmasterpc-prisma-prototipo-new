import { useLegalStore } from "@/stores/legal-store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Icon } from "@/lib/icon";
import { LEGAL } from "@/constants/testIds";

const FORM_TARGETS: { key: string; label: string; icon: string }[] = [
  { key: "formularioContacto", label: "Formulario de contacto", icon: "MessageSquare" },
  { key: "agendaCitas", label: "Agenda de citas", icon: "CalendarClock" },
  { key: "newsletter", label: "Newsletter", icon: "MailOpen" },
];

export function ClausulaFormularios() {
  const situacion = useLegalStore((s) => s.situacion);
  const formsClause = useLegalStore((s) => s.formsClause);
  const setFormsClause = useLegalStore((s) => s.setFormsClause);

  const targets = FORM_TARGETS.filter(
    (t) => situacion[t.key as keyof typeof situacion],
  );

  return (
    <Card
      data-testid={LEGAL.formsCard}
      className="rounded-2xl border-border bg-card shadow-soft-sm"
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <Icon name="CheckSquare" className="h-5 w-5 text-primary" strokeWidth={2} />
          Cláusula de formularios
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          El texto de consentimiento que se añade automáticamente a tus
          formularios.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-2">
        <Textarea
          data-testid={LEGAL.formsEditor}
          value={formsClause}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormsClause(e.target.value)
          }
          placeholder='Pulsa "Generar documentos" para crear la cláusula.'
          rows={6}
          className="rounded-lg text-sm leading-relaxed"
        />
        <div>
          <div className="mb-2 text-xs font-bold text-foreground">
            Se enlaza automáticamente en:
          </div>
          {targets.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {targets.map((t) => (
                <span
                  key={t.key}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground"
                >
                  <Icon name={t.icon} className="h-3.5 w-3.5 text-primary" />
                  {t.label}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">
              Activa algún formulario en "Tu situación" para enlazarlo aquí.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
