import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";

import { perfilService } from "../services/perfil.service";
import type { PerfilRequestDTO } from "../types/perfil.types";

export const PerfilFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState<PerfilRequestDTO>({
    clave: "",
    nombre: "",
    descripcion: "",
    estatus: "A",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      load();
    }
  }, [id]);

  const load = async () => {
    setLoading(true);
    const data = await perfilService.getById(Number(id));
    setForm({
      clave: data.clave,
      nombre: data.nombre,
      descripcion: data.descripcion ?? "",
      estatus: data.estatus || "A",
    });
    setLoading(false);
  };

  const handleChange = (field: keyof PerfilRequestDTO, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (isEdit && id) {
      await perfilService.update(Number(id), form);
    } else {
      await perfilService.create(form);
    }

    setLoading(false);
    navigate("/perfiles");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6 w-full max-w-3xl"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">
            {isEdit ? "Editar Perfil" : "Nuevo Perfil"}
          </h1>
          <p className="text-sm text-gray-400">
            {isEdit
              ? "Modifica la información del perfil"
              : "Crea un nuevo perfil en el sistema"}
          </p>
        </div>

        <button
          onClick={() => navigate("/perfiles")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70"
        >
          <ArrowLeft size={16} />
          Volver
        </button>
      </div>

      {/* FORM CARD */}
      <div className="bg-padsa-surface-light p-6 rounded-2xl shadow-md space-y-6">
        <div className="grid grid-cols-1 gap-4">
          <Input
            label="Clave"
            value={form.clave}
            onChange={(v) => handleChange("clave", v)}
          />

          <Input
            label="Nombre"
            value={form.nombre}
            onChange={(v) => handleChange("nombre", v)}
          />

          <Input
            label="Descripción"
            value={form.descripcion ?? ""}
            onChange={(v) => handleChange("descripcion", v)}
          />

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-400">Estatus</label>
            <select
              value={form.estatus}
              onChange={(e) => handleChange("estatus", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white text-black focus:outline-none focus:ring-2 focus:ring-padsa-primary"
            >
              <option value="A">Activo</option>
              <option value="I">Inactivo</option>
            </select>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={() => navigate("/perfiles")}
            className="px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-padsa-primary text-white rounded-lg hover:opacity-90 disabled:opacity-50"
          >
            <Save size={16} />
            {isEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* INPUT REUTILIZABLE */
const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-400">{label}</label>
    <input
      className="
        w-full px-3 py-2 
        rounded-lg 
        bg-white text-black
        border border-gray-300
        focus:outline-none focus:ring-2 focus:ring-padsa-primary
      "
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);