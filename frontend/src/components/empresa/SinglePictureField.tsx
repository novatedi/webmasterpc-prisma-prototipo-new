import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/lib/icon";
import { toast } from "sonner";

interface Props {
  url: string;
  onChange: (url: string) => void;
  label?: string;
  buttonText?: string;
  aspect?: "video" | "portrait" | "square";
  testIdButton?: string;
  testIdImage?: string;
}

const ASPECTS: Record<string, string> = {
  video: "aspect-[16/9]",
  portrait: "aspect-[3/4]",
  square: "aspect-square",
};

/** Campo de imagen única con botón "Cambiar imagen". */
export function SinglePictureField({
  url,
  onChange,
  buttonText = "Cambiar imagen",
  aspect = "video",
  testIdButton,
  testIdImage,
}: Props) {
  const ref = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | null) => {
    if (!f) return;
    const objUrl = URL.createObjectURL(f);
    onChange(objUrl);
    toast.success("Imagen actualizada");
  };

  return (
    <div className="flex flex-col gap-3">
      <div
        data-testid={testIdImage}
        className={`${ASPECTS[aspect]} w-full overflow-hidden rounded-xl border border-border bg-muted`}
      >
        {url ? (
          <img src={url} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Icon name="Image" className="h-8 w-8 opacity-50" />
          </div>
        )}
      </div>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          handleFile(e.target.files?.[0] ?? null);
          if (ref.current) ref.current.value = "";
        }}
      />
      <Button
        type="button"
        variant="outline"
        data-testid={testIdButton}
        onClick={() => ref.current?.click()}
        className="h-10 w-fit gap-2 rounded-xl font-semibold"
      >
        <Icon name="ImagePlus" className="h-4 w-4" />
        {buttonText}
      </Button>
    </div>
  );
}
