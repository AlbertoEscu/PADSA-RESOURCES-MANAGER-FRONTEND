import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { companyDetailsService } from "../services/companyDetails.service";
import { showSuccess, showError } from "../../../shared/utils/toast";
import type { CompanyDto, CompanyStatus, CompanyStatusDB } from "../types/companyDetails.types";
import type { CompaniaRequest } from "../services/companyDetails.service";
import { normalizeStatusToDB, normalizeStatusFromDB } from "../components/companyHelpers";

interface FormData {
  nombreCompania: string;
  rfc: string;
  direccionFiscal: string;
  usuarioModificacion: string;
  estatus: CompanyStatus;
}

export const EditCompanyPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);
  const [numeroCompania, setNumeroCompania] = useState("");

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<FormData>({
    defaultValues: {
      nombreCompania: "",
      rfc: "",
      direccionFiscal: "",
      usuarioModificacion: "",
      estatus: "Activo",
    },
  });

  const status = watch("estatus");

  useEffect(() => {
    if (!isEdit) return;

    const loadCompany = async () => {
      try {
        const data = await companyDetailsService.getCompanyById(id!);

        setNumeroCompania(data.idCompania.toString());
        setValue("nombreCompania", data.nombreCompania);
        setValue("rfc", data.rfc);
        setValue("direccionFiscal", data.direccionFiscal);
        setValue("estatus", normalizeStatusFromDB(data.estatus));
        setValue("usuarioModificacion", data.usuarioModificacion || "");
      } catch (error) {
        showError("Error cargando la compañía");
        console.error(error);
      }
    };

    loadCompany();
  }, [id, isEdit, setValue]);

  const onSubmit = async (formData: FormData) => {
    try {
      const request: CompaniaRequest = {
        ...formData,
        estatus: normalizeStatusToDB(formData.estatus),
      };

      if (isEdit) {
        await companyDetailsService.updateCompany(id!, request);
        showSuccess("Compañía actualizada correctamente");
      } else {
        await companyDetailsService.createCompany(request);
        showSuccess("Compañía creada correctamente");
      }

      // 🔹 Volvemos al listado después de guardar
      navigate("/companies");
    } catch (error) {
      showError("Error al guardar la compañía");
      console.error(error);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-8">
      <h1 className="text-2xl font-bold text-white mb-6">
        {isEdit ? "Editar compañía" : "Nueva compañía"}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-padsa-surface border border-padsa-border rounded-2xl p-8 space-y-6 max-w-3xl">
        {/* Número compañía */}
        <div>
          <label className="text-sm text-padsa-text-secondary">Número de compañía</label>
          <input
            value={isEdit ? numeroCompania : "Se generará automáticamente"}
            disabled
            className="w-full mt-1 bg-padsa-surface-light border border-padsa-border rounded-lg px-3 py-2 text-white opacity-60"
          />
        </div>

        {/* Nombre compañía */}
        <div>
          <label className="text-sm text-padsa-text-secondary">Nombre de compañía</label>
          <input
            {...register("nombreCompania", { required: "Nombre requerido", maxLength: { value: 50, message: "Máx 50 caracteres" } })}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-padsa-primary"
          />
          {errors.nombreCompania && <p className="text-red-400 text-xs mt-1">{errors.nombreCompania.message}</p>}
        </div>

        {/* RFC */}
        <div>
          <label className="text-sm text-padsa-text-secondary">RFC</label>
          <input
            {...register("rfc", {
              required: "RFC requerido",
              maxLength: { value: 18, message: "Máx 18 caracteres" },
              pattern: { value: /^[A-ZÑ&]{3}[0-9]{6}[A-Z0-9]{3}$/, message: "RFC inválido" },
            })}
            disabled={isEdit}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-padsa-primary disabled:opacity-60"
          />
          {errors.rfc && <p className="text-red-400 text-xs mt-1">{errors.rfc.message}</p>}
        </div>

        {/* Dirección fiscal */}
        <div>
          <label className="text-sm text-padsa-text-secondary">Dirección fiscal</label>
          <textarea
            {...register("direccionFiscal", { required: "Dirección obligatoria", maxLength: { value: 100, message: "Máx 100 caracteres" } })}
            rows={3}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-padsa-primary"
          />
          {errors.direccionFiscal && <p className="text-red-400 text-xs mt-1">{errors.direccionFiscal.message}</p>}
        </div>

        {/* Usuario modificación */}
        <div>
          <label className="text-sm text-padsa-text-secondary">Usuario modificación</label>
          <input
            {...register("usuarioModificacion", { required: "Usuario requerido", maxLength: { value: 10, message: "Máx 10 caracteres" } })}
            className="w-full mt-1 bg-padsa-surface border border-padsa-border rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-padsa-primary"
          />
          {errors.usuarioModificacion && <p className="text-red-400 text-xs mt-1">{errors.usuarioModificacion.message}</p>}
        </div>

        {/* Estatus */}
        <div>
          <label className="text-sm text-padsa-text-secondary mb-2 block">Estatus</label>
          <div className="flex gap-4">
            <button type="button" onClick={() => setValue("estatus", "Activo")} className={`px-4 py-2 rounded-lg transition ${status === "Activo" ? "bg-green-500 text-white" : "bg-padsa-surface-light text-padsa-text-secondary"}`}>Activo</button>
            <button type="button" onClick={() => setValue("estatus", "Inactivo")} className={`px-4 py-2 rounded-lg transition ${status === "Inactivo" ? "bg-red-500 text-white" : "bg-padsa-surface-light text-padsa-text-secondary"}`}>Inactivo</button>
          </div>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4 pt-4">
          <button type="button" onClick={() => navigate("/companies")} className="px-4 py-2 rounded-lg bg-padsa-surface-light text-white">Cancelar</button>
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 rounded-lg bg-padsa-primary text-white hover:bg-padsa-primary/80 transition">{isSubmitting ? "Guardando..." : "Guardar"}</button>
        </div>
      </form>
    </motion.div>
  );
};