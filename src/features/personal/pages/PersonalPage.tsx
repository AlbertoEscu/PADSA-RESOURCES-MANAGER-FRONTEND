import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { usePersonalColumns } from "../config/personalColumns";
import { personalService } from "../services/personal.service";
import { Plus } from "lucide-react";


import type { PersonalDto } from "../types/personal.types";

import logo from "../../../assets/logo.png";
import { useAuth } from "../../auth/context/useAuth";

export const PersonalPage = () => {

  const { isAdmin } = useAuth();
  const navigate = useNavigate();
  const columns = usePersonalColumns(isAdmin);

  const [data, setData] = useState<PersonalDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [globalSearch, setGlobalSearch] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [filters, setFilters] = useState<
    Partial<Record<keyof PersonalDto, string>>
  >({});

  const handleFilterChange = (field: keyof PersonalDto, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

useEffect(() => {
  const loadData = async () => {
    setLoading(true);

    const result = await personalService.getAll(); // ✅ FIX

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

        const rowValue = String((row as any)[key]).toLowerCase();

        return rowValue.includes(value.toLowerCase());
      },
    );

    const matchesGlobalSearch =
      !globalSearch ||
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(globalSearch.toLowerCase()),
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

        {/* TITULO */}
        <h1 className="text-2xl font-bold text-white">
          Personal
        </h1>

        {/* BOTONES DERECHA */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70 transition"
          >
            <img src={logo} alt="Logo" className="w-5 h-5 object-contain" />
            Inicio
          </button>

{isAdmin && (
          <button
            onClick={() => navigate("/personal/new")}
            className="flex items-center gap-2 px-4 py-2 bg-padsa-primary text-white rounded-lg hover:bg-padsa-primary/80 transition"
          >
            <Plus size={16} />
            Nuevo Registro
          </button>
)}
        </div>

      </div>

      {/* TABLA */}

      <DataTable<PersonalDto>
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
