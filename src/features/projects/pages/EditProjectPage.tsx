import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { ArrowLeft, Save, ChevronDown, ChevronUp } from "lucide-react";

import { projectService } from "../services/project.service";
import type { ProjectDto, ProjectForm } from "../types/project.types";

export const EditProjectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<ProjectForm>({
    idCliente: 0,
    nombreProyecto: "",
    companiaAsignada: "",
    fechaInicio: "",
    fechaFinal: "",
    idJira: "",
    modalidad: "",
    director: "",
    solicitante: "",
    gerente: "",
    areaNegocio: "",
    coe: "",
    mesServicio: "",
    anioServicio: new Date().getFullYear(),
    usuarioWindows: "",
    vigenciaUsuario: "",
    idConsultor: "",
    pepCapex: "",
    determinanteOpex: "",
    numeroSow: "",
    companiaPago: "",
    horasEstimadas: 0,
    usuarioModificacion: "admin",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && location.state) {
      const project = location.state as ProjectDto;
      setForm({ ...project });
    }
  }, [isEdit, location.state]);

  const handleChange = <K extends keyof ProjectForm>(field: K, value: ProjectForm[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (form.fechaFinal && form.fechaFinal < form.fechaInicio) {
      alert("Fecha final inválida");
      return;
    }

    setLoading(true);
    try {
      if (isEdit && id) {
        await projectService.updateProject(Number(id), form);
      } else {
        await projectService.createProject(form);
      }
      navigate("/projects");
    } catch (err) {
      console.error(err);
      alert("Error al guardar el proyecto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-5xl"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-white">{isEdit ? "Editar Proyecto" : "Nuevo Proyecto"}</h1>
        <button onClick={() => navigate("/projects")}><ArrowLeft /></button>
      </div>

      {/* ACCORDIONS */}
      <AccordionSection title="Información Básica" defaultOpen>
        <Input label="ID Cliente" value={String(form.idCliente)} onChange={(v) => handleChange("idCliente", Number(v))} />
        <Input label="Nombre Proyecto" value={form.nombreProyecto} onChange={(v) => handleChange("nombreProyecto", v)} />
        <Input label="Compañía Asignada" value={form.companiaAsignada} onChange={(v) => handleChange("companiaAsignada", v)} />
        <Input label="Modalidad" value={form.modalidad} onChange={(v) => handleChange("modalidad", v)} />
        <Input label="Mes Servicio" value={form.mesServicio} onChange={(v) => handleChange("mesServicio", v)} />
        <Input label="Año Servicio" value={String(form.anioServicio)} onChange={(v) => handleChange("anioServicio", Number(v))} />
      </AccordionSection>

      <AccordionSection title="Responsables">
        <Input label="Director" value={form.director} onChange={(v) => handleChange("director", v)} />
        <Input label="Solicitante" value={form.solicitante} onChange={(v) => handleChange("solicitante", v)} />
        <Input label="Gerente" value={form.gerente} onChange={(v) => handleChange("gerente", v)} />
      </AccordionSection>

      <AccordionSection title="Fechas">
        <DateInput label="Fecha Inicio" value={form.fechaInicio} onChange={(v) => handleChange("fechaInicio", v)} />
        <DateInput label="Fecha Final" value={form.fechaFinal || ""} onChange={(v) => handleChange("fechaFinal", v)} />
        <DateInput label="Vigencia Usuario" value={form.vigenciaUsuario || ""} onChange={(v) => handleChange("vigenciaUsuario", v)} />
      </AccordionSection>

      <AccordionSection title="Jira / Consultor / PEP / OPEX / SOW">
        <Input label="ID Jira" value={form.idJira || ""} onChange={(v) => handleChange("idJira", v)} />
        <Input label="ID Consultor" value={form.idConsultor || ""} onChange={(v) => handleChange("idConsultor", v)} />
        <Input label="PEP CAPEX" value={form.pepCapex || ""} onChange={(v) => handleChange("pepCapex", v)} />
        <Input label="Determinante OPEX" value={form.determinanteOpex || ""} onChange={(v) => handleChange("determinanteOpex", v)} />
        <Input label="Número SOW" value={form.numeroSow || ""} onChange={(v) => handleChange("numeroSow", v)} />
      </AccordionSection>

      <AccordionSection title="Otros detalles">
        <Input label="Área de negocio" value={form.areaNegocio || ""} onChange={(v) => handleChange("areaNegocio", v)} />
        <Input label="COE" value={form.coe || ""} onChange={(v) => handleChange("coe", v)} />
        <Input label="Compañía de Pago" value={form.companiaPago || ""} onChange={(v) => handleChange("companiaPago", v)} />
        <Input label="Usuario Windows" value={form.usuarioWindows || ""} onChange={(v) => handleChange("usuarioWindows", v)} />
        <Input label="Horas Estimadas" value={String(form.horasEstimadas || 0)} onChange={(v) => handleChange("horasEstimadas", Number(v))} />
      </AccordionSection>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="flex items-center gap-2 bg-padsa-primary text-white px-4 py-2 rounded-lg hover:opacity-90"
      >
        <Save size={16} />
        {isEdit ? "Actualizar" : "Guardar"}
      </button>
    </motion.div>
  );
};

// COMPONENTES UTILES
type InputProps = { label: string; value: string; onChange: (value: string) => void };
const Input = ({ label, value, onChange }: InputProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-300">{label}</label>
    <input className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

type DateInputProps = { label: string; value?: string; onChange: (value: string) => void };
const DateInput = ({ label, value, onChange }: DateInputProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-300">{label}</label>
    <input type="date" className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600" value={value || ""} onChange={(e) => onChange(e.target.value)} />
  </div>
);

// ACCORDION SECTION
type AccordionSectionProps = { title: string; children: React.ReactNode; defaultOpen?: boolean };
const AccordionSection = ({ title, children, defaultOpen = false }: AccordionSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-gray-900/20 rounded-md p-4 space-y-2">
      <button
        type="button"
        className="flex justify-between w-full items-center text-white font-medium"
        onClick={() => setOpen(!open)}
      >
        {title} {open ? <ChevronUp /> : <ChevronDown />}
      </button>
      {open && <div className="grid grid-cols-2 gap-4 pt-2">{children}</div>}
    </div>
  );
};