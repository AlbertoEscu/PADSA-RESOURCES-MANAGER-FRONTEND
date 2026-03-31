import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { useTarifaRecursoColumns } from "../config/tarifaRecursoColumns";
import type { TarifaRecursoDto } from "../types/tarifaRecurso.types";

import { ArrowLeft, Plus, Pencil } from "lucide-react";
import { tarifaRecursoService } from "../services/tarifaRecurso.service";

// Extendemos el tipo para DataTable
type DataTableRow = TarifaRecursoDto & { id: number };

export const TarifaRecursoPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<DataTableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalElements, setTotalElements] = useState(0);

  const [globalSearch, setGlobalSearch] = useState("");
  const [filters, setFilters] = useState<Partial<Record<keyof DataTableRow, string>>>({});
  const columns = useTarifaRecursoColumns();

  // Cambiar filtros
  const handleFilterChange = (field: keyof DataTableRow, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  // 🔥 Fetch de datos real con backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Obtener datos con filtros, búsqueda y paginación
        const result = await tarifaRecursoService.getAll(
          page - 1, // backend 0-index
          pageSize,
          globalSearch,
          filters as any // cast necesario para enviar solo las keys correctas al backend
        );

        // Mapear idTarifas → id para DataTable
        const mappedData: DataTableRow[] = result.content.map(row => ({
          ...row,
          id: row.idTarifas,
        }));

        setData(mappedData);
        setTotalElements(result.totalElements);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, pageSize, globalSearch, filters]);

  // Reset page si cambian filtros o búsqueda
  useEffect(() => setPage(1), [globalSearch, filters]);

  return (
    <motion.div className="space-y-8" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Tarifas por Recurso</h1>
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70"
          >
            <ArrowLeft size={16} /> Volver
          </button>
          <button
            onClick={() => navigate("/rates/new")}
            className="flex items-center gap-2 px-4 py-2 bg-padsa-primary text-white rounded-lg hover:bg-padsa-primary/80 transition"
          >
            <Plus size={16} /> Nuevo Registro
          </button>
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