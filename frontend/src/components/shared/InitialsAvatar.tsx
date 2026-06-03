import { cn } from "@/lib/utils";

const COLORS = [
  { bg: "bg-primary/15", fg: "text-primary" },
  { bg: "bg-amber-500/15", fg: "text-amber-700 dark:text-amber-300" },
  { bg: "bg-emerald-500/15", fg: "text-emerald-700 dark:text-emerald-300" },
  { bg: "bg-rose-500/15", fg: "text-rose-700 dark:text-rose-300" },
  { bg: "bg-sky-500/15", fg: "text-sky-700 dark:text-sky-300" },
  { bg: "bg-violet-500/15", fg: "text-violet-700 dark:text-violet-300" },
];

function colorFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return COLORS[h % COLORS.length];
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  const first = parts[0][0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

interface Props {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE: Record<NonNullable<Props["size"]>, string> = {
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
};

/** Avatar circular con iniciales y color asignado de forma determinista. */
export function InitialsAvatar({ name, size = "md", className }: Props) {
  const c = colorFor(name);
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-extrabold tracking-tight",
        SIZE[size],
        c.bg,
        c.fg,
        className,
      )}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
