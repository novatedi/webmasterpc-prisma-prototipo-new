import { useLegalStore } from "@/stores/legal-store";
import { LegalDisclaimer } from "@/components/legal/LegalDisclaimer";
import { AsistenteGeneracion } from "@/components/legal/AsistenteGeneracion";
import { DocumentosTabs } from "@/components/legal/DocumentosTabs";
import { GestorCookies } from "@/components/legal/GestorCookies";
import { ClausulaFormularios } from "@/components/legal/ClausulaFormularios";
import { PublicarBar } from "@/components/legal/PublicarBar";
import { LEGAL } from "@/constants/testIds";

export default function LegalPage() {
  const generated = useLegalStore((s) => s.generated);

  return (
    <div data-testid={LEGAL.page} className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-extrabold tracking-tight">
          Textos Legales &amp; Privacidad
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Genera los textos legales obligatorios de tu web (RGPD + LSSI, España)
          o usa los tuyos.
        </p>
      </div>

      <LegalDisclaimer />

      <AsistenteGeneracion />

      {generated && (
        <>
          <DocumentosTabs />
          <GestorCookies />
          <ClausulaFormularios />
          <PublicarBar />
        </>
      )}
    </div>
  );
}
