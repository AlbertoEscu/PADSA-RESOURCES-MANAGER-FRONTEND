import { axiosInstance } from "../../../api/axiosInstance";
import type { ReporteMensualProyectoResponse } from "../types/reports.types";

export const reportesService = {

  async getReporteMensual(params?: {
    proyectoId?: number;
    fechaInicio?: string;
    fechaFin?: string;
  }): Promise<ReporteMensualProyectoResponse[]> {

    const { data } = await axiosInstance.get(
      "/reportes-mensuales",
      { params }
    );

    return data;
  }
};