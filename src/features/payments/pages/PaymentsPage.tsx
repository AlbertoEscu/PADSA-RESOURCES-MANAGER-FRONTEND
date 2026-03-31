import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { usePaymentColumns } from "../config/paymentColumns";
import { paymentsService } from "../services/payments.service";

import type { PaymentDto } from "../types/payments.types";
import { ArrowLeft, Plus } from "lucide-react";

export const PaymentsPage = () => {
  const navigate = useNavigate();

  // Estado de pagos
  const [data, setData] = useState<PaymentDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [globalSearch, setGlobalSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [filters, setFilters] = useState<Partial<Record<keyof PaymentDto, string>>>({});

  // Función para actualizar un pago en la tabla después de aprobar/cancelar
  const handleUpdateRow = (updated: PaymentDto) => {
    setData((prev) =>
      prev.map((row) => (row.idPago === updated.idPago ? updated : row))
    );
  };

  // Columnas usando el callback para actualizar la tabla
  const columns = usePaymentColumns(handleUpdateRow);

  // Filtro de columnas
  const handleFilterChange = (field: keyof PaymentDto, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Cargar pagos
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await paymentsService.getPayments(page - 1, pageSize);
      setData(result);
      setLoading(false);
    };
    loadData();
  }, [page]);

  // FILTROS
  const filteredData = data.filter((row) => {
    const matchesColumnFilters = Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      const rowValue = String((row as any)[key]).toLowerCase();
      return rowValue.includes(value.toLowerCase());
    });

    const matchesGlobalSearch =
      !globalSearch ||
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(globalSearch.toLowerCase())
      );

    return matchesColumnFilters && matchesGlobalSearch;
  });

  useEffect(() => {
    setPage(1);
  }, [filters, globalSearch]);

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Consulta de Pagos</h1>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70"
          >
            <ArrowLeft size={16} />
            Volver
          </button>
        </div>
      </div>

      {/* TABLA */}
      <DataTable<PaymentDto>
        data={filteredData}
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