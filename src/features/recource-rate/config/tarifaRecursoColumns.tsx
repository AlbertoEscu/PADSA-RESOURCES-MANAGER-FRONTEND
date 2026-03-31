import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Column } from "../../../shared/components/ui/DataTable";
import type { TarifaRecursoDto } from "../types/tarifaRecurso.types";

export const useTarifaRecursoColumns = (): Column<TarifaRecursoDto>[] => {
  const navigate = useNavigate();

  return [
    { key: "idTarifas", label: "ID Tarifa", sortable: true },
    { key: "idProyecto", label: "ID Proyecto", sortable: true },
    { key: "idRecurso", label: "ID Recurso", sortable: true },
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
    { key: "fechaUltimaModificacion", label: "Fecha Modificación", sortable: true },
    { key: "usuarioModificacion", label: "Usuario", sortable: true },
    { key: "estatus", label: "Estatus", sortable: true },

    {
      key: "acciones",
      label: "Acciones",
      render: (row) => (
        <button
          onClick={() =>
            navigate(`/rates/edit/${row.idTarifas}`, { state: row })
          }
          className="flex items-center gap-1 px-3 py-1 text-xs border border-padsa-primary text-padsa-primary rounded-lg transition-all duration-200 hover:bg-padsa-primary hover:text-white hover:shadow-md"
        >
          <Pencil size={14} /> Editar
        </button>
      ),
    },
  ];
};