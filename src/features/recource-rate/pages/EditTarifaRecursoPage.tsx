import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { tarifaService } from "../services/tarifaRecurso.service";
import type { TarifaResponse } from "../types/tarifaRecurso.types";
import { showSuccess, showError } from "../../../shared/utils/toast";

interface FormData {
  clave: string;
  proyectoId: number;
  empleadoId: number;

  tarifaHora?: number;
  tarifaAlianza?: number;
  tarifaAxity?: number;

  equipoAlianza?: string;

  fechaAsignacionEquipo?: string;
  fechaArrendamiento?: string;

  nivelDescuento?: number;

  montoEstimadoCobro?: number;
  montoEstimadoCobro2?: number;
  montoEstimadoCobro3?: number;
  montoRealFacturar?: number;

  estatus?: string;
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
    formState: { isSubmitting },
  } = useForm<FormData>();

  const equipo = watch("equipoAlianza");
  const tarifaHora = watch("tarifaHora") || 0;
  const montoEstimadoCobro = watch("montoEstimadoCobro") || 0;

  const formatDate = (date?: string) => {
    if (!date) return "";
    return date.split("T")[0];
  };

  // 🔄 cargar datos
  useEffect(() => {
    if (!isEdit) {
      setValue("estatus", "A");
      return;
    }

    const data = state as TarifaResponse;

    setValue("clave", data.clave);
    setValue("proyectoId", data.proyectoId);
    setValue("empleadoId", data.empleadoId);

    setValue("tarifaHora", data.tarifaHora ?? 0);
    setValue("tarifaAlianza", data.tarifaAlianza ?? 0);
    setValue("tarifaAxity", data.tarifaAxity ?? 0);

    setValue("equipoAlianza", data.equipoAlianza ? "SI" : "NO");

    setValue("fechaAsignacionEquipo", formatDate(data.fechaAsignacionEquipo));
    setValue("fechaArrendamiento", formatDate(data.fechaArrendamiento));

    setValue("nivelDescuento", data.nivelDescuento ?? 0);

    setValue("montoEstimadoCobro", data.montoEstimadoCobro ?? 0);
    setValue("montoEstimadoCobro2", data.montoEstimadoCobro2 ?? 0);
    setValue("montoEstimadoCobro3", data.montoEstimadoCobro3 ?? 0);
    setValue("montoRealFacturar", data.montoRealFacturar ?? 0);

    setValue("estatus", data.estatus ?? "A");
  }, [isEdit, state, setValue]);

  // 🧮 cálculo automático
  useEffect(() => {
    setValue("montoRealFacturar", tarifaHora + montoEstimadoCobro);
  }, [tarifaHora, montoEstimadoCobro, setValue]);

  const onSubmit = async (formData: FormData) => {
    try {
      if (formData.equipoAlianza === "SI" && !formData.fechaAsignacionEquipo) {
        showError("Fecha de asignación obligatoria");
        return;
      }

      const payload = {
        clave: formData.clave,
        proyectoId: Number(formData.proyectoId),
        empleadoId: Number(formData.empleadoId),

        tarifaHora: Number(formData.tarifaHora || 0),
        tarifaAlianza: Number(formData.tarifaAlianza || 0),
        tarifaAxity: Number(formData.tarifaAxity || 0),
        nivelDescuento: Number(formData.nivelDescuento || 0),

        fechaAsignacionEquipo: formData.fechaAsignacionEquipo || undefined,
        fechaArrendamiento: formData.fechaArrendamiento || undefined,

        montoEstimadoCobro: Number(formData.montoEstimadoCobro || 0),
        montoEstimadoCobro2: Number(formData.montoEstimadoCobro2 || 0),
        montoEstimadoCobro3: Number(formData.montoEstimadoCobro3 || 0),
        montoRealFacturar: Number(formData.montoRealFacturar || 0),

        estatus: formData.estatus ?? "A",

        ...(formData.equipoAlianza === "SI" && {
          equipoAlianza: "Equipo Asignado",
        }),
      };

      if (isEdit) {
        const data = state as TarifaResponse;
        await tarifaService.update(data.id, payload);
        showSuccess("Actualizado correctamente");
      } else {
        await tarifaService.create(payload);
        showSuccess("Creado correctamente");
      }

      navigate("/rates");
    } catch (error) {
      console.error(error);
      showError("Error al guardar");
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-lg bg-padsa-surface border border-padsa-border text-white";

  return (
    <motion.div className="p-8 space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-2xl font-bold text-white">
        {isEdit ? "Editar tarifa" : "Nueva tarifa"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-padsa-surface border border-padsa-border rounded-2xl p-8 space-y-8"
      >
        {/* Datos generales */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <input {...register("clave", { required: true })} placeholder="Clave" className={inputClass} />
          <input type="number" {...register("proyectoId", { valueAsNumber: true })} placeholder="Proyecto ID" className={inputClass} />
          <input type="number" {...register("empleadoId", { valueAsNumber: true })} placeholder="Empleado ID" className={inputClass} />

          {/* 🔥 NUEVO ESTATUS */}
          <select {...register("estatus")} className={inputClass}>
            <option value="A">Activo</option>
            <option value="I">Inactivo</option>
          </select>
        </div>

        {/* Tarifas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input
            type="number"
            {...register("tarifaHora", { valueAsNumber: true })}
            placeholder="Tarifa Hora"
            className={inputClass}
          />
          <input
            type="number"
            {...register("tarifaAlianza", { valueAsNumber: true })}
            placeholder="Tarifa Alianza"
            className={inputClass}
          />
          <input
            type="number"
            {...register("tarifaAxity", { valueAsNumber: true })}
            placeholder="Tarifa Axity"
            className={inputClass}
          />
        </div>

        {/* Equipo */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <select {...register("equipoAlianza")} className={inputClass}>
            <option value="NO">No</option>
            <option value="SI">Sí</option>
          </select>

          {equipo === "SI" && (
            <input
              type="date"
              {...register("fechaAsignacionEquipo")}
              className={inputClass}
            />
          )}

          <input
            type="date"
            {...register("fechaArrendamiento")}
            className={inputClass}
          />
        </div>

        {/* Montos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <input
            type="number"
            {...register("nivelDescuento", { valueAsNumber: true })}
            placeholder="% Descuento"
            className={inputClass}
          />
          <input
            type="number"
            {...register("montoEstimadoCobro", { valueAsNumber: true })}
            placeholder="Monto 1"
            className={inputClass}
          />
          <input
            type="number"
            {...register("montoEstimadoCobro2", { valueAsNumber: true })}
            placeholder="Monto 2"
            className={inputClass}
          />
          <input
            type="number"
            {...register("montoEstimadoCobro3", { valueAsNumber: true })}
            placeholder="Monto 3"
            className={inputClass}
          />
          <input
            type="number"
            {...register("montoRealFacturar")}
            readOnly
            className={inputClass}
          />
        </div>

        {/* Acciones */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/rates")}
            className="px-4 py-2 bg-gray-500 rounded"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 rounded"
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
