import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

import { paymentsService } from "../services/payments.service";
import { showSuccess, showError } from "../../../shared/utils/toast";

import type { PaymentDto, PaymentStatus } from "../types/payments.types";

interface FormData {
  idPago: number;
  idEmpleado: number;
  nombreEmpleado: string;
  idProyecto: number;
  nombreProyecto: string;
  mes: number;
  anio: number;
  totalHoras: number;
  tarifaHora: number;
  montoTotal: number;
  estatus: PaymentStatus;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export const EditPaymentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const payment = location.state as PaymentDto | undefined;

  const isEdit = Boolean(id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      idPago: 0,
      idEmpleado: 0,
      nombreEmpleado: "",
      idProyecto: 0,
      nombreProyecto: "",
      mes: new Date().getMonth() + 1,
      anio: new Date().getFullYear(),
      totalHoras: 0,
      tarifaHora: 0,
      montoTotal: 0,
      estatus: "P",
    },
  });

  // Mapeo de estatus a labels legibles si quieres mostrarlos en UI
  const statusOptions: { value: PaymentStatus; label: string }[] = [
    { value: "P", label: "Pendiente" },
    { value: "A", label: "Aprobado" },
    { value: "C", label: "Cancelado" },
  ];

  useEffect(() => {
    if (!payment) return;

    setValue("idPago", payment.idPago);
    setValue("idEmpleado", payment.idEmpleado);
    setValue("nombreEmpleado", payment.nombreEmpleado);
    setValue("idProyecto", payment.idProyecto);
    setValue("nombreProyecto", payment.nombreProyecto);
    setValue("mes", payment.mes);
    setValue("anio", payment.anio);
    setValue("totalHoras", Number(payment.totalHoras));
    setValue("tarifaHora", Number(payment.tarifaHora));
    setValue("montoTotal", Number(payment.montoTotal));
    setValue("estatus", payment.estatus);
  }, [payment, setValue]);

  const usuario = localStorage.getItem("usuario") || "admin";

  const onSubmit = async (form: FormData) => {
    try {
      const payload: Partial<PaymentDto> = {
        ...form,
        updatedBy: usuario,
      };

      if (isEdit && id) {
        await paymentsService.updatePayment(Number(id), payload);
        showSuccess("Pago actualizado correctamente");
      } else {
        await paymentsService.createPayment(payload);
        showSuccess("Pago creado correctamente");
      }

      setTimeout(() => navigate("/payments"), 1000);
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
        {isEdit ? "Editar pago" : "Alta de pago"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-padsa-surface border border-padsa-border rounded-2xl p-8 space-y-6 max-w-3xl"
      >
        {/* ID PAGO */}
        <div>
          <label className="text-sm text-padsa-text-secondary">ID Pago</label>
          <input
            {...register("idPago")}
            disabled
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white disabled:opacity-60"
          />
        </div>

        {/* NOMBRE EMPLEADO */}
        <div>
          <label className="text-sm text-padsa-text-secondary">Empleado</label>
          <input
            {...register("nombreEmpleado", { required: "Empleado requerido" })}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white"
          />
          {errors.nombreEmpleado && (
            <p className="text-red-400 text-xs mt-1">
              {errors.nombreEmpleado.message}
            </p>
          )}
        </div>

        {/* NOMBRE PROYECTO */}
        <div>
          <label className="text-sm text-padsa-text-secondary">Proyecto</label>
          <input
            {...register("nombreProyecto", { required: "Proyecto requerido" })}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white"
          />
          {errors.nombreProyecto && (
            <p className="text-red-400 text-xs mt-1">
              {errors.nombreProyecto.message}
            </p>
          )}
        </div>

        {/* MES / AÑO */}
        <div className="flex gap-4">
          <div>
            <label className="text-sm text-padsa-text-secondary">Mes</label>
            <input
              type="number"
              {...register("mes", { required: true, min: 1, max: 12 })}
              className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-padsa-text-secondary">Año</label>
            <input
              type="number"
              {...register("anio", { required: true, min: 2000 })}
              className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white"
            />
          </div>
        </div>

        {/* HORAS / TARIFA / MONTO */}
        <div className="flex gap-4">
          <div>
            <label className="text-sm text-padsa-text-secondary">Total Horas</label>
            <input
              type="number"
              step="0.01"
              {...register("totalHoras", { required: true })}
              className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-padsa-text-secondary">Tarifa/Hora</label>
            <input
              type="number"
              step="0.01"
              {...register("tarifaHora", { required: true })}
              className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white"
            />
          </div>
          <div>
            <label className="text-sm text-padsa-text-secondary">Monto Total</label>
            <input
              type="number"
              step="0.01"
              {...register("montoTotal", { required: true })}
              className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white"
            />
          </div>
        </div>

        {/* ESTATUS */}
        <div>
          <label className="text-sm text-padsa-text-secondary">Estatus</label>
          <select
            {...register("estatus")}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white"
          >
            {statusOptions.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* BOTONES */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/payments")}
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