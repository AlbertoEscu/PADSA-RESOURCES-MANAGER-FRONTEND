import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { ArrowLeft, Plus } from "lucide-react";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { usePersonalProjectColumns } from "../config/personalProjectColumns";

import type { EmpleadoProyectoResponseDTO } from "../types/personal.types";
import { empleadoProyectoService } from "../services/personalProyecto.service";
import { useAuth } from "../../auth/context/useAuth";

export const PersonalProjectPage = () => {
  const { isAdmin } = useAuth();

  const navigate = useNavigate();
  const columns = usePersonalProjectColumns();

  const [data, setData] = useState<EmpleadoProyectoResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [filters, setFilters] = useState<
    Partial<Record<keyof EmpleadoProyectoResponseDTO, string>>
  >({});

  const [globalSearch, setGlobalSearch] = useState("");

  /**
   * =========================
   * LOAD DATA
   * =========================
   */
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const result = await empleadoProyectoService.getAll();
        setData(result);
      } catch (error) {
        console.error("Error cargando empleado-proyectos", error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleFilterChange = (
    field: keyof EmpleadoProyectoResponseDTO,
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /**
   * =========================
   * RESET PAGE ON FILTER CHANGE
   * =========================
   */
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
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Personal - Proyectos
          </h1>
          <p className="text-padsa-text-secondary">
            Asignación de personal a proyectos
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70 transition"
          >
            <ArrowLeft size={16} />
            Volver
          </button>
          {isAdmin && (
            <button
              onClick={() => navigate("/personal/new/project")}
              className="flex items-center gap-2 px-4 py-2 bg-padsa-primary text-white rounded-lg hover:bg-padsa-primary/80 transition"
            >
              <Plus size={16} />
              Nueva Asignación
            </button>
          )}
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <DataTable<EmpleadoProyectoResponseDTO>
        data={data}
        columns={columns}
        loading={loading}
        page={page}
        pageSize={pageSize}
        total={data.length}
        filters={filters}
        globalSearch={globalSearch}
        onGlobalSearchChange={setGlobalSearch}
        onFilterChange={handleFilterChange} // 👈 FIX
        onPageChange={setPage}
      />
    </motion.div>
  );
};
