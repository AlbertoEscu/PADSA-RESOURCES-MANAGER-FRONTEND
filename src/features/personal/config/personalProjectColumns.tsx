import { useNavigate } from "react-router-dom";
import type { PersonalSkillsDto } from "../types/personal.types";
import type { Column } from "../../../shared/components/ui/DataTable";
import { Pencil } from "lucide-react";

export const usePersonalProjectColumns = () => {

      const navigate = useNavigate();


  const columns: Column<PersonalSkillsDto>[] = [

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
      key: "lenguajesProgramacion",
      label: "Lenguajes"
    },

    {
      key: "basesDatos",
      label: "Bases de Datos"
    },

    {
      key: "frameworks",
      label: "Frameworks"
    },

    {
      key: "cursos",
      label: "Cursos"
    },

    {
      key: "certificaciones",
      label: "Certificaciones"
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