export interface ResourceDto {
  id: number;
  numeroRecurso: string;
  numeroPersonal: string;
  tipoRecurso: string;
  numeroProyecto: string;
}
export interface DashboardKpis {
  personal: number;
  perfiles: number;
  clientes: number;
  proyectos: number;
  companias: number;
  tarifas: number;
}