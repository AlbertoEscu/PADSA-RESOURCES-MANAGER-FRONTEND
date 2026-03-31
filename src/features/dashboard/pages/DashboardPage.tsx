import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../auth/context/useAuth";
import { dashboardService } from "../services/dashboard.service";
import type { ResourceDto } from "../types/dashboard.types";
import { DataTable } from "../../../shared/components/ui/DataTable";
import { dashboardColumns } from "../types/dashboard.columns";
import { KpiCard } from "../../../shared/components/ui/KpiCard";

export const DashboardPage = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [allData, setAllData] = useState<ResourceDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);

  const columns = dashboardColumns;
  const [globalSearch, setGlobalSearch] = useState("");

  const createInitialFilters = () => {
    return dashboardColumns.reduce(
      (acc, col) => {
        acc[col.key as keyof ResourceDto] = "";
        return acc;
      },
      {} as Record<keyof ResourceDto, string>,
    );
  };

  const [filters, setFilters] = useState(createInitialFilters());

  const pageSize = 5;

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await dashboardService.getResources();
      setAllData(response);
    } catch (err) {
      setError("No se pudieron cargar los recursos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // 🔥 FILTRADO FRONTEND
  const filteredData = useMemo(() => {
  return allData.filter((r) => {
    const matchesColumnFilters =
      r.numeroRecurso.toLowerCase().includes(filters.numeroRecurso.toLowerCase()) &&
      r.numeroPersonal.toLowerCase().includes(filters.numeroPersonal.toLowerCase()) &&
      r.tipoRecurso.toLowerCase().includes(filters.tipoRecurso.toLowerCase()) &&
      r.numeroProyecto.toLowerCase().includes(filters.numeroProyecto.toLowerCase());

    const matchesGlobalSearch =
      !globalSearch ||
      Object.values(r).some((value) =>
        String(value).toLowerCase().includes(globalSearch.toLowerCase())
      );

    return matchesColumnFilters && matchesGlobalSearch;
  });
}, [allData, filters, globalSearch]);

  // 🔥 Reset página cuando cambian filtros
  useEffect(() => {
    setPage(1);
  }, [filters, globalSearch]);

  // 🔥 PAGINACIÓN FRONTEND
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
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Bienvenido, {user?.username} 👋
        </h1>

        <p className="text-padsa-text-secondary mt-1">
          Administración general de recursos activos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KpiCard title="Recursos activos" value={allData.length} icon="👤" />

        <KpiCard
          title="Proyectos"
          value={new Set(allData.map((r) => r.numeroProyecto)).size}
          icon="📁"
        />

        <KpiCard
          title="Tipos de recurso"
          value={new Set(allData.map((r) => r.tipoRecurso)).size}
          icon="🧑‍💻"
        />

        <KpiCard
          title="Consultores"
          value={allData.filter((r) => r.tipoRecurso === "Consultor").length}
          icon="📊"
        />
      </div>

      <div className="h-px bg-padsa-border my-6"></div>
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-xl">
          {error}
        </div>
      )}

      <DataTable<ResourceDto>
        data={paginatedData}
        columns={columns}
        total={filteredData.length}
        loading={loading}
        page={page}
        pageSize={pageSize}
        filters={filters}
        globalSearch={globalSearch}
        onGlobalSearchChange={setGlobalSearch}
        onFilterChange={(field, value) =>
          setFilters((prev) => ({ ...prev, [field]: value }))
        }
        onPageChange={setPage}
      />
    </motion.div>
  );
};
