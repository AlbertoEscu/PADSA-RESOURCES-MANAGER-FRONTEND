import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { motion } from "framer-motion";
import { ArrowLeft, Save } from "lucide-react";

import type { ClientDto, ClientForm } from "../types/client.types";
import { clientService } from "../services/client.service";

/**
 * 🔥 DTO → FORM (ALINEADO CON BACK)
 */
const mapClientToForm = (client: ClientDto): ClientForm => ({
  clave: client.clave,
  nombre: client.nombre,
  razonSocial: client.razonSocial,
  rfc: client.rfc,
  domicilioFiscal: client.domicilioFiscal,
  email: client.email,
  telefono: client.telefono,
});

export const EditClientPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const isEdit = Boolean(id);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ClientForm>({
    clave: "",
    nombre: "",
    razonSocial: "",
    rfc: "",
    domicilioFiscal: "",
    email: "",
    telefono: "",
  });

  /**
   * 🔥 LOAD DATA
   */
  useEffect(() => {
    const loadData = async () => {
      if (!isEdit) return;

      try {
        setLoading(true);

        if (location.state) {
          setForm(mapClientToForm(location.state as ClientDto));
        } else if (id) {
          const client = await clientService.getById(Number(id));
          setForm(mapClientToForm(client));
        }
      } catch (error) {
        console.error("Error cargando cliente", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id, isEdit, location.state]);

  /**
   * 🧠 HANDLE CHANGE
   */
  const handleChange = (field: keyof ClientForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * 💾 SAVE
   */
  const handleSubmit = async () => {
    try {
      if (!form.clave) return alert("Clave requerida");
      if (!form.nombre) return alert("Nombre requerido");

      if (form.telefono && !/^\d{10}$/.test(form.telefono)) {
        return alert("Teléfono inválido (10 dígitos)");
      }

      if (isEdit && id) {
        await clientService.updateClient(Number(id), form);
      } else {
        await clientService.createClient(form);
      }

      navigate("/clients");
    } catch (error) {
      console.error("Error guardando cliente", error);
      alert("Error al guardar cliente");
    }
  };

  const inputStyle =
    "w-full bg-padsa-surface-light border border-padsa-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-padsa-primary";

  const labelStyle = "text-xs text-padsa-text-secondary mb-1 block";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 space-y-6"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">
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
      <div className="bg-padsa-surface border border-padsa-border rounded-2xl p-8 space-y-8 max-w-5xl">
        {/* GENERALES */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Datos Generales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Clave</label>
              <input
                value={form.clave}
                disabled={isEdit}
                onChange={(e) => handleChange("clave", e.target.value)}
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Nombre</label>
              <input
                value={form.nombre}
                onChange={(e) => handleChange("nombre", e.target.value)}
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Razón Social</label>
              <input
                value={form.razonSocial || ""}
                onChange={(e) => handleChange("razonSocial", e.target.value)}
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>RFC</label>
              <input
                value={form.rfc || ""}
                onChange={(e) => handleChange("rfc", e.target.value)}
                className={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* CONTACTO */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Información de Contacto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Domicilio Fiscal</label>
              <input
                value={form.domicilioFiscal || ""}
                onChange={(e) =>
                  handleChange("domicilioFiscal", e.target.value)
                }
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Correo Electrónico</label>
              <input
                value={form.email || ""}
                onChange={(e) => handleChange("email", e.target.value)}
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Teléfono</label>
              <input
                value={form.telefono || ""}
                onChange={(e) => handleChange("telefono", e.target.value)}
                className={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-4 border-t border-padsa-border">
          <button
            onClick={() => navigate("/clients")}
            className="px-4 py-2 bg-padsa-surface-light rounded-lg"
          >
            Cancelar
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-padsa-primary rounded-lg text-white disabled:opacity-50"
          >
            <Save size={16} />
            {isEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};