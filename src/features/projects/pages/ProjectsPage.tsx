import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { projectColumns } from "../config/projectColumns";

import { projectService } from "../services/project.service";
import type { ProjectDto } from "../types/project.types";

import { ArrowLeft, Plus } from "lucide-react";

// 👇 tipo extendido FUERA del componente (mejor práctica)
export type ProjectTableDto = ProjectDto & {
  id: number;
};

export const ProjectsPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<ProjectTableDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [filters, setFilters] = useState<
    Partial<Record<keyof ProjectTableDto, string>>
  >({});
  const [error, setError] = useState<string | null>(null);

  const pageSize = 5;

  const handleEdit = (project: ProjectTableDto) => {
    navigate(`/projects/edit/${project.idProyecto}`, {
      state: project,
    });
  };

  const columns = projectColumns(handleEdit);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await projectService.getProjects(page, pageSize);

      const mappedData: ProjectTableDto[] = response.content.map((item) => ({
        ...item,
        id: item.idProyecto,
      }));

      setData(mappedData);
      setTotal(response.totalElements);
    } catch (err) {
      console.error("Error cargando proyectos", err);
      setError("No se pudieron cargar los proyectos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Catálogo de Proyectos
          </h1>
          <p className="text-padsa-text-secondary mt-1">
            Administración de proyectos del sistema.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70"
          >
            <ArrowLeft size={16} />
            Volver
          </button>

          <button
            onClick={() => navigate("/projects/new")}
            className="flex items-center gap-2 px-4 py-2 bg-padsa-primary text-white rounded-lg hover:bg-padsa-primary/80 transition"
          >
            <Plus size={16} />
            Nuevo Registro
          </button>
        </div>
      </div>
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* TABLE */}
      <DataTable<ProjectTableDto>
        data={data}
        columns={columns}
        loading={loading}
        page={page + 1}
        pageSize={pageSize}
        total={total}
        filters={filters} // 👈 vacío pero cumple
        onFilterChange={() => {}} // 👈 noop
        onPageChange={(newPage) => setPage(newPage - 1)}
      />
    </motion.div>
  );
};
