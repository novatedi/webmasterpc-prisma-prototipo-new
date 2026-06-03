import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useArticlesStore } from "@/stores/articles-store";
import { useTopbarActions } from "@/stores/topbar-actions-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { SinglePictureField } from "@/components/empresa/SinglePictureField";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { BLOG } from "@/constants/testIds";
import type { Article } from "@/lib/data/articles";

interface Form {
  title: string;
  excerpt: string;
  content: string;
  coverUrl: string;
  status: Article["status"];
  publishedAt: string;
  readingMinutes: number;
}

const EMPTY: Form = {
  title: "",
  excerpt: "",
  content: "",
  coverUrl: "",
  status: "borrador",
  publishedAt: "",
  readingMinutes: 1,
};

function fromArticle(a: Article): Form {
  return {
    title: a.title,
    excerpt: a.excerpt,
    content: a.content,
    coverUrl: a.coverUrl,
    status: a.status,
    publishedAt: a.publishedAt,
    readingMinutes: a.readingMinutes,
  };
}

function formatDate(iso: string) {
  if (!iso) return "Sin publicar";
  try {
    return new Date(iso).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

/** Convierte texto plano con **bold**, _italic_ y bullets en HTML simple. */
function renderRich(text: string) {
  return text
    .split(/\n{2,}/)
    .map((para, i) => {
      const isList = para.split("\n").every((l) => l.trim().startsWith("• "));
      if (isList) {
        const items = para
          .split("\n")
          .map((l) => l.replace(/^•\s*/, ""))
          .filter(Boolean);
        return (
          <ul key={i} className="my-3 list-disc space-y-1 pl-5 text-foreground/85">
            {items.map((it, j) => (
              <li key={j}>{inline(it)}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="my-3 leading-relaxed text-foreground/85">
          {inline(para)}
        </p>
      );
    });
}

function inline(t: string) {
  // negrita
  const parts: React.ReactNode[] = [];
  let rest = t;
  let key = 0;
  while (rest.length) {
    const bold = rest.match(/\*\*(.+?)\*\*/);
    const ital = rest.match(/_(.+?)_/);
    const next =
      bold && ital
        ? bold.index! < ital.index!
          ? { m: bold, kind: "b" as const }
          : { m: ital, kind: "i" as const }
        : bold
          ? { m: bold, kind: "b" as const }
          : ital
            ? { m: ital, kind: "i" as const }
            : null;
    if (!next) {
      parts.push(rest);
      break;
    }
    if (next.m.index! > 0) parts.push(rest.slice(0, next.m.index));
    if (next.kind === "b") {
      parts.push(
        <strong key={key++} className="font-extrabold text-foreground">
          {next.m[1]}
        </strong>,
      );
    } else {
      parts.push(
        <em key={key++} className="italic">
          {next.m[1]}
        </em>,
      );
    }
    rest = rest.slice(next.m.index! + next.m[0].length);
  }
  return parts;
}

function FormatToolbar({
  onWrap,
  onPrefixLine,
}: {
  onWrap: (a: string, b: string) => void;
  onPrefixLine: (p: string) => void;
}) {
  const cls =
    "flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground";
  return (
    <div className="flex items-center gap-1 rounded-t-md border border-b-0 border-input bg-muted/30 px-2 py-1">
      <button type="button" className={cls} onClick={() => onWrap("**", "**")} aria-label="Negrita">
        <Icon name="Bold" className="h-4 w-4" />
      </button>
      <button type="button" className={cls} onClick={() => onWrap("_", "_")} aria-label="Cursiva">
        <Icon name="Italic" className="h-4 w-4" />
      </button>
      <span className="mx-1 h-5 w-px bg-border" />
      <button type="button" className={cls} onClick={() => onPrefixLine("• ")} aria-label="Lista">
        <Icon name="List" className="h-4 w-4" />
      </button>
      <button type="button" className={cls} onClick={() => onPrefixLine("## ")} aria-label="Subtítulo">
        <Icon name="Heading2" className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function EditarArticulo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id || id === "nuevo";
  const store = useArticlesStore();
  const setActions = useTopbarActions((s) => s.set);
  const clearActions = useTopbarActions((s) => s.clear);
  const existing = !isNew ? store.getById(id!) : undefined;

  const [form, setForm] = useState<Form>(existing ? fromArticle(existing) : EMPTY);
  const taRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!isNew && !existing) navigate("/blog/articulos", { replace: true });
  }, [isNew, existing, navigate]);

  const set = <K extends keyof Form>(k: K, v: Form[K]) =>
    setForm((s) => ({ ...s, [k]: v }));

  const save = (nextStatus: Article["status"]) => {
    if (!form.title.trim()) {
      toast.error("El artículo necesita un título.");
      return;
    }
    const wordCount = form.content.trim().split(/\s+/).length;
    const reading = Math.max(1, Math.round(wordCount / 180));

    const publishedAt =
      nextStatus === "publicado" && !form.publishedAt
        ? new Date().toISOString().slice(0, 10)
        : form.publishedAt;

    if (isNew) {
      const newId = `art-${Date.now()}`;
      store.add({
        id: newId,
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        coverUrl: form.coverUrl,
        status: nextStatus,
        publishedAt,
        author: "Maestro Carballo",
        readingMinutes: reading,
      });
      toast.success(
        nextStatus === "publicado" ? "Artículo publicado" : "Borrador guardado",
      );
      navigate(`/blog/articulo/${newId}`, { replace: true });
    } else {
      store.update(id!, {
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        coverUrl: form.coverUrl,
        status: nextStatus,
        publishedAt,
        readingMinutes: reading,
      });
      toast.success(
        nextStatus === "publicado" ? "Cambios publicados" : "Borrador actualizado",
      );
    }
    set("status", nextStatus);
    if (publishedAt !== form.publishedAt) set("publishedAt", publishedAt);
  };

  useEffect(() => {
    setActions(
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          data-testid={BLOG.formDraft}
          onClick={() => save("borrador")}
          className="h-10 gap-2 rounded-full font-semibold"
        >
          <Icon name="Save" className="h-4 w-4" />
          Borrador
        </Button>
        <Button
          type="button"
          data-testid={BLOG.formPublish}
          onClick={() => save("publicado")}
          className="h-10 gap-2 rounded-full bg-primary px-5 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Icon name="Rocket" className="h-4 w-4" />
          Publicar
        </Button>
      </div>,
    );
    return () => clearActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  const wrap = (l: string, r: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const before = form.content.slice(0, start);
    const sel = form.content.slice(start, end) || "texto";
    const after = form.content.slice(end);
    set("content", before + l + sel + r + after);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(start + l.length, start + l.length + sel.length);
    });
  };
  const prefixLine = (p: string) => {
    const ta = taRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    const before = form.content.slice(0, pos);
    const after = form.content.slice(pos);
    const startOfLine = before.lastIndexOf("\n") + 1;
    set(
      "content",
      before.slice(0, startOfLine) + p + before.slice(startOfLine) + after,
    );
  };

  const readingPreview = Math.max(
    1,
    Math.round((form.content.trim().split(/\s+/).length || 1) / 180),
  );

  return (
    <EmpresaTwoPanel
      title={isNew ? "Nuevo artículo" : form.title || "Editar artículo"}
      description="Cuenta lo que pasa en el taller. La vista previa muestra cómo se verá en el blog público."
      previewLabel="Artículo (web pública)"
      testIdPage={BLOG.editor}
      formNode={
        <>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                form.status === "publicado"
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                  : "bg-amber-500/10 text-amber-700 dark:text-amber-400",
              )}
            >
              {form.status}
            </span>
            <button
              onClick={() => navigate("/blog/articulos")}
              className="ml-auto flex items-center gap-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <Icon name="ChevronLeft" className="h-3 w-3" />
              Volver
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Título</Label>
            <Input
              data-testid={BLOG.formTitle}
              value={form.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                set("title", e.target.value)
              }
              placeholder="Ej. El proceso detrás de…"
              className="h-11 rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Resumen</Label>
            <Textarea
              data-testid={BLOG.formExcerpt}
              value={form.excerpt}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                set("excerpt", e.target.value)
              }
              rows={2}
              placeholder="Una o dos frases que invitan a leer."
              className="rounded-lg"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Imagen de portada</Label>
            <SinglePictureField
              url={form.coverUrl}
              onChange={(u) => set("coverUrl", u)}
              aspect="video"
              testIdImage={BLOG.formCover}
              testIdButton={BLOG.formCoverBtn}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Contenido</Label>
            <FormatToolbar onWrap={wrap} onPrefixLine={prefixLine} />
            <Textarea
              ref={taRef}
              data-testid={BLOG.formContent}
              value={form.content}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                set("content", e.target.value)
              }
              rows={12}
              placeholder="Escribe el cuerpo del artículo. Doble salto para empezar otro párrafo."
              className="rounded-b-md rounded-t-none border-t-0 font-medium leading-relaxed"
            />
            <p className="text-xs text-muted-foreground">
              **negrita** · _cursiva_ · empieza una línea con • para una lista o ## para
              un subtítulo. Aprox. {readingPreview} min de lectura.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label>Fecha de publicación</Label>
              <Input
                type="date"
                data-testid={BLOG.formDate}
                value={form.publishedAt}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  set("publishedAt", e.target.value)
                }
                className="h-11 rounded-lg"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Estado</Label>
              <select
                data-testid={BLOG.formStatus}
                value={form.status}
                onChange={(e) =>
                  set("status", e.target.value as Article["status"])
                }
                className="h-11 rounded-lg border border-input bg-background px-3 text-sm font-semibold"
              >
                <option value="borrador">Borrador</option>
                <option value="publicado">Publicado</option>
              </select>
            </div>
          </div>
        </>
      }
      previewNode={
        <article
          data-testid={BLOG.preview}
          className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft-sm"
        >
          <div className="aspect-[16/9] w-full bg-muted">
            {form.coverUrl ? (
              <img
                src={form.coverUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Icon name="Image" className="h-10 w-10 opacity-50" />
              </div>
            )}
          </div>
          <div className="px-6 py-8 md:px-10 md:py-10">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
              Diario del taller
            </div>
            <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-tight text-foreground">
              {form.title || "Sin título"}
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">Maestro Carballo</span>
              <span>·</span>
              <span>{formatDate(form.publishedAt)}</span>
              <span>·</span>
              <span>{readingPreview} min de lectura</span>
            </div>
            {form.excerpt && (
              <p className="mt-5 max-w-prose border-l-2 border-primary/40 pl-4 text-base font-semibold leading-relaxed text-foreground/80">
                {form.excerpt}
              </p>
            )}
            {form.content && (
              <div className="mt-6 max-w-prose text-sm">{renderRich(form.content)}</div>
            )}
          </div>
        </article>
      }
    />
  );
}
