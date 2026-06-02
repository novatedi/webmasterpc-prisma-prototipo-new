// Resolutor de iconos lucide-react por nombre.
import * as Lucide from "lucide-react";
import type { LucideProps } from "lucide-react";

const ICONS = Lucide as unknown as Record<
  string,
  React.ComponentType<LucideProps>
>;

interface IconProps extends LucideProps {
  name: string;
}

export function Icon({ name, ...rest }: IconProps) {
  const Cmp = ICONS[name] ?? Lucide.Square;
  return <Cmp {...rest} />;
}
