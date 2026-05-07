import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { companyColumns } from "../config/companyColumns";
import { companyDetailsService } from "../services/companyDetails.service";
import type { CompanyDto } from "../types/companyDetails.types";

import { Plus } from "lucide-react";
import { showError } from "../../../shared/utils/toast";
import logo from "../../../assets/logo.png";
import { useAuth } from "../../auth/context/useAuth";

export type CompanyRow = CompanyDto & { id: number };

export const CompanyDetailsPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<CompanyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [globalSearch, setGlobalSearch] = useState("");
  const [filters, setFilters] = useState<
    Partial<Record<keyof CompanyRow, string>>
  >({});
  const { isAdmin } = useAuth();

  const pageSize = 5;

  const handleEdit = (company: CompanyRow) => {
    navigate(`/companies/edit/${company.id}`); // ✅ corregido
  };

  const columns = companyColumns(handleEdit, isAdmin);

  const handleFilterChange = (field: keyof CompanyRow, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await companyDetailsService.getCompanies();

      const mapped: CompanyRow[] = response.map((c) => ({
        ...c,
        id: c.id,
        nombre: c.nombre, // opcional pero explícito
      }));

      setData(mapped);
      setTotal(mapped.length);
    } catch (error) {
      showError("Error cargando compañías");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Detalles de Compañía
          </h1>
          <p className="text-padsa-text-secondary mt-1">
            Administración de datos generales de compañías.
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

{isAdmin && (
          <button
            onClick={() => navigate("/companies/new")}
            className="flex items-center gap-2 px-4 py-2 bg-padsa-primary text-white rounded-lg hover:bg-padsa-primary/80 transition"
          >
            <Plus size={16} /> Nuevo Registro
          </button>
          )}
        </div>
      </div>

      <DataTable<CompanyRow>
        data={data}
        columns={columns}
        loading={loading}
        page={page}
        pageSize={pageSize}
        total={total}
        filters={filters}
        globalSearch={globalSearch}
        onGlobalSearchChange={setGlobalSearch}
        onFilterChange={handleFilterChange}
        onPageChange={setPage}
      />
    </motion.div>
  );
};