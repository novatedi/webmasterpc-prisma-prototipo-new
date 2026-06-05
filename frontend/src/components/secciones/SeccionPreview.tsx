import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import type { SectionType } from "@/lib/data/secciones";

/* Primitivas visuales */
const Img = ({ className }: { className?: string }) => (
  <div
    className={cn(
      "flex items-center justify-center rounded-lg bg-muted text-muted-foreground/50",
      className,
    )}
  >
    <Icon name="Image" className="h-5 w-5" />
  </div>
);

const Bar = ({ w = "100%" }: { w?: string }) => (
  <div className="h-2 rounded-full bg-muted" style={{ width: w }} />
);

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold text-primary-foreground">
      {children}
    </span>
  );
}

interface Props {
  section: SectionType;
  presetId: string;
}

export function SeccionPreview({ section, presetId }: Props) {
  const s = section.sample;
  const t = (k: string) => String(s[k] ?? "");

  let body: React.ReactNode = null;

  if (section.id === "hero") {
    if (presetId === "split")
      body = (
        <div className="grid grid-cols-2 items-center gap-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-extrabold text-foreground">{t("titulo")}</h3>
            <p className="text-xs text-muted-foreground">{t("subtitulo")}</p>
            <Pill>{t("ctaTexto")}</Pill>
          </div>
          <Img className="h-28" />
        </div>
      );
    else if (presetId === "centrado")
      body = (
        <div className="relative flex h-36 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl bg-foreground/80 text-center">
          <h3 className="text-xl font-extrabold text-white">{t("titulo")}</h3>
          <p className="px-6 text-xs text-white/80">{t("subtitulo")}</p>
          <Pill>{t("ctaTexto")}</Pill>
        </div>
      );
    else
      body = (
        <div className="flex flex-col items-start gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Estudio</span>
          <h3 className="text-2xl font-extrabold text-foreground">{t("titulo")}</h3>
          <div className="h-0.5 w-16 bg-primary" />
          <p className="text-xs text-muted-foreground">{t("subtitulo")}</p>
        </div>
      );
  } else if (section.id === "obras-destacadas") {
    const head = (
      <div className="mb-3">
        <h3 className="text-base font-extrabold text-foreground">{t("titulo")}</h3>
        <p className="text-xs text-muted-foreground">{t("subtitulo")}</p>
      </div>
    );
    if (presetId === "grid")
      body = (
        <div>
          {head}
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col gap-1.5">
                <Img className="h-20" />
                <Bar w="80%" />
                {s.mostrarPrecio && <Bar w="40%" />}
              </div>
            ))}
          </div>
        </div>
      );
    else if (presetId === "carrusel")
      body = (
        <div>
          {head}
          <Img className="h-28" />
          <div className="mt-3 flex justify-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className={cn("h-1.5 w-1.5 rounded-full", i === 0 ? "bg-primary" : "bg-muted")} />
            ))}
          </div>
        </div>
      );
    else
      body = (
        <div>
          {head}
          <div className="grid grid-cols-2 gap-3">
            <Img className="h-32" />
            <div className="flex flex-col gap-3">
              <Img className="h-[58px]" />
              <Img className="h-[58px]" />
            </div>
          </div>
        </div>
      );
  } else if (section.id === "galeria") {
    if (presetId === "masonry")
      body = (
        <div className="grid grid-cols-3 gap-2">
          <Img className="h-28" />
          <div className="flex flex-col gap-2"><Img className="h-16" /><Img className="h-10" /></div>
          <Img className="h-24" />
        </div>
      );
    else if (presetId === "editorial")
      body = (
        <div className="grid grid-cols-2 items-center gap-4">
          <Img className="h-32" />
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-bold text-foreground">{t("titulo")}</h3>
            <Bar /><Bar w="90%" /><Bar w="70%" />
          </div>
        </div>
      );
    else
      body = (
        <div className="grid grid-cols-4 gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <Img key={i} className="h-14" />)}
        </div>
      );
  } else if (section.id === "prensa") {
    if (presetId === "logos")
      body = (
        <div className="text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">{t("titulo")}</p>
          <div className="flex items-center justify-around gap-3 opacity-70">
            {[0, 1, 2, 3].map((i) => <div key={i} className="h-6 w-16 rounded bg-muted" />)}
          </div>
        </div>
      );
    else if (presetId === "citas")
      body = (
        <div className="rounded-xl border border-border bg-card p-5 text-center">
          <Icon name="Quote" className="mx-auto mb-2 h-6 w-6 text-primary" />
          <p className="text-sm font-semibold italic text-foreground">"Una obra que respira oficio."</p>
          <p className="mt-2 text-xs text-muted-foreground">— Revista Arte Hoy</p>
        </div>
      );
    else
      body = (
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-lg border border-border p-3">
              <div className="mb-2 h-4 w-10 rounded bg-muted" />
              <Bar /><div className="mt-1.5"><Bar w="60%" /></div>
            </div>
          ))}
        </div>
      );
  } else if (section.id === "estadisticas") {
    const stats = [t("dato1"), t("dato2"), t("dato3")];
    if (presetId === "tarjetas")
      body = (
        <div className="grid grid-cols-3 gap-3">
          {stats.map((d, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-4 text-center">
              <div className="text-lg font-extrabold text-primary">{d}</div>
            </div>
          ))}
        </div>
      );
    else if (presetId === "destacado")
      body = (
        <div className="grid grid-cols-3 items-center gap-3">
          <div className="col-span-1 rounded-xl bg-primary p-5 text-center text-primary-foreground">
            <div className="text-2xl font-extrabold">{stats[0]}</div>
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-3">
            {stats.slice(1).map((d, i) => (
              <div key={i} className="rounded-xl border border-border p-4 text-center text-base font-extrabold text-foreground">{d}</div>
            ))}
          </div>
        </div>
      );
    else
      body = (
        <div className="flex items-center justify-around text-center">
          {stats.map((d, i) => (
            <div key={i}>
              <div className="text-xl font-extrabold text-foreground">{d}</div>
              <div className="mt-1 h-1 w-8 rounded bg-primary" />
            </div>
          ))}
        </div>
      );
  } else if (section.id === "contacto") {
    if (presetId === "split")
      body = (
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-extrabold text-foreground">{t("titulo")}</h3>
            <span className="text-xs text-muted-foreground">{t("email")}</span>
            <span className="text-xs text-muted-foreground">{t("telefono")}</span>
            {s.mostrarMapa && <Img className="h-16" />}
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-border p-3">
            <div className="h-8 rounded-md bg-muted" />
            <div className="h-8 rounded-md bg-muted" />
            <Pill>Enviar</Pill>
          </div>
        </div>
      );
    else if (presetId === "minimal")
      body = (
        <div className="flex flex-col items-center gap-2 text-center">
          <h3 className="text-base font-extrabold text-foreground">{t("titulo")}</h3>
          <div className="flex gap-2">
            <span className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold">{t("email")}</span>
            <span className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold">{t("telefono")}</span>
          </div>
        </div>
      );
    else
      body = (
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-extrabold text-foreground">{t("titulo")}</h3>
          <div className="h-9 rounded-md bg-muted" />
          <div className="h-9 rounded-md bg-muted" />
          <div className="h-16 rounded-md bg-muted" />
          <Pill>Enviar mensaje</Pill>
        </div>
      );
  } else if (section.id === "faq") {
    const head = <h3 className="mb-3 text-base font-extrabold text-foreground">{t("titulo")}</h3>;
    if (presetId === "dos-columnas")
      body = (
        <div>{head}
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-border p-3"><Bar w="70%" /></div>
            ))}
          </div>
        </div>
      );
    else if (presetId === "lista")
      body = (
        <div>{head}
          <div className="flex flex-col gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="border-b border-border pb-2"><Bar w={`${80 - i * 8}%`} /></div>
            ))}
          </div>
        </div>
      );
    else
      body = (
        <div>{head}
          <div className="flex flex-col gap-2">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                <Bar w="60%" />
                <Icon name="ChevronDown" className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      );
  } else if (section.id === "cta") {
    if (presetId === "banner")
      body = (
        <div className="flex items-center justify-between gap-4 rounded-xl bg-primary p-5 text-primary-foreground">
          <div>
            <h3 className="text-base font-extrabold">{t("titulo")}</h3>
            <p className="text-xs opacity-85">{t("texto")}</p>
          </div>
          <span className="shrink-0 rounded-full bg-white px-4 py-2 text-xs font-bold text-primary">{t("botonTexto")}</span>
        </div>
      );
    else if (presetId === "franja")
      body = (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3">
          <span className="text-sm font-bold text-foreground">{t("titulo")}</span>
          <Pill>{t("botonTexto")}</Pill>
        </div>
      );
    else
      body = (
        <div className="flex flex-col items-center gap-2 py-2 text-center">
          <h3 className="text-lg font-extrabold text-foreground">{t("titulo")}</h3>
          <p className="px-6 text-xs text-muted-foreground">{t("texto")}</p>
          <Pill>{t("botonTexto")}</Pill>
        </div>
      );
  }

  return (
    <div className="rounded-xl bg-background p-5">{body}</div>
  );
}
