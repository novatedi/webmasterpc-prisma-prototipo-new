import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "@/components/shell/AppShell";
import InicioPage from "@/pages/Inicio";
import SectionPage from "@/pages/SectionPage";
import ObrasCatalogo from "@/pages/obras/Catalogo";
import ObrasCategorias from "@/pages/obras/Categorias";
import ObrasMateriales from "@/pages/obras/Materiales";
import EditarObra from "@/pages/obras/EditarObra";
import HistoriaPage from "@/pages/empresa/Historia";
import BiografiaPage from "@/pages/empresa/Biografia";
import FilosofiaPage from "@/pages/empresa/Filosofia";
import EstadisticasPage from "@/pages/empresa/Estadisticas";
import ProcesoPage from "@/pages/empresa/Proceso";
import ContactoPage from "@/pages/empresa/Contacto";
import RedesPage from "@/pages/empresa/Redes";
import ServiciosLista from "@/pages/servicios/Lista";
import EditarServicio from "@/pages/servicios/EditarServicio";
import BlogArticulos from "@/pages/blog/Articulos";
import EditarArticulo from "@/pages/blog/EditarArticulo";
import ConsultasPage from "@/pages/Consultas";
import ResenasPage from "@/pages/Resenas";
import IdentidadPage from "@/pages/ajustes/Identidad";
import DominioPage from "@/pages/ajustes/Dominio";
import GeneralPage from "@/pages/ajustes/General";
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

          <Route path="/empresa" element={<Navigate to="/empresa/historia" replace />} />
          <Route path="/empresa/historia" element={<HistoriaPage />} />
          <Route path="/empresa/biografia" element={<BiografiaPage />} />
          <Route path="/empresa/filosofia" element={<FilosofiaPage />} />
          <Route path="/empresa/estadisticas" element={<EstadisticasPage />} />
          <Route path="/empresa/proceso" element={<ProcesoPage />} />
          <Route path="/empresa/contacto" element={<ContactoPage />} />
          <Route path="/empresa/redes" element={<RedesPage />} />

          <Route path="/servicios" element={<ServiciosLista />} />
          <Route path="/servicios/bloque/nuevo" element={<EditarServicio />} />
          <Route path="/servicios/bloque/:id" element={<EditarServicio />} />

          <Route path="/blog" element={<Navigate to="/blog/articulos" replace />} />
          <Route path="/blog/articulos" element={<BlogArticulos />} />
          <Route path="/blog/articulo/nuevo" element={<EditarArticulo />} />
          <Route path="/blog/articulo/:id" element={<EditarArticulo />} />

          {/* OBRAS */}
          <Route path="/obras" element={<Navigate to="/obras/catalogo" replace />} />
          <Route path="/obras/catalogo" element={<ObrasCatalogo />} />
          <Route path="/obras/categorias" element={<ObrasCategorias />} />
          <Route path="/obras/materiales" element={<ObrasMateriales />} />
          <Route path="/obras/obra/nueva" element={<EditarObra />} />
          <Route path="/obras/obra/:id" element={<EditarObra />} />

          <Route path="/consultas" element={<ConsultasPage />} />
          <Route path="/consultas/:sub" element={<ConsultasPage />} />

          <Route path="/resenas" element={<ResenasPage />} />
          <Route path="/resenas/:sub" element={<ResenasPage />} />

          <Route path="/ajustes" element={<Navigate to="/ajustes/identidad" replace />} />
          <Route path="/ajustes/identidad" element={<IdentidadPage />} />
          <Route path="/ajustes/dominio" element={<DominioPage />} />
          <Route path="/ajustes/general" element={<GeneralPage />} />

          <Route path="*" element={<Navigate to="/inicio" replace />} />
        </Route>
      </Routes>
      <Toaster richColors position="bottom-right" theme={mode} />
    </BrowserRouter>
  );
}
