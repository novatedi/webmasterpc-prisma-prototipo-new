import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePaginasStore } from "@/stores/paginas-store";
import { useTopbarActions } from "@/stores/topbar-actions-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { SinglePictureField } from "@/components/empresa/SinglePictureField";
import { SectionPreview } from "@/components/paginas/SectionPreview";
import { WidgetPicker } from "@/components/paginas/WidgetPicker";
import { BackgroundPicker } from "@/components/paginas/BackgroundPicker";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { toast } from "sonner";
import { findDef } from "@/lib/data/paginas";
import { PAGINAS } from "@/constants/testIds";

export default function EditarSeccion() {
  const { pageId, sectionId } = useParams();
  const navigate = useNavigate();
  const {
    getPage,
    getSection,
    updateContent,
    setWidget,
    setBackground,
  } = usePaginasStore();
  const setActions = useTopbarActions((s) => s.set);
  const clearActions = useTopbarActions((s) => s.clear);

  const page = getPage(pageId!);
  const section = getSection(pageId!, sectionId!);

  useEffect(() => {
    if (!page || !section) navigate("/paginas", { replace: true });
  }, [page, section, navigate]);

  useEffect(() => {
    setActions(
      <Button
        type="button"
        variant="outline"
        onClick={() => navigate(`/paginas/${pageId}`)}
        className="h-10 gap-2 rounded-full font-semibold"
      >
        <Icon name="ArrowLeft" className="h-4 w-4" />
        Volver a la página
      </Button>,
    );
    return () => clearActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!page || !section) return null;
  const def = findDef(section.kind);

  const set = <K extends keyof typeof section.content>(
    k: K,
    v: (typeof section.content)[K],
  ) => updateContent(page.id, section.id, { [k]: v } as Partial<typeof section.content>);

  return (
    <EmpresaTwoPanel
      title={`${page.name} · ${def.label}`}
      description="Edita el contenido. La vista previa de la derecha muestra cómo se verá con el layout y el fondo elegidos."
      previewLabel={`Sección — ${def.label}`}
      testIdPage={PAGINAS.sectionEditor}
      formNode={
        <>
          {/* Layout + Fondo */}
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-background p-3">
            <WidgetPicker
              section={section}
              onSelect={(wid) => setWidget(page.id, section.id, wid)}
            />
            <BackgroundPicker
              background={section.background}
              onChange={(bg) => setBackground(page.id, section.id, bg)}
            />
            <p className="ml-auto max-w-[18ch] text-[11px] text-muted-foreground">
              Cambia layout y fondo: lo verás al instante a la derecha.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Título</Label>
            <Input
              data-testid={PAGINAS.contentTitle}
              value={section.content.title ?? ""}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                set("title", e.target.value)
              }
              className="h-11 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Subtítulo / bajada</Label>
            <Textarea
              data-testid={PAGINAS.contentSubtitle}
              value={section.content.subtitle ?? ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                set("subtitle", e.target.value)
              }
              rows={2}
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Cuerpo</Label>
            <Textarea
              data-testid={PAGINAS.contentBody}
              value={section.content.body ?? ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                set("body", e.target.value)
              }
              rows={5}
              placeholder="Texto largo de la sección."
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Imagen de la sección</Label>
            <SinglePictureField
              url={section.content.imageUrl ?? ""}
              onChange={(u) => set("imageUrl", u)}
              aspect="video"
              testIdImage={PAGINAS.contentImage}
              testIdButton={PAGINAS.contentImageBtn}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>Texto del botón</Label>
              <Input
                data-testid={PAGINAS.contentCtaText}
                value={section.content.ctaText ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  set("ctaText", e.target.value)
                }
                placeholder="Ver obras"
                className="h-11 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Enlace del botón</Label>
              <Input
                data-testid={PAGINAS.contentCtaHref}
                value={section.content.ctaHref ?? ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  set("ctaHref", e.target.value)
                }
                placeholder="/obras"
                className="h-11 rounded-lg"
              />
            </div>
          </div>

          <div className="flex gap-3 border-t border-border pt-5">
            <Button
              type="button"
              onClick={() => {
                toast.success("Cambios guardados");
                navigate(`/paginas/${page.id}`);
              }}
              className="h-11 flex-1 gap-2 rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90"
            >
              <Icon name="Check" className="h-4 w-4" />
              Listo
            </Button>
          </div>
        </>
      }
      previewNode={
        <div
          data-testid={PAGINAS.sectionPreview}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm"
        >
          <SectionPreview section={section} />
        </div>
      }
    />
  );
}
