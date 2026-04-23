import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { personalService } from "../services/personal.service";
import type { Option } from "../types/personal.types";

interface FormData {
  clave: string;
  companiaId: number;
  perfilId?: number;

  nombreCompleto: string;

  curp?: string;
  rfc?: string;

  telefono?: string;
  email?: string;
  direccion?: string;

  tipoRecurso?: "Administrativo" | "Tecnico";

  nss?: string;

  fechaAlta?: string;
  fechaBaja?: string;
}

interface Perfil {
  id: number;
  nombre: string;
}

export const AltaPersonalPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const empleadoId = id ? Number(id) : null;
  const isEdit = !!empleadoId;

  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [companias, setCompanias] = useState<Option[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { isSubmitting, isValid, errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  /**
   * ==========================================
   * CARGA CATÁLOGOS
   * ==========================================
   */
  useEffect(() => {
    const loadCatalogs = async () => {
      try {
        const [perfilesData, companiasData] = await Promise.all([
          personalService.getPerfiles(),
          personalService.getCompanias(),
        ]);

        setPerfiles(perfilesData);
        setCompanias(companiasData);
      } catch (error) {
        console.error("❌ Error cargando catálogos", error);
      }
    };

    loadCatalogs();
  }, []);

  /**
   * ==========================================
   * EDIT → RESET PRO
   * ==========================================
   */
  useEffect(() => {
    const loadData = async () => {
      if (!empleadoId) return;

      try {
        const data = await personalService.getById(empleadoId);
        reset(personalService.mapToFormData(data));
      } catch (error) {
        console.error("❌ Error cargando empleado", error);
      }
    };

    loadData();
  }, [empleadoId, reset]);

  /**
   * ==========================================
   * ERRORES BACKEND
   * ==========================================
   */
  const handleBackendErrors = (error: any) => {
    const data = error?.response?.data;

    if (!data) return;

    clearErrors();

    if (data.validationErrors) {
      Object.entries(data.validationErrors).forEach(([field, message]) => {
        setError(field as keyof FormData, {
          type: "server",
          message: String(message),
        });
      });
    } else if (data.message) {
      setError("root" as any, {
        type: "server",
        message: data.message,
      });
    }
  };

  /**
   * ==========================================
   * SUBMIT
   * ==========================================
   */
  const onSubmit = async (formData: FormData) => {
    try {
      if (isEdit && empleadoId) {
        await personalService.update(empleadoId, formData);
      } else {
        await personalService.create(formData);
      }

      navigate("/personal");
    } catch (error) {
      handleBackendErrors(error);
    }
  };

  /**
   * ==========================================
   * ESTILOS (LOS ORIGINALES)
   * ==========================================
   */
  const inputStyle =
    "w-full bg-padsa-surface-light border border-padsa-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-padsa-primary";

  const labelStyle = "text-xs text-padsa-text-secondary mb-1 block";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 space-y-6"
    >
      <h1 className="text-2xl font-bold text-white">
        {isEdit ? "Editar Personal" : "Alta Personal"}
      </h1>

      {errors.root && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {errors.root.message}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-padsa-surface border border-padsa-border rounded-2xl p-8 space-y-8 max-w-5xl"
      >
        {/* ===================== DATOS GENERALES ===================== */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Datos Generales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Clave</label>
              <input {...register("clave", { required: true })} className={inputStyle} />
            </div>

            <div>
              <label className={labelStyle}>Compañía</label>
              <select
                {...register("companiaId", {
                  required: true,
                  valueAsNumber: true,
                })}
                className={inputStyle}
              >
                <option value="">Seleccionar</option>
                {companias.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={labelStyle}>Nombre completo</label>
              <input {...register("nombreCompleto", { required: true })} className={inputStyle} />
            </div>
          </div>
        </div>

        {/* ===================== INFO PERSONAL ===================== */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Información Personal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input {...register("curp")} placeholder="CURP" className={inputStyle} />
            <input {...register("rfc")} placeholder="RFC" className={inputStyle} />
            <input {...register("telefono")} placeholder="Teléfono" className={inputStyle} />
            <input {...register("email")} placeholder="Email" className={inputStyle} />

            <textarea
              {...register("direccion")}
              placeholder="Dirección"
              className={`${inputStyle} md:col-span-2`}
            />
          </div>
        </div>

        {/* ===================== DATOS LABORALES ===================== */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Datos Laborales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className={labelStyle}>Perfil</label>
              <select
                {...register("perfilId", {
                  required: true,
                  valueAsNumber: true,
                })}
                className={inputStyle}
              >
                <option value="">Seleccionar perfil</option>
                {perfiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelStyle}>Tipo Recurso</label>
              <select
                {...register("tipoRecurso", { required: true })}
                className={inputStyle}
              >
                <option value="">Seleccionar</option>
                <option value="Tecnico">Técnico</option>
                <option value="Administrativo">Administrativo</option>
              </select>
            </div>

            <div>
              <label className={labelStyle}>NSS</label>
              <input {...register("nss")} className={inputStyle} />
            </div>
          </div>
        </div>

        {/* ===================== BOTONES ===================== */}
        <div className="flex justify-end gap-4 pt-4 border-t border-padsa-border">
          <button
            type="button"
            onClick={() => navigate("/personal")}
            className="px-4 py-2 bg-padsa-surface-light rounded-lg"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={!isValid || isSubmitting}
            className="px-6 py-2 bg-padsa-primary rounded-lg text-white disabled:opacity-50"
          >
            {isEdit ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};