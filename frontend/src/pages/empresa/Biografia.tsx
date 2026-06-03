import { useEmpresaStore } from "@/stores/empresa-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { SinglePictureField } from "@/components/empresa/SinglePictureField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { EMPRESA } from "@/constants/testIds";

export default function BiografiaPage() {
  const bio = useEmpresaStore((s) => s.biografia);
  const update = useEmpresaStore((s) => s.updateBiografia);

  return (
    <EmpresaTwoPanel
      title="Biografía del artista"
      description="Una página personal: quién eres y de dónde vienes."
      previewLabel="Bloque Biografía (web pública)"
      testIdPage={EMPRESA.page("biografia")}
      formNode={
        <>
          <div className="flex flex-col gap-1.5">
            <Label>Título</Label>
            <Input
              data-testid={EMPRESA.bioTitle}
              value={bio.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                update({ title: e.target.value })
              }
              className="h-11 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label>Texto principal</Label>
            <Textarea
              data-testid={EMPRESA.bioBody}
              value={bio.body}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                update({ body: e.target.value })
              }
              rows={10}
              className="rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Foto del artista</Label>
            <SinglePictureField
              url={bio.photoUrl}
              onChange={(url) => update({ photoUrl: url })}
              aspect="portrait"
              buttonText="Cambiar foto"
              testIdButton={EMPRESA.bioPhotoBtn}
            />
          </div>
        </>
      }
      previewNode={
        <div
          data-testid={EMPRESA.preview("biografia")}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm"
        >
          <div className="grid grid-cols-1 gap-0 md:grid-cols-[260px_1fr]">
            <div className="aspect-[3/4] bg-muted">
              <img
                src={bio.photoUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
                Biografía
              </div>
              <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-foreground">
                {bio.title || "Sin título"}
              </h1>
              <p className="whitespace-pre-line text-sm leading-relaxed text-foreground/80">
                {bio.body}
              </p>
            </div>
          </div>
        </div>
      }
    />
  );
}
