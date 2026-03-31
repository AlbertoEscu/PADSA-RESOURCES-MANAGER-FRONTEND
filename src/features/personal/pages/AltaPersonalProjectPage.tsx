import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { usePersonalWizard } from "../components/PersonalWizardContext";
import { useEffect } from "react";
import { Stepper } from "../components/Stepper";
import {
  isDatosValid,
  isPerfilValid,
  isSkillsValid,
} from "../components/wizardValidation";
import { WizardHeader } from "../components/WizardHeader";

interface FormData {
  numeroEmpleado: string;
  proyecto: string;
  empresa: string;
  fechaInicio: string;
  fechaFin: string;
  usuarioWalmart: string;
  vigenciaUsuario: string;
}

export const AltaPersonalProjectPage = () => {
  const navigate = useNavigate();

  const { data, setProyecto, mode, id, isLoading } = usePersonalWizard();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, isSubmitting },
  } = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      numeroEmpleado: "",
      empresa: "",
    },
  });

  const inputStyle =
    "w-full bg-padsa-surface-light border border-padsa-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-padsa-primary";

  const labelStyle = "text-xs text-padsa-text-secondary mb-1 block";

  /**
   * ==========================================
   * 🔥 PRECARGA (EDIT)
   * ==========================================
   */
  useEffect(() => {
    if (mode === "edit" && data) {
      const proyecto = data.proyecto || {};

      reset({
        numeroEmpleado: data.datosGenerales?.numeroEmpleado ?? "",
        empresa: data.datosGenerales?.compania ?? "",
        proyecto: proyecto.proyecto || "",
        fechaInicio: proyecto.fechaInicio || "",
        fechaFin: proyecto.fechaFin || "",
        usuarioWalmart: proyecto.usuarioWalmart || "",
        vigenciaUsuario: proyecto.vigenciaUsuario || "",
      });
    }
  }, [mode, data, reset]);

  /**
   * ==========================================
   * 🔥 DEFAULTS CREATE
   * ==========================================
   */
  useEffect(() => {
    if (mode !== "create") return;
    if (!data?.datosGenerales) return;

    reset((prev) => ({
      ...prev,
      numeroEmpleado: data.datosGenerales?.numeroEmpleado || "",
      empresa: data.datosGenerales?.compania || "",
    }));
  }, [data, mode, reset]);

  /**
   * ==========================================
   * 🔥 VALIDACIONES (SOLO CREATE)
   * ==========================================
   */
  useEffect(() => {
    if (mode !== "create") return;

    if (isLoading) return;
    if (!data?.datosGenerales) return;

    if (!isDatosValid(data)) {
      navigate("/personal/new");
      return;
    }

    if (!isPerfilValid(data)) {
      navigate("/personal/new/profile");
      return;
    }

    if (!isSkillsValid(data)) {
      navigate("/personal/new/skills");
    }
  }, [data, mode, isLoading]);

  /**
   * ==========================================
   * 🔥 SUBMIT
   * ==========================================
   */
  const onSubmit = async (projectData: FormData) => {
    setProyecto(projectData);

    if (mode === "edit") {
      console.log("✏️ UPDATE PROJECT", id, projectData);

      // 👉 futuro:
      // await personalService.updateProject(id, projectData);

      navigate("/personal/projects");
      return;
    }

    // CREATE FLOW (wizard)
    const payload = {
      ...data,
      proyecto: projectData,
    };

    console.log("🔥 FINAL PAYLOAD:", payload);

    // 👉 futuro:
    // await personalService.create(payload);

    navigate("/personal");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 space-y-6"
    >
      <h1 className="text-2xl font-bold text-white">
        {mode === "edit" ? "Editar Proyecto" : "Alta Personal - Proyecto"}
      </h1>

      <WizardHeader />
      <Stepper />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-padsa-surface border border-padsa-border rounded-2xl p-8 space-y-8 max-w-5xl"
      >
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">
            Asignación de Proyecto
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Número empleado */}
            <div>
              <label className={labelStyle}>Número de empleado</label>
              <input
                {...register("numeroEmpleado")}
                disabled
                className={`${inputStyle} opacity-70`}
              />
            </div>

            {/* Empresa */}
            <div>
              <label className={labelStyle}>Empresa</label>
              <input
                {...register("empresa")}
                disabled
                className={`${inputStyle} opacity-70`}
              />
            </div>

            {/* Proyecto */}
            <div className="md:col-span-2">
              <label className={labelStyle}>Nombre del proyecto</label>
              <input
                {...register("proyecto", { required: true })}
                className={inputStyle}
              />
            </div>

            {/* Fechas */}
            <div>
              <label className={labelStyle}>Fecha inicio</label>
              <input
                type="date"
                {...register("fechaInicio", { required: true })}
                className={inputStyle}
              />
            </div>

            <div>
              <label className={labelStyle}>Fecha fin</label>
              <input
                type="date"
                {...register("fechaFin")}
                className={inputStyle}
              />
            </div>

            {/* Usuario Walmart */}
            <div>
              <label className={labelStyle}>Usuario Walmart</label>
              <input {...register("usuarioWalmart")} className={inputStyle} />
            </div>

            <div>
              <label className={labelStyle}>Vigencia usuario</label>
              <input
                type="date"
                {...register("vigenciaUsuario")}
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
            className="px-6 py-2 bg-green-600 rounded-lg text-white disabled:opacity-50"
          >
            {mode === "edit" ? "Actualizar" : "Guardar"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
