import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "@/components/shell/AppShell";
import InicioPage from "@/pages/Inicio";
import SectionPage from "@/pages/SectionPage";
import ObrasCatalogo from "@/pages/obras/Catalogo";
import ObrasCategorias from "@/pages/obras/Categorias";
import ObrasMateriales from "@/pages/obras/Materiales";
import EditarObra from "@/pages/obras/EditarObra";
import { Toaster } from "sonner";
import { useThemeStore } from "@/stores/theme-store";

export default function App() {
  const mode = useThemeStore((s) => s.mode);
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/inicio" replace />} />
          <Route path="/inicio" element={<InicioPage />} />

          <Route path="/empresa" element={<SectionPage sectionId="empresa" />} />
          <Route path="/empresa/:sub" element={<SectionPage sectionId="empresa" />} />

          <Route path="/servicios" element={<SectionPage sectionId="servicios" />} />
          <Route path="/servicios/:sub" element={<SectionPage sectionId="servicios" />} />

          <Route path="/blog" element={<SectionPage sectionId="blog" />} />
          <Route path="/blog/:sub" element={<SectionPage sectionId="blog" />} />

          {/* OBRAS */}
          <Route path="/obras" element={<Navigate to="/obras/catalogo" replace />} />
          <Route path="/obras/catalogo" element={<ObrasCatalogo />} />
          <Route path="/obras/categorias" element={<ObrasCategorias />} />
          <Route path="/obras/materiales" element={<ObrasMateriales />} />
          <Route path="/obras/obra/nueva" element={<EditarObra />} />
          <Route path="/obras/obra/:id" element={<EditarObra />} />

          <Route path="/consultas" element={<SectionPage sectionId="consultas" />} />
          <Route path="/consultas/:sub" element={<SectionPage sectionId="consultas" />} />

          <Route path="/resenas" element={<SectionPage sectionId="resenas" />} />
          <Route path="/resenas/:sub" element={<SectionPage sectionId="resenas" />} />

          <Route path="/ajustes" element={<SectionPage sectionId="ajustes" />} />
          <Route path="/ajustes/:sub" element={<SectionPage sectionId="ajustes" />} />

          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Route>
      </Routes>
      <Toaster richColors position="bottom-right" theme={mode} />
    </BrowserRouter>
  );
}
