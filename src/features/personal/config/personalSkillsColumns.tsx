import { useNavigate } from "react-router-dom";
import type { Column } from "../../../shared/components/ui/DataTable";
import type { PersonalSkillsDto } from "../types/personal.types";
import { Pencil } from "lucide-react";

const renderTags = (text?: string) =>
  text?.split(",").map((t, i) => (
    <span
      key={i}
      className="px-2 py-1 mr-1 mb-1 inline-block text-xs rounded bg-purple-500/20 text-purple-300"
    >
      {t.trim()}
    </span>
  ));

export const usePersonalSkillsColumns = () => {
  const navigate = useNavigate();

  const columns: Column<PersonalSkillsDto>[] = [
    {
      key: "numeroEmpleado",
      label: "Empleado",
      filterable: true,
    },
    {
      key: "nombreCompleto",
      label: "Nombre",
      filterable: true,
    },
    {
      key: "lenguajesProgramacion",
      label: "Lenguajes",
      render: (row) => renderTags(row.lenguajesProgramacion),
    },
    {
      key: "basesDatos",
      label: "BD",
      render: (row) => renderTags(row.basesDatos),
    },
    {
      key: "frameworks",
      label: "Frameworks",
      render: (row) => renderTags(row.frameworks),
    },
    {
      key: "cursos",
      label: "Cursos",
      render: (row) => renderTags(row.cursos),
    },
    {
      key: "certificaciones",
      label: "Certificaciones",
      render: (row) => renderTags(row.certificaciones),
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
      key: "acciones",
      label: "",
      render: (row) => (
        <button
          onClick={() => navigate(`/personal/edit/${row.idSkill}/skills`)}
          className="btn-edit"
        >
          <Pencil size={14} /> Editar
        </button>
      ),
    },
  ];

  return columns;
};
