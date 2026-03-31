import type { Column } from "../../../shared/components/ui/DataTable";
import type { ClientDto } from "../types/client.types";
import { Pencil } from "lucide-react";

export const clientColumns = (
  onEdit: (client: ClientDto) => void,
): Column<ClientDto>[] => [
  {
    key: "numeroCliente",
    label: "Número cliente",
    sortable: true,
    filterable: true,
  },
  {
    key: "nombreCliente",
    label: "Nombre cliente",
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
    key: "correoElectronico",
    label: "Correo electrónico",
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
    sortable: true,
    filterable: true,
    render: (row) => (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          row.estatus === "Activo"
            ? "bg-green-500/20 text-green-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {row.estatus}
      </span>
    ),
  },
  {
    key: "fechaUltimaModificacion",
    label: "Fecha modificación",
    sortable: true,
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
        className="flex items-center gap-1 px-3 py-1 text-xs border border-padsa-primary text-padsa-primary rounded-lg transition-all duration-200 hover:bg-padsa-primary hover:text-white hover:shadow-md"
      >
        <Pencil size={14} />
        Editar
      </button>
    ),
  },
];