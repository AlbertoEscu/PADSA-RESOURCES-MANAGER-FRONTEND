import type { Column } from "../../../shared/components/ui/DataTable";
import type { CompanyRow } from "../pages/CompanyDetailsPage";
import { Pencil } from "lucide-react";

export const companyColumns = (onEdit: (company: CompanyRow) => void): Column<CompanyRow>[] => [
  {
    key: "nombreCompania",
    label: "Nombre compañía",
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
    key: "direccionFiscal",
    label: "Dirección fiscal",
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
    render: (row) => new Date(row.fechaUltimaModificacion).toLocaleDateString(),
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