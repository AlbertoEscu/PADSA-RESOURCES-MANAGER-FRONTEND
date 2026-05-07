import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Column } from "../../../shared/components/ui/DataTable";
import type { TarifaResponse } from "../types/tarifaRecurso.types";

export const useTarifaRecursoColumns = (canEdit: boolean): Column<TarifaResponse>[] => {
  const navigate = useNavigate();

  const columns: Column<TarifaResponse>[] = [
    { key: "id", label: "ID Tarifa", sortable: true },
    { key: "proyectoId", label: "ID Proyecto", sortable: true },
    { key: "empleadoId", label: "ID Recurso", sortable: true },
    { key: "tarifaHora", label: "Tarifa Hora", sortable: true },
    { key: "tarifaAlianza", label: "Tarifa Alianza", sortable: true },
    { key: "tarifaAxity", label: "Tarifa Axity", sortable: true },
    { key: "equipoAlianza", label: "Equipo Alianza", sortable: true },
    { key: "fechaAsignacionEquipo", label: "Fecha Asignación Equipo", sortable: true },
    { key: "fechaArrendamiento", label: "Fecha Arrendamiento", sortable: true },
    { key: "nivelDescuento", label: "Nivel Descuento", sortable: true },
    { key: "montoEstimadoCobro", label: "Monto Estimado Cobro", sortable: true },
    { key: "montoEstimadoCobro2", label: "Monto Estimado Cobro 2", sortable: true },
    { key: "montoEstimadoCobro3", label: "Monto Estimado Cobro 3", sortable: true },
    { key: "montoRealFacturar", label: "Monto Real a Facturar", sortable: true },
    { key: "updatedAt", label: "Fecha Modificación", sortable: true },
    { key: "updatedBy", label: "Usuario", sortable: true },
    {
      key: "estatus",
      label: "Estatus",
      sortable: true,
      filterable: true,
      render: (row) => {
        const activo = row.estatus === "A";

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              activo
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {activo ? "Activo" : "Inactivo"}
          </span>
        );
      },
    },
  ];

  if (canEdit) {
    columns.push({
      key: "acciones",
      label: "Acciones",
      render: (row) => (
        <button
          onClick={() =>
            navigate(`/rates/edit/${row.id}`, { state: row })
          }
          className="flex items-center gap-1 px-3 py-1 text-xs border border-padsa-primary text-padsa-primary rounded-lg transition-all duration-200 hover:bg-padsa-primary hover:text-white hover:shadow-md"
        >
          <Pencil size={14} /> Editar
        </button>
      ),
    });
  }

  return columns;
};