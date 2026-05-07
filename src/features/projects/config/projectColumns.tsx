import type { Column } from "../../../shared/components/ui/DataTable";
import type { ProjectTableDto } from "../pages/ProjectsPage";
import { Pencil } from "lucide-react";

export const projectColumns = (
  onEdit: (project: ProjectTableDto) => void,
  canEdit: boolean,
): Column<ProjectTableDto>[] => {
  const columns: Column<ProjectTableDto>[] = [
    { key: "id", label: "ID", sortable: true },
    { key: "clave", label: "Clave", sortable: true },
    { key: "clienteId", label: "ID Cliente", sortable: true },
    { key: "clienteClave", label: "Cliente", sortable: true },
    { key: "nombre", label: "Nombre", sortable: true },

    {
      key: "fechaInicio",
      label: "Fecha inicio",
      sortable: true,
      render: (row) =>
        row.fechaInicio ? new Date(row.fechaInicio).toLocaleDateString() : "-",
    },
    {
      key: "fechaFin",
      label: "Fecha fin",
      sortable: true,
      render: (row) =>
        row.fechaFin ? new Date(row.fechaFin).toLocaleDateString() : "-",
    },

    { key: "jiraId", label: "Jira", sortable: true },
    { key: "modalidad", label: "Modalidad", sortable: true },
    { key: "director", label: "Director", sortable: true },
    { key: "gerente", label: "Gerente", sortable: true },

    { key: "areaNegocio", label: "Área negocio", sortable: true },

    {
      key: "horasEstimadas",
      label: "Horas estimadas",
      sortable: true,
    },

    {
      key: "createdAt",
      label: "Creado",
      sortable: true,
      render: (row) =>
        row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
    },

    {
      key: "updatedAt",
      label: "Actualizado",
      sortable: true,
      render: (row) =>
        row.updatedAt ? new Date(row.updatedAt).toLocaleDateString() : "-",
    },

    {
      key: "createdBy",
      label: "Creado por",
      sortable: true,
    },

    {
      key: "updatedBy",
      label: "Actualizado por",
      sortable: true,
    },

    {
      key: "estatus",
      label: "Estatus",
      sortable: true,
      render: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.estatus === "A"
              ? "bg-green-500/20 text-green-400"
              : "bg-red-500/20 text-red-400"
          }`}
        >
          {row.estatus === "A" ? "Activo" : "Inactivo"}
        </span>
      ),
    },
  ];

  if (canEdit) {
    columns.push({
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
    });
  }

  return columns;
};