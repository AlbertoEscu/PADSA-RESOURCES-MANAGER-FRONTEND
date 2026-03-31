import { axiosInstance } from "../../../api/axiosInstance";
import type { BitacoraAxityDto, ReporteEmpleadoDto } from "../types/reports.types";

interface BitacoraResponse {
  content: BitacoraAxityDto[];
  totalElements: number;
}

interface EmpleadosResponse {
  content: ReporteEmpleadoDto[];
  totalElements: number;
}

export const reportesService = {
  async getBitacoraMensual(
    idEmpleado?: number,
    idCompania?: number,
    idProyecto?: number,
    mes?: number,
    anio?: number,
    page = 0,
    size = 50
  ): Promise<BitacoraResponse> {
    const params: any = { page, size };
    if (idEmpleado) params.idEmpleado = idEmpleado;
    if (idCompania) params.idCompania = idCompania;
    if (idProyecto) params.idProyecto = idProyecto;
    if (mes) params.mes = mes;
    if (anio) params.anio = anio;

    const { data } = await axiosInstance.get("/reportes/bitacora-mensual", { params });

    // Mapear respuesta backend a nuestro DTO frontend
    const content: BitacoraAxityDto[] = data.content.map((b: any, index: number) => ({
      id: index + 1,
      numeroCliente: b.idCompania?.toString() ?? "",
      numeroProyecto: b.idProyecto?.toString() ?? "",
      numeroRecurso: b.idEmpleado?.toString() ?? "",
      idNivel: "", // no viene del backend, opcional
      idPerfil: "", // no viene del backend
      idTarifas: "", // no viene del backend
      idHorasMes: b.idHoras?.toString() ?? "",
      idPagos: "", // no viene del backend
    }));

    return { content, totalElements: data.totalElements };
  },

  async getReporteMensualEmpleados(
    idEmpleado?: number,
    idCompania?: number,
    idProyecto?: number,
    mes?: number,
    anio?: number,
    page = 0,
    size = 50
  ): Promise<EmpleadosResponse> {
    const params: any = { page, size };
    if (idEmpleado) params.idEmpleado = idEmpleado;
    if (idCompania) params.idCompania = idCompania;
    if (idProyecto) params.idProyecto = idProyecto;
    if (mes) params.mes = mes;
    if (anio) params.anio = anio;

    const { data } = await axiosInstance.get("/reportes/mensual-por-proyecto", { params });

    const content: ReporteEmpleadoDto[] = data.content.map((r: any, index: number) => ({
      id: index + 1,
      idReporte: r.idEmpleado?.toString() ?? "",
      proveedor: "Axity",
      fecha: new Date().toISOString().slice(0, 10),
      numeroConsultor: r.idEmpleado?.toString() ?? "",
      usuarioWindows: "",
      nombreCompleto: r.nombreEmpleado ?? "",
      squadLead: "",
      techLead: "",
      numeroJira: r.idJira ?? "",
      nombreProyecto: r.nombreProyecto ?? "",
      actividades: "",
      horas: r.totalHoras ? Number(r.totalHoras) : 0,
      entregables: "",
      comentarios: "",
    }));

    return { content, totalElements: data.totalElements };
  },
};