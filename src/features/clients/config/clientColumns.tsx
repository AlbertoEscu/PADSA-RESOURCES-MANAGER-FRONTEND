import type { Column } from "../../../shared/components/ui/DataTable";
import type { ClientDto } from "../types/client.types";
import { Pencil } from "lucide-react";

export const clientColumns = (
  onEdit: (client: ClientDto) => void,
  canEdit: boolean,
): Column<ClientDto>[] => {
  const columns: Column<ClientDto>[] = [
    {
      key: "clave",
      label: "Clave",
      sortable: true,
      filterable: true,
    },
    {
      key: "nombre",
      label: "Nombre",
      sortable: true,
      filterable: true,
    },
    {
      key: "razonSocial",
      label: "Razón social",
      sortable: true,
      filterable: true,
    },
    {
      key: "rfc",
      label: "RFC",
      sortable: true,
      filterable: true,
    },
    {
      key: "domicilioFiscal",
      label: "Domicilio fiscal",
      sortable: true,
      filterable: true,
    },
    {
      key: "email",
      label: "Correo",
      sortable: true,
      filterable: true,
    },
    {
      key: "telefono",
      label: "Teléfono",
      sortable: true,
      filterable: true,
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
      key: "createdAt",
      label: "Fecha alta",
      sortable: true,
    },
    {
      key: "updatedAt",
      label: "Última modificación",
      sortable: true,
    },
    {
      key: "updatedBy",
      label: "Usuario",
      sortable: true,
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
