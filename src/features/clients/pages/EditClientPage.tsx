import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

import type { ClientDto, ClientForm } from "../types/client.types";
import { clientService } from "../services/client.service";

export const EditClientPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isEdit = Boolean(id);

  // 🧠 STATE FORM
  const [form, setForm] = useState<ClientForm>({
    numeroCliente: "",
    nombreCliente: "",
    razonSocial: "",
    rfc: "",
    domicilioFiscal: "",
    correoElectronico: "",
    telefono: "",
    estatus: "Activo",
  });
  // 🔥 LOAD DATA FROM STATE (EDIT)
  useEffect(() => {
    if (isEdit && location.state) {
      const client = location.state as ClientDto;

      setForm({
        id: client.id,
        numeroCliente: client.numeroCliente,
        nombreCliente: client.nombreCliente,
        razonSocial: client.razonSocial,
        rfc: client.rfc,
        domicilioFiscal: client.domicilioFiscal,
        correoElectronico: client.correoElectronico,
        telefono: client.telefono,
        estatus: client.estatus,
      });
    }
  }, [isEdit, location.state]);

  // 🧠 HANDLE CHANGE
  const handleChange = (field: keyof ClientDto, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 💾 SAVE
  const handleSubmit = async () => {
    try {
      // 🔥 VALIDACIONES
      if (!form.nombreCliente) return alert("Nombre requerido");
      if (!form.razonSocial) return alert("Razón social requerida");
      if (!form.rfc) return alert("RFC requerido");
      if (!form.domicilioFiscal) return alert("Domicilio requerido");
      if (!form.correoElectronico) return alert("Correo requerido");

      if (!/^\d{12}$/.test(form.telefono)) {
        return alert("Teléfono inválido (12 dígitos)");
      }

      if (isEdit) {
        await clientService.updateClient(form.id!, form);
      } else {
        await clientService.createClient(form);
      }

      navigate("/clients");
    } catch (error) {
      console.error("Error guardando cliente", error);
      alert("Error al guardar cliente");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-4xl"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            {isEdit ? "Editar Cliente" : "Nuevo Cliente"}
          </h1>
          <p className="text-padsa-text-secondary mt-1">
            {isEdit
              ? "Modifica la información del cliente."
              : "Registro de un nuevo cliente."}
          </p>
        </div>

        <button
          onClick={() => navigate("/clients")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70"
        >
          <ArrowLeft size={16} />
          Volver
        </button>
      </div>

      {/* FORM */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Número de Cliente"
          value={form.numeroCliente}
          disabled={isEdit}
          onChange={(v) => handleChange("numeroCliente", v)}
        />

        <Input
          label="Nombre de Cliente"
          value={form.nombreCliente}
          onChange={(v) => handleChange("nombreCliente", v)}
        />

        <Input
          label="Razón Social"
          value={form.razonSocial}
          onChange={(v) => handleChange("razonSocial", v)}
        />

        <Input
          label="RFC"
          value={form.rfc}
          onChange={(v) => handleChange("rfc", v)}
        />

        <Input
          label="Domicilio Fiscal"
          value={form.domicilioFiscal}
          onChange={(v) => handleChange("domicilioFiscal", v)}
        />

        <Input
          label="Correo Electrónico"
          value={form.correoElectronico}
          onChange={(v) => handleChange("correoElectronico", v)}
        />

        <Input
          label="Teléfono"
          value={form.telefono}
          onChange={(v) => handleChange("telefono", v)}
        />

        <div>
          <label className="text-sm text-padsa-text-secondary">Estatus</label>
          <select
            value={form.estatus}
            onChange={(e) => handleChange("estatus", e.target.value)}
            className="w-full mt-1 px-3 py-2 bg-padsa-surface rounded-lg border border-padsa-border"
          >
            <option value="ACTIVO">ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
          </select>
        </div>
      </div>

      {/* ACTION */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-6 py-2 bg-padsa-primary text-white rounded-lg hover:bg-padsa-primary/80"
        >
          <Save size={16} />
          {isEdit ? "Guardar Cambios" : "Crear Cliente"}
        </button>
      </div>
    </motion.div>
  );
};

// 🔧 INPUT REUTILIZABLE
const Input = ({
  label,
  value,
  onChange,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
}) => (
  <div>
    <label className="text-sm text-padsa-text-secondary">{label}</label>
    <input
      value={value || ""}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      className="w-full mt-1 px-3 py-2 bg-padsa-surface rounded-lg border border-padsa-border disabled:opacity-50"
    />
  </div>
);
