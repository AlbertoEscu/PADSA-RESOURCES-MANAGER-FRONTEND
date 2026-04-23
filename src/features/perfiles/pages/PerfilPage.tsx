import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";

import { perfilService } from "../services/perfil.service";
import type { PerfilDto } from "../types/perfil.types";
import { usePerfilColumns } from "../config/perfilColumns";
import { DataTable } from "../../../shared/components/ui/DataTable";

export const PerfilPage = () => {
  const navigate = useNavigate();
  const columns = usePerfilColumns();

  const [data, setData] = useState<PerfilDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [globalSearch, setGlobalSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [filters, setFilters] = useState<Partial<Record<keyof PerfilDto, string>>>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    const result = await perfilService.getAll();
    setData(result);
    setLoading(false);
  };

  const handleFilterChange = (field: keyof PerfilDto, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredData = data.filter((row) => {
    const matchFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return String(row[key as keyof PerfilDto] ?? "")
        .toLowerCase()
        .includes(value.toLowerCase());
    });

    const matchGlobal =
      !globalSearch ||
      Object.values(row).some((v) =>
        String(v ?? "").toLowerCase().includes(globalSearch.toLowerCase())
      );

    return matchFilters && matchGlobal;
  });

  const paginated = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <motion.div className="space-y-6 w-full">
      {/* HEADER */}
      <div className="flex justify-between">
        <h1 className="text-2xl text-white">Perfiles</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-padsa-surface-light rounded-lg"
          >
            <ArrowLeft size={16} />
          </button>

          <button
            onClick={() => navigate("/perfiles/new")}
            className="px-4 py-2 bg-padsa-primary text-white rounded-lg flex gap-2"
          >
            <Plus size={16} />
            Nuevo
          </button>
        </div>
      </div>

      {/* TABLE */}
      <DataTable<PerfilDto>
        data={paginated}
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