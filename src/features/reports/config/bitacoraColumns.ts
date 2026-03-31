import type { Column } from "../../../shared/components/ui/DataTable";
import type { BitacoraMensualResponse } from "../types/reports.types";

export const bitacoraColumns: Column<BitacoraMensualResponse>[] = [
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