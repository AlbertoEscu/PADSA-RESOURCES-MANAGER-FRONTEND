import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { clientColumns } from "../config/clientColumns";

import { clientService } from "../services/client.service";
import type { ClientDto } from "../types/client.types";

import { ArrowLeft, Plus } from "lucide-react";

export const ClientsPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<ClientDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);
  const [globalSearch, setGlobalSearch] = useState("");

  const [filters, setFilters] = useState<
    Partial<Record<keyof ClientDto, string>>
  >({});

  const pageSize = 5;

  const handleFilterChange = (field: keyof ClientDto, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));

    setPage(1);
  };

  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleEdit = (client: ClientDto) => {
    setSelectedId(client.id);

    setTimeout(() => {
      navigate(`/clients/edit/${client.id}`, {
        state: client,
      });
    }, 180);
  };

  const columns = clientColumns(handleEdit);

const loadData = async () => {
  setLoading(true);

  const response = await clientService.getClients(page, pageSize);

  setData(response.data);
  setTotal(response.total);
  setLoading(false);
};

useEffect(() => {
  loadData();
}, [page]);



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
            Catálogo de Clientes
          </h1>
          <p className="text-padsa-text-secondary mt-1">
            Administración de clientes del sistema.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70"
          >
            <ArrowLeft size={16} />
            Volver
          </button>

          <button
            onClick={() => navigate("/clients/new")}
            className="flex items-center gap-2 px-4 py-2 bg-padsa-primary text-white rounded-lg hover:bg-padsa-primary/80 transition"
          >
            <Plus size={16} />
            Nuevo Registro
          </button>
        </div>
      </div>

      <DataTable<ClientDto>
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