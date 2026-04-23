export interface TarifaRequest {
  clave: string;
  proyectoId: number;
  empleadoId: number;

  tarifaHora?: number;
  tarifaAlianza?: number;
  tarifaAxity?: number;
  nivelDescuento?: number;

  equipoAlianza?: string;
  fechaAsignacionEquipo?: string;
  fechaArrendamiento?: string;

  montoEstimadoCobro?: number;
  montoEstimadoCobro2?: number;
  montoEstimadoCobro3?: number;
  montoRealFacturar?: number;
}

export interface TarifaResponse {
  id: number;
  clave: string;

  proyectoId: number;
  proyectoClave: string;

  empleadoId: number;
  empleadoClave: string;

  tarifaHora?: number;
  tarifaAlianza?: number;
  tarifaAxity?: number;

  nivelDescuento?: number;

  equipoAlianza?: string;

  fechaAsignacionEquipo?: string;
  fechaArrendamiento?: string;

  montoEstimadoCobro?: number;
  montoEstimadoCobro2?: number;
  montoEstimadoCobro3?: number;
  montoRealFacturar?: number;

  estatus: string;

  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}