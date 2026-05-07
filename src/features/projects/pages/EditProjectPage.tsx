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

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ProjectForm>({
    clave: "",
    clienteId: 0,
    nombre: "",
    fechaInicio: "",
    fechaFin: "",
    jiraId: "",
    modalidad: "",
    director: "",
    gerente: "",
    areaNegocio: "",
    horasEstimadas: 0,
    estatus: "A",
  });

  // 🔥 cargar datos en edición
  useEffect(() => {
    if (isEdit && location.state) {
      const project = location.state as ProjectDto;

      setForm({
        clave: project.clave || "",
        clienteId: project.clienteId || 0,
        nombre: project.nombre || "",
        fechaInicio: project.fechaInicio || "",
        fechaFin: project.fechaFin || "",
        jiraId: project.jiraId || "",
        modalidad: project.modalidad || "",
        director: project.director || "",
        gerente: project.gerente || "",
        areaNegocio: project.areaNegocio || "",
        horasEstimadas: project.horasEstimadas || 0,
        estatus: project.estatus || "A",
      });
    }
  }, [isEdit, location.state]);

  const handleChange = <K extends keyof ProjectForm>(
    field: K,
    value: ProjectForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (form.fechaFin && form.fechaInicio && form.fechaFin < form.fechaInicio) {
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
        <h1 className="text-2xl text-white">
          {isEdit ? "Editar Proyecto" : "Nuevo Proyecto"}
        </h1>
      </div>

      {/* SECTIONS */}
      <AccordionSection title="Información básica" defaultOpen>
        <Input
          label="Clave"
          value={form.clave}
          onChange={(v) => handleChange("clave", v)}
        />
        <Input
          label="Cliente ID"
          value={String(form.clienteId)}
          onChange={(v) => handleChange("clienteId", Number(v))}
        />
        <Input
          label="Nombre"
          value={form.nombre}
          onChange={(v) => handleChange("nombre", v)}
        />
        <Input
          label="Modalidad"
          value={form.modalidad || ""}
          onChange={(v) => handleChange("modalidad", v)}
        />
        <Input
          label="Área negocio"
          value={form.areaNegocio || ""}
          onChange={(v) => handleChange("areaNegocio", v)}
        />
      </AccordionSection>

      <AccordionSection title="Fechas">
        <DateInput
          label="Fecha inicio"
          value={form.fechaInicio}
          onChange={(v) => handleChange("fechaInicio", v)}
        />
        <DateInput
          label="Fecha fin"
          value={form.fechaFin || ""}
          onChange={(v) => handleChange("fechaFin", v)}
        />
      </AccordionSection>

      <AccordionSection title="Responsables">
        <Input
          label="Director"
          value={form.director || ""}
          onChange={(v) => handleChange("director", v)}
        />

        <Input
          label="Gerente"
          value={form.gerente || ""}
          onChange={(v) => handleChange("gerente", v)}
        />
      </AccordionSection>

      <AccordionSection title="Extras">
        <Input
          label="Jira ID"
          value={form.jiraId || ""}
          onChange={(v) => handleChange("jiraId", v)}
        />
        <Input
          label="Horas estimadas"
          value={String(form.horasEstimadas || 0)}
          onChange={(v) => handleChange("horasEstimadas", Number(v))}
        />
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-300">Estatus</label>
          <select
            className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
            value={form.estatus}
            onChange={(e) => handleChange("estatus", e.target.value)}
          >
            <option value="A">Activo</option>
            <option value="I">Inactivo</option>
          </select>
        </div>
      </AccordionSection>

      {/* SAVE */}
      {/* ===================== BOTONES ===================== */}
      <div className="flex justify-end gap-4 pt-6 border-t border-padsa-border">
        <button
          type="button"
          onClick={() => navigate("/projects")}
          className="px-4 py-2 bg-padsa-surface-light rounded-lg hover:bg-padsa-surface-light/70 transition"
        >
          Cancelar
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="px-6 py-2 bg-padsa-primary rounded-lg text-white disabled:opacity-50 hover:opacity-90 transition flex items-center gap-2"
        >
          <Save size={16} />
          {isEdit ? "Actualizar" : "Guardar"}
        </button>
      </div>

      {/* ================= HELPERS ================= */}

      {/* INPUT */}
      {/*
        Simple reusable input
      */}
    </motion.div>
  );
};

/* ================= HELPERS ================= */

type InputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

const Input = ({ label, value, onChange }: InputProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-300">{label}</label>
    <input
      className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

type DateInputProps = {
  label: string;
  value?: string;
  onChange: (value: string) => void;
};

const DateInput = ({ label, value, onChange }: DateInputProps) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm text-gray-300">{label}</label>
    <input
      type="date"
      className="px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-600"
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

type AccordionSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const AccordionSection = ({
  title,
  children,
  defaultOpen = false,
}: AccordionSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-gray-900/20 rounded-md p-4 space-y-2">
      <button
        type="button"
        className="flex justify-between w-full items-center text-white font-medium"
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? <ChevronUp /> : <ChevronDown />}
      </button>

      {open && <div className="grid grid-cols-2 gap-4 pt-2">{children}</div>}
    </div>
  );
};
