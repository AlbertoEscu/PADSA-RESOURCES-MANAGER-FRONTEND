import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { projectColumns } from "../config/projectColumns";

import { projectService } from "../services/project.service";
import type { ProjectDto } from "../types/project.types";

import { Plus } from "lucide-react";
import logo from "../../../assets/logo.png";

export type ProjectTableDto = ProjectDto;

export const ProjectsPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<ProjectTableDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔥 estados requeridos por DataTable
  const [filters, setFilters] = useState<
    Partial<Record<keyof ProjectTableDto, string>>
  >({});
  const [globalSearch, setGlobalSearch] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  // ✅ handler correcto (EL FIX DEL ERROR)
  const handleFilterChange = (
    field: keyof ProjectTableDto,
    value: string
  ) => {
    setFilters((prev) => {
      const updated = { ...prev };

      if (!value) delete updated[field];
      else updated[field] = value;

      return updated;
    });
  };

  const handleEdit = (project: ProjectTableDto) => {
    navigate(`/projects/edit/${project.id}`, {
      state: project,
    });
  };

  const columns = projectColumns(handleEdit);

  // 🔥 carga real
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await projectService.getProjects();
      setData(response);
    } catch (err) {
      console.error("Error cargando proyectos", err);
      setError("No se pudieron cargar los proyectos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔥 filtros + búsqueda (CLIENT SIDE)
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      // 🔎 global search
      const matchesSearch = globalSearch
        ? Object.values(item)
            .join(" ")
            .toLowerCase()
            .includes(globalSearch.toLowerCase())
        : true;

      // 🔎 filtros por columna
      const matchesFilters = Object.entries(filters).every(
        ([key, value]) => {
          if (!value) return true;

          const fieldValue = item[key as keyof ProjectTableDto];

          return fieldValue
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        }
      );

      return matchesSearch && matchesFilters;
    });
  }, [data, filters, globalSearch]);

  // 🔥 paginación local
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page]);

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
            <img src={logo} alt="Logo" className="w-5 h-5 object-contain" />
            Inicio
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

      {/* ERROR */}
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* TABLE */}
      <DataTable<ProjectTableDto>
        data={paginatedData}
        columns={columns}
        loading={loading}
        page={page}
        pageSize={pageSize}
        total={filteredData.length}
        filters={filters}
        globalSearch={globalSearch}
        onGlobalSearchChange={setGlobalSearch}
        onFilterChange={handleFilterChange}
        onPageChange={setPage}
      />
    </motion.div>
  );
};