import type { Column } from "../../../shared/components/ui/DataTable";
import type { ReporteMensualProyectoResponse } from "../types/reports.types";

export const empleadosColumns: Column<ReporteMensualProyectoResponse>[] = [
  { key: "idProyecto", label: "ID Proyecto" },
  { key: "nombreProyecto", label: "Proyecto" },
  { key: "idCompania", label: "ID Compañía" },
  { key: "nombreCompania", label: "Compañía" },
  { key: "mes", label: "Mes" },
  { key: "anio", label: "Año" },
  { key: "idEmpleado", label: "ID Empleado" },
  { key: "nombreEmpleado", label: "Empleado" },
  { key: "totalHoras", label: "Total Horas" },
];