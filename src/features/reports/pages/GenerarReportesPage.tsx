import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { reportesService } from "../services/reports.service";

import type { ReporteMensualProyectoResponse } from "../types/reports.types";

import { FileDown, Search, RotateCcw } from "lucide-react";
import logo from "../../../assets/logo.png";

import { bitacoraColumns } from "../config/bitacoraColumns";

export const GenerarReportesPage = () => {

  const navigate = useNavigate();

  const [data, setData] = useState<ReporteMensualProyectoResponse[]>([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const [filters, setFilters] = useState({
    proyectoId: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const response = await reportesService.getReporteMensual({
        proyectoId: filters.proyectoId ? Number(filters.proyectoId) : undefined,
        fechaInicio: filters.fechaInicio || undefined,
        fechaFin: filters.fechaFin || undefined,
      });

      setData(response);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = () => loadData();

  const handleClear = () => {
    setFilters({
      proyectoId: "",
      fechaInicio: "",
      fechaFin: "",
    });

    setTimeout(loadData, 0);
  };

  const exportExcel = async () => {
    setExporting(true);

    const rows = filteredRows.length ? filteredRows : data;

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

    XLSX.writeFile(workbook, "reporte_mensual.xlsx");

    setExporting(false);
  };

  return (
    <motion.div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          Reporte Mensual de Proyectos
        </h1>

        <div className="flex gap-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-padsa-surface-light text-white rounded-lg"
          >
            <img src={logo} className="w-5 h-5 inline mr-2" />
            Inicio
          </button>

          <button
            onClick={exportExcel}
            disabled={exporting}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            <FileDown size={16} className="inline mr-1" />
            Exportar
          </button>
        </div>
      </div>

      {/* FILTROS CARD (NUEVO ESTILO) */}
      <div className="bg-[#1E293B] border border-white/10 p-4 rounded-xl flex flex-wrap gap-3 items-end">

        {/* PROYECTO */}
        <div className="flex flex-col text-xs text-gray-300">
          <span>Proyecto ID</span>
          <input
            type="number"
            value={filters.proyectoId}
            onChange={(e) =>
              setFilters({ ...filters, proyectoId: e.target.value })
            }
            className="h-9 px-2 rounded bg-white text-black"
          />
        </div>

        {/* FECHA INICIO */}
        <div className="flex flex-col text-xs text-gray-300">
          <span>Fecha Inicio</span>
          <input
            type="date"
            value={filters.fechaInicio}
            onChange={(e) =>
              setFilters({ ...filters, fechaInicio: e.target.value })
            }
            className="h-9 px-2 rounded bg-white text-black"
          />
        </div>

        {/* FECHA FIN */}
        <div className="flex flex-col text-xs text-gray-300">
          <span>Fecha Fin</span>
          <input
            type="date"
            value={filters.fechaFin}
            onChange={(e) =>
              setFilters({ ...filters, fechaFin: e.target.value })
            }
            className="h-9 px-2 rounded bg-white text-black"
          />
        </div>

        {/* BOTONES */}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={handleSearch}
            className="h-9 px-4 bg-blue-600 text-white rounded-lg flex items-center gap-1"
          >
            <Search size={14} />
            Buscar
          </button>

          <button
            onClick={handleClear}
            className="h-9 px-4 border border-gray-400 text-white rounded-lg flex items-center gap-1"
          >
            <RotateCcw size={14} />
            Limpiar
          </button>
        </div>
      </div>

      {/* TABLA */}
      <div className="bg-padsa-surface-light p-4 rounded-2xl">
        <DataTable
          columns={bitacoraColumns}
          data={data}
          loading={loading}
          page={1}
          pageSize={10}
          total={data.length}
          filters={{}}
          onFilterChange={() => {}}
          onPageChange={() => {}}
          onFilteredDataChange={setFilteredRows}
        />
      </div>

    </motion.div>
  );
};