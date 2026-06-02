import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "@/components/shell/AppShell";
import InicioPage from "@/pages/Inicio";
import SectionPage from "@/pages/SectionPage";
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

          <Route path="/obras" element={<SectionPage sectionId="obras" />} />
          <Route path="/obras/:sub" element={<SectionPage sectionId="obras" />} />

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
