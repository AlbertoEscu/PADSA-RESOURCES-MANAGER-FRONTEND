import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { horasMesRecursoService } from "../services/horasMesRecurso.service";
import { showSuccess, showError } from "../../../shared/utils/toast";
import type { HorasMesRecursoDto } from "../types/horasMesRecurso.types";

interface FormData {
  idHoras: string;
  numeroPersonal: string;
  nombrePersonal: string;

  anio: number;
  mes: number;

  semana1: number;
  semana2: number;
  semana3: number;
  semana4: number;
  semana5: number;

  vacaciones: number;

  horasMes: number;
}

export const EditHoursPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const [manualHorasMes, setManualHorasMes] = useState(false);
  const location = useLocation();
  const rowData = location.state as HorasMesRecursoDto | undefined;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      idHoras: "",
      numeroPersonal: "",
      nombrePersonal: "",
      anio: new Date().getFullYear(),
      mes: new Date().getMonth() + 1,
      semana1: 0,
      semana2: 0,
      semana3: 0,
      semana4: 0,
      semana5: 0,
      vacaciones: 0,
      horasMes: 0,
    },
  });

  const semana1 = watch("semana1");
  const semana2 = watch("semana2");
  const semana3 = watch("semana3");
  const semana4 = watch("semana4");
  const semana5 = watch("semana5");
  const vacaciones = watch("vacaciones");

  /**
   * ================================
   * AUTOCÁLCULO HORAS MES
   * ================================
   */

  useEffect(() => {
    if (manualHorasMes) return;

    const total =
      Number(semana1 || 0) +
      Number(semana2 || 0) +
      Number(semana3 || 0) +
      Number(semana4 || 0) +
      Number(semana5 || 0) -
      Number(vacaciones || 0);

    setValue("horasMes", total);
  }, [
    semana1,
    semana2,
    semana3,
    semana4,
    semana5,
    vacaciones,
    manualHorasMes,
    setValue,
  ]);

  /**
   * ================================
   * CARGAR DATOS SI ES EDICIÓN
   * ================================
   */

  useEffect(() => {
    if (!isEdit || !rowData) return;

    setValue("idHoras", String(rowData.idHoras));
    setValue("numeroPersonal", rowData.numeroPersonal);
    setValue("nombrePersonal", rowData.nombrePersonal);

    setValue("anio", rowData.anio);
    setValue("mes", rowData.mes);

    setValue("semana1", rowData.horasSemana1);
    setValue("semana2", rowData.horasSemana2);
    setValue("semana3", rowData.horasSemana3);
    setValue("semana4", rowData.horasSemana4);
    setValue("semana5", rowData.horasSemana5);

    setValue("vacaciones", rowData.horasVacaciones);
    setValue("horasMes", rowData.horasMes);
  }, [isEdit, rowData, setValue]);

  const usuario = localStorage.getItem("usuario") || "admin";

  /**
   * ================================
   * GUARDAR
   * ================================
   */

  const onSubmit = async (form: FormData) => {
    try {
      const payload = {
        idHoras: Number(form.idHoras),

        numeroPersonal: form.numeroPersonal,
        nombrePersonal: form.nombrePersonal,

        anio: form.anio,
        mes: form.mes,

        horasSemana1: form.semana1,
        horasSemana2: form.semana2,
        horasSemana3: form.semana3,
        horasSemana4: form.semana4,
        horasSemana5: form.semana5,

        horasVacaciones: form.vacaciones,
        horasMes: form.horasMes,

        usuarioModificacion: usuario,
      };
      if (isEdit && id) {
        await horasMesRecursoService.updateHours(Number(id), payload);
        showSuccess("Registro actualizado correctamente");
      } else {
        await horasMesRecursoService.createHours(payload);
        showSuccess("Registro creado correctamente");
      }

      setTimeout(() => {
        navigate("/hours");
      }, 1000);
    } catch (error) {
      showError("Error al guardar");
      console.error(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8"
    >
      <h1 className="text-2xl font-bold text-white mb-6">
        {isEdit ? "Editar horas por Mes/Recurso" : "Alta de horas Mes/Recurso"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-padsa-surface border border-padsa-border rounded-2xl p-8 space-y-6 max-w-3xl"
      >
        {/* ID HORAS */}

        <div>
          <label className="text-sm text-padsa-text-secondary">ID Horas</label>

          <input
            {...register("idHoras")}
            disabled={isEdit}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white disabled:opacity-60"
          />
        </div>

        {/* NUMERO PERSONAL */}

        <div>
          <label className="text-sm text-padsa-text-secondary">
            Número de personal
          </label>

          <input
            {...register("numeroPersonal", {
              required: "Número requerido",
            })}
            disabled={isEdit}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white disabled:opacity-60"
          />

          {errors.numeroPersonal && (
            <p className="text-red-400 text-xs mt-1">
              {errors.numeroPersonal.message}
            </p>
          )}
        </div>

        {/* NOMBRE */}

        <div>
          <label className="text-sm text-padsa-text-secondary">
            Nombre del personal
          </label>

          <input
            {...register("nombrePersonal", {
              required: "Nombre requerido",
            })}
            disabled={isEdit}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white disabled:opacity-60"
          />
        </div>

        {/* AÑO */}

        <div>
          <label className="text-sm text-padsa-text-secondary">Año</label>

          <input
            type="number"
            {...register("anio", { required: true })}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white"
          />
        </div>

        {/* MES */}

        <div>
          <label className="text-sm text-padsa-text-secondary">Mes</label>

          <input
            type="number"
            min={1}
            max={12}
            {...register("mes", {
              valueAsNumber: true,
              min: {
                value: 1,
                message: "El mes debe ser mayor o igual a 1",
              },
              max: {
                value: 12,
                message: "El mes debe ser menor o igual a 12",
              },
            })}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white"
          />
        </div>

        {/* SEMANAS */}

        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s}>
              <label className="text-sm text-padsa-text-secondary">
                Horas semana {s}
              </label>

              <input
                type="number"
                min={0}
                step={1}
                {...register(`semana${s}` as keyof FormData, {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "Las horas no pueden ser negativas",
                  },
                })}
                className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white"
              />
            </div>
          ))}
        </div>

        {/* VACACIONES */}

        <div>
          <label className="text-sm text-padsa-text-secondary">
            Horas vacaciones
          </label>

          <input
            type="number"
            {...register("vacaciones", { valueAsNumber: true })}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white"
          />
        </div>

        {/* HORAS MES */}

        <div>
          <label className="text-sm text-padsa-text-secondary">
            Horas por mes
          </label>

          <input
            type="number"
            {...register("horasMes", { valueAsNumber: true })}
            onChange={(e) => {
              setManualHorasMes(true);
              setValue("horasMes", Number(e.target.value));
            }}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white"
          />

          <p className="text-xs text-padsa-text-secondary mt-1">
            Calculado automáticamente, pero editable.
          </p>
        </div>

        {/* BOTONES */}

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/hours")}
            className="px-4 py-2 rounded-lg bg-padsa-surface-light text-white"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 rounded-lg bg-padsa-primary text-white hover:bg-padsa-primary/80 transition"
          >
            {isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};
