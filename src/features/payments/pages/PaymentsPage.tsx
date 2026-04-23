import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { usePaymentColumns } from "../config/paymentColumns";
import { paymentsService } from "../services/payments.service";

import type { PaymentDto } from "../types/payments.types";
import { ArrowLeft, Home } from "lucide-react";
import { personalService } from "../../personal/services/personal.service";
import logo from "../../../assets/logo.png";

// 🔹 Option type
interface Option {
  value: number;
  label: string;
}

export const PaymentsPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<PaymentDto[]>([]);
  const [loading, setLoading] = useState(false);

  const [globalSearch, setGlobalSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [filters, setFilters] = useState<
    Partial<Record<keyof PaymentDto, string>>
  >({});

  // 🔥 NUEVO: filtros de cálculo
  const [proyectos, setProyectos] = useState<Option[]>([]);
  const [selectedProyecto, setSelectedProyecto] = useState<number | null>(null);

  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [anio, setAnio] = useState<number>(new Date().getFullYear());

  // 🔥 Actualizar fila
  const handleUpdateRow = (updated: PaymentDto) => {
    setData((prev) =>
      prev.map((row) => (row.idPago === updated.idPago ? updated : row))
    );
  };

  const columns = usePaymentColumns(handleUpdateRow);

  const handleFilterChange = (field: keyof PaymentDto, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // 🔥 Cargar proyectos
  useEffect(() => {
    const loadProyectos = async () => {
      const data = await personalService.getCatalogoProyectosOptions();
      setProyectos(data);
    };

    loadProyectos();
  }, []);

  // 🔥 CALCULAR PAGOS
  const handleCalcular = async () => {
    if (!selectedProyecto) {
      alert("Selecciona un proyecto");
      return;
    }

    try {
      setLoading(true);

      const result = await paymentsService.calcularPagosProyecto(
        selectedProyecto,
        mes,
        anio
      );

      setData(result);
    } catch (error) {
      console.error("Error calculando pagos", error);
      alert("Error al calcular pagos");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 FILTROS
  const filteredData = data.filter((row) => {
    const matchesColumnFilters = Object.entries(filters).every(
      ([key, value]) => {
        if (!value) return true;
        const rowValue = String((row as any)[key]).toLowerCase();
        return rowValue.includes(value.toLowerCase());
      }
    );

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
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          Consulta de Pagos
        </h1>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70"
        >
          <img src={logo} alt="Logo" className="w-5 h-5 object-contain" />
          Inicio
        </button>
      </div>

      {/* 🔥 FILTROS DE CÁLCULO */}
      <div className="flex flex-wrap gap-4 items-end">
        {/* PROYECTO */}
        <div>
          <label className="text-sm text-padsa-text-secondary">
            Proyecto
          </label>
          <select
            value={selectedProyecto ?? ""}
            onChange={(e) =>
              setSelectedProyecto(Number(e.target.value))
            }
            className="w-56 mt-1 px-3 py-2 bg-padsa-surface rounded-lg border border-padsa-border"
          >
            <option value="">Selecciona</option>
            {proyectos.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* MES */}
        <div>
          <label className="text-sm text-padsa-text-secondary">Mes</label>
          <select
            value={mes}
            onChange={(e) => setMes(Number(e.target.value))}
            className="w-40 mt-1 px-3 py-2 bg-padsa-surface rounded-lg border border-padsa-border"
          >
            {[
              "Enero","Febrero","Marzo","Abril","Mayo","Junio",
              "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
            ].map((m, i) => (
              <option key={i + 1} value={i + 1}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* AÑO */}
        <div>
          <label className="text-sm text-padsa-text-secondary">Año</label>
          <select
            value={anio}
            onChange={(e) => setAnio(Number(e.target.value))}
            className="w-32 mt-1 px-3 py-2 bg-padsa-surface rounded-lg border border-padsa-border"
          >
            {Array.from({ length: 5 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>

        {/* BOTÓN */}
        <button
          onClick={handleCalcular}
          disabled={!selectedProyecto || loading}
          className="px-6 py-2 bg-padsa-primary text-white rounded-lg hover:bg-padsa-primary/80 disabled:opacity-50"
        >
          {loading ? "Calculando..." : "Calcular"}
        </button>
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