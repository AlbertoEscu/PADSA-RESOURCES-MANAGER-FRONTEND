import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

import { DataTable } from "../../../shared/components/ui/DataTable";
import { reportesService } from "../services/reports.service";

import type {
  BitacoraMensualResponse,
  ReporteMensualProyectoResponse,
} from "../types/reports.types";

import { ArrowLeft, FileDown } from "lucide-react";

// Columnas dinámicas para DataTable
const bitacoraColumns = [
  { key: "idEmpleado", label: "ID Empleado" },
  { key: "nombreEmpleado", label: "Nombre Empleado" },
  { key: "rfcEmpleado", label: "RFC" },
  { key: "emailEmpleado", label: "Email" },
  { key: "idCompania", label: "ID Compañía" },
  { key: "nombreCompania", label: "Compañía" },
  { key: "idProyecto", label: "ID Proyecto" },
  { key: "nombreProyecto", label: "Proyecto" },
  { key: "idJira", label: "ID Jira" },
  { key: "idHoras", label: "ID Horas" },
  { key: "fecha", label: "Fecha" },
  { key: "mes", label: "Mes" },
  { key: "anio", label: "Año" },
  { key: "horasTrabajadas", label: "Horas Trabajadas" },
  { key: "descripcion", label: "Descripción" },
];

const empleadosColumns = [
  { key: "idEmpleado", label: "ID Empleado" },
  { key: "nombreEmpleado", label: "Nombre Empleado" },
  { key: "idProyecto", label: "ID Proyecto" },
  { key: "nombreProyecto", label: "Proyecto" },
  { key: "idCompania", label: "ID Compañía" },
  { key: "nombreCompania", label: "Compañía" },
  { key: "mes", label: "Mes" },
  { key: "anio", label: "Año" },
  { key: "totalHoras", label: "Total Horas" },
];

type ReportType = "bitacora" | "empleados";

