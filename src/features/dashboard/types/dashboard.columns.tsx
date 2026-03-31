import type { Column } from "../../../shared/components/ui/DataTable";
import type { ResourceDto } from "./dashboard.types";

export const dashboardColumns: Column<ResourceDto>[] = [
  {
    key: "numeroRecurso",
    label: "Número Recurso",
    sortable: true,
    filterable: true,
  },
  {
    key: "numeroPersonal",
    label: "Número Personal",
    sortable: true,
    filterable: true,
  },
  {
    key: "tipoRecurso",
    label: "Tipo Recurso",
    sortable: true,
    filterable: true,
    render: (row) => {
      const colorMap: Record<string, string> = {
        Dev: "bg-blue-500/20 text-blue-400",
        QA: "bg-purple-500/20 text-purple-400",
        DevOps: "bg-orange-500/20 text-orange-400",
        PM: "bg-green-500/20 text-green-400",
        Consultor: "bg-cyan-500/20 text-cyan-400",
      };

      return (
        <span
          className={`px-2 py-1 rounded-md text-xs font-medium ${
            colorMap[row.tipoRecurso] || "bg-gray-500/20 text-gray-300"
          }`}
        >
          {row.tipoRecurso}
        </span>
      );
    },
  },
  {
    key: "numeroProyecto",
    label: "Proyecto",
    sortable: true,
    filterable: true,
    render: (row) => (
      <div className="flex items-center gap-2">
        <span className="text-slate-400">📁</span>
        {row.numeroProyecto}
      </div>
    ),
  },
];
