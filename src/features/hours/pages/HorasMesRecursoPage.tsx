import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { horasMesRecursoColumns } from "../config/horasMesRecursoColumns";
import { horasMesRecursoService } from "../services/horasMesRecurso.service";

import type { HorasMesRecursoDto } from "../types/horasMesRecurso.types";

import { Plus, ArrowLeft } from "lucide-react";

import { Upload } from "lucide-react";
import { showSuccess, showError } from "../../../shared/utils/toast";

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

  // 🔥 Obtener mes actual para UI
  const now = new Date();
  const mesActual = now.toLocaleString("es-MX", { month: "long" });

  // 🚀 Carga de datos real
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const response = await horasMesRecursoService.getAll();

        setData(response);
      } catch (error) {
        console.error("❌ Error cargando horas mes:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleEdit = (row: HorasMesRecursoDto) => {
    navigate(`/hours/edit/${row.idHoras}`, {
      state: row, // 👈 AQUÍ ESTÁ LA MAGIA
    });
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

  // 🔎 Filtros
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

  // Reset página cuando filtras
  useEffect(() => {
    setPage(1);
  }, [filters, globalSearch]);

  // 📄 Paginación
  const start = (page - 1) * pageSize;
  const paginatedData = filteredData.slice(start, start + pageSize);

  const fileInputRef = useState<HTMLInputElement | null>(null);
  const multiFileInputRef = useState<HTMLInputElement | null>(null);

  // 📤 Upload simple
  const handleSingleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);

      await horasMesRecursoService.uploadFile(file);

      showSuccess("Archivo cargado correctamente");

      // 🔄 Recargar data
      const response = await horasMesRecursoService.getAll();
      setData(response);
    } catch (error) {
      console.error(error);
      showError("Error al cargar archivo");
    } finally {
      setLoading(false);
    }
  };

  // 📤 Upload múltiple
  const handleMultipleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    try {
      setLoading(true);

      await horasMesRecursoService.uploadMultiple(Array.from(files));

      showSuccess("Archivos cargados correctamente");

      // 🔄 Recargar data
      const response = await horasMesRecursoService.getAll();
      setData(response);
    } catch (error) {
      console.error(error);
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
        <h1 className="text-2xl font-bold text-white capitalize">
          Horas Mes / Recurso ({mesActual})
        </h1>

        <div className="flex gap-3 items-center">
          {/* INPUT HIDDEN SINGLE */}
          <input
            type="file"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleSingleUpload}
            id="upload-single"
          />

          {/* INPUT HIDDEN MULTIPLE */}
          <input
            type="file"
            accept=".xlsx,.xls"
            multiple
            className="hidden"
            onChange={handleMultipleUpload}
            id="upload-multiple"
          />

          {/* BOTÓN SINGLE */}
          <button
            onClick={() => document.getElementById("upload-single")?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Upload size={16} />
            Subir Excel
          </button>

          {/* BOTÓN MULTIPLE */}
          <button
            onClick={() => document.getElementById("upload-multiple")?.click()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Upload size={16} />
            Subir Múltiples
          </button>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light hover:bg-padsa-surface-light/70"
          >
            <ArrowLeft size={16} />
            Volver
          </button>

          <button
            onClick={() => navigate("/hours/new")}
            className="flex items-center gap-2 px-4 py-2 bg-padsa-primary text-white rounded-lg hover:bg-padsa-primary/80 transition"
          >
            <Plus size={16} />
            Nuevo Registro
          </button>
        </div>
      </div>

      {/* TABLA */}

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
    </motion.div>
  );
};
