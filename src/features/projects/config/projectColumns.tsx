import type { Column } from "../../../shared/components/ui/DataTable";
import type { ProjectTableDto } from "../pages/ProjectsPage";
import { Pencil } from "lucide-react";

export const projectColumns = (
  onEdit: (project: ProjectTableDto) => void,
): Column<ProjectTableDto>[] => [
  { key: "idProyecto", label: "ID Proyecto", sortable: true },
  { key: "idCliente", label: "ID Cliente", sortable: true },
  { key: "nombreProyecto", label: "Nombre proyecto", sortable: true },
  { key: "companiaAsignada", label: "Compañía asignada", sortable: true },

  {
    key: "fechaInicio",
    label: "Fecha inicio",
    sortable: true,
    render: (row) =>
      row.fechaInicio ? new Date(row.fechaInicio).toLocaleDateString() : "-",
  },
  {
    key: "fechaFinal",
    label: "Fecha fin",
    sortable: true,
    render: (row) =>
      row.fechaFinal ? new Date(row.fechaFinal).toLocaleDateString() : "-",
  },

  { key: "idJira", label: "Jira", sortable: true },
  { key: "modalidad", label: "Modalidad", sortable: true },
  { key: "director", label: "Director", sortable: true },
  { key: "solicitante", label: "Solicitante", sortable: true },
  { key: "gerente", label: "Gerente", sortable: true },

  { key: "areaNegocio", label: "Área negocio", sortable: true },
  { key: "coe", label: "COE", sortable: true },
  { key: "mesServicio", label: "Mes servicio", sortable: true },
  { key: "anioServicio", label: "Año servicio", sortable: true },

  { key: "usuarioWindows", label: "Usuario Windows", sortable: true },

  {
    key: "vigenciaUsuario",
    label: "Vigencia usuario",
    sortable: true,
    render: (row) =>
      row.vigenciaUsuario
        ? new Date(row.vigenciaUsuario).toLocaleDateString()
        : "-",
  },

  { key: "idConsultor", label: "ID Consultor", sortable: true },
  { key: "pepCapex", label: "PEP Capex", sortable: true },
  { key: "determinanteOpex", label: "OPEX", sortable: true },
  { key: "numeroSow", label: "SOW", sortable: true },
  { key: "companiaPago", label: "Compañía pago", sortable: true },

  {
    key: "horasEstimadas",
    label: "Horas estimadas",
    sortable: true,
  },

  {
    key: "fechaUltimaModificacion",
    label: "Fecha modificación",
    sortable: true,
    render: (row) =>
      row.fechaUltimaModificacion
        ? new Date(row.fechaUltimaModificacion).toLocaleDateString()
        : "-",
  },

  {
    key: "usuarioModificacion",
    label: "Usuario modificación",
    sortable: true,
  },

  {
    key: "estatus",
    label: "Estatus",
    sortable: true,
  },

  {
    key: "acciones",
    label: "",
    render: (row) => (
      <button
        onClick={() => onEdit(row)}
        className="flex items-center gap-1 px-3 py-1 text-xs border border-padsa-primary text-padsa-primary rounded-lg hover:bg-padsa-primary hover:text-white"
      >
        <Pencil size={14} />
        Editar
      </button>
    ),
  },
];