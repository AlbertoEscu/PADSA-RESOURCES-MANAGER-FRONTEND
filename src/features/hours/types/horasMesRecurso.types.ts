

export interface ReporteMensualDto {
  id: number;
  proveedor: string;
  fecha: string;
  idConsultor: string;
  usuarioWindows: string;
  nombreProfesional: string;
  axityTribe: string;
  axitySquadLead: string;
  wmTechLead: string;
  idJira: string;
  nombreProyecto: string;
  actividades: string;
  horas: number;
  entregables: string;
  comentarios: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateReporteDetalleDto {
  id: number;
  horas: number;
  comentarios: string;
}

export interface HorasMesRecursoDto {
  id: number;
  proveedor: string;
  fecha: string;

  empleadoId: number;
  usuarioWindows: string;
  nombreProfesional: string;

  axityTribe: string;
  axitySquad: string;
  lead: string;
  wm: string;
  techLead: string;

  idJira: string;
  proyectoId: number;
  nombreProyecto: string;

  actividades: string;
  horas: number;
  entregables: string;
  comentarios: string;

  createdAt: string;
  updatedAt: string;
}