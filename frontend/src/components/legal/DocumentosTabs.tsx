import { useState } from "react";
import { useLegalStore, docStatus, type DocMode } from "@/stores/legal-store";
import { LEGAL_DOCS } from "@/lib/data/legal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { LEGAL } from "@/constants/testIds";
import { LegalDisclaimer } from "./LegalDisclaimer";

function ModeToggle({ id, mode }: { id: string; mode: DocMode }) {
  const setDocMode = useLegalStore((s) => s.setDocMode);
  return (
    <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-background p-1">
      <button
        data-testid={LEGAL.docModeGen(id)}
        onClick={() => setDocMode(id, "generate")}
        className={cn(
          "rounded-md px-3 py-1.5 text-xs font-bold transition-colors",
          mode === "generate"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        No, genérame uno
      </button>
      <button
        data-testid={LEGAL.docModeOwn(id)}
        onClick={() => setDocMode(id, "own")}
        className={cn(
          "rounded-md px-3 py-1.5 text-xs font-bold transition-colors",
          mode === "own"
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        Sí, uso los míos
      </button>
    </div>
  );
}

export function DocumentosTabs() {
  const situacion = useLegalStore((s) => s.situacion);
  const docs = useLegalStore((s) => s.docs);
  const setDocContent = useLegalStore((s) => s.setDocContent);
  const setOwnContent = useLegalStore((s) => s.setOwnContent);

  const activeDocs = LEGAL_DOCS.filter((d) => d.always || situacion.ventaOnline);
  const [tab, setTab] = useState(activeDocs[0]?.id ?? "aviso-legal");
  const current = activeDocs.find((d) => d.id === tab) ?? activeDocs[0];

  return (
    <Card
      data-testid={LEGAL.docsTabs}
      className="rounded-2xl border-border bg-card shadow-soft-sm"
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-bold">
          <Icon name="FileText" className="h-5 w-5 text-primary" strokeWidth={2} />
          Documentos generados
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          {activeDocs.length} documentos para tu caso. Retócalos a tu gusto.
        </p>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 pt-2">
        <LegalDisclaimer />
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="flex h-auto flex-wrap justify-start gap-1 bg-muted/50 p-1">
            {activeDocs.map((d) => {
              const st = docStatus(docs[d.id]);
              return (
                <TabsTrigger
                  key={d.id}
                  value={d.id}
                  data-testid={LEGAL.docTab(d.id)}
                  className="gap-2 rounded-md text-xs font-semibold data-[state=active]:bg-card"
                >
                  {d.title}
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      st === "completo" ? "bg-emerald-500" : "bg-amber-500",
                    )}
                  />
                </TabsTrigger>
              );
            })}
          </TabsList>

          {activeDocs.map((d) => {
            const doc = docs[d.id];
            const st = docStatus(doc);
            return (
              <TabsContent key={d.id} value={d.id} className="mt-4 flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm text-muted-foreground">
                    ¿Tienes tus propios textos?
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      data-testid={LEGAL.docStatus(d.id)}
                      className={cn(
                        "rounded-full px-2.5 py-1 text-xs font-bold",
                        st === "completo"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-500/10 text-amber-600 dark:text-amber-400",
                      )}
                    >
                      {st === "completo" ? "Completo" : "Pendiente"}
                    </span>
                    <ModeToggle id={d.id} mode={doc.mode} />
                  </div>
                </div>

                {doc.mode === "own" ? (
                  <Textarea
                    data-testid={LEGAL.docEditor(d.id)}
                    value={doc.ownContent}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setOwnContent(d.id, e.target.value)
                    }
                    placeholder="Pega aquí tu propio texto legal…"
                    rows={16}
                    className="rounded-lg font-mono text-xs leading-relaxed"
                  />
                ) : (
                  <Textarea
                    data-testid={LEGAL.docEditor(d.id)}
                    value={doc.content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setDocContent(d.id, e.target.value)
                    }
                    placeholder='Pulsa "Generar documentos" arriba para crear este texto.'
                    rows={16}
                    className="rounded-lg font-mono text-xs leading-relaxed"
                  />
                )}
                <p className="text-xs text-muted-foreground">
                  Se publicará en{" "}
                  <span className="font-mono font-semibold text-foreground">
                    {current?.slug}
                  </span>
                </p>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  );
}
