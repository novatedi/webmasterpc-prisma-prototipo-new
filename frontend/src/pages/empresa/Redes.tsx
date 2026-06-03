import { useEmpresaStore } from "@/stores/empresa-store";
import { EmpresaTwoPanel } from "@/components/empresa/EmpresaTwoPanel";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { EMPRESA } from "@/constants/testIds";
import { toast } from "sonner";
import type { RedSocial } from "@/lib/data/empresa";

const PLATFORMS: { value: RedSocial["platform"]; label: string; icon: string }[] = [
  { value: "instagram", label: "Instagram", icon: "Instagram" },
  { value: "facebook", label: "Facebook", icon: "Facebook" },
  { value: "whatsapp", label: "WhatsApp", icon: "MessageCircle" },
  { value: "youtube", label: "YouTube", icon: "Youtube" },
];

export default function RedesPage() {
  const r = useEmpresaStore((s) => s.redes);
  const update = useEmpresaStore((s) => s.updateRedes);

  const add = (platform: RedSocial["platform"]) => {
    const def = PLATFORMS.find((p) => p.value === platform)!;
    const item: RedSocial = {
      id: `red-${Date.now()}`,
      platform,
      label: def.label,
      icon: def.icon,
      url: "",
      active: true,
    };
    update({ items: [...r.items, item] });
    toast.success(`${def.label} añadido`);
  };

  const upd = (id: string, patch: Partial<RedSocial>) =>
    update({ items: r.items.map((it) => (it.id === id ? { ...it, ...patch } : it)) });

  const remove = (id: string) => {
    update({ items: r.items.filter((it) => it.id !== id) });
    toast.success("Red eliminada");
  };

  const activeItems = r.items.filter((it) => it.active);

  return (
    <EmpresaTwoPanel
      title="Redes sociales"
      description="Los enlaces que aparecerán en el pie de tu web y en la cabecera."
      previewLabel="Bloque Redes (web pública)"
      testIdPage={EMPRESA.page("redes")}
      formNode={
        <>
          <div className="flex flex-col gap-3">
            {r.items.map((it) => (
              <div
                key={it.id}
                data-testid={EMPRESA.redItem(it.id)}
                className="flex items-center gap-3 rounded-xl border border-border bg-background p-3"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon name={it.icon} className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-extrabold">{it.label}</div>
                  <Input
                    data-testid={EMPRESA.redUrl(it.id)}
                    value={it.url}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      upd(it.id, { url: e.target.value })
                    }
                    placeholder="https://…"
                    className="mt-1 h-9 rounded-md text-sm"
                  />
                </div>
                <Switch
                  data-testid={EMPRESA.redToggle(it.id)}
                  checked={it.active}
                  onCheckedChange={(v: boolean) => upd(it.id, { active: v })}
                />
                <button
                  type="button"
                  onClick={() => remove(it.id)}
                  data-testid={EMPRESA.redRemove(it.id)}
                  aria-label="Eliminar"
                  className="flex h-10 w-10 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Icon name="Trash2" className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-2 border-t border-border pt-5">
            <div className="mb-2 text-sm font-bold">Añadir red</div>
            <div className="flex flex-wrap gap-2" data-testid={EMPRESA.redAdd}>
              {PLATFORMS.map((p) => (
                <Button
                  key={p.value}
                  type="button"
                  variant="outline"
                  onClick={() => add(p.value)}
                  className="h-10 gap-2 rounded-full font-semibold"
                >
                  <Icon name={p.icon} className="h-4 w-4" />
                  {p.label}
                </Button>
              ))}
            </div>
          </div>
        </>
      }
      previewNode={
        <div
          data-testid={EMPRESA.preview("redes")}
          className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft-sm md:p-8"
        >
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
            Sígueme
          </div>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
            Día a día del taller
          </h1>
          <p className="mt-2 max-w-prose text-sm text-foreground/70">
            Donde voy contando piezas en marcha, encargos y exposiciones.
          </p>

          {activeItems.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-border bg-background p-6 text-center text-sm text-muted-foreground">
              Activa al menos una red para que aparezca aquí.
            </div>
          ) : (
            <div className="mt-6 flex flex-wrap gap-2">
              {activeItems.map((it) => (
                <a
                  key={it.id}
                  href={it.url || "#"}
                  onClick={(e) => e.preventDefault()}
                  className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-xs font-bold transition-colors hover:border-primary hover:text-primary"
                >
                  <Icon name={it.icon} className="h-4 w-4" />
                  {it.label}
                </a>
              ))}
            </div>
          )}
        </div>
      }
    />
  );
}
