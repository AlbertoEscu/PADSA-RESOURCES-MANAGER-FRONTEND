import { useNavigate } from "react-router-dom";
import type { Column } from "../../../shared/components/ui/DataTable";
import type { PersonalProfileDto } from "../types/personal.types";
import { Pencil } from "lucide-react";

export const usePersonalProfileColumns = () => {
  const navigate = useNavigate();

  const columns: Column<PersonalProfileDto>[] = [
    {
      key: "numeroEmpleado",
      label: "Empleado",
      sortable: true,
      filterable: true,
    },
    {
      key: "nombreCompleto",
      label: "Nombre",
      filterable: true,
    },
    {
      key: "perfil",
      label: "Perfil",
      filterable: true,
    },
    {
      key: "nivel",
      label: "Nivel",
      render: (row) => (
        <span className="px-2 py-1 rounded bg-blue-500/20 text-blue-300 text-xs">
          {row.nivel}
        </span>
      ),
    },
    {
      key: "status",
      label: "Estado",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            row.status === "ACTIVE"
              ? "bg-green-500/20 text-green-300"
              : "bg-red-500/20 text-red-300"
          }`}
        >
          {row.status === "ACTIVE" ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      key: "estatus",
      label: "Estatus",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            row.estatus === "ACTIVO"
              ? "bg-green-500/20 text-green-300"
              : "bg-red-500/20 text-red-300"
          }`}
        >
          {row.estatus}
        </span>
      ),
    },
    {
      key: "fechaUltimaModificacion",
      label: "Última Modificación",
      render: (row) =>
        new Date(row.fechaUltimaModificacion).toLocaleDateString(),
    },
    {
      key: "usuarioModificacion",
      label: "Usuario",
    },
    {
      key: "acciones",
      label: "",
      render: (row) => (
        <button
          onClick={() => navigate(`/personal/edit/${row.idPerfil}/profile`)}
          className="btn-edit"
        >
          <Pencil size={14} /> Editar
        </button>
      ),
    },
  ];

  return columns;
};
