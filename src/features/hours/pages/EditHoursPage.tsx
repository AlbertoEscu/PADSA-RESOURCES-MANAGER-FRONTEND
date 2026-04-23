import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { horasMesRecursoService } from "../services/horasMesRecurso.service";
import { showError, showSuccess } from "../../../shared/utils/toast";

import type { ReporteMensualDto } from "../types/horasMesRecurso.types";

export const EditHoursPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const rowData: any = location.state;

  const [data, setData] = useState<ReporteMensualDto[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * ============================
   * LOAD DATA FROM BACKEND
   * ============================
   */
  useEffect(() => {
    const load = async () => {
      try {
        if (!rowData) return;

        const response =
          await horasMesRecursoService.getReporteDetalle(
            rowData.numeroPersonal,
            rowData.mes
          );

        setData(response);
      } catch (error) {
        showError("Error al cargar detalle del reporte");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [rowData]);

  /**
   * ============================
   * HANDLE CHANGE
   * ============================
   */
  const handleChange = (
    index: number,
    field: "horas" | "comentarios",
    value: any
  ) => {
    const updated = [...data];
    updated[index] = {
      ...updated[index],
      [field]: field === "horas" ? Number(value) : value,
    };
    setData(updated);
  };

  /**
   * ============================
   * SAVE
   * ============================
   */
  const handleSave = async () => {
  try {
    const payload = data.map((item) => ({
      id: item.id,
      horas: item.horas,
      comentarios: item.comentarios,
    }));

    await horasMesRecursoService.updateReporteDetalle(payload);

    showSuccess("Reporte actualizado correctamente");
    navigate("/hours");
  } catch (error) {
    showError("Error al guardar cambios");
  }
};

  if (loading) {
    return <div className="p-6 text-white">Cargando...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold text-white mb-6">
        Edición de Reporte Mensual
      </h1>

      <div className="overflow-auto bg-padsa-surface rounded-xl border border-padsa-border">
        <table className="min-w-full text-sm text-white">
          <thead className="bg-padsa-surface-light">
            <tr>
              <th className="p-2">Fecha</th>
              <th className="p-2">Proyecto</th>
              <th className="p-2">Actividades</th>
              <th className="p-2">Horas</th>
              <th className="p-2">Comentarios</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, index) => (
              <tr key={row.id} className="border-t border-padsa-border">
                <td className="p-2">{row.fecha}</td>
                <td className="p-2">{row.nombreProyecto}</td>
                <td className="p-2">{row.actividades}</td>

                {/* EDITABLE HORAS */}
                <td className="p-2">
                  <input
                    type="number"
                    value={row.horas}
                    onChange={(e) =>
                      handleChange(index, "horas", e.target.value)
                    }
                    className="w-20 bg-padsa-surface border border-padsa-border rounded px-2 py-1"
                  />
                </td>

                {/* EDITABLE COMENTARIOS */}
                <td className="p-2">
                  <input
                    type="text"
                    value={row.comentarios || ""}
                    onChange={(e) =>
                      handleChange(index, "comentarios", e.target.value)
                    }
                    className="w-full bg-padsa-surface border border-padsa-border rounded px-2 py-1"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BOTONES */}
      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => navigate("/hours")}
          className="px-4 py-2 bg-padsa-surface-light rounded-lg text-white"
        >
          Cancelar
        </button>

        <button
          onClick={handleSave}
          className="px-4 py-2 bg-padsa-primary rounded-lg text-white"
        >
          Guardar Cambios
        </button>
      </div>
    </motion.div>
  );
};