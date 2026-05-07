import type { Column } from "../../../shared/components/ui/DataTable";
import type { PerfilDto } from "../types/perfil.types";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const usePerfilColumns = (canEdit: boolean) => {
  const navigate = useNavigate();

  const columns: Column<PerfilDto>[] = [
    {
      key: "clave",
      label: "Clave",
      filterable: true,
    },
    {
      key: "nombre",
      label: "Nombre",
      filterable: true,
    },
    {
      key: "descripcion",
      label: "Descripción",
    },
    {
      key: "estatus",
      label: "Estatus",
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
    {
      key: "updatedAt",
      label: "Última actualización",
    },
  ];

  if (canEdit) {
    columns.push({
      key: "acciones",
      label: "",
      render: (row) => (
        <button
          onClick={() => navigate(`/perfiles/edit/${row.id}`)}
          className="
            flex items-center gap-1
            px-3 py-1 text-xs
            border border-padsa-primary
            text-padsa-primary
            rounded-lg
            hover:bg-padsa-primary hover:text-white
          "
        >
          <Pencil size={14} />
          Editar
        </button>
      ),
    });
  }

  return columns;
};