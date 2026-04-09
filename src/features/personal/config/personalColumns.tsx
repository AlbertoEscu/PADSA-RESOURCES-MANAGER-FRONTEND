import type { Column } from "../../../shared/components/ui/DataTable";
import type { PersonalDto } from "../types/personal.types";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const usePersonalColumns = () => {
  const navigate = useNavigate();

  const columns: Column<PersonalDto>[] = [
    {
      key: "numeroPersonal",
      label: "Número Personal",
      sortable: true,
      filterable: true,
    },

    {
      key: "compania",
      label: "Compañía",
      filterable: true,
    },

    {
      key: "nombreCompleto",
      label: "Nombre Completo",
      filterable: true,
    },
    { key: "perfil", label: "Perfil" },

    { key: "curp", label: "CURP" },
    { key: "rfc", label: "RFC" },

    { key: "telefono", label: "Teléfono" },

    { key: "email", label: "Email" },

    { key: "direccion", label: "Dirección" },

    {
      key: "tipoRecurso",
      label: "Tipo Recurso",
      render: (row) => (
        <span
          className={`px-2 py-1 rounded text-xs ${
            row.tipoRecurso === "Interno"
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {row.tipoRecurso}
        </span>
      ),
    },

    { key: "nss", label: "NSS" },

    {
      key: "estatus",
      label: "Estatus",
      filterable: true,
    },

    {
      key: "fechaAlta",
      label: "Fecha Alta",
      sortable: true,
    },

    { key: "fechaBaja", label: "Fecha Baja" },

    {
      key: "fechaUltimaModificacion",
      label: "Última Modificación",
    },

    {
      key: "usuarioModificacion",
      label: "Usuario Modificación",
    },

    {
      key: "acciones",
      label: "",
      render: (row) => (
        <button
          onClick={() =>
            navigate(`/personal/edit/${row.id}`, {
              state: { personal: row },
            })
          }
          className="
            flex items-center gap-1
            px-3 py-1 text-xs
            border border-padsa-primary
            text-padsa-primary
            rounded-lg
            transition-all duration-200
            hover:bg-padsa-primary
            hover:text-white
            hover:shadow-md
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
