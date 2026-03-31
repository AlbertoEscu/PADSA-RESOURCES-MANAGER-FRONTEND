import type { Column } from "../../../shared/components/ui/DataTable";
import type { ProjectTableDto } from "../pages/ProjectsPage";
import { Pencil } from "lucide-react";

export const projectColumns = (
  onEdit: (project: ProjectTableDto) => void,
): Column<ProjectTableDto>[] => [
  {
    key: "idProyecto",
    label: "ID Proyecto",
    sortable: true,
  },
  {
    key: "idCliente",
    label: "ID Cliente",
    sortable: true,
  },
  {
    key: "nombreProyecto",
    label: "Nombre proyecto",
    sortable: true,
  },
  {
    key: "companiaAsignada",
    label: "Compañía asignada",
    sortable: true,
  },
  {
    key: "fechaInicio",
    label: "Fecha inicio",
    sortable: true,
    render: (row) =>
      row.fechaInicio
        ? new Date(row.fechaInicio).toLocaleDateString()
        : "-",
  },
  {
    key: "fechaFinal",
    label: "Fecha fin",
    sortable: true,
    render: (row) =>
      row.fechaFinal
        ? new Date(row.fechaFinal).toLocaleDateString()
        : "-",
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
    key: "acciones",
    label: "",
    render: (row) => (
      <button
        onClick={() => onEdit(row)}
        className="
          flex items-center gap-1 px-3 py-1 text-xs 
          border border-padsa-primary text-padsa-primary 
          rounded-lg transition-all duration-200 
          hover:bg-padsa-primary hover:text-white hover:shadow-md
        "
      >
        <Pencil size={14} />
        Editar
      </button>
    ),
  },
];