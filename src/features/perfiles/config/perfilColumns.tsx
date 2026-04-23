import type { Column } from "../../../shared/components/ui/DataTable";
import type { PerfilDto } from "../types/perfil.types";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const usePerfilColumns = () => {
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
    },
    {
      key: "updatedAt",
      label: "Última actualización",
    },
    {
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
    },
  ];

  return columns;
};