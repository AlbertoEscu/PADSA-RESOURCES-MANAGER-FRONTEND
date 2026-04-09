import { useNavigate } from "react-router-dom";
import type { PersonalProjectDto } from "../types/personal.types";
import type { Column } from "../../../shared/components/ui/DataTable";
import { Pencil } from "lucide-react";

export const usePersonalProjectColumns = () => {

      const navigate = useNavigate();


  const columns: Column<PersonalProjectDto>[] = [

    {
      key: "numeroEmpleado",
      label: "Número Empleado",
      filterable: true
    },

    {
      key: "nombreCompleto",
      label: "Nombre Completo",
      filterable: true
    },

    {
      key: "compañia",
      label: "Compañía"
    },

    {
      key: "perfil",
      label: "Perfil"
    },

    {
      key: "idproyecto",
      label: "idProyecto"
    },

    {
      key: "idcliente",
      label: "idCliente"
    },

    {
      key: "nombreProyecto",
      label: "Nombre Proyecto"
    },

    {
      key: "fechaUltimaModificacion",
      label: "Última Modificación"
    },

    {
      key: "usuarioModificacion",
      label: "Usuario Modificación"
    },
     {
      key: "acciones",
      label: "",
      render: (row) => (
        <button
          onClick={() => navigate(`/personal/edit/${row.id}/project`)}
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