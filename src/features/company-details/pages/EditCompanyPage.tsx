import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { companyDetailsService } from "../services/companyDetails.service";
import { showSuccess, showError } from "../../../shared/utils/toast";
import type { CompanyStatus, CompanyStatusDB } from "../types/companyDetails.types";
import { normalizeStatusFromDB } from "../components/companyHelpers";

interface FormData {
  clave: string;
  nombre: string;
  rfc?: string;
  direccionFiscal?: string;
}

export const EditCompanyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);
  const [numeroCompania, setNumeroCompania] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      clave: "",
      nombre: "",
      rfc: "",
      direccionFiscal: "",
    },
  });

  // 🔹 LOAD DATA
  useEffect(() => {
    if (!isEdit) return;

    const loadCompany = async () => {
      try {
        const data = await companyDetailsService.getCompanyById(id!);

        setNumeroCompania(data.id.toString());

        setValue("clave", data.clave);
        setValue("nombre", data.nombre);
        setValue("rfc", data.rfc || "");
        setValue("direccionFiscal", data.direccionFiscal || "");
      } catch (error) {
        showError("Error cargando la compañía");
        console.error(error);
      }
    };

    loadCompany();
  }, [id, isEdit, setValue]);

  // 🔹 SUBMIT
  const onSubmit = async (formData: FormData) => {
    try {
      if (isEdit) {
        await companyDetailsService.updateCompany(id!, formData);
        showSuccess("Compañía actualizada correctamente");
      } else {
        await companyDetailsService.createCompany(formData);
        showSuccess("Compañía creada correctamente");
      }

      navigate("/companies");
    } catch (error) {
      showError("Error al guardar la compañía");
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
        {isEdit ? "Editar compañía" : "Nueva compañía"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-padsa-surface border border-padsa-border rounded-2xl p-8 space-y-6 max-w-3xl"
      >
        {/* Número compañía */}
        <div>
          <label className="text-sm text-padsa-text-secondary">
            Número de compañía
          </label>
          <input
            value={isEdit ? numeroCompania : "Se generará automáticamente"}
            disabled
            className="w-full mt-1 bg-padsa-surface-light border border-padsa-border rounded-lg px-3 py-2 text-white opacity-60"
          />
        </div>

        {/* Clave */}
        <div>
          <label className="text-sm text-padsa-text-secondary">Clave</label>
          <input
            {...register("clave", {
              required: "Clave requerida",
              maxLength: { value: 50, message: "Máx 50 caracteres" },
            })}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-padsa-primary"
          />
          {errors.clave && (
            <p className="text-red-400 text-xs mt-1">
              {errors.clave.message}
            </p>
          )}
        </div>

        {/* Nombre */}
        <div>
          <label className="text-sm text-padsa-text-secondary">Nombre</label>
          <input
            {...register("nombre", {
              required: "Nombre requerido",
              maxLength: { value: 100, message: "Máx 100 caracteres" },
            })}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-padsa-primary"
          />
          {errors.nombre && (
            <p className="text-red-400 text-xs mt-1">
              {errors.nombre.message}
            </p>
          )}
        </div>

        {/* RFC */}
        <div>
          <label className="text-sm text-padsa-text-secondary">RFC</label>
          <input
            {...register("rfc", {
              maxLength: { value: 13, message: "Máx 13 caracteres" },
            })}
            disabled={isEdit}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white disabled:opacity-60"
          />
          {errors.rfc && (
            <p className="text-red-400 text-xs mt-1">
              {errors.rfc.message}
            </p>
          )}
        </div>

        {/* Dirección */}
        <div>
          <label className="text-sm text-padsa-text-secondary">
            Dirección fiscal
          </label>
          <textarea
            {...register("direccionFiscal", {
              maxLength: { value: 200, message: "Máx 200 caracteres" },
            })}
            rows={3}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-padsa-primary"
          />
          {errors.direccionFiscal && (
            <p className="text-red-400 text-xs mt-1">
              {errors.direccionFiscal.message}
            </p>
          )}
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => navigate("/companies")}
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