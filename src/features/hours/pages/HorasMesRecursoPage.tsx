import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { horasMesRecursoColumns } from "../config/horasMesRecursoColumns";
import { horasMesRecursoService } from "../services/horasMesRecurso.service";

import type { HorasMesRecursoDto } from "../types/horasMesRecurso.types";

import { Upload, Search, RotateCcw } from "lucide-react";
import { showSuccess, showError } from "../../../shared/utils/toast";

import logo from "../../../assets/logo.png";

export const HorasMesRecursoPage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState<HorasMesRecursoDto[]>([]);
  const [loading, setLoading] = useState(true);

  const [globalSearch, setGlobalSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [filters, setFilters] = useState<
    Partial<Record<keyof HorasMesRecursoDto, string>>
  >({});

  const [searchFilters, setSearchFilters] = useState({
    empleadoId: "",
    proyectoId: "",
    fechaInicio: "",
    fechaFin: "",
  });

  const loadData = async (params = {}) => {
    try {
      setLoading(true);
      const response = await horasMesRecursoService.findWithFilters(params);
      setData(response);
    } catch (error) {
      console.error("❌ Error cargando:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSearch = () => {
    loadData({
      empleadoId: searchFilters.empleadoId || undefined,
      proyectoId: searchFilters.proyectoId || undefined,
      fechaInicio: searchFilters.fechaInicio || undefined,
      fechaFin: searchFilters.fechaFin || undefined,
    });
  };

  const handleClear = () => {
    setSearchFilters({
      empleadoId: "",
      proyectoId: "",
      fechaInicio: "",
      fechaFin: "",
    });
    loadData({});
  };

  const handleSearchChange = (field: string, value: string) => {
    setSearchFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEdit = (row: HorasMesRecursoDto) => {
    navigate(`/hours/edit/${row.id}`, { state: row });
  };

  const columns = horasMesRecursoColumns(handleEdit);

  const handleFilterChange = (
    field: keyof HorasMesRecursoDto,
    value: string,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filteredData = data.filter((row) => {
    const matchesColumnFilters = Object.entries(filters).every(
      ([key, value]) => {
        if (!value) return true;
        const rowValue = String((row as any)[key] ?? "").toLowerCase();
        return rowValue.includes(value.toLowerCase());
      },
    );

    const matchesGlobalSearch =
      !globalSearch ||
      Object.values(row).some((value) =>
        String(value ?? "")
          .toLowerCase()
          .includes(globalSearch.toLowerCase()),
      );

    return matchesColumnFilters && matchesGlobalSearch;
  });

  useEffect(() => {
    setPage(1);
  }, [filters, globalSearch]);

  const start = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(start, start + pageSize);

  // Uploads
  const handleSingleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      await horasMesRecursoService.uploadFile(file);
      showSuccess("Archivo cargado correctamente");
      await loadData();
    } catch {
      showError("Error al cargar archivo");
    } finally {
      setLoading(false);
    }
  };

  const handleMultipleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = e.target.files;
    if (!files) return;

    try {
      setLoading(true);
      await horasMesRecursoService.uploadMultiple(Array.from(files));
      showSuccess("Archivos cargados correctamente");
      await loadData();
    } catch {
      showError("Error al cargar archivos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col gap-6"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Horas Mes / Recurso</h1>
          <p className="text-sm text-gray-400">
            Consulta y gestión de horas cargadas por recurso
          </p>
        </div>
        <div className="flex gap-3 items-center">
          {" "}
          {/* INPUTS */}{" "}
          <input
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleSingleUpload}
            id="upload-single"
          />{" "}
          <input
            type="file"
            accept=".xlsx,.xls"
            multiple
            className="hidden"
            onChange={handleMultipleUpload}
            id="upload-multiple"
          />{" "}
          {/* BOTONES */}{" "}
          <button
            onClick={() => document.getElementById("upload-single")?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            {" "}
            <Upload size={16} /> Subir Excel{" "}
          </button>{" "}
          <button
            onClick={() => document.getElementById("upload-multiple")?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {" "}
            <Upload size={16} /> Subir Múltiples{" "}
          </button>{" "}
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70"
          >
            {" "}
            <img
              src={logo}
              alt="Logo"
              className="w-5 h-5 object-contain"
            />{" "}
            Inicio{" "}
          </button>{" "}
        </div>{" "}
      </div>

      {/* FILTROS PRO */}
      {/* FILTROS COMPACTOS PRO */}
      <div
        className="
  bg-[#1E293B] border border-white/10 
  px-4 py-3 
  rounded-xl shadow-lg 
  flex flex-wrap items-end gap-3
"
      >
        {/* Empleado */}
        <div className="flex flex-col text-xs text-gray-300">
          <span>Empleado</span>
          <input
            type="number"
            placeholder="ID"
            value={searchFilters.empleadoId}
            onChange={(e) => handleSearchChange("empleadoId", e.target.value)}
            className="
        h-9 px-2 
        rounded-md 
        bg-white text-black 
        border border-gray-300
        focus:ring-2 focus:ring-blue-500 outline-none
      "
          />
        </div>

        {/* Proyecto */}
        <div className="flex flex-col text-xs text-gray-300">
          <span>Proyecto</span>
          <input
            type="number"
            placeholder="ID"
            value={searchFilters.proyectoId}
            onChange={(e) => handleSearchChange("proyectoId", e.target.value)}
            className="h-9 px-2 rounded-md bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Fecha inicio */}
        <div className="flex flex-col text-xs text-gray-300">
          <span>Inicio</span>
          <input
            type="date"
            value={searchFilters.fechaInicio}
            onChange={(e) => handleSearchChange("fechaInicio", e.target.value)}
            className="h-9 px-2 rounded-md bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Fecha fin */}
        <div className="flex flex-col text-xs text-gray-300">
          <span>Fin</span>
          <input
            type="date"
            value={searchFilters.fechaFin}
            onChange={(e) => handleSearchChange("fechaFin", e.target.value)}
            className="h-9 px-2 rounded-md bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* BOTONES */}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={handleSearch}
            className="
        flex items-center gap-1
        h-9 px-4
        rounded-lg
        bg-gradient-to-r from-blue-600 to-blue-500
        text-white text-sm
        shadow hover:scale-[1.03]
        transition
      "
          >
            <Search size={14} />
            Buscar
          </button>

          <button
            onClick={handleClear}
            className="
        flex items-center gap-1
        h-9 px-4
        rounded-lg
        border border-gray-400
        text-gray-200 text-sm
        hover:bg-white/10
        transition
      "
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* TABLA */}
      <div className="bg-padsa-surface-light p-4 rounded-2xl shadow-md">
        <DataTable<HorasMesRecursoDto>
          columns={columns}
          data={paginatedData}
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
