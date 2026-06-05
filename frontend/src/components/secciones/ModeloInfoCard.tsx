import { Icon } from "@/lib/icon";
import { SECCIONES } from "@/constants/testIds";

export function ModeloInfoCard() {
  return (
    <div
      data-testid={SECCIONES.infoCard}
      className="flex flex-col gap-3 rounded-2xl border border-primary/25 bg-primary/5 p-5 sm:flex-row sm:items-center"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
        <Icon name="Boxes" className="h-5 w-5" />
      </span>
      <p className="text-sm leading-relaxed text-foreground/85">
        <span className="font-extrabold">Contrato (slots)</span> = qué datos
        lleva la sección. <span className="font-extrabold">Preset (widget)</span>{" "}
        = cómo se ve. Una misma sección puede mostrarse con varios diseños
        cargando el mismo contenido.
      </p>
    </div>
  );
}