export const GenerarReportesPage = () => {
  const navigate = useNavigate();

  const [reportType, setReportType] = useState<ReportType>("bitacora");

  // Filtros
  const [idEmpleado, setIdEmpleado] = useState<number | "">("");
  const [idCompania, setIdCompania] = useState<number | "">("");
  const [idProyecto, setIdProyecto] = useState<number | "">("");
  const [mes, setMes] = useState<number | "">("");
  const [anio, setAnio] = useState<number | "">("");

  // Estados de datos
  const [bitacoraData, setBitacoraData] = useState<BitacoraMensualResponse[]>(
    [],
  );
  const [empleadosData, setEmpleadosData] = useState<
    ReporteMensualProyectoResponse[]
  >([]);
  const [filteredRows, setFilteredRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  // Función para consultar datos según filtros
  const consultarReportes = async () => {
    setLoading(true);
    try {
      if (reportType === "bitacora") {
        const response = await reportesService.getBitacoraMensual(
          idEmpleado || undefined,
          idCompania || undefined,
          idProyecto || undefined,
          mes || undefined,
          anio || undefined,
        );

        // Mapear datos al tipo correcto
        const data: BitacoraMensualResponse[] = response.content.map(
          (row: any) => ({
            idEmpleado: row.idEmpleado ?? 0,
            nombreEmpleado: row.nombreEmpleado ?? "",
            rfcEmpleado: row.rfcEmpleado ?? "",
            emailEmpleado: row.emailEmpleado ?? "",
            idCompania: row.idCompania ?? 0,
            nombreCompania: row.nombreCompania ?? "",
            idProyecto: row.idProyecto ?? 0,
            nombreProyecto: row.nombreProyecto ?? "",
            idJira: row.idJira ?? "",
            idHoras: row.idHoras ?? 0,
            fecha: row.fecha ?? "",
            mes: row.mes ?? 0,
            anio: row.anio ?? 0,
            horasTrabajadas: row.horasTrabajadas ?? 0,
            descripcion: row.descripcion ?? "",
          }),
        );
        setBitacoraData(data);
      } else {
        const response = await reportesService.getReporteMensualEmpleados(
          idEmpleado || undefined,
          idCompania || undefined,
          idProyecto || undefined,
          mes || undefined,
          anio || undefined,
        );

        const data: ReporteMensualProyectoResponse[] = response.content.map(
          (row: any) => ({
            idProyecto: row.idProyecto ?? 0,
            nombreProyecto: row.nombreProyecto ?? "",
            idCompania: row.idCompania ?? 0,
            nombreCompania: row.nombreCompania ?? "",
            mes: row.mes ?? 0,
            anio: row.anio ?? 0,
            idEmpleado: row.idEmpleado ?? 0,
            nombreEmpleado: row.nombreEmpleado ?? "",
            totalHoras: row.totalHoras ?? 0,
          }),
        );
        setEmpleadosData(data);
      }
    } catch (err) {
      console.error("Error al obtener los reportes:", err);
    } finally {
      setLoading(false);
    }
  };

  const currentData = reportType === "bitacora" ? bitacoraData : empleadosData;

  // Exportar a Excel
  const exportExcel = async () => {
    setExporting(true);
    const rows = filteredRows.length ? filteredRows : currentData;

    if (!rows.length) {
      setExporting(false);
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const headers = Object.keys(rows[0]);
    headers.forEach((header, i) => {
      const cell = XLSX.utils.encode_cell({ r: 0, c: i });
      if (worksheet[cell]) worksheet[cell].s = { font: { bold: true } };
    });

    const colWidths = headers.map((h) => ({
      wch:
        Math.max(h.length, ...rows.map((row) => String(row[h] ?? "").length)) +
        3,
    }));
    worksheet["!cols"] = colWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

    const fileName =
      reportType === "bitacora"
        ? `bitacora_axity.xlsx`
        : `reporte_empleados.xlsx`;

    XLSX.writeFile(workbook, fileName);
    setExporting(false);
  };

  return (
    <motion.div
      className="space-y-8"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-2xl font-bold text-white">Generar Reportes</h1>

      {/* Controles superiores */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Botones Volver y Exportar */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-padsa-surface-light text-white"
          >
            <ArrowLeft size={16} />
            Volver
          </button>

          <button
            onClick={exportExcel}
            disabled={exporting}
            className="flex items-center gap-2 px-4 py-2 bg-padsa-primary text-white rounded-lg"
          >
            {exporting ? (
              <>
                <span className="animate-spin">⏳</span>
                Exportando...
              </>
            ) : (
              <>
                <FileDown size={16} />
                Exportar Reportes
              </>
            )}
          </button>
        </div>

        {/* SWITCH REPORTE */}
        <div className="flex justify-center md:justify-start items-center">
          <div className="relative flex bg-padsa-surface-light rounded-xl p-1">
            <motion.div
              layout
              className="absolute top-1 bottom-1 w-1/2 bg-padsa-primary rounded-lg"
              animate={{ x: reportType === "bitacora" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              onClick={() => setReportType("bitacora")}
              className={`relative z-10 px-6 py-2 text-sm font-medium ${
                reportType === "bitacora"
                  ? "text-white"
                  : "text-padsa-text-secondary"
              }`}
            >
              Bitácora Axity
            </button>
            <button
              onClick={() => setReportType("empleados")}
              className={`relative z-10 px-6 py-2 text-sm font-medium ${
                reportType === "empleados"
                  ? "text-white"
                  : "text-padsa-text-secondary"
              }`}
            >
              Empleados
            </button>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 items-end">
        <input
          type="number"
          placeholder="ID Empleado"
          value={idEmpleado}
          onChange={(e) =>
            setIdEmpleado(e.target.value ? Number(e.target.value) : "")
          }
          className="bg-padsa-surface border border-padsa-border rounded-lg px-2 py-1 text-sm text-white"
        />
        <input
          type="number"
          placeholder="ID Compañía"
          value={idCompania}
          onChange={(e) =>
            setIdCompania(e.target.value ? Number(e.target.value) : "")
          }
          className="bg-padsa-surface border border-padsa-border rounded-lg px-2 py-1 text-sm text-white"
        />
        <input
          type="number"
          placeholder="ID Proyecto"
          value={idProyecto}
          onChange={(e) =>
            setIdProyecto(e.target.value ? Number(e.target.value) : "")
          }
          className="bg-padsa-surface border border-padsa-border rounded-lg px-2 py-1 text-sm text-white"
        />
        <input
          type="number"
          placeholder="Mes (1-12)"
          value={mes}
          onChange={(e) => setMes(e.target.value ? Number(e.target.value) : "")}
          className="bg-padsa-surface border border-padsa-border rounded-lg px-2 py-1 text-sm text-white w-24"
        />
        <input
          type="number"
          placeholder="Año"
          value={anio}
          onChange={(e) =>
            setAnio(e.target.value ? Number(e.target.value) : "")
          }
          className="bg-padsa-surface border border-padsa-border rounded-lg px-2 py-1 text-sm text-white w-24"
        />
        <button
          onClick={consultarReportes}
          className="bg-padsa-primary px-4 py-1 rounded-lg text-white text-sm"
        >
          Consultar
        </button>
      </div>

      {/* Tabla */}
      <DataTable
        data={currentData}
        columns={reportType === "bitacora" ? bitacoraColumns : empleadosColumns}
        loading={loading}
        page={1}
        pageSize={10}
        total={currentData.length}
        filters={{}}
        onFilterChange={() => {}}
        onPageChange={() => {}}
        onFilteredDataChange={setFilteredRows}
      />
    </motion.div>
  );
};
