import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { clientColumns } from "../config/clientColumns";

import { clientService } from "../services/client.service";
import type { ClientDto } from "../types/client.types";

import { Plus } from "lucide-react";
import logo from "../../../assets/logo.png";

export const ClientsPage = () => {
  const navigate = useNavigate();

  const [allData, setAllData] = useState<ClientDto[]>([]); // 🔥 TODO
  const [data, setData] = useState<ClientDto[]>([]);       // 🔥 PAGINADO
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const pageSize = 5;

  const [globalSearch, setGlobalSearch] = useState("");
  const [filters, setFilters] = useState<
    Partial<Record<keyof ClientDto, string>>
  >({});

  const handleFilterChange = (field: keyof ClientDto, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
    setPage(1);
  };

  const handleEdit = (client: ClientDto) => {
    navigate(`/clients/edit/${client.id}`, {
      state: client,
    });
  };

  const columns = clientColumns(handleEdit);

  /**
   * 🔥 CARGA COMPLETA
   */
  const loadData = async () => {
    try {
      setLoading(true);
      const response = await clientService.getClients();
      setAllData(response);
    } catch (error) {
      console.error("❌ Error cargando clientes", error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 🔥 PAGINACIÓN LOCAL
   */
  useEffect(() => {
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    setData(allData.slice(start, end));
  }, [page, allData]);

  useEffect(() => {
    loadData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Catálogo de Clientes
          </h1>
          <p className="text-padsa-text-secondary mt-1">
            Administración de clientes del sistema.
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
            onClick={() => navigate("/clients/new")}
            className="flex items-center gap-2 px-4 py-2 bg-padsa-primary text-white rounded-lg"
          >
            <Plus size={16} />
            Nuevo Registro
          </button>
        </div>
      </div>

      {/* TABLA */}
      <DataTable<ClientDto>
        data={data}
        columns={columns}
        loading={loading}

        page={page}
        pageSize={pageSize}
        total={allData.length} // 🔥 TOTAL REAL

        filters={filters}
        globalSearch={globalSearch}
        onGlobalSearchChange={setGlobalSearch}
        onFilterChange={handleFilterChange}
        onPageChange={setPage}
      />
    </motion.div>
  );
};