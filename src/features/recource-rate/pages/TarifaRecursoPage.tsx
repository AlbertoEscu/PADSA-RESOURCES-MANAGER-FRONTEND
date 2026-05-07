import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { useTarifaRecursoColumns } from "../config/tarifaRecursoColumns";
import type { TarifaResponse } from "../types/tarifaRecurso.types";
import { tarifaService } from "../services/tarifaRecurso.service";

import { Plus } from "lucide-react";
import logo from "../../../assets/logo.png";
import { useAuth } from "../../auth/context/useAuth";

export const TarifaRecursoPage = () => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState<TarifaResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);

  const [globalSearch, setGlobalSearch] = useState("");
  const [filters, setFilters] = useState<
    Partial<Record<keyof TarifaResponse, string>>
  >({});

  const columns = useTarifaRecursoColumns(isAdmin);

  const handleFilterChange = (field: keyof TarifaResponse, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await tarifaService.getAll();

        let filtered = result;

        // 🔎 búsqueda global (mejorada)
        if (globalSearch) {
          const searchLower = globalSearch.toLowerCase();
          filtered = result.filter((item) =>
            [
              item.clave,
              item.proyectoClave,
              item.empleadoClave,
              item.equipoAlianza,
            ]
              .filter(Boolean)
              .some((value) =>
                String(value).toLowerCase().includes(searchLower),
              ),
          );
        }

        // 🔎 filtros por columna
        Object.entries(filters).forEach(([key, value]) => {
          if (value) {
            filtered = filtered.filter((item) =>
              String(item[key as keyof TarifaResponse] ?? "")
                .toLowerCase()
                .includes(value.toLowerCase()),
            );
          }
        });

        // 📄 paginación
        const start = (page - 1) * pageSize;
        const end = start + pageSize;

        setData(filtered.slice(start, end));
        setTotalElements(filtered.length);
      } catch (error) {
        console.error("Error cargando tarifas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, globalSearch, filters]);

  useEffect(() => {
    setPage(1);
  }, [globalSearch, filters]);

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Tarifas por Recurso</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70"
          >
            <img src={logo} alt="Logo" className="w-5 h-5 object-contain" />
            Inicio
          </button>
          {isAdmin && (
            <button
              onClick={() => navigate("/rates/new")}
              className="flex items-center gap-2 px-4 py-2 bg-padsa-primary text-white rounded-lg hover:bg-padsa-primary/80 transition"
            >
              <Plus size={16} /> Nuevo Registro
            </button>
          )}
        </div>
      </div>

      {/* TABLA */}
      <DataTable
        data={data}
        columns={columns}
        loading={loading}
        page={page}
        pageSize={pageSize}
        total={totalElements}
        filters={filters}
        globalSearch={globalSearch}
        onGlobalSearchChange={setGlobalSearch}
        onFilterChange={handleFilterChange}
        onPageChange={setPage}
      />
    </motion.div>
  );
};
