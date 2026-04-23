import type { Column } from "../../../shared/components/ui/DataTable";
import type { ReporteMensualProyectoResponse } from "../types/reports.types";

export const bitacoraColumns: Column<ReporteMensualProyectoResponse>[] = [
  { key: "empleadoId", label: "ID Empleado" },
  { key: "nombreEmpleado", label: "Empleado", filterable: true },
  { key: "rfc", label: "RFC" },
  { key: "email", label: "Email" },

  { key: "compania", label: "Compañía" },

  { key: "proyectoNombre", label: "Proyecto", filterable: true },
  { key: "jiraId", label: "Jira" },

  { key: "mes", label: "Mes" },
  { key: "anio", label: "Año" },

  { key: "horasTrabajadas", label: "Horas" },
  { key: "tarifaHora", label: "Tarifa" },
  { key: "montoTotal", label: "Total" },

  { key: "descripcion", label: "Descripción" },
];