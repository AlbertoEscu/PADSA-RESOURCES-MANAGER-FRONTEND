export interface TarifaRecursoDto {
  idTarifas: number;
  idProyecto: number;
  idRecurso: number;
  tarifaHora: number;
  tarifaAlianza?: number;
  tarifaAxity?: number;
  equipoAlianza: boolean;
  fechaAsignacionEquipo?: string;
  fechaArrendamiento?: string;
  nivelDescuento?: number;
  montoEstimadoCobro?: number;
  montoEstimadoCobro2?: number;
  montoEstimadoCobro3?: number;
  montoRealFacturar?: number;
  fechaUltimaModificacion: string;
  usuarioModificacion: string;
  estatus: string;
}