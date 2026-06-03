import { useEmpresaStore } from "@/stores/empresa-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Icon } from "@/lib/icon";
import { EMPRESA } from "@/constants/testIds";

export default function ContactoPage() {
  const c = useEmpresaStore((s) => s.contacto);
  const update = useEmpresaStore((s) => s.updateContacto);

  return (
    <EmpresaTwoPanel
      title="Contacto y dirección"
      description="Cómo te pueden encontrar y escribir tus clientes."
      previewLabel="Bloque Contacto (web pública)"
      testIdPage={EMPRESA.page("contacto")}
      formNode={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Email</Label>
            <Input
              data-testid={EMPRESA.contactEmail}
              type="email"
              value={c.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update({ email: e.target.value })
              }
              className="h-11 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Teléfono</Label>
            <Input
              data-testid={EMPRESA.contactPhone}
              value={c.telefono}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update({ telefono: e.target.value })
              }
              className="h-11 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Dirección del taller</Label>
            <Textarea
              data-testid={EMPRESA.contactAddress}
              value={c.direccion}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                update({ direccion: e.target.value })
              }
              rows={2}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Horario</Label>
            <Input
              data-testid={EMPRESA.contactSchedule}
              value={c.horario}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update({ horario: e.target.value })
              }
              className="h-11 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Mapa (enlace o iframe URL)</Label>
            <Input
              data-testid={EMPRESA.contactMap}
              value={c.mapaUrl}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update({ mapaUrl: e.target.value })
              }
              placeholder="https://maps.google.com/?q=…"
              className="h-11 rounded-lg"
            />
            <p className="text-xs text-muted-foreground">
              Pega el enlace de Google Maps o un iframe embed.
            </p>
          </div>
        </>
      }
      previewNode={
        <div
          data-testid={EMPRESA.preview("contacto")}
          className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft-sm md:p-8"
        >
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            Contacto
          </div>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
            Hablemos del taller
          </h1>
          <p className="mt-2 max-w-prose text-sm text-foreground/70">
            Escríbenos o pásate por el taller. Te enseñamos lo que estamos
            haciendo ahora mismo.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-3">
            <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name="Mail" className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Email
                </div>
                <div className="truncate text-sm font-semibold">{c.email}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name="Phone" className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Teléfono
                </div>
                <div className="text-sm font-semibold">{c.telefono}</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name="MapPin" className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Dirección
                </div>
                <div className="text-sm font-semibold">{c.direccion}</div>
                {c.mapaUrl && (
                  <a
                    href={c.mapaUrl}
                    onClick={(e) => e.preventDefault()}
                    className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                  >
                    Ver en el mapa
                    <Icon name="ArrowUpRight" className="h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-border bg-background p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon name="Clock" className="h-4 w-4" />
              </span>
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Horario
                </div>
                <div className="text-sm font-semibold">{c.horario}</div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
