import { useNavigate } from "react-router-dom";
import { usePersonalProjectColumns } from "../config/personalProjectColumns";
import type { PersonalProjectDto } from "../types/personal.types";
import { useEffect, useState } from "react";
import { personalService } from "../services/personal.service";
import { motion } from "framer-motion";
import { ArrowLeft, Plus } from "lucide-react";
import { DataTable } from "../../../shared/components/ui/DataTable";

export const PersonalProjectPage = () => {
  const navigate = useNavigate();
  const columns = usePersonalProjectColumns();

const [data, setData] = useState<PersonalProjectDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [globalSearch, setGlobalSearch] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [filters, setFilters] = useState<
  Partial<Record<keyof PersonalProjectDto, string>>
>({});

  const handleFilterChange = (
    field: keyof PersonalProjectDto,
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const result = await personalService.getPersonalProjects();

      setData(result);

      setLoading(false);
    };

    loadData();
  }, []);

  /**
   * ==========================================
   * FILTROS
   * ==========================================
   */

  const filteredData = data.filter((row) => {
    const matchesColumnFilters = Object.entries(filters).every(
      ([key, value]) => {
        if (!value) return true;

        const rowValue = String(
          row[key as keyof PersonalProjectDto] ?? ""
        ).toLowerCase();

        return rowValue.includes(value.toLowerCase());
      }
    );

    const matchesGlobalSearch =
      !globalSearch ||
      Object.values(row).some((value) =>
        String(value ?? "").toLowerCase().includes(globalSearch.toLowerCase())
      );

    return matchesColumnFilters && matchesGlobalSearch;
  });

  /**
   * ==========================================
   * PAGINACIÓN
   * ==========================================
   */

  const start = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(start, start + pageSize);

  useEffect(() => {
    setPage(1);
  }, [filters, globalSearch]);

  return (
    <motion.div
      className="space-y-8 w-full"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* HEADER */}

      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-bold text-white">
          Personal - Proyectos
        </h1>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70 transition"
          >
            <ArrowLeft size={16} />
            Volver
          </button>

          <button
            onClick={() => navigate("/personal/new/project")}
            className="flex items-center gap-2 px-4 py-2 bg-padsa-primary text-white rounded-lg hover:bg-padsa-primary/80 transition"
          >
            <Plus size={16} />
            Nueva Asignacion
          </button>
        </div>
      </div>

      {/* TABLA */}

      <DataTable<PersonalProjectDto>
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