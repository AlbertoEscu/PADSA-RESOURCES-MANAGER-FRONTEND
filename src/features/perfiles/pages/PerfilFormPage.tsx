import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  });

  useEffect(() => {
    if (isEdit && id) {
      load();
    }
  }, [id]);

  const load = async () => {
    const data = await perfilService.getById(Number(id));
    setForm({
      clave: data.clave,
      nombre: data.nombre,
      descripcion: data.descripcion ?? "",
    });
  };

  const handleChange = (field: keyof PerfilRequestDTO, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (isEdit && id) {
      await perfilService.update(Number(id), form);
    } else {
      await perfilService.create(form);
    }

    navigate("/perfiles");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-white text-2xl">
        {isEdit ? "Editar Perfil" : "Nuevo Perfil"}
      </h1>

      <div className="space-y-4">
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
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={() => navigate("/perfiles")}
          className="px-4 py-2 bg-gray-600 rounded-lg text-white"
        >
          Cancelar
        </button>

        <button
          onClick={handleSubmit}
          className="px-6 py-2 bg-padsa-primary rounded-lg text-white"
        >
          {isEdit ? "Actualizar" : "Guardar"}
        </button>
      </div>
    </div>
  );
};

const Input = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div>
    <label className="text-xs text-gray-400">{label}</label>
    <input
      className="w-full bg-gray-800 text-white p-2 rounded-lg"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);