import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import logo from "../../../assets/logo.png";

import { perfilService } from "../services/perfil.service";
import type { PerfilDto } from "../types/perfil.types";
import { usePerfilColumns } from "../config/perfilColumns";
import { useAuth } from "../../auth/context/useAuth";
import { DataTable } from "../../../shared/components/ui/DataTable";

export const PerfilPage = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  const columns = usePerfilColumns(isAdmin);

  const [data, setData] = useState<PerfilDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [globalSearch, setGlobalSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [filters, setFilters] = useState<
    Partial<Record<keyof PerfilDto, string>>
  >({});

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6 w-full"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Perfiles</h1>
          <p className="text-sm text-gray-400">
            Administración de perfiles del sistema
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light"
          >
            <img src={logo} className="w-5 h-5" />
            Inicio
          </button>
          <button
            onClick={() => navigate("/perfiles/new")}
            className="flex items-center gap-2 px-4 py-2 bg-padsa-primary text-white rounded-lg"
          >
            <Plus size={16} />
            Nuevo Registro
          </button>
        </div>
      </div>

      {/* TABLA EN CARD */}
      <div className="bg-padsa-surface-light p-4 rounded-2xl shadow-md">
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
      </div>
    </motion.div>
  );
};