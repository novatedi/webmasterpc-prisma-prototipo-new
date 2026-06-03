import { Icon } from "@/lib/icon";
import { cn } from "@/lib/utils";

/** Renderiza N estrellas con soporte para medias (.5). */
export function StarRating({
  value,
  size = 16,
  className,
}: {
  value: number;
  size?: number;
  className?: string;
}) {
  const stars = [1, 2, 3, 4, 5].map((i) => {
    const filled = value >= i;
    const half = !filled && value >= i - 0.5;
    return { i, filled, half };
  });

  return (
    <div
      className={cn("flex items-center gap-0.5 text-amber-400", className)}
      aria-label={`Valoración ${value} de 5`}
      role="img"
    >
      {stars.map(({ i, filled, half }) => (
        <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
          <Icon
            name="Star"
            className="absolute inset-0 text-muted-foreground/30"
            style={{ width: size, height: size }}
            strokeWidth={1.8}
          />
          {filled && (
            <Icon
              name="Star"
              className="absolute inset-0 fill-current text-amber-400"
              style={{ width: size, height: size }}
              strokeWidth={1.8}
            />
          )}
          {half && (
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: size / 2 }}
            >
              <Icon
                name="Star"
                className="fill-current text-amber-400"
                style={{ width: size, height: size }}
                strokeWidth={1.8}
              />
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
