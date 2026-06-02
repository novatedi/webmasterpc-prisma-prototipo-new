import { useParams } from "react-router-dom";
import { PlaceholderPage } from "@/components/shell/PlaceholderPage";
import { sections } from "@/lib/navigation";
import { PAGES } from "@/constants/testIds";

interface Props {
  sectionId: keyof typeof PAGES;
}

const ICONS: Record<string, string> = {
  empresa: "Building2",
  servicios: "Boxes",
  blog: "PenSquare",
  obras: "Hammer",
  consultas: "MessageSquare",
  resenas: "Star",
  ajustes: "Settings",
};

const DESCRIPTIONS: Record<string, string> = {
  empresa:
    "Aquí podrás editar la historia del taller, tu biografía, tu filosofía y los datos de contacto que aparecen en tu web.",
  servicios:
    "Define los servicios que ofreces a galerías y particulares: catálogo, encargos y talleres.",
  blog:
    "Escribe entradas para contar el proceso creativo de tu taller a tus visitantes.",
  obras:
    "Sube y organiza tus esculturas. Cada obra tendrá ficha, fotos y categoría.",
  consultas:
    "Aquí aparecerán los mensajes que te lleguen desde el formulario de contacto de tu web.",
  resenas:
    "Modera las reseñas que dejan clientes y colaboradores. Puedes aprobarlas o ocultarlas.",
  ajustes:
    "Personaliza tu marca, tu perfil y la configuración del dominio donde se publica tu web.",
};

export default function SectionPage({ sectionId }: Props) {
  const params = useParams();
  const section = sections.find((s) => s.id === sectionId);
  const subId = params.sub;
  const sub = section?.subsections?.find((s) => s.id === subId);

  const title = sub ? `${section?.label} · ${sub.label}` : section?.label ?? "";
  const hint = "En construcción — esta sección llegará en los siguientes prompts.";

  return (
    <PlaceholderPage
      testId={PAGES[sectionId]}
      icon={ICONS[sectionId] ?? "Square"}
      title={title}
      description={DESCRIPTIONS[sectionId] ?? ""}
      hint={hint}
    />
  );
}
