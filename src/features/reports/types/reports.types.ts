// src/modules/reports/types/reports.types.ts

// DTOs antiguos (para compatibilidad con otras partes del frontend)
export interface BitacoraAxityDto {
  id: number;
  numeroCliente: string;
  numeroProyecto: string;
  numeroRecurso: string;
  idNivel: string;
  idPerfil: string;
  idTarifas: string;
  idHorasMes: string;
  idPagos: string;
}

export interface ReporteEmpleadoDto {
  id: number;
  idReporte: string;
  proveedor: string;
  fecha: string;
  numeroConsultor: string;
  usuarioWindows: string;
  nombreCompleto: string;
  squadLead: string;
  techLead: string;
  numeroJira: string;
  nombreProyecto: string;
  actividades: string;
  horas: number;
  entregables: string;
  comentarios: string;
}

// Nuevos tipos adaptados al backend

// Bitácora Mensual Axity
export interface BitacoraMensualResponse {
  idEmpleado: number;
  nombreEmpleado: string;
  rfcEmpleado: string;
  emailEmpleado: string;
  idCompania: number;
  nombreCompania: string;
  idProyecto: number;
  nombreProyecto: string;
  idJira: string;
  idHoras: number;
  fecha: string; // string para formatear en frontend si se requiere
  mes: number;
  anio: number;
  horasTrabajadas: number; // BigDecimal del backend convertido a number
  descripcion: string;
}

// Reporte Mensual de Empleados agrupado por Proyecto
export interface ReporteMensualProyectoResponse {
  idProyecto: number;
  nombreProyecto: string;
  idCompania: number;
  nombreCompania: string;
  mes: number;
  anio: number;
  idEmpleado: number;
  nombreEmpleado: string;
  totalHoras: number; // BigDecimal del backend convertido a number
}