import { useForm, Controller } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { tarifaRecursoService } from "../services/tarifaRecurso.service";
import type { TarifaRecursoDto } from "../types/tarifaRecurso.types";
import { showSuccess, showError } from "../../../shared/utils/toast";

interface FormData {
  idProyecto: number;
  idRecurso: number;
  tarifaHora: number;
  tarifaAlianza?: number;
  tarifaAxity?: number;
  equipo: "SI" | "NO";
  fechaAsignacionEquipo?: string;
  fechaArrendamiento?: string;
  nivelDescuento?: number;
  montoEstimadoCobro?: number;
  montoEstimadoCobro2?: number;
  montoEstimadoCobro3?: number;
  montoRealFacturar?: number;
  usuarioModificacion: string;
}

export const EditTarifaRecursoPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const isEdit = !!state;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    control,
  } = useForm<FormData>({
    defaultValues: {
      idProyecto: 0,
      idRecurso: 0,
      tarifaHora: 0,
      tarifaAlianza: 0,
      tarifaAxity: 0,
      equipo: "NO",
      fechaAsignacionEquipo: "",
      fechaArrendamiento: "",
      nivelDescuento: 0,
      montoEstimadoCobro: 0,
      montoEstimadoCobro2: 0,
      montoEstimadoCobro3: 0,
      montoRealFacturar: 0,
      usuarioModificacion: "",
    },
  });

  const equipo = watch("equipo");
  const tarifaHora = watch("tarifaHora") || 0;
  const montoEstimadoCobro = watch("montoEstimadoCobro") || 0;

  // 🔄 Cargar datos si es edición
  useEffect(() => {
    if (!isEdit) return;
    const data = state as TarifaRecursoDto;

    setValue("idProyecto", data.idProyecto);
    setValue("idRecurso", data.idRecurso);
    setValue("tarifaHora", data.tarifaHora);
    setValue("tarifaAlianza", data.tarifaAlianza ?? 0);
    setValue("tarifaAxity", data.tarifaAxity ?? 0);
    setValue("equipo", data.equipoAlianza ? "SI" : "NO");
    setValue("fechaAsignacionEquipo", data.fechaAsignacionEquipo ?? "");
    setValue("fechaArrendamiento", data.fechaArrendamiento ?? "");
    setValue("nivelDescuento", data.nivelDescuento ?? 0);
    setValue("montoEstimadoCobro", data.montoEstimadoCobro ?? 0);
    setValue("montoEstimadoCobro2", data.montoEstimadoCobro2 ?? 0);
    setValue("montoEstimadoCobro3", data.montoEstimadoCobro3 ?? 0);
    setValue("montoRealFacturar", data.montoRealFacturar ?? 0);
    setValue("usuarioModificacion", data.usuarioModificacion ?? "");
  }, [isEdit, state, setValue]);

  // 🔽 Actualizar cálculos automáticamente
  useEffect(() => {
    // Ejemplo: montoRealFacturar = tarifaHora + descuentos + otros montos
    const total = tarifaHora + montoEstimadoCobro;
    setValue("montoRealFacturar", total);
  }, [tarifaHora, montoEstimadoCobro, setValue]);

  const onSubmit = async (formData: FormData) => {
    try {
      if (formData.equipo === "SI" && !formData.fechaAsignacionEquipo) {
        showError("La fecha de asignación de equipo es obligatoria si Equipo Alianza es SI");
        return;
      }

      const payload = {
        idProyecto: formData.idProyecto,
        idRecurso: formData.idRecurso,
        tarifaHora: formData.tarifaHora,
        tarifaAlianza: formData.tarifaAlianza,
        tarifaAxity: formData.tarifaAxity,
        equipoAlianza: formData.equipo === "SI",
        fechaAsignacionEquipo: formData.equipo === "SI" ? formData.fechaAsignacionEquipo : undefined,
        fechaArrendamiento: formData.fechaArrendamiento,
        nivelDescuento: formData.nivelDescuento,
        montoEstimadoCobro: formData.montoEstimadoCobro,
        montoEstimadoCobro2: formData.montoEstimadoCobro2,
        montoEstimadoCobro3: formData.montoEstimadoCobro3,
        montoRealFacturar: formData.montoRealFacturar,
        usuarioModificacion: formData.usuarioModificacion,
      };

      if (isEdit) {
        const data = state as TarifaRecursoDto;
        await tarifaRecursoService.update(data.idTarifas, payload);
        showSuccess("Tarifa actualizada correctamente");
      } else {
        await tarifaRecursoService.create(payload);
        showSuccess("Tarifa creada correctamente");
      }

      navigate("/rates");
    } catch (error) {
      console.error(error);
      showError("Error al guardar la tarifa");
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">{isEdit ? "Editar tarifa" : "Nueva tarifa"}</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-padsa-surface border border-padsa-border rounded-2xl p-8 space-y-6 max-w-4xl">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-padsa-text-secondary">ID Proyecto</label>
            <input type="number" {...register("idProyecto", { required: true, min: 1 })} className="w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white" />
          </div>

          <div>
            <label className="text-sm text-padsa-text-secondary">ID Recurso</label>
            <input type="number" {...register("idRecurso", { required: true, min: 1 })} className="w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white" />
          </div>

          <div>
            <label className="text-sm text-padsa-text-secondary">Tarifa hora</label>
            <input type="number" {...register("tarifaHora", { required: true, min: 0 })} className="w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white" />
          </div>

          <div>
            <label className="text-sm text-padsa-text-secondary">Tarifa Alianza</label>
            <input type="number" {...register("tarifaAlianza", { min: 0 })} className="w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white" />
          </div>

          <div>
            <label className="text-sm text-padsa-text-secondary">Tarifa Axity</label>
            <input type="number" {...register("tarifaAxity", { min: 0 })} className="w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white" />
          </div>

          <div>
            <label className="text-sm text-padsa-text-secondary mb-2 block">Equipo Alianza</label>
            <div className="flex gap-3">
              <button type="button" onClick={() => setValue("equipo", "SI")} className={`flex-1 px-4 py-2 rounded-lg border ${equipo === "SI" ? "bg-green-500 text-white" : "bg-padsa-surface border-padsa-border text-padsa-text-secondary"}`}>Sí</button>
              <button type="button" onClick={() => setValue("equipo", "NO")} className={`flex-1 px-4 py-2 rounded-lg border ${equipo === "NO" ? "bg-red-500 text-white" : "bg-padsa-surface border-padsa-border text-padsa-text-secondary"}`}>No</button>
            </div>
          </div>

          {equipo === "SI" && (
            <div>
              <label className="text-sm text-padsa-text-secondary">Fecha asignación equipo</label>
              <input type="date" {...register("fechaAsignacionEquipo", { required: equipo === "SI" })} className="w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white" />
              {errors.fechaAsignacionEquipo && <p className="text-red-400 text-xs mt-1">Campo obligatorio si equipo es SI</p>}
            </div>
          )}

          <div>
            <label className="text-sm text-padsa-text-secondary">Fecha arrendamiento</label>
            <input type="date" {...register("fechaArrendamiento")} className="w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white" />
          </div>

          <div>
            <label className="text-sm text-padsa-text-secondary">% Descuento</label>
            <input type="number" {...register("nivelDescuento", { min: 0 })} className="w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white" />
          </div>

          <div>
            <label className="text-sm text-padsa-text-secondary">Monto estimado cobro</label>
            <input type="number" {...register("montoEstimadoCobro", { min: 0 })} className="w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white" />
          </div>

          <div>
            <label className="text-sm text-padsa-text-secondary">Monto estimado cobro 2</label>
            <input type="number" {...register("montoEstimadoCobro2", { min: 0 })} className="w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white" />
          </div>

          <div>
            <label className="text-sm text-padsa-text-secondary">Monto estimado cobro 3</label>
            <input type="number" {...register("montoEstimadoCobro3", { min: 0 })} className="w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white" />
          </div>

          <div>
            <label className="text-sm text-padsa-text-secondary">Monto real a facturar</label>
            <input type="number" {...register("montoRealFacturar", { min: 0 })} className="w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white" readOnly />
          </div>

          <div>
            <label className="text-sm text-padsa-text-secondary">Usuario modificación</label>
            <input type="text" {...register("usuarioModificacion", { required: true, maxLength: 10 })} className="w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white" />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button type="button" onClick={() => navigate("/rates")} className="px-4 py-2 rounded-lg bg-padsa-surface-light text-white">Cancelar</button>
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-padsa-primary text-white hover:bg-padsa-primary/80 transition">{isSubmitting ? "Guardando..." : "Guardar"}</button>
        </div>
      </form>
    </motion.div>
  );
};