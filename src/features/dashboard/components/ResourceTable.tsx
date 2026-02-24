import React from "react";
import type { Resource } from "../hooks/useDashboardData";

interface ResourceTableProps {
  resources: Resource[];
  loading: boolean;
}

const ResourceTable: React.FC<ResourceTableProps> = ({ resources, loading }) => {
  if (loading) return <p className="text-white">Cargando tabla...</p>;

  return (
    <div className="
      bg-white/10
      backdrop-blur-lg
      border
      border-white/20
      rounded-2xl
      shadow-lg
      shadow-blue-900/30
      overflow-hidden
    ">
      <table className="min-w-full">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold">Numero de Recurso</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Numero de Personal</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Tipo de Recurso</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Numero de Proyecto</th>
            <th className="px-4 py-3 text-left text-sm font-semibold"></th>
            <th className="px-4 py-3 text-left text-sm font-semibold"></th>
            <th className="px-4 py-3 text-left text-sm font-semibold"></th>
          </tr>
        </thead>

        <tbody>
          {resources.map((r, i) => (
            <tr
              key={i}
              className={`
                ${i % 2 === 0 ? "bg-green-500/50" : "bg-green-400/30"}
                text-white
                transition
                duration-200
                hover:bg-green-600
              `}
            >
              <td className="px-4 py-3 text-sm">{r.recurso}</td>
              <td className="px-4 py-3 text-sm">{r.personal}</td>
              <td className="px-4 py-3 text-sm">{r.tipo}</td>
              <td className="px-4 py-3 text-sm">{r.proyecto}</td>
              <td className="px-4 py-3 text-sm">{r.col5}</td>
              <td className="px-4 py-3 text-sm">{r.col6}</td>
              <td className="px-4 py-3 text-sm">{r.col7}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ResourceTable;
