export interface ReporteMensualProyectoResponse {
  id: number;
  clave: string;
  estatus: string;

  empleadoId: number;
  nombreEmpleado: string;
  rfc: string;
  email: string;

  proyectoId: number;
  proyectoNombre: string;
  jiraId: string;

  companiaId: number;
  compania: string;

  fecha: string;
  mes: number;
  anio: number;

  horasTrabajadas: number;
  tarifaHora: number;
  montoTotal: number;

  horId: number;
  descripcion: string;

  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}