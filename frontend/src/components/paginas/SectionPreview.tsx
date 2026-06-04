import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { findDef, type PageSection } from "@/lib/data/paginas";
import { WidgetThumb } from "./WidgetThumb";

/**
 * Render visual aproximado de una sección, según su widget/fondo/contenido.
 * Sirve tanto para preview en banda como en el editor de sección.
 */
export function SectionPreview({
  section,
  density = "normal",
}: {
  section: PageSection;
  density?: "compact" | "normal";
}) {
  const def = findDef(section.kind);
  const widget = def.widgets.find((w) => w.id === section.widgetId) ?? def.widgets[0];
  const isDark = (() => {
    if (section.background.type !== "color") return false;
    const hex = section.background.value.replace("#", "");
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return (r * 0.299 + g * 0.587 + b * 0.114) < 128;
  })();

  const style: React.CSSProperties =
    section.background.type === "image"
      ? {
          backgroundImage: `url(${section.background.value})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : { background: section.background.value };

  const padding = density === "compact" ? "px-4 py-5" : "px-6 py-10 md:px-10 md:py-14";
  const titleSize = density === "compact" ? "text-base" : "text-2xl md:text-3xl";
  const txtCls = isDark ? "text-white" : "text-foreground";
  const mutedCls = isDark ? "text-white/70" : "text-foreground/65";

  // ---- Cabecera común (título + subtítulo + body + cta)
  const heading = (
    <>
      {section.content.title && (
        <h3 className={cn("font-extrabold leading-tight tracking-tight", titleSize, txtCls)}>
          {section.content.title}
        </h3>
      )}
      {section.content.subtitle && (
        <p className={cn("mt-2 max-w-prose text-sm", mutedCls)}>
          {section.content.subtitle}
        </p>
      )}
      {section.content.body && (
        <p className={cn("mt-3 max-w-prose whitespace-pre-line text-sm leading-relaxed", mutedCls)}>
          {section.content.body}
        </p>
      )}
      {section.content.ctaText && (
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="mt-4 rounded-full bg-primary px-5 py-2 text-xs font-bold text-primary-foreground shadow-soft"
        >
          {section.content.ctaText}
        </button>
      )}
    </>
  );

  // ---- Galería de placeholders
  const tiles = (n: number) =>
    Array.from({ length: n }).map((_, i) => (
      <div
        key={i}
        className="aspect-[4/5] rounded-lg"
        style={{ background: isDark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)" }}
      />
    ));

  // ---- Layouts (mismos kind 'preview' que WidgetThumb)
  let body: React.ReactNode = null;
  switch (widget.preview) {
    case "centered":
      body = (
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-2 text-center">
          {heading}
        </div>
      );
      break;
    case "split":
      body = (
        <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
          <div>{heading}</div>
          <div
            className="aspect-[4/3] overflow-hidden rounded-xl bg-muted"
            style={{ background: isDark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)" }}
          >
            {section.content.imageUrl && (
              <img
                src={section.content.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      );
      break;
    case "large-photo":
      body = (
        <div className="flex flex-col gap-5">
          <div
            className="aspect-[16/9] w-full overflow-hidden rounded-xl"
            style={{ background: isDark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.06)" }}
          >
            {section.content.imageUrl && (
              <img
                src={section.content.imageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div>{heading}</div>
        </div>
      );
      break;
    case "fullscreen":
      body = (
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-foreground/10">
          {section.content.imageUrl && (
            <img
              src={section.content.imageUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}
          <div className="relative z-10 flex h-full flex-col justify-end gap-2 p-6 text-white">
            <h3 className="text-2xl font-extrabold drop-shadow md:text-3xl">
              {section.content.title}
            </h3>
            {section.content.subtitle && (
              <p className="max-w-prose text-sm drop-shadow">
                {section.content.subtitle}
              </p>
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      );
      break;
    case "grid-3":
      body = (
        <>
          {heading && <div className="mb-6">{heading}</div>}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">{tiles(3)}</div>
        </>
      );
      break;
    case "grid-4":
      body = (
        <>
          {heading && <div className="mb-6">{heading}</div>}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{tiles(4)}</div>
        </>
      );
      break;
    case "masonry":
      body = (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div
            className="row-span-2 aspect-[4/5] rounded-lg"
            style={{ background: isDark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)" }}
          />
          {tiles(5)}
        </div>
      );
      break;
    case "carousel":
      body = (
        <>
          {heading && <div className="mb-5">{heading}</div>}
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10">
              <Icon name="ChevronLeft" className="h-4 w-4" />
            </span>
            <div
              className="flex-1 rounded-xl p-5 text-center"
              style={{
                background: isDark ? "rgba(255,255,255,.08)" : "rgba(0,0,0,.04)",
              }}
            >
              <p className={cn("text-sm italic", mutedCls)}>
                "Excelente servicio y atención al detalle. Una pieza única que se ha integrado perfectamente en nuestro espacio."
              </p>
              <div className={cn("mt-2 text-xs font-extrabold", txtCls)}>
                María Camila López
              </div>
            </div>
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground/10">
              <Icon name="ChevronRight" className="h-4 w-4" />
            </span>
          </div>
        </>
      );
      break;
    case "single":
      body = (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div
            className="col-span-1 aspect-[4/5] rounded-lg sm:col-span-2"
            style={{ background: isDark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.08)" }}
          />
          <div className="flex flex-col gap-3">
            {tiles(2)}
          </div>
        </div>
      );
      break;
    case "split-map":
      body = (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="aspect-[4/3] rounded-xl bg-emerald-500/20" />
          <div className="flex flex-col gap-3">
            <h3 className={cn("text-xl font-extrabold", txtCls)}>{section.content.title}</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="h-9 rounded-md bg-foreground/10" />
              <div className="h-9 rounded-md bg-foreground/10" />
              <div className="h-20 rounded-md bg-foreground/10" />
              <button className="mt-1 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground">
                Enviar
              </button>
            </div>
          </div>
        </div>
      );
      break;
    case "two-col":
      body = (
        <>
          {heading && <div className="mb-5">{heading}</div>}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-xl p-4"
                style={{
                  background: isDark ? "rgba(255,255,255,.06)" : "rgba(0,0,0,.04)",
                }}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-extrabold">
                  {String(i).padStart(2, "0")}
                </span>
                <div>
                  <div className={cn("text-sm font-extrabold", txtCls)}>Paso {i}</div>
                  <div className={cn("mt-0.5 text-xs", mutedCls)}>
                    Breve descripción del paso del proceso.
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      );
      break;
    case "minimal":
      body = (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className={cn("text-sm font-extrabold", txtCls)}>
            {section.content.title || def.label}
          </div>
          <div className="flex gap-2">
            {["Instagram", "WhatsApp", "Facebook"].map((s) => (
              <span
                key={s}
                className={cn(
                  "rounded-full border px-3 py-1 text-[11px] font-bold",
                  isDark
                    ? "border-white/20 text-white"
                    : "border-border text-foreground",
                )}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      );
      break;
    default:
      body = heading;
  }

  return (
    <section
      className={cn("relative overflow-hidden", padding)}
      style={style}
      aria-label={def.label}
    >
      {density === "compact" && (
        <div className="absolute right-3 top-3">
          <WidgetThumb variant={widget.preview} className="h-9 w-12 bg-background/80" />
        </div>
      )}
      {body}
    </section>
  );
}
