import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { personalService } from "../services/personal.service";

interface FormData {
  idCompania: number;
  nombreCompleto: string;
  curp: string;
  rfc: string;
  telefono: string;
  email: string;
  direccion: string;
  tipoRecurso: "tecnico" | "administrativo";
  nss: string;
  usuarioModificacion: string;
  perfilId: number;
}

interface Perfil {
  id: number;
  nombre: string;
}

export const AltaPersonalPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [perfiles, setPerfiles] = useState<Perfil[]>([]);
  const [empleadoId, setEmpleadoId] = useState<number | null>(
    id ? Number(id) : null,
  );

  const isEdit = !!empleadoId;

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { isSubmitting, isValid, errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  useEffect(() => {
    const loadPerfiles = async () => {
      try {
        const data = await personalService.getPerfiles();
        setPerfiles(data);
      } catch (error) {
        console.error("❌ Error cargando perfiles", error);
      }
    };

    loadPerfiles();
  }, []);

  /**
   * ==========================================
   * CARGA EN EDIT
   * ==========================================
   */
  useEffect(() => {
    const loadData = async () => {
      if (!empleadoId) return;

      try {
        const data = await personalService.getById(empleadoId);

        Object.entries(data).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            if (key === "tipoRecurso") {
              setValue("tipoRecurso", value ? "tecnico" : "administrativo");
            }
            // 🔥 AQUÍ ESTÁ EL FIX CLAVE
            else if (key === "perfil" && value) {
              setValue("perfilId", (value as any).idPerfil);
            } else {
              setValue(key as keyof FormData, value as any);
            }
          }
        });
      } catch (error) {
        console.error("❌ Error cargando empleado", error);
      }
    };

    loadData();
  }, [empleadoId, setValue]);

  /**
   * ==========================================
   * MANEJO ERRORES BACKEND
   * ==========================================
   */
  const handleBackendErrors = (error: any) => {
    const data = error?.response?.data;

    if (!data) {
      alert("Error sin respuesta del servidor");
      return;
    }

    clearErrors();

    if (data.validationErrors) {
      Object.entries(data.validationErrors).forEach(([field, message]) => {
        setError(field as keyof FormData, {
          type: "server",
          message: String(message),
        });
      });
      return;
    }

    if (data.message) {
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
      const payload = {
        ...formData,
        tipoRecurso: formData.tipoRecurso === "tecnico",
        perfilId: formData.perfilId, // ✔️ explícito
      };

      if (isEdit && empleadoId) {
        await personalService.update(empleadoId, payload);
      } else {
        await personalService.create(payload);
      }

      // 🔵 TODO → regresar a listado
      navigate("/personal");
    } catch (error) {
      console.error("❌ Error guardando empleado", error);
      handleBackendErrors(error);
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
        {/* DATOS GENERALES */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Datos Generales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Compañía</label>
              <select
                {...register("idCompania", { required: true })}
                className={inputStyle}
              >
                <option value="">Seleccionar</option>
                <option value={1}>AITI</option>
                <option value={2}>PADSA</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className={labelStyle}>Nombre completo</label>
              <input
                {...register("nombreCompleto", {
                  required: true,
                  maxLength: 100,
                })}
                className={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* INFORMACIÓN PERSONAL */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Información Personal
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              {...register("curp", { required: true })}
              placeholder="CURP"
              className={inputStyle}
            />

            <input
              {...register("rfc", { required: true })}
              placeholder="RFC"
              className={inputStyle}
            />

            <input
              {...register("telefono", { required: true })}
              placeholder="Teléfono"
              className={inputStyle}
            />

            <input
              {...register("email", { required: true })}
              placeholder="Email"
              className={inputStyle}
            />

            <textarea
              {...register("direccion", { required: true })}
              placeholder="Dirección"
              className={`${inputStyle} md:col-span-2`}
            />
          </div>
        </div>

        {/* DATOS LABORALES */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Datos Laborales
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* PERFIL */}
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
                {perfiles.map((perfil) => (
                  <option key={perfil.id} value={perfil.id}>
                    {perfil.nombre}
                  </option>
                ))}
              </select>

              {/* 🔥 ERROR FUERA DEL SELECT */}
              {errors.perfilId && (
                <p className="text-red-400 text-xs mt-1">
                  El perfil es requerido
                </p>
              )}
            </div>

            {/* TIPO RECURSO */}
            <div>
              <select
                {...register("tipoRecurso", { required: true })}
                className={inputStyle}
              >
                <option value="">Tipo recurso</option>
                <option value="tecnico">Técnico</option>
                <option value="administrativo">Administrativo</option>
              </select>
            </div>

            {/* NSS */}
            <div>
              <input
                {...register("nss", { required: true })}
                placeholder="NSS"
                className={inputStyle}
              />
            </div>

            {/* USUARIO MODIFICACIÓN */}
            <div className="md:col-span-2">
              <input
                {...register("usuarioModificacion", { required: true })}
                placeholder="Usuario modificación"
                className={inputStyle}
              />
            </div>
          </div>
        </div>

        {/* BOTONES */}
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
